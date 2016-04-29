import BaseEndpoint from '../apiBase/BaseEndpoint';
import Report from '../models/report';

export default class ReportsEndpoint extends BaseEndpoint {
  model = Report;

  move = this.notImplemented('move');
  copy = this.notImplemented('copy');
  get = this.notImplemented('get');
  put = this.notImplemented('put');
  patch = this.notImplemented('patch');
  del = this.notImplemented('del');

  path() {
    return 'api/report';
  }

  post(data) {
    return super.post({
      ...data,
      reason: 'other',
      api_type: 'json',
    });
  }
}
