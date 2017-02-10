import RedditModel from './RedditModel';
import { DepthRecord } from '../apiBase/Record';

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

  makeUUID() {
    return `${this.parentId}-${COMMENT_LOAD_MORE}`;
  }

  toRecord() {
    return new DepthRecord(this.type,
                           this.uuid,
                           this.paginationId,
                           this.depth);
  }
}
