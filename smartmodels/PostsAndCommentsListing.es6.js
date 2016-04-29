import Listing from './Listing';

export class PostsAndCommentsListing extends Listing {

}

export class PostsFromSubreddit extends PostsAndCommentsListing {
  static endpoint = 'links';

  static fetch(subredditName, api) {
    let options;
    if (subredditName) {
      options = { subredditName };
    }

    return super.fetch(api, options);
  }

  get posts() {
    return this.apiResponse.results.map(this.apiResponse.getModelFromRecord);
  }
}

// TODO: need to add user here
export class SavedPostsAndComments extends PostsAndCommentsListing {
  static endpoint = 'saved';

  get postsAndComments() {
    return this.apiResponse.results.map(this.apiResponse.getModelFromRecord);
  }
}

export class HiddenPostsAndComments extends PostsAndCommentsListing {
  static endpoint = 'hidden';

  get postsAndComments() {
    return this.apiResponse.results.map(this.apiResponse.getModelFromRecord);
  }
}
