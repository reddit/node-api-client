import BaseAPI from './base.es6.js';

import Preferences from '../models/preferences.es6.js';

class Accounts extends BaseAPI {
  static dataCacheConfig = {
    max: 1,
    maxAge: 1000 * 60 * 30,
  };

  get requestCacheRules() {
    return {
      ...super.requestCacheRules,
      ...{
        max: 1,
        maxAge: 1000 * 60 * 30,
      },
    };
  }

  move = this.notImplemented('move');
  copy = this.notImplemented('copy');
  put = this.notImplemented('put');
  post = this.notImplemented('post');
  del = this.notImplemented('del');

  path() {
    return 'api/v1/me/prefs';
  }

  patch(data) {
    data._type = 'json';
    return super.patch(data);
  }

  formatData(data) {
    delete data._type;
    delete data._method;
    return JSON.stringify(data);
  }

  formatBody(res) {
    const { body } = res;

    if (body && typeof body === 'object') {
      return new Preferences(body).toJSON();
    }
  }
}

export default Accounts;
