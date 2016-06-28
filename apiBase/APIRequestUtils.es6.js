import superagent from 'superagent';

import ValidationError from './errors/ValidationError';
import NoModelError from './errors/NoModelError';
import APIResponse from './APIResponse';

import Events from './Events';

const EventEmitterShim = {
  emit: () => {},
  on: () => {},
  off: () => {},
};

const DefaultOptions = {
  userAgent: 'snoodev3',
  origin: 'https://www.reddit.com',
  appName: 'node-api-client-v3',
  env: 'develop',
  token: '',
  timeout: 5000,
  eventEmitter: EventEmitterShim,
};

export const makeOptions = (overrides={}) => {
  return {
    ...DefaultOptions,
    ...overrides,
  };
};

const getEmitter = (apiOptions) => {
  return (apiOptions.eventEmitter || EventEmitterShim);
};

const requestAuthHeader = (apiOptions) => {
  const token = apiOptions.token;
  if (!token) { return {}; }
  return { Authorization: `Bearer ${token}` };
};

const requestHeaders = (apiOptions) => {
  const authHeaders = requestAuthHeader(apiOptions);
  return {
    ...(apiOptions.defaultHeaders || {}),
    ...authHeaders,
  };
};

const requestPath = (apiOptions, path) => {
  let slash = '/';

  if (path.indexOf('/') === 0) {
    slash = '';
  }

  return `${apiOptions.origin}${slash}${path}`;
};

const appParameter = (apiOptions) => {
  return `${apiOptions.appName}-${apiOptions.env}`;
};

export const rawSend = (apiOptions, method, path, data, kind, cb) => {
  const origin = apiOptions.origin;
  const url = requestPath(apiOptions, path);

  const fakeReq = {
    origin,
    path,
    url,
    method,
    query: { ...data},
  };

  getEmitter(apiOptions).emit(Events.request, fakeReq);
  let s = superagent[method](url);
  s.set(requestHeaders(apiOptions));

  data.app = appParameter(apiOptions);

  if (kind === 'form') {
    s.type('form');
    s.send(data);
  } else {
    s.query(data);

    if (s.redirects) {
      s.redirects(0);
    }
  }

  s.end((err, res) => {
    // handle super agent inconsistencies
    const req = res ? res.request : fakeReq;
    cb(err, res, req);
  });
};

export const validateData = (data, method, apiName, validator) => {
  if (!(data && validator)) { throw new ValidationError(apiName, undefined); }
  if (!validator(data)) { throw new ValidationError(apiName, data); }
};

export const runForm = (apiOptions, method, path, data, parseBody, parseMeta) => {
  if (!(apiOptions && method && path && data)) { throw new NoModelError(); }

  return new Promise((resolve, reject) => {
    rawSend(apiOptions, method, path, data, 'form', (err, res, req) => {
      handle(apiOptions, resolve, reject, err, res, req, data, method, parseBody, parseMeta);
    });
  });
};

export const runQuery = (apiOptions, method, path, query, rawQuery, parseBody, parseMeta) => {
  if (!(apiOptions && method && path && query && rawQuery)) { throw new NoModelError(); }

  if (method === 'get') {
    query.raw_json = 1;
  }

  return new Promise((resolve, reject) => {
    rawSend(apiOptions, method, path, query, 'query', (err, res, req) => {
      handle(apiOptions, resolve, reject, err, res, req, rawQuery, method, parseBody, parseMeta);
    });
  });
};

const normalizeRequest = (res, req) => {
  if (res && !req) {
    return res.request || res.req;
  }

  return req;
};

const handleRequestIfFailed = (apiOptions, err, res, req, reject) => {
  if (!(err || (res && !res.ok))) { return; }

  getEmitter(apiOptions).emit(Events.error, err, req);
  const errorHandler = apiOptions.defaultErrorHandler || reject;
  errorHandler(err || 500);
  return true;
};

const handle = (apiOptions, resolve, reject, err, res, req, query, method,
    parseBody, parseMeta) => {

  req = normalizeRequest(res, req);

  if (handleRequestIfFailed(apiOptions, err, res, req, reject)) {
    return;
  }

  getEmitter(apiOptions).emit(Events.response, req, res);

  const apiResponse = tryParseResponse(reject, res, req, method, query, parseBody, parseMeta);

  getEmitter(apiOptions).emit(Events.result, apiResponse);
  resolve(apiResponse);
};

const tryParseResponse = (reject, res, req, method, query, parseBody, parseMeta) => {
  try {
    return makeApiResponse(res, req, method, query, parseBody, parseMeta);
  } catch (e) {
    console.trace(e);
    reject(e);
  }
};

const makeApiResponse = (res, req, method, query, parseBody, parseMeta) => {
  if (!parseBody) { return res.body; }
  const meta = parseMeta ? parseMeta(res, req, method) : res.headers;
  const apiResponse = new APIResponse(meta, query);
  const start = Date.now();
  parseBody(res, apiResponse, req, method);
  const end = Date.now();
  console.log(`response parsing took ${end - start}`);
  return apiResponse;
};
