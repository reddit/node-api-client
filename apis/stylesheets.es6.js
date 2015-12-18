import BaseAPI from './base.es6.js';
import Stylesheet from '../models/stylesheet';

class Stylesheets extends BaseAPI {
  static dataCacheConfig = null;

  get requestCacheRules () { return null; }

  put = this.notImplemented('put');
  patch = this.notImplemented('patch');
  post = this.notImplemented('post');
  del = this.notImplemented('del');

  path (method, query={}) {
    if (query.subredditName) {
      return `/r/${query.subredditName}/about/stylesheet.json`;
    }

    return '/api/subreddit_stylesheet.json';
  }

  formatBody (res) {
    const { body } = res;
    const { data } = body;

    if (data && data.images && data.stylesheet) {
      return new Stylesheet(data).toJSON();
    } else {
      return {};
    }
  }
}

export default Stylesheets;
