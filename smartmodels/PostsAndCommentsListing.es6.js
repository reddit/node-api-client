import Listing from './Listing';

export class PostsAndCommentsListing extends Listing {

}

export class PostsFromSubreddit extends PostsAndCommentsListing {
  static endpoint = 'links';

  static fetch(api, subredditName, options={}) {
    if (subredditName) {
      options.subredditName = subredditName;
    }

    return super.fetch(api, options);
  }

  get posts() {
    return this.apiResponse.results.map(this.apiResponse.getModelFromRecord);
  }
}

export class SavedPostsAndComments extends PostsAndCommentsListing {
  static endpoint = 'saved';

  static fetch(api, user, options={}) {
    options.user = user;

    return super.fetch(api, options);
  }

  get postsAndComments() {
    return this.apiResponse.results.map(this.apiResponse.getModelFromRecord);
  }
}

export class HiddenPostsAndComments extends SavedPostsAndComments {
  static endpoint = 'hidden';
}
