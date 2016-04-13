import BaseAPI from './base.es6.js';
import Vote from '../models/vote.es6.js';

import ValidationError from '../errors/validationError';

export default class Votes extends BaseAPI {
  static defaultCacheConfig = null;

  get requestCacheRules() { return null; }

  model = Vote;

  move = this.notImplemented('move');
  copy = this.notImplemented('copy');
  get = this.notImplemented('get');
  put = this.notImplemented('put');
  patch = this.notImplemented('patch');
  del = this.notImplemented('del');

  path() {
    return `api/vote`;
  }

  post(data) {
    const vote = new Vote(data);
    const valid = vote.validate();

    if (valid !== true) {
      throw new ValidationError('Vote', vote, valid);
    }

    let likes;
    if (data.direction === -1) {
      likes = false;
    } else if (data.direction === 1) {
      likes = true;
    }

    return super.post({
      id: data.id,
      dir: data.direction,
      likes,
      score: data.score,
    });
  }
}
