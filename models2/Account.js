import RedditModel from './RedditModel';
import Record from '../apiBase/Record';

import { ACCOUNT } from './thingTypes';

const T = RedditModel.Types;

export default class Subreddit extends RedditModel {
  static type = ACCOUNT;

  static PROPERTIES = {
    commentKarma: T.number,
    createdUTC: T.number,
    features: T.nop,
    goldCreddits: T.number,
    goldExpiration: T.number,
    hasMail: T.bool,
    hasModMail: T.bool,
    hasVerifiedEmail: T.bool,
    hideFromRobots: T.bool,
    id: T.string,
    inBeta: T.bool,
    inboxCount: T.number,
    isEmployee: T.bool,
    isGold: T.bool,
    isMod: T.bool,
    isSuspended: T.bool,
    linkKarma: T.number,
    name: T.string,
    over18: T.bool,
    suspensionExpirationUTC: T.number,
  }

  static API_ALIASES = {
    comment_karm: 'commentKarma',
    created_utc: 'createdUTC',
    gold_creddits: 'goldCreddits',
    gold_expiration: 'goldExpiration',
    has_mail: 'hasMail',
    has_mod_mail: 'hasModMail',
    has_verifified_email: 'hasVerifiedEmail',
    hide_from_robots: 'hideFromRobots',
    in_beta: 'inBeta',
    is_employee: 'isEmployee',
    is_gold: 'isGold',
    is_mod: 'isMod',
    is_suspended: 'isSuspended',
    link_karma: 'linkKarma',
    suspension_expiration_utc: 'suspensionExpirationUTC',
  }

  makeUUID(data) {
    return data.name;
  }
}
