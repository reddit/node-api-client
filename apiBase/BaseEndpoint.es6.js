import superagent from 'superagent';
import ValidationError from './errors/validationError';
import NoModelError from './errors/noModelError';
import NotImplementedError from './errors/notImplementedError';
import APIResponse from './APIResponse';

const EVENTS = {
  request: 'request',
  response: 'response',
  error: 'error',
  result: 'result',
};

export default class BaseAPI {
  constructor(base) {
    this.config = base.config;
    this.event = base.event;

    if (base.config) {
      this.origin = base.config.origin;

      if (base.config.origins) {
        let name = this.constructor.name.toLowerCase();

        this.origin = base.config.origins[name] ||
                      this.config.origin;
      }
    }

    ['path', 'head', 'get', 'post', 'patch', 'put', 'del', 'move', 'copy'].forEach(method => {
      this[method] = this[method].bind(this);
    });
  }

  // Used to format/unformat for caching; `links` or `comments`, for example.
  // Should match the constructor name.
  get dataType () {
    return this.constructor.name.toLowerCase();
  }

  get api () {
    return this.constructor.name.toLowerCase();
  }

  path (method, query={}) {
    let basePath = this.api;

    if (['string', 'number'].contains(typeof query.id)) {
      basePath += `/${query.id}`;
    }

    return basePath;
  }

  fullPath (method, query={}) {
    return `${this.origin}/${this.path(method, query)}`;
  }

  formatMeta(res) {
    return res.headers;
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

  parseBody(res, apiResponse/*, req, method*/) {
    apiResponse.addResult(res.body);
    return;
  }

  formatData (data) {
    return data;
  }

  runQuery = (method, rawQuery) => {
    const originalMethod = method;
    const query = this.formatQuery({ ...rawQuery}, method);
    query.app = this.appParameter;

    let handle = this.handle;
    let path = this.fullPath(method, { ...rawQuery});

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

        const origin = this.origin;
        const path = this.path(method, rawQuery);

        const fakeReq = { origin, path, method, query };
        const req = res ? res.request : fakeReq;

        handle(resolve, reject)(err, res, req, rawQuery, originalMethod);
      });
    });
  }

  rawSend(method, path, data, cb) {
    const origin = this.origin;

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

  get appParameter() {
    return `${this.config.appName}-${this.config.env}`;
  }

  save (method, data={}) {
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

  head (query={}) {
    return this.runQuery('head', query);
  }

  get (query) {
    query = {
      raw_json: 1,
      ...(query || {}),
    };

    return this.runQuery('get', query);
  }

  del (query={}) {
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
    return (err, res, req, query, method) => {
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
          this.event.emit(EVENTS.error, e, req);
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

      this.event.emit(EVENTS.result, body || apiResponse);

      resolve(body || apiResponse);
    };
  }


  static EVENTS = EVENTS;
}
