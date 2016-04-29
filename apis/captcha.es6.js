import BaseEndpoint from '../apiBase/BaseEndpoint';
import { has } from 'lodash/object';

export default class CaptchaEndpoint extends BaseEndpoint {
  move = this.notImplemented('move');
  copy = this.notImplemented('copy');
  put = this.notImplemented('put');
  patch = this.notImplemented('patch');
  del = this.notImplemented('del');

  path(method) {
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
