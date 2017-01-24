import RedditModel from './RedditModel';
import Record from '../apiBase/Record';

import { COMMENT_LOAD_MORE } from './thingTypes';

const T = RedditModel.Types;

export default class LoadMoreModel extends RedditModel {
  static type = COMMENT_LOAD_MORE;

  static PROPERTIES = {
    parentId: T.string,
    children: T.arrayOf(T.string),
    count: T.number,
    depth: T.number,
  }

  static API_ALIASES = {
    parent_id: 'parentId',
  }

  toRecord() {
    const record = new Record(this.type, this.uuid, this.paginationId);
    record.depth = this.depth;
    return record;
  }
}
