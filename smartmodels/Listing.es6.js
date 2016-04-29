import { fetchAll, afterResponse, beforeResponse } from '../apis/APIResponsePaging';

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

  async withNextPage(api) {
    const after = afterResponse(this.apiResponse);
    if (!after) { return this; }

    const nextPage = await this.constructor.getResponse(api, { after });
    return new this.constructor(this.apiResponse.appendResponse(nextPage));
  }

  async withPreviousPage(api) {
    const before = beforeResponse(this.apiResponse);
    if (!before) { return this; }
    const previousPage = await this.constructor.getResponse(api, { before });
    return new this.constructor(previousPage.appendResponse(this.apiResponse));
  }
}
