import BaseAPI from './base.es6.js';
import Save from '../models/save.es6.js';

import has from 'lodash/object/has';

import Comment from '../models/comment.es6.js';
import Link from '../models/link.es6.js';

const CONSTRUCTORS = {
  t1: Comment,
  t3: Link,
};

export default class Saved extends BaseAPI {
  static dataCacheConfig = null;

  get requestCacheRules () { return null; }

  model = Save;

  put = this.notImplemented('put');
  patch = this.notImplemented('patch');

  path (method, query={}) {
    switch (method) {
      case 'get':
        return `user/${query.user}/saved.json`;
      case 'post' :
        return 'api/save';
      case 'del':
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

  updateCache (method, data) {
    const saved = method === 'post' ? true : false;

    const type = BaseAPI.thingType(data.id);

    const dataCache = this.cache.dataCache[type];
    if (!dataCache) {
      return;
    }

    const thing = dataCache.get(data.id);
    if (!thing) {
      return;
    }

    const updatedThing = {
      ...thing,
      saved,
    };

    this.cache.resetData(type, updatedThing);
  }

  save (method, data={}) {
    this.updateCache(method, data);
    return super.save(method, data);
  }

  formatBody (res) {
    const { body } = res;
    if (!has(body, 'data.children')) {
      return [];
    }

    const things = body.data.children;

    return things.map(function(t) {
      const constructor = CONSTRUCTORS[t.kind];
      return new constructor(t.data).toJSON();
    });
  }
}
