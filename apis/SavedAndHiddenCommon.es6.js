import { runQuery, validateData } from '../apiBase/APIRequestUtils';

import { has, omit } from 'lodash/object';

import CommentModel from '../models2/CommentModel';
import PostModel from '../models2/PostModel';

const CONSTRUCTORS = {
  t1: CommentModel,
  t3: PostModel,
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

const get = (apiOptions, query, path) => {
  const apiQuery = formatQuery(query);

  return runQuery(apiOptions, 'get', path, apiQuery, query, parseBody);
};

const del = (apiOptions, query, path) => {
  validateData(query, 'del', 'saved', validator);
  const postData = dataFromQuery(query);

  return runQuery(apiOptions, 'post', path, postData, query, parseBody);
};

const post = (apiOptions, query, path) => {
  validator(query, 'post', 'saved', validator);
  const postData = formatQuery(query);

  return runQuery(apiOptions, 'post', path, postData, query, parseBody);
};

export default (getPathFn, delPath, postPath) => {
  return {
    get(apiOptions, query) {
      const path = getPathFn(query);
      return get(apiOptions, query, path);
    },

    del(apiOptions, query) {
      return del(apiOptions, query, delPath);
    },

    post(apiOptions, query) {
      return post(apiOptions, query, postPath)
    },
  };
};
