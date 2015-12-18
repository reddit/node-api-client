import BaseAPI from './base.es6.js';
import Subscription from '../models/subscription.es6.js';

class Subscriptions extends BaseAPI {
  static dataCacheConfig = undefined;

  get requestCacheRules () { return undefined; }

  model = Subscription;

  put = this.notImplemented('put');
  patch = this.notImplemented('patch');

  path () {
    return 'api/subscribe';
  }

  post (data) {
    const postData = {
      sr: data.subreddit,
      action: 'sub',
      api_type: 'json',
    };

    return super.post(postData);
  }

  del (data) {
    const postData = {
      sr: data.subreddit,
      action: 'unsub',
      api_type: 'json',
      _method: 'post',
    };

    return super.del(postData);
  }

  save (method, data={}) {
    // Save, then update the data in the cache
    super.save(method, data);

    // TODO update subreddit by real id and set subscribed to true or false
    // const subscribed = method === 'post' ? true : false;
  }
}

export default Subscriptions;
