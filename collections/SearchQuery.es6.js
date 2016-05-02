import Listing from './Listing';
import SearchEndpoint from '../apis/SearchEndpoint';

import { last } from 'lodash/array';

import { withQueryAndResult } from '../apiBase/APIResponsePaging';
import { POST, SUBREDDIT } from '../models2/thingTypes';
const RESERVED_FOR_SUBBREDITS = 3; // api reserves 3 slots for subreddit results

export default class SearchQuery extends Listing {
  static endpoint = SearchEndpoint;

  static fetch(apiOptions, queryOrOptions, options={}) {
    if (typeof queryOrOptions === 'string') {
      options.q = queryOrOptions;
    } else {
      options = { ...options, ...queryOrOptions };
    }

    return super.fetch(apiOptions, options);
  }

  static fetchPostsAndComments(apiOptions, queryOrOptions, options={}) {
    options = {
      ...options,
      include_facets: 'off',
      type: [ 'sr', 'link' ],
      sort: 'relevance',
      t: 'all',
    };

    return this.fetch(apiOptions, queryOrOptions, options);
  }

  static fetchPosts(apiOptions, queryOrOptions, options={}) {
    options = {
      ...options,
      include_facets: 'off',
      type: [ 'link' ],
      sort: 'relevance',
      t: 'all',
    };

    return this.fetch(apiOptions, queryOrOptions, options);
  }

  static fetchSubreddits(apiOptions, queryOrOptions, options={}) {
    options = {
      ...options,
      include_facets: 'off',
      type: [ 'sr' ],
      sort: 'relevance',
      t: 'all',
    };

    return this.fetch(apiOptions, queryOrOptions, options);
  }

  expectedNumberOfPosts(query) {
    return (query.limit || 25) - RESERVED_FOR_SUBBREDITS;
  }

  get afterId() {
    return withQueryAndResult(this.apiResponse, (query, results) => {
      const limit = this.expectedNumberOfPosts(query);
      const posts = results.filter(record => record.type === POST);
      return posts.length >= limit ? last(posts).uuid : null;
    });
  }

  get posts() {
    return this.apiResponse.results
      .filter(record => record.type === POST)
      .map(this.apiResponse.getModelFromRecord);
  }

  get subreddits() {
    return this.apiResponse.results
      .filter(record => record.type === SUBREDDIT)
      .map(this.apiResponse.getModelFromRecord);
  }
}
