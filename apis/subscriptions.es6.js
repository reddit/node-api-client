import { runQuery, validateData } from '../apiBase/APIRequestUtils';

const path = 'api/subscribe';

const validator = (data) => !data.subreddit;

const post = (apiOptions, data) => {
  validateData(data, 'post', 'subscriptions', validator);

  const postData = {
    sr: data.subreddit,
    action: 'sub',
    api_type: 'json',
  };

  return runQuery(apiOptions, 'post', path, postData, data);
}

const del = (apiOptions, data) => {
  validateData(data, 'del', 'subscriptions', validator);

  const postData = {
    sr: data.subreddit,
    action: 'unsub',
    api_type: 'json',
  };

  return runQuery(apiOptions, 'post', path, postData, data);
}

export default {
  post,
  del,
};
