import { forEach } from 'lodash/collection';
import { last } from 'lodash/array';

import {
  TYPES,
  thingType,
  COMMENT,
  ACCOUNT,
  POST,
  MESSAGE,
  SUBREDDIT,
  SUBREDDIT_RULE,
  WIKI,
} from '../models2/thingTypes';

export class APIResponseBase {
  constructor() {
    this.results = [];

    this.posts = {};
    this.comments = {};
    this.accounts = {};
    this.messages = {};
    this.subreddits = {};
    this.subreddit_rules = {};
    this.wikis = {};

    this.typeToTable = {
      [COMMENT]: this.comments,
      [POST]: this.posts,
      [ACCOUNT]: this.accounts,
      [MESSAGE]: this.messages,
      [SUBREDDIT]: this.subreddits,
      [SUBREDDIT_RULE]: this.subreddit_rules,
      [WIKI]: this.wikis,
    };

    this.addResult = this.addResult.bind(this);
    this.addModel = this.addModel.bind(this);
    this.makeRecord = this.makeRecord.bind(this);
    this.addToTable = this.addToTable.bind(this);
    this.getModelFromRecord = this.getModelFromRecord.bind(this);
    this.appendResponse = this.appendResponse.bind(this);
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

  appendResponse() { throw new Error('Not implemented in base class'); }
}

export class APIResponse extends APIResponseBase {
  constructor(response, meta={}, query={}) {
    super();
    this.request = response.req;
    this.response = response;

    // Left for backwards compatibility, you can use request and response directly
    this.meta = meta;
    this.query = query;
  }

  appendResponse(nextResponse) {
    return new MergedApiReponse([this, nextResponse]);
  }
}

export class MergedApiReponse extends APIResponseBase {
  constructor(apiResponses) {
    super();
    this.metas = apiResponses.map(response => response.meta);
    this.querys = apiResponses.map(response => response.query);

    this.apiResponses = apiResponses;

    const seenResults = new Set();

    const tableKeys = [
      COMMENT,
      ACCOUNT,
      POST,
      MESSAGE,
      SUBREDDIT,
    ];

    forEach(apiResponses, (apiResponse) => {
      forEach(apiResponse.results, (record) => {
        if (!seenResults.has(record.uuid)) {
          seenResults.add(record.uuid);
          this.results.push(record);
        }
      });

      forEach(tableKeys, (tableKey) => {
        const table = this.typeToTable[tableKey];
        Object.assign(table, apiResponse.typeToTable[tableKey]);
      });
    });
  }

  get lastResponse() {
    return last(this.apiResponses);
  }

  get lastQuery() {
    return last(this.querys);
  }

  get lastMeta() {
    return last(this.meta);
  }

  get query() { // shorthand convenience
    return this.latQuery;
  }

  appendResponse(response) {
    const newReponses = this.apiResponses.slice();
    newReponses.push(response);

    return new MergedApiReponse(newReponses);
  }
}
