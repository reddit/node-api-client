import { EventEmitter } from 'events';
import superagent from 'superagent';
import url from 'url';

import activities from './apis/activities';
import hidden from './apis/hidden';
import saves from './apis/saves';
import search from './apis/search';
import stylesheets from './apis/stylesheets';
import subreddits from './apis/subreddits';
import subscriptions from './apis/subscriptions';
import trophies from './apis/trophies';
import accounts from './apis/accounts';
import votes from './apis/votes';
import links from './apis/links';
import comments from './apis/comments';
import captcha from './apis/captcha';
import reports from './apis/reports';
import messages from './apis/messages';
import modListing from './apis/modListing';
import subredditRelationships from './apis/subredditRelationships';
import rules from './apis/rules';
import wiki from './apis/wiki';
import multis from './apis/multis';
import multiSubscriptions from './apis/multiSubscriptions';

export const APIs = {
  activities,
  captcha,
  hidden,
  saves,
  search,
  stylesheets,
  subreddits,
  subscriptions,
  trophies,
  accounts,
  votes,
  links,
  comments,
  reports,
  messages,
  modListing,
  subredditRelationships,
  rules,
  wiki,
  multis,
  multiSubscriptions,
};

import NoModelError from './errors/noModelError';
import ResponseError from './errors/responseError';
import { DisconnectedError } from './errors/responseError';
import ValidationError from './errors/validationError';
import NotImplementedError from './errors/notImplementedError';

export const errors = {
  NoModelError,
  ValidationError,
  ResponseError,
  DisconnectedError,
  NotImplementedError,
};

import Account from './models/account';
import Award from './models/award';
import Base from './models/base';
import Block from './models/block';
import BlockedUser from './models/BlockedUser';
import Comment from './models/comment';
import Link from './models/link';
import Message from './models/message';
import PromoCampaign from './models/promocampaign';
import Preferences from './models/preferences';
import Subreddit from './models/subreddit';
import Subscription from './models/subscription';
import Vote from './models/vote';
import Report from './models/report';
import WikiPage from './models/wikiPage';
import WikiRevision from './models/wikiRevision';
import WikiPageListing from './models/wikiPageListing';
import WikiPageSettings from './models/wikiPageSettings';

export const models = {
  Account,
  Award,
  Base,
  Block,
  BlockedUser,
  Comment,
  Link,
  Message,
  PromoCampaign,
  Preferences,
  Subreddit,
  Subscription,
  Vote,
  Report,
  WikiPage,
  WikiRevision,
  WikiPageListing,
  WikiPageSettings,
};

const DEFAULT_API_ORIGIN = 'https://www.reddit.com';
const AUTHED_API_ORIGIN = 'https://oauth.reddit.com';

const SCOPES = 'history,identity,mysubreddits,read,subscribe,vote,submit,' +
               'save,edit,account,creddits,flair,livemanage,modconfig,' +
               'modcontributors,modflair,modlog,modothers,modposts,modself,' +
               'modwiki,privatemessages,report,wikiedit,wikiread';

class Snoode {
  constructor(config={}) {
    this.config = {
      origin: DEFAULT_API_ORIGIN,
      event: new EventEmitter(),
      userAgent: 'snoodev2',
      ...config,
    };

    this.event = this.config.event;

    for (let a in APIs) {
      this[a] = new APIs[a](this);
    }
  }

  withAuth (token, changeOrigin=true) {
    return new Snoode({
      ...this.config,
      token,
      origin: changeOrigin ? AUTHED_API_ORIGIN : this.config.origin,
    });
  }

  withConfig (config) {
    // Merge the new config onto the old and return a new instance
    return new Snoode({...this.config, ...config});
  }
}

export default Snoode;
