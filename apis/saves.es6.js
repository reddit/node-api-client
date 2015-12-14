import BaseAPI from './base.es6.js';
import Save from '../models/save.es6.js';

import Comment from '../models/comment.es6.js';
import Link from '../models/comment.es6.js';

class Saves extends BaseAPI {
  static dataCacheConfig = null;

  get requestCacheRules () { return null; }

  model = Saves;

  put = this.notImplemented('put');
  patch = this.notImplemented('patch');

  path (method, query={}) {
    switch (method) {
      case 'get':
        return `user/${query.user}/saved.json`;
        break;
      case 'post' :
        return 'api/save';
        break;
      case 'delete':
        return 'api/unsave';
        break;
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

  save (method, data={}) {
    // Save, then update the data in the cache (since `saved` model changes also
    // update `link` or `comment` models)
    super.save(method, data);
    const saved = method === 'post' ? true : false;

    const type = Base.thingType(data.id);

    this.cache.resetData(type, data.id, {
      ...this.dataCache[type].get(data.id),
      saved
    });
  }

  formatBody (res) {
    const { body, headers } = res;
    const things = body.data;

    return things.map(function(t) {
      switch (t.kind) {
        case 't1':
          return ((new Comment(t.data)).toJSON());
          break;
        case 't3':
          return ((new Link(t.data)).toJSON());
          break;
      }
    });
  }
}

export default Saves;
