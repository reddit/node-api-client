import BaseContentEndpoint from './BaseContentEndpoint';
import { has } from 'lodash/object';

import Link from '../models2/Link';
import Comment from '../models2/Comment';

export default class ModListingEndpoint extends BaseContentEndpoint {
  move = this.notImplemented('move');
  copy = this.notImplemented('copy');
  put = this.notImplemented('put');
  patch = this.notImplemented('patch');
  del = this.notImplemented('del');
  post = this.notImplemented('post');

  path(method, query={}) {
    const { subreddit, modPath } = query;
    return `r/${subreddit}/about/${modPath}.json`;
  }

  formatQuery (options) {
    options.sr_detail = 'true';

    return options;
  }

  parseBody(res, apiResponse) {
    const { body } = res;

    if (has(body, 'data.children.0')) {
      body.data.children.forEach(c => {
        if (c.kind == 't3') {
          apiResponse.addResult(Link.fromJSON(c.data));
        } else if (c.kind === 't1') {
          apiResponse.addResult(Comment.fromJSON(c.data));
        }
      });
    }
  }
}
