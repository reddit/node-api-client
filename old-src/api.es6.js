import v1 from './endpoints/v1';

import Account from './models/account';
import Award from './models/award';
import Base from './models/base';
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

import NoModelError from './errors/noModelError';
import ResponseError from './errors/responseError';
import { DisconnectedError } from './errors/responseError';
import ValidationError from './errors/validationError';

const models = {
  Account,
  Award,
  Base,
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

const errors = {
  NoModelError,
  ValidationError,
  ResponseError,
  DisconnectedError,
};

export {
  v1,
  models,
  errors,
};
