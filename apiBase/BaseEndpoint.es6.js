import superagent from 'superagent';

import ValidationError from './errors/ValidationError';
import NoModelError from './errors/NoModelError';
import NotImplementedError from './errors/NotImplementedError';
import APIResponse from './APIResponse';

import Events from './Events';

const EventEmitterShim = {
  emit: () => {},
  on: () => {},
  off: () => {},
};

const getEmitter = (apiOptions) => {
  return (apiOptions.eventEmiiter || EventEmitterShim);
};

export default class StaticAPIBase {
  static Events = Events;

  static api = '<base>';

  static basePath() {
    return '/';
  }

  static appParameter(apiOptions) {
    return `${apiOptions.appName}-${apiOptions.env}`;
  }

  static path(method, query={}) {
    let basePath = this.basePath();

    if (['string', 'number'].contains(typeof query.id)) {
      basePath += `/${query.id}`;
    }

    return basePath;
  }

  static fullPath(apiOptions, method, query={}) {
    return `${apiOptions.origin}/${this.path(method, query)}`;
  }

  static formatMeta(res) {
    return res.headers;
  }

  static buildAuthHeader(apiOptions) {
    let token = apiOptions.token;

    if (token) {
      return { Authorization: `Bearer ${token}` };
    }

    return {};
  }

  static buildHeaders(apiOptions) {
    return apiOptions.defaultHeaders || {};
  }

  static formatQuery(query) {
    return query;
  }

  static parseBody(res, apiResponse/*, req, method*/) {
    apiResponse.addResult(res.body);
    return;
  }

  static formatData(data) {
    return data;
  }

  static runQuery = (apiOptions, method, rawQuery) => {
    const originalMethod = method;
    const query = this.formatQuery({ ...rawQuery}, method);
    query.app = this.appParameter;

    let handle = this.handle;
    let path = this.fullPath(apiOptions, method, { ...rawQuery});

    const fakeReq = { url: path, method, query };
    getEmitter(apiOptions).emit(Events.request, fakeReq);

    method = query._method || method;
    delete query._method;

    return new Promise((resolve, reject) => {
      let s = superagent[method](path).timeout(apiOptions.timeout || 5000);

      if (s.redirects) {
        s.redirects(0);
      }

      s.query(query);

      s.set(this.buildAuthHeader(apiOptions));
      s.set(this.buildHeaders(apiOptions));

      if (query.id && !Array.isArray(query.id)) {
        delete query.id;
      }

      s.end((err, res) => {
        if (err && err.timeout) {
          err.status = 504;
        }

        const origin = apiOptions.origin;
        const path = this.path(method, rawQuery);

        const fakeReq = { origin, path, method, query };
        const req = res ? res.request : fakeReq;

        handle(resolve, reject)(err, res, req, rawQuery, originalMethod);
      });
    });
  }

  static rawSend(apiOptions, method, path, data, cb) {
    const origin = apiOptions.origin;

    let s = superagent[method](`${origin}/${path}`);
    s.type('form');

    if (apiOptions.token) {
      s.set('Authorization', 'bearer ' + apiOptions.token);
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

  static save = (method, data={}) => {
    return new Promise((resolve, reject) => {
      if (!data) {
        return reject(new NoModelError(this.api));
      }

      data = this.formatQuery(data, method);
      data.app = this.appParameter;

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
        this.handle(resolve, reject)(err, res, req, data, method);
      });
    });
  }

  static head = (apiOptions, query={}) => {
    return this.runQuery(apiOptions, 'head', query);
  }

  static get = (apiOptions, query) => {
    query = {
      raw_json: 1,
      ...(query || {}),
    };

    return this.runQuery(apiOptions, 'get', query);
  }

  static del = (apiOptions, query={}) => {
    return this.runQuery(apiOptions, 'del', query);
  }

  static post = (apiOptions, data) => {
    return this.save(apiOptions, 'post', data);
  }

  static put = (apiOptions, data) => {
    return this.save(apiOptions, 'put', data);
  }

  static patch = (apiOptions, data) => {
    return this.save(apiOptions, 'patch', data);
  }

  // Get the source, then save it, modified by data.
  static copy = (apiOptions, fromId, data) => {
    return new Promise((resolve, reject) => {
      this.get(apiOptions, fromId).then(oldData => {
        this.save(apiOptions, 'copy', {
          ...oldData,
          _method: data.id ? 'put' : 'post',
          ...data,
        }).then(resolve, reject);
      });
    });
  }

  // Get the old one, save the new one, then delete the old one if save succeeded
  static move = (apiOptions, fromId, toId, data) => {
    return new Promise((resolve, reject) => {
      this.get(apiOptions, fromId).then(oldData => {
        this.save(apiOptions, 'move', {
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

  static notImplemented = (method) => {
    return () => {
      throw new NotImplementedError(method, this.api);
    };
  }

  static handle = (apiOptions, resolve, reject, err, res, req, query, method) => {
    // lol handle the twelve ways superagent sends request back
    if (res && !req) {
      req = res.request || res.req;
    }

    if (err || (res && !res.ok)) {
      getEmitter(apiOptions).emit(Events.error, err, req);

      if (apiOptions.defaultErrorHandler) {
        return apiOptions.defaultErrorHandler(err || 500);
      } else {
        return reject(err || 500);
      }
    }

    getEmitter(apiOptions).emit(Events.response, req, res);

    let meta;
    let body;
    let apiResponse;

    try {
      meta = this.formatMeta(res, req, method);
      const start = Date.now();
      apiResponse = new APIResponse(meta, query);
      try {
        this.parseBody(res, apiResponse, req, method);
        this.parseTime = Date.now() - start;
      } catch (e) {
        getEmitter(apiOptions).emit(Events.error, e, req);
        console.trace(e);
      }

      if (this.formatBody) { // shim for older apis or ones were we haven't figured out normalization yet
        body = this.formatBody(res, req, method);
      }
    } catch (e) {
      if (process.env.DEBUG_API_CLIENT_BASE) {
        console.trace(e);
      }

      return reject(e);
    }

    getEmitter(apiOptions).emit(Events.result, body || apiResponse);

    resolve(body || apiResponse);
  }
}
