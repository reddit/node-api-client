import v1 from './endpoints/v1';

import Account from './models/account';
import Award from './models/award.js';
import Base from './models/base.js';
import Comment from './models/comment.js';
import Link from './models/link.js';
import Message from './models/message.js';
import PromoCampaign from './models/promocampaign.js';
import Subreddit from './models/subreddit.js';
import Vote from './models/vote.js';

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
