import RedditModel from './RedditModel';
import Record from '../apiBase/Record';

import { COMMENT_CONTINUE_THREAD } from './thingTypes';

const T = RedditModel.Types;

export default class ContinueThreadModel extends RedditModel {
  static type = COMMENT_CONTINUE_THREAD;

  static PROPERTIES = {
    parentId: T.string,
    id: T.string,
    depth: T.number,
  }

  static API_ALIASES = {
    parent_id: 'parentId',
  }

  makeUUID() {
    return (Math.random() * 16).toFixed();
  }

  toRecord() {
    const record = new Record(this.type, this.uuid, this.paginationId);
    record.depth = this.depth;
    return record;
  }
}
