import BaseAPI from './base';
import Save from '../models/save';

import Link from '../models/link';
import Subreddit from '../models/subreddit';

const LINK_TYPE = 't3';

export default class Search extends BaseAPI {
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

  formatBody (res) {
    const lists = this.listsFromResponse(res);

    const meta = {};
    let links = [];
    let subreddits = [];

    lists.forEach((listing) => {
      if (listing.data.children.length) {
        if (listing.data.children[0].kind === LINK_TYPE) {
          links = listing.data.children.map((link) => {
            return new Link(link.data).toJSON();
          });

          meta.after = listing.data.after;
          meta.before = listing.data.before;
        } else {
          subreddits = listing.data.children.map((subreddit) => {
            return new Subreddit(subreddit.data).toJSON();
          });
        }
      }
    });

    return {
      meta,
      links,
      subreddits,
    };
  }
}
