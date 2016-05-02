import PostModel from '../models2/PostModel';

import { runQuery } from '../apiBase/APIRequestUtils';

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

  query.sort = query.sort || 'hot';

  return `${query.sort}.json`;
};

const formatQuery = (query, method) => {
  if (method !== 'patch') {
    query.feature = 'link_preview';
    query.sr_detail = 'true';
  }

  if (method === 'del') {
    query._method = 'post';
  }

  return query;
};

const parseBody = (res, apiResponse, req, method) => {
  const { body } = res;

  if (method === 'get') {
    const { data } = body;

    if (data && data.children && data.children[0]) {
      if (data.children.length === 1) {
        apiResponse.addResult(PostModel.fromJSON(data.children[0].data));
        return;
      } else {
        data.children.forEach(c => apiResponse.addResult(PostModel.fromJSON(c.data)));
        return;
      }
    } else if (data) {
      return;
    }
  } else if (method !== 'del') {
    if (body.json && body.json.errors.length === 0) {
      apiResponse.addResult(body.json.data);
      return;
    } else {
      throw body.json;
    }
  }
};

export default {
  get(apiOptions, query) {
    const path = getPath(query);
    const apiQuery = formatQuery({...query});

    return runQuery(apiOptions, 'get', path, apiQuery, query, parseBody);
  },
};

export class PostEndpoint {

  static postPath() {
    return 'api/submit';
  }

  static post = (apiOptions, data) => {
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

    return BaseContentEndpoint.post(apiOptions, postData);
  }
}
