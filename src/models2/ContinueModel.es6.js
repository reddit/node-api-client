import RedditModel from './RedditModel';
import { DepthRecord } from '../apiBase/Record';

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
    return `${this.parentId}-${COMMENT_CONTINUE_THREAD}`;
  }

  toRecord() {
    return new DepthRecord(this.type,
                           this.uuid,
                           this.paginationId,
                           this.depth);
  }
}
