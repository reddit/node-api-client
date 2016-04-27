import BaseAPI from './baseContent';

const MODACTIONS = {
  contributor: 'friend',
  leaveContrib: 'leavecontributor',
  moderator_invite: 'friend',
  leaveMod: 'leavemoderator',
  acceptModInvite: 'accept_moderator_invite',
  banned: 'friend',
  muted: 'friend',
  wikibanned: 'friend',
  wikicontributor: 'friend',
};

class SubredditRelationships extends BaseAPI {
  static dataCacheConfig = undefined;

  get requestCacheRules () {
    return undefined;
  }

  move = this.notImplemented('move');
  copy = this.notImplemented('copy');
  put = this.notImplemented('put');
  patch = this.notImplemented('patch');

  path(method, query={}) {
    const { subreddit, type, filter } = query;
    if (method === 'get') {
      return path = `r/${subreddit}/about/${filter}`;
    }

    const sub = subreddit ? `r/${subreddit}/` : '';
    let path = MODACTIONS[type];

    if (method === 'del' && path === 'friend') {
      path = 'unfriend';
    }

    return `${sub}api/${path}`;
  }

  get(data) {
    data.count = 25;
    return super.get(data);
  }

  post(data) {
    data.api_type = 'json';
    return super.post(data);
  }

  del(data) {
    data._method = 'post';
    return super.del(data);
  }
}

export default SubredditRelationships;
