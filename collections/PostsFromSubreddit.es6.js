import Listing from './Listing';
import LinksEndpoint from '../apis/links';

export default class PostsFromSubreddit extends Listing {
  static endpoint = LinksEndpoint;

  static fetch(api, subredditNameOrOptions, options={}) {
    if (typeof subredditNameOrOptions === 'string') {
      options.subredditName = subredditNameOrOptions;
    } else {
      options = subredditNameOrOptions || {};
    }

    return super.fetch(api, options);
  }

  get posts() {
    return this.apiResponse.results.map(this.apiResponse.getModelFromRecord);
  }
}
