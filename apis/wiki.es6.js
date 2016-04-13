import BaseAPI from './base.es6.js';

import Link from '../models/link';
import WikiPage from '../models/wikiPage';
import WikiRevision from '../models/wikiRevision';
import WikiPageListing from '../models/wikiPageListing';
import WikiPageSettings from '../models/wikiPageSettings';

export default class Votes extends BaseAPI {
  static defaultCacheConfig = null;

  get requestCacheRules() { return null; }

  move = this.notImplemented('move');
  copy = this.notImplemented('copy');
  put = this.notImplemented('put');
  del = this.notImplemented('del');

  path(method, query={}) {
    const { subredditName, path } = query;
    if (method === 'get') {
      if (subredditName) {
        return `r/${subredditName}/wiki/${path}.json`;
      }

      return `wiki/${path}.json`;
    }

    return `r/${subredditName}/api/wiki/${path}.json`;
  }

  patch(data) {
    data._method = 'post';
    return super.patch(data);
  }

  formatBody(res, req) {
    const { body } = res;

    if (req.method === 'GET') {
      const type = body.type || body.kind;

      switch (type) {
        case 'wikipage':
          return new WikiPage(body.data).toJSON();
        case 'Listing':
          if (body.data && body.data.children) {
            const children = body.data.children;
            // when either discussions or revisions requests have nothing to show
            // the response looks identical, so we pass in a type when the request
            // is made.
            if (req.url.includes('/wiki/discussions')) {
              return {
                conversations: children.map(c => new Link(c.data).toJSON()),
                _type: 't3',
              };
            } else if (req.url.includes('/wiki/revisions')) {
              return {
                revisions: children.map(c => new WikiRevision(c).toJSON()),
                _type: 'WikiRevision',
              };
            }
          }
          break;
        case 'wikipagelisting':
          return new WikiPageListing(body).toJSON();
        case 'wikipagesettings':
          return new WikiPageSettings(body.data).toJSON();
      }
    } else {
      return body;
    }
  }
}
