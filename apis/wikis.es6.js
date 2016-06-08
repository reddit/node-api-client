import { runQuery } from '../apiBase/APIRequestUtils';
import Wiki from '../models2/Wiki';

const getPath = (query) => {
  const { subredditName, path } = query;
  if (subredditName) {
    return `r/${subredditName}/wiki/${path}.json`;
  } else {
    return `wiki/${path}.json`;
  }
};

const parseGetBody = (res, apiResponse, apiRequest) => {
  const { body } = res;
  if (body) {
    const data = {
      path: apiRequest.url.split(apiRequest.host + '/')[1],
      ...(body.data || body),
    };
    
    apiResponse.addResult(Wiki.fromJSON(data));
  }
};

export default {
  get(apiOptions, query) {
    const path = getPath(query);

    return runQuery(apiOptions, 'get', path, {}, query, parseGetBody);
  },
};
