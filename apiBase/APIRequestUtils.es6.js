import superagent from 'superagent';

import ValidationError from './errors/ValidationError';
import NoModelError from './errors/NoModelError';
import APIResponse from './APIResponse';

const DefaultOptions = {
  userAgent: 'snoodev3',
  origin: 'https://www.reddit.com',
  appName: 'node-api-client-v3',
  env: 'develop',
  token: '',
  timeout: 5000,
};

export const makeOptions = (overrides={}) => ({ ...DefaultOptions, ...overrides });

const requestHeaders = ({ token, defaultHeaders={} }) => {
  const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};
  return { ...defaultHeaders, ...authHeaders };
};

export const rawSend = (apiOptions, method, path, data, kind) => {
  const { origin, appName, env } = apiOptions;
  const _path = path.startsWith("/") ? path : `/${path}`;
  const url = `${origin}${_path}`;

  let s = superagent[method](url);
  s.set(requestHeaders(apiOptions));

  const _data = { ...data, app: `${appName}-${env}` };

  if (kind === 'form') {
    s.type('form');
    s.send(_data);
  } else {
    s.query(_data);

    if (s.redirects) {
      s.redirects(0);
    }
  }

  return new Promise((resolve, reject) => {
    s.end((err, res) => {
      // handle super agent inconsistencies
      const fakeReq = { origin, path: _path, url, method, query: { ...data} };
      const req = res ? res.request || res.req : fakeReq;

      if (err) {
        reject(err, req);
      } else {
        resolve(res, req);
      }
    });
  });
};

export const validateData = (data, method, apiName, validator) => {
  if (!(data && validator)) { throw new ValidationError(apiName, undefined); }
  if (!validator(method)) { throw new ValidationError(apiName, data); }
};

export const runForm = (apiOptions, method, path, data, parseBody, parseMeta) => {
  if (!(apiOptions && method && path && data)) { throw new NoModelError(); }

  return rawSend(apiOptions, method, path, data, 'form')
    .then((res, req) => makeApiResponse(res, req, method, query, parseBody, parseMeta))
    .catch((err, req) => console.trace(err));
};

export const runQuery = (apiOptions, method, path, query, parseBody, parseMeta) => {
  if (!(apiOptions && method && path && query)) {
    throw new NoModelError();     // TODO: does this error make sense?
  }

  if (method.toLowerCase() === 'get') {
    query.raw_json = 1;
  }

  return rawSend(apiOptions, method, path, query, 'query')
    .then((res, req) => makeApiResponse(res, req, method, query, parseBody, parseMeta))
    .catch((err, req) => console.trace(err));
};

const makeApiResponse = (res, req, method, query, parseBody, parseMeta) => {
  if (!parseBody) {
    return res.body;
  }

  const meta = parseMeta ? parseMeta(res, req, method) : res.headers;
  const apiResponse = new APIResponse(meta, query);
  const start = Date.now();
  parseBody(res, apiResponse, req, method);
  const end = Date.now();
  console.log(`response parsing took ${end - start}`);
  return apiResponse;
};
