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

    // Manually update request and data caches to show the new subscription
    // status
    const subscribed = method === 'post';

    let subreddit = this.dataCache.subreddits.get(data.subreddit);

    if (subreddit) {
      subreddit.subscribed = subscribed;
      this.dataCache.subreddits.set(data.subreddit, subreddit.subscribed);
    }

    let requests = this.requestCache.get(this.path());

    if (typeof requests !== 'undefined') {
      if (subscribed) {
        requests.append(subreddit.id);
      } else {
        requests = requests.filter(function(r) {
          return r.id !== subreddit.id;
        });
      }

      this.requestCache.set(this.path(), requests);
    }
  }
}

export default Subscriptions;
