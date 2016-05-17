import { afterResponse, beforeResponse } from '../apiBase/APIResponsePaging';
import { omit } from 'lodash/object';

const identity = (id) => id;

// Base class for paged collections
// TODO: rethink base options a bit, whould base options just really make everytyhing?
// think more about next page and etc, it should be easy to do paged requests
// in the very first fetch call
export default class Listing {
  static baseOptions() { return {}; }

  static endpoint = { get() {} };

  static async getResponse(apiOptions, options={}) {
    const res = await this.endpoint.get(apiOptions, {
      ...this.baseOptions(),
      ...options,
    });

    return res;
  }

  static async fetch(apiOptions, options={}) {
    return new this(await this.getResponse(apiOptions, options));
  }

  constructor(apiResponse) {
    this.apiResponse = apiResponse;
    this.nextResponse = this.nextResponse.bind(this);
    this.prevResponse = this.prevResponse.bind(this);
  }

  afterId(apiResponse) {
    return afterResponse(apiResponse);
  }

  hasNextPage() {
    return !!this.afterId;
  }

  prevId(apiResponse) {
    return beforeResponse(apiResponse);
  }

  hasPreviousPage() {
    return !!this.prevId;
  }

  async nextResponse(apiOptions) {
    const after = this.afterId(this.apiResponse);
    if (!after) { return ; }
    const options = omit({ ...this.apiResponse.query, after}, 'before');
    return await this.constructor.getResponse(apiOptions, options);
  }

  async prevResponse(apiOptions) {
    const before = this.prevId(this.apiResponse);
    if (!before) { return; }
    const options = omit({ ...this.apiResponse.query, before}, 'after');
    return await this.constructor.getResponse(apiOptions, options);
  }

  async fetchAndMakeInstance(fetchMethod, apiOptions, reduceResponse) {
    const response = await fetchMethod(apiOptions);
    if (response) {
      return new this.constructor(reduceResponse(response));
    }
  }

  async nextPage(apiOptions) {
    return this.fetchAndMakeInstance(this.nextResponse, apiOptions, identity);
  }

  async withNextPage(apiOptions) {
    const { nextResponse, apiResponse } = this;
    return this.fetchAndMakeInstance(nextResponse, apiOptions, apiResponse.appendResponse);
  }

  async prevPage(apiOptions) {
    return this.fetchAndMakeInstance(this.prevResponse, apiOptions, identity);
  }

  async withPrevPage(apiOptions) {
    return this.fetchAndMakeInstance(this.prevResponse, apiOptions, (prevResponse) => {
      return prevResponse.appendResponse(this.apiResponse);
    });
  }
}
