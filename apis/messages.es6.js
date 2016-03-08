import omit from 'lodash/object/omit';
import BaseAPI from './base.es6.js';
import Comment from '../models/comment.es6.js';
import Link from '../models/comment.es6.js';
import Message from '../models/message.es6.js';

const CONSTRUCTORS = {
  t1: Comment,
  t3: Link,
  t4: Message,
};

export default class Messages extends BaseAPI {
  static dataCacheConfig = undefined;

  get requestCacheRules() {
    return undefined;
  }

  put = this.notImplemented('put');
  patch = this.notImplemented('patch');
  del = this.notImplemented('del');

  formatQuery(query, method) {
    return {
      ...omit(query, 'thingId'),
      api_type: 'json',
      mark: true,
      thing_id: query.thingId,
    };
  }

  path(method, query={}) {
    if (method === 'get') { return `message/${query.view || 'inbox'}`; }
    if (!query.thingId) { return 'api/compose'; }
    return 'api/comment';
  }

  formatBody(res, req) {
    const { body } = res;

    switch(req.method) {
      case 'GET': {
        if (body) {
          return body.data.children.map(data => {
            const constructor = CONSTRUCTORS[data.kind];
            return new constructor(data.data).toJSON();
          });
        }
      }
      case 'POST': {
        if (body && body.json) {
          const message = body.json.things[0].data;
          return new Message(message).toJSON();
        } else if (body && body.json.errors.length) {
          throw body.json.errors;
        } else {
          return res;
        }
      }
    }
  }
}
