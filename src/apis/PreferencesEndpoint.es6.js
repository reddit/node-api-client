import { runQuery, runJson } from '../apiBase/APIRequestUtils';

import Preferences from '../models2/Preferences';

const PREFS_URL = '/api/v1/me/prefs';

// We opt-out of using the automatic parsing from `runQuery` and `runJson`,
// because the preferences object doesn't really make sense in the normalized
// response model.

export default {
  get: async (apiOptions) => {
    const responseBody = await runQuery(apiOptions, 'get', PREFS_URL, {}, {});
    return Preferences.fromJSON(responseBody || {});
  },

  patch: async (apiOptions, changes) => {
    const data = {
      ...changes,
      api_type: 'json',
    };

    const responseBody = await runJson(apiOptions, 'patch', PREFS_URL, data);
    return Preferences.fromJSON(responseBody || {});
  },
};
