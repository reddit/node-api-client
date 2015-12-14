import BaseAPI from './base';
import Subreddit from '../models/subreddit';

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
  post = this.notImplemented('post');
  put = this.notImplemented('put');
  patch = this.notImplemented('patch');

  formatCacheData = (data) => {
    const api = this.api;

    // Set a custom id for easier lookups - using the subreddit name as the id,
    // rather than the base36 id.
    if (d && Array.isArray(d)) {
      return {
        subreddits: d.map(function(s) {
          s.id = s.display_name.toLowerCase();
          return s;
        })
      };
    } else if (d) {
      d.id = d.display_name.toLowerCase();
    }

    return {
      [api]: d
    };
  }

  formatBody (res) {
    const { body, headers } = res;

    if (body.data && Array.isArray(body.data.children)) {
      return body.data.children.map(c => new Subreddit(c.data).toJSON());
      // sometimes, we get back empty object and 200 for invalid sorts like
      // `mine` when logged out
    } else if (body && body.id || body.data && body.data.id) {
      return new Subreddit(body.data || body).toJSON();
    }
  }

  path (method, query={}) {
    if (query.id) {
      return `r/${query.id}/about.json`;
    }

    return `subreddits/${query.sort || 'default'}.json`;
  }
}

export default Subreddits;
