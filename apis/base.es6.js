import superagent from 'superagent';

import ValidationError from '../errors/validationError';
import NoModelError from '../errors/NoModelError';
import NotImplementedError from '../errors/NotImplementedError';

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

    if (base.config) {
      this.origin = base.config.origin;

      if (base.config.origins) {
        let name = this.constructor.name.toLowerCase();

        this.origin = base.config.origins[name] ||
                      base.origin;
      }
    }
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

  runQuery = (method, query) => {
    method = query._method || method;
    delete query._method;

    let handle = this.handle;
    let path = this.fullPath(method, query);

    const fakeReq = { url: path, method, query };
    this.event.emit(EVENTS.request, fakeReq);

    query = this.formatQuery(query);

    return new Promise((resolve, reject) => {
      let s = superagent[method](path).timeout(this.config.timeout || 5000);
      s.redirects(0);
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

        handle(resolve, reject)(err, res, req);
      });
    });
  }

  save (method, data={}) {
    return new Promise((resolve, reject) => {
      if (!data) {
        return reject(new NoModelError(this.api));
      }

      let model;

      if (this.model) {
        model = new this.model(data);
        const valid = model.validate();

        if (!valid) {
          return reject(new ValidationError(this.api, model));
        }
      } else {
        model = data;
      }

      method = data._method || method;

      const path = this.fullPath(method, model);
      const origin = this.origin;

      let s = superagent[method](path);
      s.type('form');

      if (this.config.token) {
        s.set('Authorization', 'bearer ' + this.config.token);
      }

      s.send(model.toJSON()).end((err, res) => {
        const fakeReq = {
          origin,
          path,
          method,
          query: model,
        };

        const req = res ? res.request : fakeReq;

        this.handle(resolve, reject)(err, res, req);

        if (!err && res) {
          if (this.cache.dataCache[this.dataType]) {
            this.cache.resetRequests(this.api);
            this.cache.resetData(this.dataType, res.body);
          }
        }
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
      ...(query || {})
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
      this.cache.deleteData(this.dataType);
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

  notImplemented (method) {
    return function() {
      throw new NotImplementedError(method, this.api);
    }
  }

  handle = (resolve, reject) => {
    return (err, res, req=res.request) => {
      if (err || !res.ok) {
        this.event.emit(EVENTS.error, err, req);
        if (this.config.defaultErrorHandler) {
          return this.config.defaultErrorHandler(err || 500);
        } else {
          return reject(err || 500);
        }
      }

      this.event.emit(EVENTS.response, req, res);

      const response = {
        headers: this.formatMeta(res),
        body: this.formatBody(res),
      };

      resolve(response);
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
    return TYPES[id];
  }

  static EVENTS = EVENTS;
}

export default BaseAPI;
