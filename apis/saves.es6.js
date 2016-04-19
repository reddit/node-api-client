import BaseAPI from './base.es6.js';
import Save from '../models/save.es6.js';

import Comment from '../models/comment.es6.js';
import Link from '../models/comment.es6.js';

const CONSTRUCTORS = {
  t1: Comment,
  t3: Link,
};

class Saves extends BaseAPI {
  model = Save;

  move = this.notImplemented('move');
  copy = this.notImplemented('copy');
  put = this.notImplemented('put');
  patch = this.notImplemented('patch');

  path (method, query={}) {
    switch (method) {
      case 'get':
        return `user/${query.user}/saved.json`;
      case 'post' :
        return 'api/save';
      case 'delete':
        return 'api/unsave';
    }
  }

  formatQuery (query) {
    delete query.user;
    return query;
  }

  post (data) {
    const postData = {
      id: data.id,
      category: data.category,
    };

    return super.post(postData);
  }

  del (data) {
    const postData = {
      id: data.id,
      category: data.category,
      _method: 'post',
    };

    return super.del(postData);
  }

  formatBody (res) {
    const { body } = res;
    const things = body.data;

    return things.map(function(t) {
      const constructor = CONSTRUCTORS[t.kind];
      return new constructor(t.data).toJSON();
    });
  }
}

export default Saves;
