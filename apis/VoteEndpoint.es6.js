import { runForm, validateData } from '../apiBase/APIRequestUtils';

const path = 'api/vote';

const validator = data => (
  !!data.thingId && typeof data.direction === 'number'
);

const post = (apiOptions, data) => {
  validateData(data, 'post', 'votes', validator);

  const postData = {
    id: data.thingId,
    dir: data.direction,
    api_type: 'json',
  };

  return runForm(apiOptions, 'post', path, postData);
}

const del = (apiOptions, data) => {
  validateData(data, 'del', 'votes', validator);

  const postData = {
    id: data.thingId,
    dir: 0,
    api_type: 'json',
  };

  return runForm(apiOptions, 'post', path, postData);
}

export default {
  post,
  del,
};
