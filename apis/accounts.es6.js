import BaseAPI from './base';
import Account from '../models/account';

export default class Accounts extends BaseAPI {
  move = this.notImplemented('move');
  copy = this.notImplemented('copy');
  put = this.notImplemented('put');
  patch = this.notImplemented('patch');
  post = this.notImplemented('post');
  del = this.notImplemented('del');

  path(method, query={}) {
    if (query.user === 'me') {
      return 'api/v1/me';
    } else {
      return `user/${query.user}/about.json`;
    }
  }

  parseBody(res, apiResponse) {
    const { body } = res;

    if (body) {
      apiResponse.addResult(new Account(body.data || body).toJSON());
    }
  }
}
