import { COMMENT_LOAD_MORE } from '../models2/thingTypes';

// All of these function rely on mutation, either for building the tree,
// or for performance reasons (things like building dictionaryies), use/edit carefully

export function treeifyComments(comments=[]) {
  const commentDict = {};
  comments.forEach(c => {
    commentDict[c.name] = c;
  });

  const topLevelComments = [];

  // build the tree. this relies on references, so mutability is important here
  comments.forEach(c => {
    const parent = commentDict[c.parent_id];
    if (!parent) {
      topLevelComments.push(c);
      return;
    }

    if (!parent.replies) { parent.replies = []; }
    parent.replies.push(c);
  });

  return topLevelComments;
}

export function parseCommentData(data) {
  if (data.kind === 'more') {
    return {
      type: COMMENT_LOAD_MORE,
      children: data.data.children,
      count: data.data.count,
      parent_id: data.data.parent_id
    }
  }

  const comment = data.data;

  if (comment.replies) {
    comment.replies = comment.replies.data.children.map(parseCommentData);
  } else {
    comment.replies = [];
  }

  return comment;
}

const COMMENT_DEFAULTS = {
  numReplies: 0,
  loadMoreIds: [],
  loadMore: false,
};

export function normalizeCommentReplies(comments, isTopLevel, visitComment) {
  return comments.map(comment => {
    if (comment.type === COMMENT_LOAD_MORE) { return; }

    // assign some helpful keys and their defaults to the comment
    Object.assign(comment, COMMENT_DEFAULTS);

    // Filter out if a comment is a "load more" type, set a property on the
    // parent comment, and then nuke the fake "reply"
    const loadMoreIdx = comment.replies.findIndex(c => c.type === COMMENT_LOAD_MORE);
    if (loadMoreIdx > -1) {
      const loadMoreStub = comment.replies[loadMoreIdx];

      comment.numReplies = loadMoreStub.count;
      comment.loadMoreIds = loadMoreStub.children;
      comment.loadMore = true;
      comment.replies = comment.replies.slice(0, loadMoreIdx);
    }

    comment.replies = normalizeCommentReplies(comment.replies, false, visitComment);

    return visitComment(comment, isTopLevel);
  }).filter(c => c);
}
