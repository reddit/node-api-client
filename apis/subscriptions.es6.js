import BaseEndpoint from '../apiBase/BaseEndpoint';
import Subscription from '../models/subscription';

export default class SubscriptionsEndpoint extends BaseEndpoint {
  model = Subscription;

  move = this.notImplemented('move');
  copy = this.notImplemented('copy');
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
}
