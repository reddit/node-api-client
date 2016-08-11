import superagent from 'superagent';

import APIResponse from './APIResponse';
import ResponseError from './errors/ResponseError';


/* A thin helper function around our apis.
 *
 * @param {Object} apiOptions - fields required to hit our api
 * @param {String} method   - the http method upper or lowercased, e.g. 'GET'
 * @param {String} path     - the endpoint path
 * @param {Object} options  - use to set query params, a body, or request type
 */
export default (apiOptions, method, path, options={}) => {
  const { query={}, body={}, type=null } = options;
  const { origin, appName, env, token, defaultHeaders={} } = apiOptions;

  const _method = method.toLowerCase();
  const _headers = token
    ? { ...defaultHeaders, Authorization: `Bearer ${token}` }
    : defaultHeaders;
  const _path = path.startsWith('/') ? path : `/${path}`
  const _query = { ...query, app: `${appName}-${env}` };
  const endpoint = origin + _path;

  const request = superagent[_method](endpoint).set(_headers).query(_query);

  if (type) {
    request.type(type);
  }

  if (_method === 'post') {
    request.send(body);
  }

  return new Promise((resolve, reject) => {
    request.end((err, res) => {
      if (!err) {
        resolve(new APIResponse(res));
      } else {
        if (err && err.timeout) {
          err.status = 504;
        }

        reject(new ResponseError(err, _path));
      }
    });
  });
}
