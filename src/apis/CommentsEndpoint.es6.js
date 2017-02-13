import apiRequest from '../apiBase/apiRequest';
import { formatBaseContentQuery } from './BaseContentEndpoint';

import { has } from 'lodash/object';

import CommentModel from '../models2/CommentModel';
import PostModel from '../models2/PostModel';

import {
  treeifyComments,
  buildCommentsModels,
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
    return 'api/morechildren.json';
  } else {
    return `comments/${(query.id || query.linkId).replace(/^t3_/, '')}.json`;
  }
};

const parseGetBody = (apiResponse /*, hasChildren */) => {
  const { body } = apiResponse.response;

  if (Array.isArray(body)) {
    // The first part of the response is a link
    const postData = body[0].data;
    if (postData && postData.children && postData.children.length) {
      postData.children.forEach(link => {
        apiResponse.addModel(PostModel.fromJSON(link.data));
      });
    }

    const comments = body[1].data.children;
    buildCommentsModels(apiResponse, comments);

  // handle loadMore result
  } else if (body.json && body.json.data) {

    const { things } = body.json.data;
    const comments = treeifyComments(things);
    buildCommentsModels(apiResponse, comments);

  }

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
