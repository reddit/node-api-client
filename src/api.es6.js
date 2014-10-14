import v1 from './endpoints/v1.es6';

import Account from './models/account.es6';
import Award from './models/award.es6';
import Base from './models/base.es6';
import Comment from './models/comment.es6';
import Link from './models/link.es6';
import Message from './models/message.es6';
import PromoCampaign from './models/promocampaign.es6';
import Subreddit from './models/subreddit.es6';
import Vote from './models/vote.es6';

var models = {
  Account,
  Award,
  Base,
  Comment,
  Link,
  Message,
  PromoCampaign,
  Subreddit,
  Vote
};

export {
  v1,
  models
}
