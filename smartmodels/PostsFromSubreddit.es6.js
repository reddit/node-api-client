import Listing from './Listing';

export default class PostsFromSubreddit extends Listing {
  static endpoint = 'links';

  static fetch(api, subredditName, options={}) {
    return super.fetch(api, options);
  }

  get posts() {
    return this.apiResponse.results.map(this.apiResponse.getModelFromRecord);
  }
}
