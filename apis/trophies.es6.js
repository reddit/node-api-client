import BaseAPI from './base';

import Trophy from '../models/trophy';

class Trophies extends BaseAPI {
  static dataCacheConfig = null;

  get requestCacheRules () {
    return null;
  }

  move = this.notImplemented('move');
  copy = this.notImplemented('copy');
  put = this.notImplemented('put');
  patch = this.notImplemented('patch');
  post = this.notImplemented('post');
  del = this.notImplemented('del');

  path (method, query={}) {
    return `api/v1/user/${query.user}/trophies.json`;
  }

  formatBody (res) {
    const { body } = res;

    if (body) {
      return new Trophy(body.data).toJSON();
    }
  }
}

export default Trophies;
