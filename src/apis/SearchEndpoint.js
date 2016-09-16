import { runQuery } from '../apiBase/APIRequestUtils';

import PostModel from '../models2/PostModel';
import Subreddit from '../models2/Subreddit';
import { POST_TYPE } from '../models2/thingTypes';

const getPath = (query) => {
  let path = '';

  if (query.subreddit) {
    path = `r/${query.subreddit}/`;
  }

  return `${path}search.json`;
};

const formatQuery = (query) => {
  if (query.subreddit) {
    query.restrict_sr = 'on';
    delete query.subreddit;
  }

  return query;
};

const listsFromResponse = (res) => {
  const { body } = res;
  if (!body) { return []; }

  // If only one type is returned body will be an object;
  return Array.isArray(body) ? body : [body];
};

const parseBody = (res, apiResponse) => {
  const lists = listsFromResponse(res);
  console.log('lists.length?', lists.length);
  console.log(res.body);

  lists.forEach((listing) => {
    if (listing.data.children.length) {
      if (listing.data.children[0].kind === POST_TYPE) {
        listing.data.children.forEach((link) => {
          apiResponse.addResult(PostModel.fromJSON(link.data));
        });

        apiResponse.meta.after = listing.data.after;
        apiResponse.meta.before = listing.data.before;
      } else {
        listing.data.children.forEach((subreddit) => {
          apiResponse.addResult(Subreddit.fromJSON(subreddit.data));
        });
      }
    }
  });
};

export default {
  get(apiOptions, query) {
    const path = getPath(query);
    const apiQuery = formatQuery({ ...query });

    return runQuery(apiOptions, 'get', path, apiQuery, query, parseBody);
  },
};
