import BaseEndpoint from '../apiBase/BaseEndpoint';
import Save from '../models/save';

import PostModel from '../models2/PostModel';
import Subreddit from '../models2/Subreddit';
import { POST_TYPE } from '../models2/thingTypes';

export default class SearchEndpoint extends BaseEndpoint {
  model = Save;

  move = this.notImplemented('move');
  copy = this.notImplemented('copy');
  put = this.notImplemented('put');
  patch = this.notImplemented('patch');
  post = this.notImplemented('post');
  del = this.notImplemented('del');

  path (method, query={}) {
    let path = '';

    if (query.subreddit) {
      path = `r/${query.subreddit}`;
    }

    return `${path}/search.json`;
  }

  formatQuery (query) {
    if (query.subreddit) {
      query.restrict_sr = 'on';
      delete query.subreddit;
    }

    return query;
  }

  listsFromResponse(res) {
    const { body } = res;
    if (!body) { return []; }

    // If only one type is returned body will be an object;
    return Array.isArray(body) ? body : [body];
  }

  parseBody(res, apiResponse) {
    const lists = this.listsFromResponse(res);

    lists.forEach((listing) => {
      if (listing.data.children.length) {
        if (listing.data.children[0].kind === POST_TYPE) {
          listing.data.children.forEach((link) => {
            apiResponse.addResult(PostModel.fromJSON(link.data));
          });

          apiResponse.meta.after = listing.data.after;
          apiResponse.meta.before = listing.data.before;
        } else {
          listing.data.children.forEach((subreddit) => {
            apiResponse.addResult(new Subreddit(subreddit.data).toJSON());
          });
        }
      }
    });
  }
}
