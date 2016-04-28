import Model from './Model';
import Record from './Record';
import { COMMENT, COMMENT_LOAD_MORE } from './thingTypes';

const T = Model.Types;

export default class Comment extends Model {
  static type = COMMENT;

  static PROPERTIES = {
    archived: T.bool,
    author: T.string,
    authorFlairCSSClass: T.string,
    authorFlairText: T.string,
    children: T.nop,
    controversiality: T.number,
    distinguished: T.string,
    downs: T.number,
    edited: T.bool,
    gilded: T.number,
    id: T.string,
    likes: T.cubit,
    name: T.string,
    replies: T.array,
    saved: T.bool,
    score: T.number,
    stickied: T.bool,
    subreddit: T.string,
    ups: T.number,

    // aliases
    approvedBy: T.string,
    bannedBy: T.string,
    bodyHTML: T.html,
    createdUTC: T.number,
    linkId: T.string,
    modReports: T.array,
    numReports: T.number,
    parentId: T.string,
    reportReasons: T.array,
    scoreHidden: T.bool,
    subredditId: T.string,
    userReports: T.array,
  };

  static API_ALIASES = {
    approved_by: 'approvedBy',
    banned_by: 'bannedBy',
    body_html: 'bodyHTML',
    created_utc: 'createdUTC',
    link_id: 'linkId',
    mod_reports: 'modReports',
    num_reports: 'numReports',
    parent_id: 'parentId',
    report_reasons: 'reportReasons',
    score_hidden: 'scoreHidden',
    subreddit_id: 'subredditId',
    user_reports: 'userReports',
  };

  makeUUID(data) {
    if (data.name === 't1__' && data.parent_id) {
      // This is a stub for load more, parentId is needed to fetch more
      return data.parent_id;
    }

    return data.name;
  }

  toRecord() {
    if (this.uuid === this.name) {
      return super.toRecord();
    }

    // otherwise its a load more stub for super nested comments
    return new Record(COMMENT_LOAD_MORE, this.parentId);
  }
}
