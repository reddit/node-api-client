import pick from 'lodash/object/pick';

import BaseAPI from './base';
import Subreddit from '../models/subreddit';

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

class Subreddits extends BaseAPI {
  static dataCacheConfig = {
    max: 1,
    maxAge: 1000 * 60 * 5,
  };

  get requestCacheRules () {
    return {
      ...super.requestCacheRules,
      ...{
        max: 1,
      },
    };
  }

  model = Subreddit;

  del = this.notImplemented('del');

  patch (data) {
    const post = this.post.bind(this);
    const get = this.get.bind(this);
    // If the data doesn't have all of the keys, get the full subreddit data
    // and then merge in the changes and submit _that_. The API requires the
    // full object be sent.
    if (Object.keys(data).sort() !== Subreddit.fields) {
      return new Promise((r, x) => {
        get({
          id: data.id,
          view: 'mod',
        }).then(function(sub) {
          const postData = pick({
            ...DEFAULT_SUBREDDIT_OPTIONS,
            ...sub,
            ...data,
            sr: sub.name,
          }, Object.keys(DEFAULT_SUBREDDIT_OPTIONS));

          console.log(postData);

          return post(postData);
        }, x);
      });
    }

    return super.post(data);
  }

  get (query) {
    delete query.view;
    return super.get(query);
  }

  post (data) {
    const postData = pick({
      ...DEFAULT_SUBREDDIT_OPTIONS,
      ...data,
    }, Object.keys(DEFAULT_SUBREDDIT_OPTIONS));

    return super.post(postData);
  }

  put (data) {
    const postData = pick({
      ...DEFAULT_SUBREDDIT_OPTIONS,
      ...data,
      name: data.id,
    }, Object.keys(DEFAULT_SUBREDDIT_OPTIONS));

    return super.post(postData);
  }

  formatCacheData = (data) => {
    const api = this.api;

    // Set a custom id for easier lookups - using the subreddit name as the id,
    // rather than the base36 id.
    if (data && Array.isArray(data)) {
      return {
        subreddits: data.map(function(s) {
          s.id = s.display_name.toLowerCase();
          return s;
        }),
      };
    } else if (data) {
      data.id = data.display_name.toLowerCase();
    }

    return {
      [api]: data,
    };
  }

  formatQuery (query, method) {
    if (method !== 'get') {
      query.api_type = 'json';
    }

    return query;
  }

  formatBody (res) {
    const { body } = res;

    if (body.data && Array.isArray(body.data.children)) {
      return body.data.children.map(c => new Subreddit(c.data).toJSON());
      // sometimes, we get back empty object and 200 for invalid sorts like
      // `mine` when logged out
    } else if (body && body.id || body.data && body.data.id) {
      return new Subreddit(body.data || body).toJSON();
    }
  }

  path (method, query={}) {
    if (method === 'get') {
      if (query.id && query.view === 'mod') {
        return `r/${query.id}/about/edit.json`;
      }

      if (query.id) {
        return `r/${query.id}/about.json`;
      }

      return `subreddits/${query.sort || 'default'}.json`;
    }

    return 'api/site_admin';
  }
}

export default Subreddits;
