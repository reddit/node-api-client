import RedditModel from './RedditModel';
import { SUBREDDIT_RULE } from './thingTypes';

const T = RedditModel.Types;

export default class SubredditRule extends RedditModel {
  static type = SUBREDDIT_RULE;

  /**
   * Valid types for rule targets.
   * @enum
   */
  static RULE_TARGET = {
    ALL: 'all',
    POST: 'link',
    COMMENT: 'comment',
  };

  static PROPERTIES = {
    createdUTC: T.number,
    description: T.string,
    descriptionHTML: T.string,
    kind: T.string,
    priority: T.number,
    shortName: T.string,
    violationReason: T.string,

    // The `subredditName` property is not returned from the API directly.  It is
    // mixed into the response data by `SubredditRulesEndpoint.get` in order
    // to enable making unique UUIDs.
    subredditName: T.string,
  };

  static API_ALIASES = {
    short_name: 'shortName',
    created_utc: 'createdUTC',
    description_html: 'descriptionHTML',
    violation_reason: 'violationReason',
  };

  makeUUID(data) {
    // The actual rules model in r2 doesn't have a proper unique key, but
    // the `created_utc` timestamp should work since it shouldn't change.
    return `${data.subredditName}/${data.created_utc || data.createdUTC}`;
  }
}
