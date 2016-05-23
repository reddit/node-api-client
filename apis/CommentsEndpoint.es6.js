import { runQuery, save } from '../apiBase/APIRequestUtils';
import { formatBaseContentQuery } from './BaseContentEndpoint';

import { has } from 'lodash/object';

import CommentModel from '../models2/CommentModel';
import PostModel from '../models2/PostModel';

import {
  treeifyComments,
  parseCommentList,
  normalizeCommentReplies,
} from '../lib/commentTreeUtils';

const formatQuery = (query, method) => {
  formatBaseContentQuery(query, method);

  if (query.ids) {
    query.children = query.ids.join(',');
    query.api_type = 'json';
    query.link_id = query.linkId;

    delete query.ids;
    delete query.linkId;
  }

  return query;
};

const getPath = (query) => {
  if (query.user) {
    return `user/${query.user}/comments.json`;
  } else if (query.ids) {
    return `api/morechildren.json`;
  } else {
    return `comments/${(query.id || query.linkId).replace(/^t3_/, '')}.json`;
  }
};

const parseGetBody = (res, apiResponse, req) => {
  const { query } = req;
  const { body } = res;
  let comments = [];

  if (Array.isArray(body)) {
    // The first part of the response is a link
    const linkData = body[0].data;
    if (linkData && linkData.children && linkData.children.length) {
      linkData.children.forEach(link => {
        apiResponse.addModel(PostModel.fromJSON(link.data));
      });
    }

    comments = parseCommentList(body[1].data.children);
  } else if (body.json && body.json.data) {
    if (query.children) { // treeify 'load more comments' replies
      comments = treeifyComments(parseCommentList(body.json.data.things));
    } else {
      comments = parseCommentList(body.json.data.things);
    }
  }

  normalizeCommentReplies(comments, (commentJSON, isTopLevel) => {
    // parsing is done bottom up, comment models are immutable
    // but they'll rely on the records
    const comment = CommentModel.fromJSON(commentJSON);

    if (isTopLevel) {
      apiResponse.addResult(comment);
    } else {
      apiResponse.addModel(comment);
    }

    // this sets replies to be records for consistency
    return comment.toRecord();
  });
};

const parsePostBody = (res, apiResponse) => {
  const { body } = res;

  if (has(body, 'json.data.things.0.data')) {
    const comment = body.json.data.things[0].data;
    apiResponse.addResult(CommentModel.fromJSON(comment));
  }
};

export default {
  get(apiOptions, query) {
    const path = getPath(query);
    const apiQuery = formatQuery({ ...query });

    return runQuery(apiOptions, 'get', path, apiQuery, query, parseGetBody);
  },

  post(apiOptions, data) {
    const path = 'api/comment';
    const postData = {
      api_type: 'json',
      thing_id: data.thingId,
      text: data.text,
      raw_json: 1,
    };

    return save(apiOptions, 'post', path, postData, parsePostBody);
  },
};
