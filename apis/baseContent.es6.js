import BaseAPI from './base.es6.js';
import NoModelError from '../errors/noModelError';

class BaseContent extends BaseAPI {
  put = this.notImplemented('put');

  formatQuery (query, method) {
    query.feature = 'link_preview';
    query.sr_detail = 'true';

    if (method === 'del') {
      query._method = 'post';
    }

    return query;
  }

  path (method, query={}) {
    if (method === 'get') {
      return this.getPath(query);
    } else if (method === 'post') {
      return this.postPath(query);
    } else if (method === 'patch') {
      return this.patchPath(query);
    } else if (method === 'del') {
      return this.deletePath(query);
    }
  }

  patchPath () {
    return 'api/editusertext';
  }

  deletePath () {
    return 'api/del';
  }

  patch (data) {
    if (!data) {
      throw new NoModelError('/api/editusertext');
    }

    const type = BaseAPI.thingType(data.id);
    // api only supports updating selftext
    const prop = type === 'links' ? 'selftext' : 'body';
    data[prop] = data.changeSet;

    const json = {
      api_type: 'json',
      text: data.selftext | data.body,
      thing_id: data.id,
    };

    this.save('patch', json);
  }
}

export default BaseContent;
