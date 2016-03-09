import BaseAPI from './baseContent.es6.js';
import has from 'lodash/object/has';

import Link from '../models/link.es6.js';
import Comment from '../models/comment.es6.js';

class ModListing extends BaseAPI {
  static dataCacheConfig = undefined;

  get requestCacheRules () {
    return undefined;
  }

  put = this.notImplemented('put');
  patch = this.notImplemented('patch');
  del = this.notImplemented('del');
  post = this.notImplemented('post');

  path(method, query={}) {
    const { subreddit, modPath } = query;
    return `r/${subreddit}/about/${modPath}.json`;
  }

  formatQuery (options) {
    options.sr_detail = 'true';

    return options;
  }

  formatBody(res) {
    const { body } = res;

    if (has(body, 'data.children.0')) {
      return body.data.children.map(c => {
        if (c.kind == 't3') {
          return new Link(c.data).toJSON();
        } else if (c.kind === 't1') {
          return new Comment(c.data).toJSON();
        }
      });
    }
  }
}

export default ModListing;
