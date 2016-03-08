import BaseAPI from './baseContent.es6.js';

const MODACTIONS = {
  contributor: 'friend',
  leaveContrib: 'leavecontributor',
  moderator_invite: 'friend',
  leaveMod: 'leavemoderator',
  acceptModInvite: 'accept_moderator_invite',
  banned: 'friend',
  wikibanned: 'friend',
  wikicontributor: 'friend',
};

class SubredditRelationships extends BaseAPI {
  static dataCacheConfig = undefined;

  get requestCacheRules () {
    return undefined;
  }

  put = this.notImplemented('put');
  patch = this.notImplemented('patch');

  path(method, query={}) {
    const { subreddit, type, filter } = query;
    if (method === 'get') {
      return path = `r/${subreddit}/about/${query.filter}`;
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
    super.get(data);
  }

  post(data) {
    data.api_type = 'json';
    super.post(data)
  }

  del(data) {
    data._method = 'post';
    super.del(data);
  }
}

export default SubredditRelationships;
