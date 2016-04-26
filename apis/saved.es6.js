import BaseAPI from './base.es6.js';
import Save from '../models/save.es6.js';

import { has } from 'lodash/object';

import Comment from '../models/comment.es6.js';
import Link from '../models/link.es6.js';

const CONSTRUCTORS = {
  t1: Comment,
  t3: Link,
};

export default class Saved extends BaseAPI {
  model = Save;

  move = this.notImplemented('move');
  copy = this.notImplemented('copy');
  put = this.notImplemented('put');
  patch = this.notImplemented('patch');

  path(method, query={}) {
    switch (method) {
      case 'get':
        return `user/${query.user}/saved.json`;
      case 'post' :
        return 'api/save';
      case 'del':
        return 'api/unsave';
    }
  }

  formatQuery(query) {
    delete query.user;
    return query;
  }

  post(data) {
    const postData = {
      id: data.id,
      category: data.category,
    };

    return super.post(postData);
  }

  del(data) {
    const postData = {
      id: data.id,
      category: data.category,
      _method: 'post',
    };

    return super.del(postData);
  }

  parseBody(res, apiResponse) {
    const { body } = res;
    if (!has(body, 'data.children')) {
      return [];
    }

    const things = body.data.children;

    things.forEach(function(t) {
      const constructor = CONSTRUCTORS[t.kind];
      apiResponse.addResult(new constructor(t.data).toJSON());
    });
  }
}
