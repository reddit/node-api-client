import v1 from './endpoints/v1';

import Account from './models/account';
import Award from './models/award';
import Base from './models/base';
import Comment from './models/comment';
import Link from './models/link';
import Message from './models/message';
import PromoCampaign from './models/promocampaign';
import Subreddit from './models/subreddit';
import Subscription from './models/subscription';
import Vote from './models/vote';

var models = {
  Account,
  Award,
  Base,
  Comment,
  Link,
  Message,
  PromoCampaign,
  Subreddit,
  Subscription,
  Vote
};

export {
  v1,
  models
}
