import BaseAPI from './base.es6.js';

import Comment from '../models/comment.es6.js';
import Link from '../models/comment.es6.js';

class Activities extends BaseAPI {
  static dataCacheConfig = null;

  get requestCacheRules () {
    return null;
  }

  put = this.notImplemented('put');
  patch = this.notImplemented('patch');
  post = this.notImplemented('post');
  del = this.notImplemented('del');

  formatQuery (query) {
    query.feature = 'link_preview';
    query.sr_detail = 'true';

    return query;
  }

  path (method, query={}) {
    return `user/${query.user}/${query.activity}.json`;
  }

  formatBody (res) {
    const { body } = res;

    if (body) {
      const activities = body.data.children;

      return activities.map(function(a) {
        switch (a.kind) {
          case 't1':
            return (new Comment(a.data)).toJSON();
            break;
          case 't3':
            return (new Link(a.data)).toJSON();
            break;
        }
      });
    }
  }
}

export default Activities;
