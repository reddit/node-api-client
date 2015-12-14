import Cache from 'restcache';
import { EventEmitter } from 'events';

const DEFAULT_API_ORIGIN = 'https://www.reddit.com';

import activities from './apis/activities';
import hidden from './apis/hidden';
import saves from './apis/saves';
import search from './apis/search';
import stylesheets from './apis/stylesheets';
import subreddits from './apis/subreddits';
import subscriptions from './apis/subscriptions';
import trophies from './apis/trophies';
import users from './apis/users';

const APIs = {
  activities,
  hidden,
  saves,
  search,
  stylesheets,
  subreddits,
  subscriptions,
  trophies,
  users,
};

class Snoode {
  constructor(config={}) {
    this.config = {
      origin: DEFAULT_API_ORIGIN,
      event: new EventEmitter(),
      ...config,
    };

    this.event = this.config.event;

    this.cache = new Cache(this.buildCacheConfig());

    for (let a in APIs) {
      this[a] = new APIs[a](this);
    }
  }

  buildCacheConfig() {
    let dataTypes = {};

    for (let a in APIs) {
      let API = APIs[a];
      let apiName = (new API({})).api;

      dataTypes[apiName] = API.dataCacheConfig;
    }

    return {
      dataTypes,
    };
  }

  withAuth (token) {
    return new Snoode({...this.config, token});
  }

  withConfig (config) {
    // Merge the new config onto the old and return a new instance
    return new Snoode({...this.config, ...config});
  }
}

export default Snoode;
