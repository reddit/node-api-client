import Listing from './Listing';

export default class CommentsPage extends Listing {
  static endpoint = 'comments';

  static fetch(api, id) {
    return super.fetch(api, { id });
  }

  get topLevelComments() {
    return this.apiResponse.results.map(this.apiResponse.getModelFromRecord);
  }

  replies(comment) {
    return comment.replies.map(this.apiResponse.getModelFromRecord);
  }
}
