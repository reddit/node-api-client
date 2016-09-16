import Listing from './Listing';
import SavedEndpoint from '../apis/SavedEndpoint';

export default class SavedPostsAndComments extends Listing {
  static endpoint = SavedEndpoint;

  static fetch(apiOptions, userOrOptions, options={}) {
    if (typeof userOrOptions === 'string') {
      options.user = userOrOptions;
    } else {
      options = userOrOptions || {};
    }

    return super.fetch(apiOptions, options);
  }

  get postsAndComments() {
    return this.apiResponse.results.map(this.apiResponse.getModelFromRecord);
  }
}
