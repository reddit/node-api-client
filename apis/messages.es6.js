import { omit } from 'lodash/object';
import BaseEndpoint from '../apiBase/BaseEndpoint';
import Comment from '../models2/Comment';
import Link from '../models2/Link';
import Message from '../models/message';

const CONSTRUCTORS = {
  t1: Comment,
  t3: Link,
  t4: Message,
};

export default class MessagesEndpoint extends BaseEndpoint {
  move = this.notImplemented('move');
  copy = this.notImplemented('copy');
  put = this.notImplemented('put');
  patch = this.notImplemented('patch');
  del = this.notImplemented('del');

  formatQuery(query) {
    return {
      ...omit(query, 'thingId'),
      api_type: 'json',
      mark: true,
      thing_id: query.thingId,
    };
  }

  path(method, query={}) {
    const { subreddit, view, thingId } = query;
    if (method === 'get') {
      const sub = subreddit ? `r/${subreddit}/` : '';
      return `${sub}message/${view || 'inbox'}`;
    }
    if (!thingId) { return 'api/compose'; }
    return 'api/comment';
  }

  parseBody(res, apiResponse, req, method) {
    const { body } = res;

    if (method === 'get') {
      if (!body) { return; }

      body.data.children.forEach(datum => {
        const thing = datum.data;
        // const thing = new CONSTRUCTORS[datum.kind](datum.data).toJSON();

        if (datum.kind === 't4' && thing.replies && thing.replies.data
            && thing.replies.data.children) {

          thing.replies = thing.replies.data.children.map(messageDatum => {
            const message = new Message(messageDatum.data).toJSON();
            apiResponse.addModel(message);
            return apiResponse.makeRecord(message);
          });
        }

        apiResponse.addResult(CONSTRUCTORS[datum.kind].fromJSON(thing));
      });
    } else if (method === 'post') {
      if (body && body.json) {
        const message = body.json.things[0].data;
        apiResponse.addResult(new Message(message).toJSON());
      } else if (body && body.json.errors.length) {
        throw body.json.errors;
      } else {
        apiResponse.addResult(res);
      }
    }
  }
}
