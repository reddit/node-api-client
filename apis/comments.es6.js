import { has } from 'lodash/object';

import BaseAPI from './baseContent';
import Comment from '../models2/Comment';
import Link from '../models2/Link';

import {
  treeifyComments,
  parseCommentList,
  normalizeCommentReplies,
} from '../lib/commentTreeUtils';

export default class Comments extends BaseAPI {
  model = Comment;

  move = this.notImplemented('move');
  copy = this.notImplemented('copy');

  formatQuery(query, method) {
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

  getPath(query) {
    if (query.user) {
      return `user/${query.user}/comments.json`;
    } else if (query.ids) {
      return `api/morechildren.json`;
    } else {
      return `comments/${query.linkId.replace(/^t3_/, '')}.json`;
    }
  }

  postPath() {
    return 'api/comment';
  }

  post(data) {
    const postData = {
      api_type: 'json',
      thing_id: data.thingId,
      text: data.text,
    };

    return super.post(postData);
  }

  parseBody(res, apiResponse, req, originalMethod) {
    const { query } = req;
    const { body } = res;
    let comments = [];

    if (originalMethod === 'get') {
      if (Array.isArray(body)) {
        // The first part of the response is a link
        const linkData = body[0].data;

        if (linkData && linkData.children && linkData.children.length) {
          linkData.children.forEach(link => {
            apiResponse.addModel(Link.fromJSON(link.data));
          });
        }

        comments = treeifyComments(parseCommentList(body[1].data.children));
      } else if (body.json && body.json.data) {
        if (query.children) { // treeify 'load more comments' replies
          comments = treeifyComments(parseCommentList(body.json.data.things));
        } else {
          comments = parseCommentList(body.json.data.things);
        }
      }

      normalizeCommentReplies(comments, (commentJSON, isTopLevel) => {
        try {
          // parsing is done bottom up, comment models are immutable
          // but they'll rely on the records
          const comment = Comment.fromJSON(commentJSON);
          if (isTopLevel) {
            apiResponse.addResult(comment);
          } else {
            apiResponse.addModel(comment);
          }

          // this sets replies to be records for consistency
          return comment.toRecord();
        } catch (e) {
          console.log('asdfasdfasdf');
          console.trace(e);
        }
      });
    } else {
      if (has(body, 'json.data.things.0.data')) {
        const comment = body.json.data.things[0].data;
        apiResponse.addResult(Comment.fromJSON(comment));
      }
    }
  }
}
