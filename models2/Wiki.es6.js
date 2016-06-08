import RedditModel from './RedditModel';
import Record from '../apiBase/Record';

import { WIKI } from './thingTypes';

const T = RedditModel.Types;

export default class Wiki extends RedditModel {
  static type = WIKI;

  static PROPERTIES = {
    contentHTML: T.string,
    contentMD: T.string,
    path: T.string,
    mayRevise: T.bool,
    revisionBy: T.nop,
    revisionDate: T.number,
  }

  static API_ALIASES = {
    content_html: 'contentHTML',
    content_md: 'contentMD',
    may_revise: 'mayRevise',
    revision_by: 'revisionBy',
    revision_date: 'revisionDate',
  }

  makeUUID(data) {
    return data.path;
  }
}
