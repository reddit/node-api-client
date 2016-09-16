import BaseEndpoint from '../apiBase/BaseEndpoint';

import Trophy from '../models/trophy';

export default class TrophiesEndpoint extends BaseEndpoint {
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
