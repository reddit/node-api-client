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
    likes: T.likes,
    name: T.string,
    replies: T.array,
    numReplies: T.number,
    saved: T.bool,
    score: T.number,
    stickied: T.bool,
    subreddit: T.string,
    ups: T.number,
    removed: T.bool,
    approved: T.bool,
    spam: T.bool,
    depth: T.number,

    // aliases
    approvedBy: T.string,
    bannedBy: T.string,
    bodyHTML: T.html,
    bodyMD: T.html,
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
    author_flair_css_class: 'authorFlairCSSClass',
    author_flair_text: 'authorFlairText',
    banned_by: 'bannedBy',
    body_html: 'bodyHTML',
    body: 'bodyMD',
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
      // if we are re-instantiating for a stub (read when we vote or reply)
      // re-use the cleanPermalink we parsed before.
      if (data.cleanPermalink) { return data.cleanPermalink; }

      const { subreddit, link_id, id, context } = data;

      if (context) { return context; }

      return `/r/${subreddit}/comments/${link_id.substr(3)}/comment/${id}`;
    },
  };

  toRecord() {
    const record = new Record(this.type, this.uuid, this.paginationId);
    record.depth = this.depth;
    return record;
  }
}

votable(CommentModel);
replyable(CommentModel);
