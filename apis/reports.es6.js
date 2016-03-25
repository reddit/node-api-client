import BaseAPI from './base.es6.js';
import Report from '../models/report.es6.js';

export default class Reports extends BaseAPI {
  static dataCacheConfig = null;

  get requestCacheRules() { return null; }

  model = Report;

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

  updateCache(data) {
    const id = data.thing_id;
    const type = BaseAPI.thingType(id);

    const dataCache = this.cache.dataCache[type];
    if (dataCache) {
      const data = dataCache.get(id);
      if (data) {
        dataCache.set(id, { ...data, hidden: true});
      }
    }
  }

  save(method, data={}) {
    this.updateCache(data);
    return super.save(method, data);
  }
}
