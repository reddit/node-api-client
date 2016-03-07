import BaseAPI from './base.es6.js';
import has from 'lodash/object/has';

class Captcha extends BaseAPI {
  static dataCacheConfig = null;

  get requestCacheRules() {
    return null;
  }

  put = this.notImplemented('put');
  patch = this.notImplemented('patch');
  del = this.notImplemented('del');

  path(method, query={}) {
    return `api/${method === 'post' ? 'new_captcha' : 'needs_captcha'}`;
  }

  formatBody(res) {
    const { body } = res;

    if (has(body, 'json.errors.0')) {
      return body.json.errors;
    } else if (has(body, 'json.data.iden')) {
      return body.json.data;
    }

    return body;
  }
}

export default Captcha;
