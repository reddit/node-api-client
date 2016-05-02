import Listing from './Listing';
import PostsEndpoint from '../apis/PostsEndpoint';

export default class PostsFromSubreddit extends Listing {
  static endpoint = PostsEndpoint;

  static fetch(apiOptions, subredditNameOrOptions, options={}) {
    if (typeof subredditNameOrOptions === 'string') {
      options.subredditName = subredditNameOrOptions;
    } else {
      options = subredditNameOrOptions || {};
    }

    return super.fetch(apiOptions, options);
  }

  get posts() {
    return this.apiResponse.results.map(this.apiResponse.getModelFromRecord);
  }
}
