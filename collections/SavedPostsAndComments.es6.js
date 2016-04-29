import Listing from './Listing';

export default class SavedPostsAndComments extends Listing {
  static endpoint = 'saved';

  static fetch(api, user, options={}) {
    options.user = user;

    return super.fetch(api, options);
  }

  get postsAndComments() {
    return this.apiResponse.results.map(this.apiResponse.getModelFromRecord);
  }
}
