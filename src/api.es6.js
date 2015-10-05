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

var models = {
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
};

export {
  v1,
  models,
};
