import { omit } from 'lodash/object';
import { TYPES, thingType } from './thingTypes';

import Record from './Record';

import isThingID from '../lib/isThingID';
import process from '../lib/markdown';
import unredditifyLink from '../lib/unredditifyLink';

import mockHTML from './mockgenerators/mockHTML';
import mockLink from './mockgenerators/mockLink';

const addGetter = (instance, key, value) => {
  Object.defineProperty(instance, key, {
    value,
    writable: false,
    enumerable: true,
  });
};

const fakeUUID = () => Math.toFixed(Math.random() * 16);

// Model class that handles parsing, serializing, and pseudo-validation.
// Provides a mechanism for creating stubs (which will represent incremental UI updates)
// and fulfill themselves to the proper result of api calls
//
// An example class will look like
//
// const T = Model.Types
// class Post extends Model {
//  static type = LINK;
//
//  static API_ALIASES = {
//    body_html: 'bodyHTML,
//    score_hidden: 'scoreHidden',
//   }
//
//  static PROPERITES = {
//    id: T.string,
//    author: T.string,
//    bodyHTML: T.html,
//    replies: T.array,
//    links: T.arrayOf(T.link)
//    cleanURL: T.link
//  }
// }
//
export default class Model {
  static fromJSON(obj) {
    return new this(obj);
    // todo, this is were we could do somee validation
    // we might also want to explicity omit stuff, but
    // we check the Properties map anyway so it should be fine
    // return new this(omit(obj, '__type'));
  }

  // put value transformers here. They'll take input and pseudo-validate it and
  // transform it. You'll put thme in your subclasses PROPERITES dictionary.
  static Types = {
    string: val => val ? String(val) : '',
    number: val => Number(val),
    array: val => Array.apply(null, val),
    arrayOf: (type=Model.Types.nop) => val => Model.Types.array(val).map(type),
    bool: val => Boolean(val),
    cubit: val => {
      const num = Number(val);
      return num > 0 ? 1 : num < 0 ? -1 : 0;
    },
    nop: val => val,

    // some more semantic types that apply transformations
    html: val => process(Model.Types.String(val)),
    link: val => unredditifyLink(Model.types.String(val)),
  };

  static MockTypes = {
    string: () => Math.random().toString(36).substring(Math.floor(Math.random() * 10) + 5),
    number: () => Math.floor(Math.random() * 100),
    array: () => Array.apply(null, Array(Math.floor(Math.random() * 10))),
    bool: () => Math.floor(Math.random() * 10) < 5,
    cubit: () => Math.toFixed(Math.random() * 5 + -2.5),
    nop: () => null,

    // semantic mocks
    html: mockHTML,
    link: mockLink,
  };

  static Mock() {
    const data = Object.keys(this.PROPERTIES).reduce((prev, cur) => ({
      ...prev,
      [cur]: this.MOCKS[cur] ? this.MOCKS[cur]() : null,
    }), {});

    return new this(data);
  }

  static API_ALIASES = {};
  static PROPERTIES = {};
  static MOCKS = {};
  static DERIVED_PROPERTIES = {};

  constructor(data) {
    const { API_ALIASES, PROPERTIES, DERIVED_PROPERTIES } = this.constructor;

    Object.keys(data).forEach(key => {
      const keyName = API_ALIASES[key]
        ? API_ALIASES[key]
        : key;

      if (PROPERTIES[keyName]) {
        addGetter(this, keyName, PROPERTIES[keyName](data[key]));
      }
    });

    Object.keys(DERIVED_PROPERTIES).forEach(derivedKey => {
      if (PROPERTIES[derivedKey]) {
        addGetter(this, derivedKey, DERIVED_PROPERTIES[derivedKey](data));
      }
    });

    addGetter(this, 'uuid', this.makeUUID(data));
    addGetter(this, 'type', this.getType(data, this.uuid));
    this.set = this._set.bind(this, data);
  }

  _set(data, keyOrObject, value) {
    const diff = typeof keyOrObject === 'object'
      ? keyOrObject
      : { [keyOrObject]: value };

    return new this.constructor({...data, ...diff});
  }

  // .stub() is for encoding optimistic and transient states during async actions
  //
  // A reddit-example is voting. `link.upvote()` needs to handle
  // a few edgecases like: 'you already upvoted, let's toggle your vote',
  // 'you downvoted, so the score increase is really +2 for ui (instead of +1)',
  // and 'we need to add +1 to the score'.
  // It also needs to handle failure cases like 'that upvote failed, undo everything'.
    // Stubs provide a way of providing an optimistic ui update that includes
  // all of these cases, that use javascript promises to encode the completion
  // and final state of this
  //
  // With stubs, `.upvote()` can return a stub object so that you can:
  // ```javascript
  // const stub = link.upvote();
  // dispatch(newLinkData(stub));
  // stub.then(finalLink => dispatch(newLinkData(finalLink));
  // stub.reject(error => {
  //  dispatch(failedToUpvote(link));
  //  // Undo the optimistic ui update. Note: .upvote can choose to
  //  // catch the reject and pass the old version back in Promise.resolve()
  //  disaptch(newLinkData(link))
  // });
  // ```
  stub({ keyOrObject, value}, promise) {
    const stub = this.set(keyOrObject, value);
    addGetter(stub, 'then', promise.then);
    addGetter(stub, 'reject', promise.reject);
    return stub;
  }

  makeUUID(data) {
    if (isThingID(data.name)) { return data.name; }
    if (isThingID(data.id)) { return data.id; }
    // todo: make build smarter about injecting build info
    console.warn(`generating fake id for data: ${data}`);
    return fakeUUID();
  }

  getType(data, uuid) {
    return this.constructor.type || TYPES[data.kind] || thingType(uuid) || 'Unknown';
  }

  toRecord() {
    return new Record(this.type, this.uuid);
  }

  toJSON() {
    const obj = {};
    Object.keys(this).forEach(key => {
      if (this.constructor.PROPERTIES[key]) {
        obj[key] = this[key];
      }
    });

    obj.__type = this.type;
    return obj;
  }
}
