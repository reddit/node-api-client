import { runQuery } from '../apiBase/APIRequestUtils';
import Account from '../models2/account';


const getPath = (query) => {
  if (query.user === 'me') {
    return 'api/v1/me';
  } else {
    return `user/${query.user}/about.json`;
  }
};

const parseGetBody = (res, apiResponse) => {
  const { body } = res;
  if (body) {
    apiResponse.addResult(Account.fromJSON(body.data || body));
  }
};

export default {
  get(apiOptions, query) {
    const path = getPath(query);

    return runQuery(apiOptions, 'get', path, {}, query, parseGetBody);
  },
};
