import { afterResponse, beforeResponse } from '../apis/APIResponsePaging';
import { omit } from 'lodash/object';

const identity = (id) => id;

// Base class for paged collections
// TODO: rethink base options a bit, whould base options just really make everytyhing?
// think more about next page and etc, it should be easy to do paged requests
// in the very first fetch call
export default class Listing {
  static baseOptions() { return {}; }

  static endpoint = '';

  static async getResponse(api, options={}) {
    const res =  await api[this.endpoint].get({
      ...this.baseOptions(),
      ...options,
    });

    return res;
  }

  static async fetch(api, options={}) {
    return new this(await this.getResponse(api, options));
  }

  constructor(apiResponse) {
    this.apiResponse = apiResponse;
    this.nextResponse = this.nextResponse.bind(this);
    this.prevResponse = this.prevResponse.bind(this);
  }

  hasNextPage() {
    return !!afterResponse(this.apiResponse);
  }

  hasPreviousPage() {
    return !!beforeResponse(this.apiResponse);
  }

  async nextResponse(api) {
    const after = afterResponse(this.apiResponse);
    if (!after) { return ; }
    const options = omit({ ...this.apiResponse.query, after}, 'before');
    return await this.constructor.getResponse(api, options);
  }

  async prevResponse(api) {
    const before = beforeResponse(this.apiResponse);
    if (!before) { return; }
    const options = omit({ ...this.apiResponse.query, before}, 'after');
    return await this.constructor.getResponse(api, options);
  }

  async fetchAndMakeInstance(fetchMethod, api, reduceResponse) {
    const response = await fetchMethod(api);
    if (response) {
      return new this.constructor(reduceResponse(response));
    }
  }

  async nextPage(api) {
    return this.fetchAndMakeInstance(this.nextResponse, api, identity);
  }

  async withNextPage(api) {
    return this.fetchAndMakeInstance(this.nextResponse, api, this.apiResponse.appendResponse);
  }

  async prevPage(api) {
    return this.fetchAndMakeInstance(this.prevResponse, api, identity);
  }

  async withPrevPage(api) {
    return this.fetchAndMakeInstance(this.prevResponse, api, (prevResponse) => {
      return prevResponse.appendResponse(this.apiResponse);
    });
  }
}
