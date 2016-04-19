import { has } from 'lodash/object';
import BaseAPI from './baseContent.es6.js';
import Comment from '../models/comment.es6.js';
import treeifyComments from '../lib/treeifyComments';

class Comments extends BaseAPI {
  static mapReplies (data) {
    let comment = data.data;

    if (comment.replies) {
      comment.replies = comment.replies.data.children.map(Comments.mapReplies);
    } else {
      comment.replies = [];
    }

    return new Comment(comment).toJSON();
  }

  move = this.notImplemented('move');
  copy = this.notImplemented('copy');

  get requestCacheRules () {
    return undefined;
  }

  model = Comment;

  formatQuery (query, method) {
    query = super.formatQuery(query, method);

    if (query.ids) {
      query.children = query.ids.join(',');
      query.api_type = 'json';
      query.link_id = query.linkId;

      delete query.ids;
      delete query.linkId;
    }

    return query;
  }

  getPath (query) {
    if (query.user) {
      return `user/${query.user}/comments.json`;
    } else if (query.ids) {
      return `api/morechildren.json`;
    } else {
      return `comments/${query.linkId}.json`;
    }
  }

  postPath () {
    return 'api/comment';
  }

  post (data) {
    const postData = {
      api_type: 'json',
      thing_id: data.thingId,
      text: data.text,
    };

    return super.post(postData);
  }

  formatBody(res, req) {
    const { query } = req;
    const { body } = res;

    if (req.method === 'GET') {
      if (Array.isArray(body)) {
        return body[1].data.children.map(Comments.mapReplies);
      } else if (body.json && body.json.data) {
        if (query.children) { // treeify 'load more comments' replies
          return treeifyComments(body.json.data.things.map(Comments.mapReplies));
        }
        return body.json.data.things.map(Comments.mapReplies);
      }
    } else {
      if (has(body, 'json.data.things.0.data')) {
        const comment = body.json.data.things[0].data;
        return new Comment(comment).toJSON();
      }
    }
  }
}

export default Comments;
