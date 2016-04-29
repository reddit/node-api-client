import BaseEndpoint from '../apiBase/BaseEndpoint';
import Stylesheet from '../models/stylesheet';

export default class StylesheetsEndpoint extends BaseEndpoint {
  move = this.notImplemented('move');
  copy = this.notImplemented('copy');
  put = this.notImplemented('put');
  patch = this.notImplemented('patch');
  post = this.notImplemented('post');
  del = this.notImplemented('del');

  path (method, query={}) {
    if (query.subredditName) {
      return `r/${query.subredditName}/about/stylesheet.json`;
    }

    return 'api/subreddit_stylesheet.json';
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
