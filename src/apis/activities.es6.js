import { runQuery } from '../apiBase/APIRequestUtils';

import CommentModel from '../models2/CommentModel';
import PostModel from '../models2/PostModel';

const CONSTRUCTORS = {
  t1: CommentModel,
  t3: PostModel,
};

const getPath = query => (`user/${query.user}/${query.activity}.json`);

const formatQuery = query => ({
  ...query,
  feature: 'link_preview',
  sr_detail: 'true',
});

const parseBody = (res, apiResponse) => {
  const { body } = res;

  if (body) {
    const activities = body.data.children;

    activities.forEach(function(a) {
      const constructor = CONSTRUCTORS[a.kind];
      apiResponse.addResult(constructor.fromJSON(a.data));
    });
  }
};

export default {
  get(apiOptions, query)  {
    const path = getPath(query);
    const formattedQuery = formatQuery(query);

    return runQuery(apiOptions, 'get', path, formattedQuery, query, parseBody);
  },
};
