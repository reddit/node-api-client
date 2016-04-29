import { fetchAll, afterResponse, beforeResponse } from '../apis/APIResponsePaging';

export class SubredditList {
  static view = '';
  static limit = 100;

  static baseOptions() {
    return { sort: this.view, limit: this.limit };
  }

  static async getResponse(api, options={}) {
    return await api.subreddits.get({
      ...this.baseOptions(),
      ...options,
    });
  }

  static async fetchWithOptions(api, options) {
    return new this(await this.getResponse(api, options));
  }

  static async fetch(api) {
    const allMergedSubreddits = await fetchAll(api.subreddits.get, this.baseOptions());
    return new this(allMergedSubreddits);
  }

  constructor(apiResponse) {
    this.apiResponse = apiResponse;
  }

  get subreddits() {
    return this.apiResponse.results.map(this.apiResponse.getModelFromRecord);
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

export class SubscribedSubreddits extends SubredditList {
  static view = 'mine/subscriber';
}

export class ModeratingSubreddits extends SubredditList {
  static view = 'mine/moderator';
}

export class ContributingSubreddits extends SubredditList {
  static view = 'mine/contributor';
}
