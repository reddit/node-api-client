import BaseAPI from './base';
import MultiSubscription from '../models/multi';

import Multis from './multis';

class MultiSubscriptions extends BaseAPI {
  static dataCacheConfig = undefined;

  get requestCacheRules () { return undefined; }

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

export default MultiSubscriptions;
