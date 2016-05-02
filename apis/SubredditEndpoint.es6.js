import { runQuery, validateData } from '../apiBase/APIRequestUtils';

import { pick } from 'lodash/object';
import { isEmpty } from 'lodash/lang';

import Subreddit from '../models2/Subreddit';

const DEFAULT_SUBREDDIT_OPTIONS = {
  allow_top: true,
  collapse_deleted_comments: false,
  comment_score_hide_mins: 0,
  description: '',
  exclude_banned_modqueue: false,
  'header-title': '',
  hide_ads: false,
  lang: 'en',
  link_type: 'any',
  name: '',
  over_18: false,
  public_description: '',
  public_traffic: false,
  show_media: true,
  spam_comments: 'low',
  spam_links: 'high',
  spam_selfposts: 'high',
  sr: '',
  submit_link_label: '',
  submit_text: '',
  submit_text_label: '',
  suggested_comment_sort: 'confidence',
  title: '',
  type: 'public',
  wiki_edit_age: 0,
  wiki_edit_karma: 100,
  wikimode: 'disabled',
};

const requestPath = 'api/site_admin';

const getPath = (query) => {
  if (query.id && query.view === 'mod') {
    return `r/${query.id}/about/edit.json`;
  }

  if (query.id) {
    return `r/${query.id}/about.json`;
  }

  return `subreddits/${query.sort || 'default'}.json`;
};

const formatQuery = (query, method) => {
  if (method !== 'get') {
    query.api_type = 'json';
  }

  return query;
};

const parseBody = (res, apiResponse) => {
  const { body } = res;

  if (body.data && Array.isArray(body.data.children)) {
    body.data.children.forEach(c => apiResponse.addResult(Subreddit.fromJSON(c.data)));
    // sometimes, we get back empty object and 200 for invalid sorts like
    // `mine` when logged out
  } else if (!isEmpty(body)) {
    apiResponse.addResult(Subreddit.fromJSON(body.data || body));
  }
};

const get = (apiOptions, query) => {
  const path = getPath(query);
  const apiQuery = formatQuery({ ...query });

  return runQuery(apiOptions, 'get', path, apiQuery, query, parseBody);
};

const patch = (apiOptions, data) => {
  // If the data doesn't have all of the keys, get the full subreddit data
  // and then merge in the changes and submit _that_. The API requires the
  // full object be sent.
  if (Object.keys(data).sort() !== Subreddit.fields) {
    return new Promise((resolve, reject) => {
      get(apiOptions, {
        id: data.id,
        view: 'mod',
      }).then(function(apiResponse) {
        if (!apiResponse.results.length === 1) { reject(); }
        const sub = apiResponse.getModelFromRecord(apiResponse.results[0]);

        const postData = pick({
          ...DEFAULT_SUBREDDIT_OPTIONS,
          ...sub,
          ...data,
          sr: sub.name,
        }, Object.keys(DEFAULT_SUBREDDIT_OPTIONS));

        return post(apiOptions, postData);
      }, reject);
    });
  }

  return post(apiOptions, data);
};

const post = (apiOptions, data) => {
  const postData = pick({
    ...DEFAULT_SUBREDDIT_OPTIONS,
    ...data,
  }, Object.keys(DEFAULT_SUBREDDIT_OPTIONS));

  return runQuery(apiOptions, 'post', requestPath, postData, data, parseBody);
};

const put = (apiOptions, data) => {
  const modifiedData = { ...data, name: data.id };
  return post(apiOptions, modifiedData);
};

export default {
  get,
  patch,
  post,
  put,
};
