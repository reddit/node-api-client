import SavedPostsAndComments from './SavedPostsAndComments';
import HiddenEndpoint from '../apis/HiddenEndpoint';

export default class HiddenPostsAndComments extends SavedPostsAndComments {
  static endpoint = HiddenEndpoint;
}
