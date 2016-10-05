import RedditModel from './RedditModel';

const T = RedditModel.Types;

export default class Message extends RedditModel {
  static PROPERTIES = {
    id: T.string,
    author: T.string,
    name: T.string,
    bodyHTML: T.string,
    isComment: T.bool,
    firstMessage: T.string,
    firstMessageName: T.string,
    createdUTC: T.number,
    subreddit: T.string,
    parentId: T.string,
    replies: T.arrayOf(T.string),
    distinguished: T.string,
    subject: T.string,

    // derived
    cleanPermalink: T.link,
  };

  static API_ALIASES = {
    was_comment: 'isComment',
    first_message: 'firstMessage',
    first_message_name: 'firstMessageName',
    created_utc: 'createdUTC',
    body_html: 'bodyHTML',
    parent_id: 'parentId',
  };

  static DERIVED_PROPERTIES = {
    cleanPermalink(data) {
      const { id } = data;
      if (!id) {
        return null;
      }
      return `/message/messages/${id}`;
    },
  };
}
