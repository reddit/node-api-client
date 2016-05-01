import { runQuery, validateData } from '../apiBase/APIRequestUtils';

import { has, omit } from 'lodash/object';

import Comment from '../models2/Comment';
import Link from '../models2/Link';

const CONSTRUCTORS = {
  t1: Comment,
  t3: Link,
};

const parseBody = (res, apiResponse) => {
  const { body } = res;
  if (!has(body, 'data.children')) {
    return;
  }

  const things = body.data.children;

  things.forEach(function(t) {
    apiResponse.addResult(CONSTRUCTORS[t.kind].fromJSON(t.data));
  });
};

const getPath = (query) => {
  return `user/${query.user}/saved.json`;
};

const formatQuery = (query) => {
  return omit(query, 'user');
};

const validator = (data) => {
  return !!data.id;
};

const dataFromQuery = (data) => {
  return {
    id: data.id,
    category: data.category,
  };
};

export default {
  get(apiOptions, query) {
    const path = getPath(query);
    const apiQuery = formatQuery(query);

    return runQuery(apiOptions, 'get', path, apiQuery, query, parseBody);
  },

  del(apiOptions, query) {
    validateData(query, 'del', 'saved', validator);
    const path = 'api/unsave';
    const postData = dataFromQuery(query);

    return runQuery(apiOptions, 'post', path, postData, query, parseBody);
  },

  post(apiOptions, query) {
    validator(query, 'post', 'saved', validator);
    const path = 'api/save';
    const postData = formatQuery(query);

    return runQuery(apiOptions, 'post', path, postData, query, parseBody);
  },
};
