import BaseAPI from './base.es6.js';

import Account from '../models/account.es6.js';

class Accounts extends BaseAPI {
  static dataCacheConfig = {
    max: 5,
    maxAge: 1000 * 60 * 30,
  };

  get requestCacheRules () {
    return {
      ...super.requestCacheRules,
      ...{
        max: 10,
        maxAge: 1000 * 60 * 30,
      },
    };
  }

  put = this.notImplemented('put');
  patch = this.notImplemented('patch');
  post = this.notImplemented('post');
  del = this.notImplemented('del');

  path (method, query={}) {
    if (query.user === 'me') {
      return '/api/v1/me';
    } else {
      return `/user/${query.user}/about.json`;
    }
  }

  formatBody (res) {
    const { body } = res;

    if (body) {
      return new Account(body.data || body).toJSON();
    }
  }
}

export default Accounts;
