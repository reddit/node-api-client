import { pick } from 'lodash/object';
import BaseEndpoint from '../apiBase/BaseEndpoint';
import NoModelError from '../apiBase/errors/NoModelError';

const MOD_ACTION_MAP = {
  approved: (t, data) => {
    return [
      t ? 'api/approve' : 'api/remove',
      pick(data, ['id', 'spam']),
    ];
  },
  removed: (t, data) => {
    return [
      t ? 'api/remove' : 'api/approve',
      pick(data, ['id', 'spam']),
    ];
  },
  distinguished: (_, data) => {
    return [
      'api/distinguish',
      {
        id: data.id,
        how: data.distinguished,
      },
    ];
  },
  ignoreReports: (_, data) => {
    return [
      'api/ignore_reports',
      {
        id: data.id,
        spam: data.isSpam,
      },
    ];
  },
};

export const formatBaseContentQuery = (query, method) => {
  if (method !== 'patch') {
    query.feature = 'link_preview';
    query.sr_detail = 'true';
  }

  if (method === 'del') {
    query._method = 'post';
  }

  return query;
};

export default class BaseContentEndpoint extends BaseEndpoint {
  static move = BaseEndpoint.notImplemented('move');
  static copy = BaseEndpoint.notImplemented('copy');
  static put = BaseEndpoint.notImplemented('put');

  static formatQuery(query, method) {
    if (method !== 'patch') {
      query.feature = 'link_preview';
      query.sr_detail = 'true';
    }

    if (method === 'del') {
      query._method = 'post';
    }

    return query;
  }

  static path(method, query={}) {
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

  static patchPath () {
    return 'api/editusertext';
  }

  static deletePath () {
    return 'api/del';
  }

  static patch = (apiOptions, data) => {
    if (!data) {
      throw new NoModelError('/api/editusertext');
    }

    const promises = [];

    Object.keys(data).map(k => {
      const prop = MOD_ACTION_MAP[k];
      const val = data[k];

      if (prop) {
        const [api, json] = prop(val, data);
        promises.push(new Promise((r, x) => {
          this.rawSend('post', api, json, (err, res, req) => {
            if (err || !res.ok) {
              x(err || res);
            }

            r(res, req);
          });
        }));
      }
    });

    if (data.text) {
      const json = {
        api_type: 'json',
        thing_id: data.id,
        text: data.text,
        _method: 'post',
      };

      promises.push(this.save('patch', json));
    }

    return Promise.all(promises);
  }
}
