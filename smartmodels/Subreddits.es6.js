export default class Subreddits {
  static subscribed(api) {
    return api.subreddits.get({ sort: 'mine/subscriber'});
  }

  static moderating(api) {
    return api.subreddits.get({ sort: 'mine/moderating' });
  }
}
