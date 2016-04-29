import BaseEndpoint from '../apiBase/BaseEndpoint';
import MultiSubscription from '../models/multi';

import Multis from './multis';

export default class MultiSubscriptionsEndpoint extends BaseEndpoint {
  model = MultiSubscription;

  move = this.notImplemented('move');
  copy = this.notImplemented('copy');
  get = this.notImplemented('get');
  post = this.notImplemented('post');
  patch = this.notImplemented('patch');

  path (method, query) {
    const id = Multis.buildId(query);
    return `api/multi/${id}/r/${query.subreddit}`;
  }

  formatData (data, method) {
    if (method === 'put') {
      return {
        model: JSON.stringify({ name: data.subreddit }),
      };
    }
  }
}
