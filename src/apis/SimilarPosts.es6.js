import { isEmpty } from 'lodash/lang';

import apiRequest from '../apiBase/apiRequest';
import PostModel from '../models2/PostModel';

const parseBody = (apiResponse) => {
  const { body } = apiResponse.response;

  if (body.data && Array.isArray(body.data.children)) {
    body.data.children.forEach(c => apiResponse.addResult(PostModel.fromJSON(c.data)));
    // sometimes, we get back empty object and 200 for invalid sorts like
    // `mine` when logged out
  } else if (!isEmpty(body)) {
    apiResponse.addResult(PostModel.fromJSON(body.data || body));
  }

  return apiResponse;
};

const get = (apiOptions, query) => {
  return apiRequest(apiOptions, 'GET', 'api/similar_links.json', { 'query': {...query, raw_json: 1} })
    .then(parseBody);
};

export default { get }
