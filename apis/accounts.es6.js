import { runQuery } from '../apiBase/APIRequestUtils';
import Account from '../models2/Account';

const getPath = (query) => {
  if (query.loggedOut) {
    return 'api/me.json';
  } else if (query.user === 'me') {
    return 'api/v1/me';
  }

  return `user/${query.user}/about.json`;
};

const parseGetBody = (res, apiResponse) => {
  const { body } = res;
  if (body) {
    const data = {
      name: 'me', // me is reserved, this should only stay me in the logged out case
      ...(body.data || body),
    };

    apiResponse.addResult(Account.fromJSON(data));
  }
};

export default {
  get(apiOptions, query) {
    const path = getPath(query);

    return runQuery(apiOptions, 'get', path, {}, query, parseGetBody);
  },
};
