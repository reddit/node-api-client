import {
  thingType,
  COMMENT,
  USER,
  LINK,
  MESSAGE,
 } from './thingTypes';

export default class APIResponse {
  constructor(meta={}) {
    this.meta = meta;
    this.results = [];
    this.errors;

    this.links = {};
    this.comments = {};
    this.users = {};
    this.messages = {};

    this.typeToTable = {
      [COMMENT]: this.comments,
      [LINK]: this.links,
      [USER]: this.users,
      [MESSAGE]: this.messages,
    };
  }

  setErrors(errors) {
    this.errors = errors;
  }

  addResult(model) {
    const record = this.makeRecord(model);
    if (record) {
      this.results.push(record);
      this.addToTable(record, model);
    }
    return this;
  }

  makeRecord(model) {
    const { uuid } = model;
    if (!uuid) { return; }

    const type = thingType(uuid);
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
