import Record from './Record';

const fakeUUID = () => (Math.random() * 16).toFixed();

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
//  static PROPERTIES = {
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
  }

  // put value transformers here. They'll take input and pseudo-validate it and
  // transform it. You'll put thme in your subclasses PROPERITES dictionary.
  static Types = {
    string: val => val ? String(val) : '',
    number: val => val === undefined ? 0 : Number(val),
    array: val => Array.isArray(val) ? val : [],
    arrayOf: (type=Model.Types.nop) => val => Model.Types.array(val).map(type),
    bool: val => Boolean(val),
    cubit: val => {
      const num = Number(val);
      return num > 0 ? 1 : num < 0 ? -1 : 0;
    },

    nop: val => val,

    /* examples of more semantic types you can build
      // some more semantic types that apply transformations
      html: val => process(Model.Types.string(val)),
      link: val => unredditifyLink(Model.Types.string(val)),
    */
  };

  static MockTypes = {
    string: () => Math.random().toString(36).substring(Math.floor(Math.random() * 10) + 5),
    number: () => Math.floor(Math.random() * 100),
    array: () => Array.apply(null, Array(Math.floor(Math.random() * 10))),
    bool: () => Math.floor(Math.random() * 10) < 5,
    cubit: () => Math.round((Math.random() * (1 - -1) + -1)),
    nop: () => null,
  }

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

  constructor(data, SUPER_SECRET_SHOULD_FREEZE_FLAG_THAT_ONLY_STUBS_CAN_USE) {
    const { API_ALIASES, PROPERTIES, DERIVED_PROPERTIES } = this.constructor;

    // Please note: the use of for loops and adding properties directly
    // and then freezing (versus using defineProperty with writeable false)
    // is very intentional. Because performance. Please consult schwers or frontend-platform
    // before modifying

    const dataKeys = Object.keys(data);
    for (let i = 0; i < dataKeys.length; i++) {
      const key = dataKeys[i];
      if (DERIVED_PROPERTIES[key]) { // skip if there's a dervied key of the same name
        continue;
      }

      let keyName = API_ALIASES[key];
      if (!keyName) { keyName = key; }

      const typeFn = PROPERTIES[keyName];
      if (typeFn) {
        this[keyName] = typeFn(data[key]);
      }
    }

    const derivedKeys = Object.keys(DERIVED_PROPERTIES);
    for (let i = 0; i < derivedKeys.length; i++) {
      const derivedKey = derivedKeys[i];
      const derviceFn = DERIVED_PROPERTIES[derivedKey];
      const typeFn = PROPERTIES[derivedKey];

      if (derviceFn && typeFn) {
        this[derivedKey] = typeFn(derviceFn(data));
      }
    }

    this.uuid = this.makeUUID(data);
    this.type = this.getType(data, this.uuid);

    if (!SUPER_SECRET_SHOULD_FREEZE_FLAG_THAT_ONLY_STUBS_CAN_USE) {
      Object.freeze(this);
    }
  }

  _diff(keyOrObject, value) {
    return typeof keyOrObject === 'object'
      ? keyOrObject
      : { [keyOrObject]: value };
  }

  set(keyOrObject, value) {
    return new this.constructor({...this.toJSON(), ...this._diff(keyOrObject, value)});
  }

  // .stub() is for encoding optimistic updates and other transient states
  //    while waiting for async actions.
  //
  // A reddit-example is voting. `link.upvote()` needs to handle
  // a few edgecases like: 'you already upvoted, let's toggle your vote',
  // 'you downvoted, so the score increase is really +2 for ui (instead of +1)',
  // and 'we need to add +1 to the score'.
  // It also needs to handle failure cases like 'that upvote failed, undo everything'.
  //
  // Stubs provide a way of encoding an optimistic ui update that includes
  // all of these cases, that use javascript promises to encode the completion
  // and final state of this.
  //
  // With stubs, `.upvote()` can return a stub object so that you can:
  // ```javascript
  // /* upvoteLink is a dispatch thunk */
  // const upvoteLink = link => (dispatch, getState) => () => {
  //    const stub = link.upvote();
  //    dispatch(newLinkData(stub));
  //
  //    stub.reject(error => {
  //      dispatch(failedToUpvote(link));
  //      // Undo the optimistic ui update. Note: .upvote can choose to
  //      // catch the reject and pass the old version back in Promise.resolve()
  //      disaptch(newLinkData(link))
  //   });
  //
  //   return stub.then(finalLink => dispatch(newLinkData(finalLink));
  // };
  // ```
  stub({ keyOrObject, value}, promise) {
    const next = {...this.toJSON(), ...this._diff(keyOrObject, value) };
    const stub = new this.constructor(next, true);
    stub.then = promise.then;
    stub.reject = promise.reject;
    Object.freeze(stub); // super important, don't break the super secret flag
    return stub;
  }

  makeUUID(data) {
    if (data.uuid) { return data.uuid; }
    if (data.id) { return data.id; }
    console.warn('generating fake uuid');
    return fakeUUID();
  }

  getType(/* data, uuid */) {
    return this.constructor.type;
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
