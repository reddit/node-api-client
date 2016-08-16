import some from 'lodash/some';

import apiRequest from '../apiBase/apiRequest';
import BadCaptchaError from '../apiBase/errors/BadCaptchaError';
import PostModel from '../models2/PostModel';
import { formatBaseContentQuery } from './BaseContentEndpoint';


const BAD_CAPTCHA = 'BAD_CAPTCHA';

const getPath = (query) => {
  if (query.user) {
    return `user/${query.user}/submitted.json`;
  } else if (query.id) {
    return `by_id/${query.id}.json`;
  } else if (query.ids) {
    return `by_id/${query.query.ids.join(',')}.json`;
  } else if (query.subredditName) {
    return `r/${query.subredditName}.json`;
  } else if (query.multi) {
    return `user/${query.multiUser}/m/${query.multi}.json`;
  }

  return `${query.sort || 'hot'}.json`;
};

const formatQuery = (query, method) => {
  formatBaseContentQuery(query, method);

  if (method !== 'patch') {
    query.feature = 'link_preview';
    query.sr_detail = 'true';
  }

  if (method === 'del') {
    query._method = 'post';
  }

  return query;
};

const formatPostData = (data)=> {
  const postData = {
    api_type: 'json',
    thing_id: data.thingId,
    title: data.title,
    kind: data.kind,
    sendreplies: data.sendreplies,
    sr: data.sr,
    iden: data.iden,
    captcha: data.captcha,
    resubmit: data.resubmit,
  };

  if (data.text) {
    postData.text = data.text;
  } else if (data.url) {
    postData.url = data.url;
  }

  return postData;
};

const handleGet = apiResponse => {
  const { body: { data } } = apiResponse.response;

  if (data && data.children && data.children[0]) {
    if (data.children.length === 1) {
      apiResponse.addResult(PostModel.fromJSON(data.children[0].data));
    } else {
      data.children.forEach(c => apiResponse.addResult(PostModel.fromJSON(c.data)));
    }
  }

  return apiResponse;
};

export default {
  get(apiOptions, _query) {
    const path = getPath(_query);
    const query = formatQuery({ ..._query }, 'get');

    return apiRequest(apiOptions, 'GET', path, { query }).then(handleGet);
  },

  post(apiOptions, data) {
    const path = 'api/submit';
    const query = formatPostData(data);

    return apiRequest(apiOptions, 'POST', path, { query })
      .then(apiResponse => {
        const { body: { json } } = apiResponse.response;
        if (json.errors.length && some(json.errors, e => e[0] === BAD_CAPTCHA)) {
          throw new BadCaptchaError(data.captcha, json.captcha, json.errors);
        } else if (json.errors.length) {
          throw new ValidationError(path, json.errors, 200);
        } else {
          return apiResponse.response.body;
        }
      });
  },
};
