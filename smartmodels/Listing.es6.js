import { afterResponse, beforeResponse } from '../apis/APIResponsePaging';

const applyIfDifferent = (result, self, fn) => {
  return result === self ? result : fn(result);
};

// Base class for paged collections
export default class Listing {
  static baseOptiosn() { return {}; }

  static endpoint = '';

  static async getResponse(api, options={}) {
    return await api[this.endpoint].get({
      ...this.baseOptions(),
      ...options,
    });
  }

  static async fetch(api, options={}) {
    return new this(await this.getResponse(api, options));
  }

  constructor(apiResponse) {
    this.apiResponse = apiResponse;
  }

  hasNextPage() {
    return !!afterResponse(this.apiResponse);
  }

  hasPreviousPage() {
    return !!beforeResponse(this.apiResponse);
  }

  async nextResponse(api) {
    const after = afterResponse(this.apiResponse);
    if (!after) { return this.apiResponse; }
    return await this.constructor.getResponse(api, { after });
  }

  async nextPage(api) {
    return applyIfDifferent(await this.nextResponse(api), this, (nextReponse) => {
      return new this.constructor(nextReponse);
    });
  }

  async withNextPage(api) {
    return applyIfDifferent(await this.nextPageResponse(api), this, (nextReponse) => {
      return new this.constructor(this.apiResponse.appendResponse(nextReponse));
    });
  }

  async prevResponse(api) {
    const before = beforeResponse(this.apiResponse);
    if (!before) { return this;}
    return await this.constructor.getResponse(api, { before });
  }

  async prevPage(api) {
    return applyIfDifferent(await this.prevResponse(api), this, (prevResponse) => {
      return new this.constructor(prevResponse);
    });
  }

  async withPreviousPage(api) {
    return applyIfDifferent(await this.prevResponse(api), this, (prevResponse) => {
      return new this.constructor(prevResponse.appendResponse(this.apiResponse));
    });
  }
}
