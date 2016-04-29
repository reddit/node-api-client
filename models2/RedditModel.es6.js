import Model from '../apiBase/Model';

import { TYPES, thingType } from './thingTypes';

import isThingID from '../lib/isThingID';
import process from '../lib/markdown';
import unredditifyLink from '../lib/unredditifyLink';

import mockHTML from './mockgenerators/mockHTML';
import mockLink from './mockgenerators/mockLink';

// TYPES I'd like to add
// mod: (type) => type
// useage: bannedBy: T.mod(T.string),
// purpose: Just to document that a field is only going to be there as a moderator
//
// record: val => val instanceOf Record ? val : new Record()
// usage: replies: T.arrayOf(T.record)
// purpose: Enforce that model relations are defined as records
//
// model: ModelClass => val => ModelClass.fromJSON(val)
// usage: srDetail: T.model(SubredditDetailModel)
// purpose: express nested model parsing for one off nested parts of your model

export default class RedditModel extends Model {

  static Types = {
    ...Model.Types,
    html: val => process(Model.Types.string(val)),
    link: val => unredditifyLink(Model.Types.string(val)),
  };

  static MockTypes = {
    ...Model.MockTypes,
    html: mockHTML,
    link: mockLink,
  };

  makeUUID(data) {
    if (isThingID(data.name)) { return data.name; }
    if (isThingID(data.id)) { return data.id; }
    return super.makeUUID(data);
  }

  getType(data, uuid) {
    return super.getType(data, uuid) || TYPES[data.kind] || thingType(uuid) || 'Unknown';
  }
}
