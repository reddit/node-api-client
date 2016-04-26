import Comment from '../models/comment';

// All of these function rely on mutation, either for building the tree,
// or for performance reasons (things like building dictionaryies), use/edit carefully

export function treeifyComments(comments=[]) {
  const commentDict = {};
  comments.forEach(c => {
    commentDict[c.uuid] = c;
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

export function parseCommentList(commentList) {
  return commentList.map(parseCommentData);
}

function parseCommentData(data) {
  const comment = data.data;
  if (comment.replies) {
    comment.replies = comment.replies.data.children.map(parseCommentData);
  } else {
    comment.replies = [];
  }

  return new Comment(comment).toJSON();
}

export function normalizeCommentReplies(comments, visitComment) {
  return _normalizeCommentReplies(comments, visitComment, true);
}

function _normalizeCommentReplies(comments, visitComment, isTopLevel) {
  if (!comments.length) { return; }

  return comments.map(comment => {
    comment.replies = _normalizeCommentReplies(comment.replies, visitComment, false);
    return visitComment(comment, isTopLevel);
  });
}
