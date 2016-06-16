import { runQuery } from '../apiBase/APIRequestUtils';
import Wiki from '../models2/Wiki';

const getPath = (query) => {
  const { subredditName } = query;
  let { path } = query;

  // Default to the index
  if (!path) {
    path = 'index';
  }
  // Strip trailing slash from the path
  if (path[path.length-1] === '/') {
    path = path.slice(0, -1);
  }

  if (subredditName) {
    return `r/${subredditName}/wiki/${path}`;
  } else {
    return `wiki/${path}`;
  }
};

const parseGetBody = path => (res, apiResponse) => {
  const { body } = res;
  if (body) {
    const data = {
      path,
      ...(body.data || body),
    };

    apiResponse.addResult(Wiki.fromJSON(data));
  }
};

export default {
  get(apiOptions, query) {
    const path = getPath(query);
    const url = `${path}.json`;

    return runQuery(apiOptions, 'get', url, {}, query, parseGetBody(path));
  },
};
