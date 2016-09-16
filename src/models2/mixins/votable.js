import mixin from './mixin';
import votes from '../../apis/VoteEndpoint';

export function upvote (apiOptions) {
  // If already upvoted, cancel out the upvote.
  return this._vote(apiOptions, 1);
}

export function downvote (apiOptions) {
  // If already downvoted, cancel out the upvote.
  return this._vote(apiOptions, -1);
}

export function _vote (apiOptions, direction) {
  const oldModel = this;

  const undoingVote = direction === this.likes;
  const newLikes = undoingVote ? 0 : direction;
  const newScore = undoingVote
    ? this.score - direction
    : this.score - this.likes + direction;

  const stub = this.stub({
    likes: newLikes,
    score: newScore,
  }, async (resolve, reject) => {
    try {
      const endpoint = direction === 0 ? votes.del : votes.post;
      await endpoint(apiOptions, { thingId: oldModel.name, direction });
      return stub;
    } catch (e) {
      console.log(e);
      throw oldModel;
    }
  });

  return stub;
}

export default (cls) => mixin(cls, { upvote, downvote, _vote });
