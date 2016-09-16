import Comment from '../models2/CommentModel';
import Post from '../models2/PostModel';
import Message from '../models2/MessageModel';
import { runQuery, runForm } from '../apiBase/APIRequestUtils';

const TYPE_MAP = {
  't1': Comment,
  't3': Post,
  't4': Message,
};

const parseGetBody = (res, apiResponse, apiRequest) => {
  const { body } = res;
  body.data.children.forEach(c => apiResponse.addResult(TYPE_MAP[c.kind].fromJSON(c.data)));
};

const parsePostBody = (res, apiResponse, apiRequest) => {
  const { body } = res;
  console.log(body);
};

const getPath = (query={}) => {
  const { subreddit, type } = query;
  const sub = subreddit ? `r/${ subreddit }/` : '';
  return `${ sub }message/${ type }.json`;
};

const postPath = (body={}) => {
  const { thingId } = body;

  if (!thingId) { return 'api/compose'; }

  // `api/comment` is intentional; message replies are treated as
  // comments.
  return 'api/comment';
};

const translateData = data => ({
  api_type: 'json',
  to: data.to,
  from_sr: data.subreddit,
  subject: data.subject,
  text: data.body,
});

export default {
  get(apiOptions, query) {
    const { type } = query;
    return runQuery(apiOptions, 'get', getPath(query), {}, query, parseGetBody);
  },
  post(apiOptions, body) {
    return runForm(apiOptions, 'post', postPath(body), translateData(body), parsePostBody);
  },
};
