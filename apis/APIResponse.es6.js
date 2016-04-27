import {
  TYPES,
  thingType,
  COMMENT,
  USER,
  LINK,
  MESSAGE,
  SUBREDDIT,
} from '../models2/thingTypes';

export default class APIResponse {
  constructor(meta={}) {
    this.meta = meta;
    this.results = [];

    this.links = {};
    this.comments = {};
    this.users = {};
    this.messages = {};
    this.subreddits = {};

    this.typeToTable = {
      [COMMENT]: this.comments,
      [LINK]: this.links,
      [USER]: this.users,
      [MESSAGE]: this.messages,
      [SUBREDDIT]: this.subreddits,
    };
  }

  addResult(model) {
    if (!model) { return this; }
    const record = this.makeRecord(model);
    if (record) {
      this.results.push(record);
      this.addToTable(record, model);
    }

    return this;
  }

  addModel(model) {
    if (!model) { return this; }
    const record = this.makeRecord(model);
    if (record) {
      this.addToTable(record, model);
    }

    return this;
  }

  makeRecord(model) {
    if (model.toRecord) { return model.toRecord(); }
    const { uuid } = model;
    if (!uuid) { return; }

    const type = TYPES[model.kind] || thingType(uuid);
    if (!type) { return; }
    return { type, uuid };
  }

  addToTable(record, model) {
    const table = this.typeToTable[record.type];
    if (table) { table[record.uuid] = model; }
    return this;
  }

  getModelFromRecord(record) {
    const table = this.typeToTable[record.type];
    if (table) { return table[record.uuid]; }
  }
}
