import Listing from './Listing';

import { last } from 'lodash/array';

import { withQueryAndResult } from '../apiBase/APIResponsePaging';
import { LINK, SUBREDDIT } from '../models2/thingTypes';
const RESERVED_FOR_SUBBREDITS = 3; // api reserves 3 slots for subreddit results

export default class SearchQuery extends Listing {
  static endpoint = 'search';

  static fetch(api, query, options={}) {
    options.q = query;

    return super.fetch(api, options);
  }

  static fetchInSubreddit(api, query, subreddit, options) {
    options.subreddit = subreddit;
    return this.fetch(api, query, options);
  }

  expectedNumberOfPosts(query) {
    return (query.limit || 25) - RESERVED_FOR_SUBBREDITS;
  }

  get afterId() {
    return withQueryAndResult(this.apiResponse, (query, results) => {
      const limit = this.expectedNumberOfPosts(query);
      const posts = results.filter(record => record.type === LINK);
      return posts.length >= limit ? last(posts).uuid : null;
    });
  }

  get posts() {
    return this.apiResponse.results
      .filter(record => record.type === LINK)
      .map(this.apiResponse.getModelFromRecord);
  }

  get subreddits() {
    return this.apiResponse.results
      .filter(record => record.type === SUBREDDIT)
      .map(this.apiResponse.getModelFromRecord);
  }
}
