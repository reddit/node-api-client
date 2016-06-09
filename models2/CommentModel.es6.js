import RedditModel from './RedditModel';
import Record from '../apiBase/Record';
import { COMMENT, COMMENT_LOAD_MORE } from './thingTypes';

import votable from './mixins/votable';
import replyable from './mixins/replyable';

const T = RedditModel.Types;

export default class CommentModel extends RedditModel {
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
    numReplies: T.number,
    loadMore: T.bool,
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
    linkTitle: T.string,
    modReports: T.array,
    numReports: T.number,
    parentId: T.string,
    reportReasons: T.array,
    scoreHidden: T.bool,
    subredditId: T.string,
    userReports: T.array,

    // derived
    cleanPermalink: T.link,
  };

  static API_ALIASES = {
    approved_by: 'approvedBy',
    banned_by: 'bannedBy',
    body_html: 'bodyHTML',
    created_utc: 'createdUTC',
    link_id: 'linkId',
    link_title: 'linkTitle',
    mod_reports: 'modReports',
    num_reports: 'numReports',
    parent_id: 'parentId',
    report_reasons: 'reportReasons',
    score_hidden: 'scoreHidden',
    subreddit_id: 'subredditId',
    user_reports: 'userReports',
  };

  static DERIVED_PROPERTIES = {
    cleanPermalink(data) {
      const { subreddit, link_id, id} = data;
      return `/r/${subreddit}/comments/${link_id.substr(3)}/comment/${id}`;
    },
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

votable(CommentModel);
replyable(CommentModel);
