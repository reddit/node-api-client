import apiRequest from '../apiBase/apiRequest';
import { formatBaseContentQuery } from './BaseContentEndpoint';

import { has } from 'lodash/object';

import CommentModel from '../models2/CommentModel';
import PostModel from '../models2/PostModel';

import {
  treeifyComments,
  parseCommentData,
  normalizeCommentReplies,
} from '../lib/commentTreeUtils';

const formatQuery = (query, method) => {
  formatBaseContentQuery(query, method);

  if (query.commentIds) {
    query.children = query.commentIds.join(',');
    query.api_type = 'json';
    query.link_id = query.linkId;

    delete query.commentIds;
    delete query.linkId;
  } else if (has(query, 'query.comment')) {
    query.comment = query.query.comment;
    query.context = 1;
  }

  return query;
};

const getPath = (query) => {
  if (query.user) {
    return `user/${query.user}/comments.json`;
  } else if (query.commentIds) {
    return `api/morechildren.json`;
  } else {
    return `comments/${(query.id || query.linkId).replace(/^t3_/, '')}.json`;
  }
};

const parseGetBody = (apiResponse, hasChildren) => {
  const { body } = apiResponse.response;
  let comments = [];

  if (Array.isArray(body)) {
    // The first part of the response is a link
    const linkData = body[0].data;
    if (linkData && linkData.children && linkData.children.length) {
      linkData.children.forEach(link => {
        apiResponse.addModel(PostModel.fromJSON(link.data));
      });
    }

    comments = body[1].data.children.map(parseCommentData);
  } else if (body.json && body.json.data) {

    const { things } = body.json.data;
    comments = treeifyComments(things.map(parseCommentData));
  }

  normalizeCommentReplies(comments, true, (commentJSON, isTopLevel) => {
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

  return apiResponse;
};

const parsePostBody = apiResponse => {
  const { body } = apiResponse.response;

  if (has(body, 'json.data.things.0.data')) {
    const comment = body.json.data.things[0].data;
    apiResponse.addResult(CommentModel.fromJSON(comment));
  }

  return apiResponse;
};

export default {
  get(apiOptions, _query) {
    const hasChildren = !!_query.children;
    const path = getPath(_query);
    const query = formatQuery({ raw_json: 1, ..._query });

    return apiRequest(apiOptions, 'GET', path, { query })
      .then(apiResponse => parseGetBody(apiResponse, hasChildren));
  },

  post(apiOptions, data) {
    const path = 'api/comment';
    const body = {
      api_type: 'json',
      thing_id: data.thingId,
      text: data.text,
      raw_json: 1,
    };

    return apiRequest(apiOptions, 'POST', path, { body, type: 'form' }).then(parsePostBody);
  },

  del(apiOptions, id) {
    const body = { id };
    return apiRequest(apiOptions, 'POST', 'api/del', { body, type: 'form' });
  },
};
