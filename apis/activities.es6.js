import BaseEndpoint from '../apiBase/BaseEndpoint';

import Comment from '../models2/Comment';
import PostModel from '../models2/PostModel';

const CONSTRUCTORS = {
  t1: Comment,
  t3: PostModel,
};

export default class ActivitiesEndpoint extends BaseEndpoint {
  move = this.notImplemented('move');
  copy = this.notImplemented('copy');
  put = this.notImplemented('put');
  patch = this.notImplemented('patch');
  post = this.notImplemented('post');
  del = this.notImplemented('del');

  formatQuery (query) {
    query.feature = 'link_preview';
    query.sr_detail = 'true';

    return query;
  }

  path (method, query={}) {
    return `user/${query.user}/${query.activity}.json`;
  }

  parseBody(res, apiResponse) {
    const { body } = res;

    if (body) {
      const activities = body.data.children;

      activities.forEach(function(a) {
        const constructor = CONSTRUCTORS[a.kind];
        apiResponse.addResult(constructor.fromJSON(a.data));
      });
    }
  }
}
