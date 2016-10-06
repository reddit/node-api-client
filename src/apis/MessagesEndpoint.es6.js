import { has } from 'lodash/object';

import apiRequest from '../apiBase/apiRequest';
import ValidationError from '../apiBase/errors/ValidationError';

import Comment from '../models2/CommentModel';
import Post from '../models2/PostModel';
import Message from '../models2/MessageModel';

const TYPE_MAP = {
  't1': Comment,
  't3': Post,
  't4': Message,
};

const parseGetBody = apiResponse => {
  const { body } = apiResponse.response;
  body.data.children.forEach(c => {
    const replies = [];
    if (c.data.replies) {
      c.data.replies.data.children.forEach(r => {
        apiResponse.addModel(TYPE_MAP[r.kind].fromJSON(r.data));
        replies.push(`${r.kind}_${r.data.id}`);
      });
    }

    c.data.replies = replies;
    apiResponse.addResult(TYPE_MAP[c.kind].fromJSON(c.data));
  });

  const { before, after } = body.data;
  apiResponse.meta = { before, after };

  return apiResponse;
};

const parsePostBody = apiResponse => {
  const { body } = apiResponse.response;
  if (has(body, 'json.errors') && body.json.errors.length) {
    // There's a problem -- return the errors
    const reqType = (apiResponse.request.url.indexOf('compose') !== -1) ? 'compose' : 'reply';
    throw new ValidationError(`Message ${reqType}`, body.json.errors, body.status);
  } else if (has(body, 'json.data.things.0.data')) {
    // We're replying to an existing thread -- the API gives us
    // that message, so we return the model.
    const message = body.json.data.things[0];
    const model = TYPE_MAP[message.kind].fromJSON(message.data);
    return model;
  }

  // New message thread -- API tells us nothing, so we return null
  return null;
};

const getPath = (data={}) => {
  const { subreddit, type, thread } = data;
  const sub = subreddit ? `r/${subreddit}/` : '';
  const id = thread ? `/${thread}` : '';
  return `${sub}message/${type}${id}.json`;
};

const postPath = (body={}) => {
  const { thingId } = body;
  if (!thingId) {
    return 'api/compose';
  }

  // `api/comment` is intentional; message replies are treated as comments.
  return 'api/comment';
};

const translateData = data => {
  const ret = {
    api_type: 'json',
    raw_json: 1,
    text: data.body,
  };

  if (data.thingId) {
    ret.thing_id = data.thingId;
  }
  if (data.to) {
    ret.to = data.to;
  }
  if (data.subreddit) {
    ret.from_sr = data.subreddit;
  }
  if (data.subject) {
    ret.subject = data.subject;
  }

  return ret;
};

export default {
  get(apiOptions, data) {
    const path = getPath(data);
    const query = { ...data.query, raw_json: 1 };

    return apiRequest(apiOptions, 'GET', path, { query }).then(parseGetBody);
  },

  post(apiOptions, data) {
    const path = postPath(data);
    const body = translateData(data);

    return apiRequest(apiOptions, 'POST', path, { body, type: 'form' }).then(parsePostBody);
  },
};
