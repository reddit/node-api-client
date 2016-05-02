import SavedPostsAndComments from './SavedPostsAndComments';
import HiddenEndpoint from '../apis/HiddenEndpoint';

export class HiddenPostsAndComments extends SavedPostsAndComments {
  static endpoint = HiddenEndpoint;
}
