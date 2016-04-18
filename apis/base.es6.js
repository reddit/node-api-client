import superagent from 'superagent';

import ValidationError from '../errors/validationError';
import NoModelError from '../errors/noModelError';
import NotImplementedError from '../errors/notImplementedError';

const EVENTS = {
  request: 'request',
  response: 'response',
  error: 'error',
};

const TYPES = {
  't1': 'comments',
  't2': 'users',
  't3': 'links',
  't4': 'messages',
  't5': 'subreddits',
  't6': 'trophies',
  't8': 'promocampaigns',
};

class BaseAPI {
  constructor(base) {
    this.config = base.config;
    this.cache = base.cache;
    this.event = base.event;
  }

  // Used to format/unformat for caching; `links` or `comments`, for example.
  // Should match the constructor name.
  get dataType () {
    return this.constructor.name.toLowerCase();
  }

  get api () {
    return this.constructor.name.toLowerCase();
  }

  get requestCacheRules () {
    let api = this;

    return {
      name: api.api,
      cache: {
        max: 10,
        maxAge: 1000 * 60 * 5,
      },
      format: api.formatCacheData,
      unformat: api.unformatCacheData,
      rules: [
        api.clientCacheRule,
      ],
    };
  }

  path (method, query={}) {
    let basePath = this.api;

    if (['string', 'number'].contains(typeof query.id)) {
      basePath += `/${query.id}`;
    }

    return basePath;
  }

  fullPath (method, query={}) {
    return `${this.config.origin}/${this.path(method, query)}`;
  }

  formatMeta(res) {
    return res.headers;
  }

  formatBody(res) {
    return res.body;
  }

  buildQueryParams(method, data) {
    return [
      data,
      method,
      data,
    ];
  }

  buildAuthHeader () {
    let token = this.config.token;

    if (token) {
      return { Authorization: `Bearer ${token}` };
    }

    return {};
  }

  buildHeaders () {
    return this.config.defaultHeaders || {};
  }

  formatQuery (query) {
    return query;
  }

  formatData (data) {
    return data;
  }

  runQuery = (method, query) => {
    const originalMethod = method;
    query = this.formatQuery(query, method);

    let handle = this.handle;
    let path = this.fullPath(method, query);

    const fakeReq = { url: path, method, query };
    this.event.emit(EVENTS.request, fakeReq);

    method = query._method || method;
    delete query._method;

    return new Promise((resolve, reject) => {
      let s = superagent[method](path).timeout(this.config.timeout || 5000);

      if (s.redirects) {
        s.redirects(0);
      }

      s.query(query);

      s.set(this.buildAuthHeader());
      s.set(this.buildHeaders());

      if (query.id && !Array.isArray(query.id)) {
        delete query.id;
      }

      s.end((err, res) => {
        if (err && err.timeout) {
          err.status = 504;
        }

        const origin = this.config.origin;
        const path = this.path(method, query);

        const fakeReq = { origin, path, method, query };
        const req = res ? res.request : fakeReq;

        handle(resolve, reject)(err, res, req, originalMethod);
      });
    });
  }

  rawSend(method, path, data, cb) {
    const origin = this.config.origin;

    let s = superagent[method](`${origin}/${path}`);
    s.type('form');

    if (this.config.token) {
      s.set('Authorization', 'bearer ' + this.config.token);
    }

    s.send(data).end((err, res) => {
      const fakeReq = {
        origin,
        path,
        method,
        query: data,
      };

      const req = res ? res.request : fakeReq;
      cb(err, res, req);
    });
  }

  save (method, data={}) {
    return new Promise((resolve, reject) => {
      if (!data) {
        return reject(new NoModelError(this.api));
      }

      data = this.formatQuery(data, method);

      if (this.model) {
        let model = new this.model(data);

        let keys;

        // Only validate keys being sent in, if this is a patch
        if (method === 'patch') {
          keys = Object.keys(data);
        }

        const valid = model.validate(keys);

        if (valid !== true) {
          return reject(new ValidationError(this.api, model));
        }

        if (method !== 'patch') {
          data = model.toJSON();
        }
      }

      const path = this.path(method, data);
      const _method = method;

      method = data._method || method;

      data = this.formatData(data, _method);

      this.rawSend(method, path, data, (err, res, req) => {
        if (!err && res) {
          if (this.cache.dataCache[this.dataType] && this.cache.requestCache.get(this.api)) {
            this.cache.resetRequests(this.api);
            this.cache.resetData(this.dataType, res.body);
          }
        }

        this.handle(resolve, reject)(err, res, req, method);
      });
    });
  }

  head (query={}) {
    const headCache = this.cache.head(this.api, this.buildQueryParams('get', query));

    if (headCache) {
      return Promise.resolve(headCache);
    }

    return this.runQuery('head', query);
  }

  get (query) {
    query = {
      raw_json: 1,
      ...(query || {}),
    };

    if (query.id) {
      return this.cache.getById(
        this.fullPath('get', query),
        query.id,
        this.runQuery,
        ['get', query],
        this.requestCacheRules
      );
    }

    return this.cache.get(
      this.runQuery,
      ['get', query],
      this.requestCacheRules
    );
  }

  del (query={}) {
    if (this.cache.dataCache[this.dataType]) {
      if (query.id) {
        this.cache.deleteData(this.dataType, query.id);
      } else {
        this.cache.resetData(this.dataType);
      }

      this.cache.resetRequests(this.api);
    }

    return this.runQuery('del', query);
  }

  post (data) {
    return this.save('post', data);
  }

  put (data) {
    return this.save('put', data);
  }

  patch (data) {
    return this.save('patch', data);
  }

  // Get the source, then save it, modified by data.
  copy (fromId, data) {
    return new Promise((resolve, reject) => {
      this.get(fromId).then(oldData => {
        this.save('copy', {
          ...oldData,
          _method: data.id ? 'put' : 'post',
          ...data,
        }).then(resolve, reject);
      });
    });
  }

  // Get the old one, save the new one, then delete the old one if save succeeded
  move (fromId, toId, data) {
    return new Promise((resolve, reject) => {
      this.get(fromId).then(oldData => {
        this.save('move', {
          _method: 'put',
          ...oldData,
          id: toId,
          ...data,
        }).then(data => {
          this.del({ id: fromId }).then(() => { resolve(data); }, reject);
        }, reject);
      });
    });
  }

  notImplemented (method) {
    return function() {
      throw new NotImplementedError(method, this.api);
    };
  }

  handle = (resolve, reject) => {
    return (err, res, req, method) => {
      // lol handle the twelve ways superagent sends request back
      if (res && !req) {
        req = res.request || res.req;
      }

      if (err || (res && !res.ok)) {
        //this.event.emit(EVENTS.error, err, req);

        if (this.config.defaultErrorHandler) {
          return this.config.defaultErrorHandler(err || 500);
        } else {
          return reject(err || 500);
        }
      }

      this.event.emit(EVENTS.response, req, res);

      let headers;
      let body;

      try {
        headers = this.formatMeta(res, req, method);
        body = this.formatBody(res, req, method);
      } catch (e) {
        return reject(e);
      }

      resolve({ headers, body });
    };
  }

  formatCacheData = (data) => {
    let api = this.dataType;

    return {
      [api]: data,
    };
  }

  unformatCacheData = (data) => {
    return data[this.dataType];
  }

  clientCacheRule = (/*options*/) => {
    return this.config.env === 'CLIENT';
  };

  static thingType (id) {
    return TYPES[id.substring(0, 2)];
  }

  static EVENTS = EVENTS;
}

export default BaseAPI;
