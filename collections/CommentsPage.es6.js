import Listing from './Listing';
import CommentsEndpoint from '../apis/CommentsEndpoint';
import NotImplementedError from '../apiBase/errors/NotImplementedError';

export default class CommentsPage extends Listing {
  static endpoint = CommentsEndpoint

  static fetch(apiOptions, id) {
    if (typeof id === 'string') {
      id = { id };
    }

    return super.fetch(apiOptions, id);
  }

  static fetchMoreChildren(apiOptions, comment) {
    return super.fetch(apiOptions, { ids: comment.children });
  }

  get topLevelComments() {
    return this.apiResponse.results.map(this.apiResponse.getModelFromRecord);
  }

  replies(comment) {
    return comment.replies.map(this.apiResponse.getModelFromRecord);
  }

  async nextResponse() {
    throw new NotImplementedError('comments collection pageing not supported yet');
  }

  async prevResponse() {
    throw new NotImplementedError('comments collection pageing not supported yet');
  }
}
