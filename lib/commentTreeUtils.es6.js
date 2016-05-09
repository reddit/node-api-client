import { COMMENT_LOAD_MORE } from '../models2/thingTypes';

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

export function normalizeCommentReplies(comments, visitComment) {
  return _normalizeCommentReplies(comments, visitComment, true);
}

function _normalizeCommentReplies(comments, visitComment, isTopLevel) {
  if (!comments.length) { return; }

  return comments.map(comment => {
    if (comment.type === COMMENT_LOAD_MORE) { return; }

    // Filter out if a comment is a "load more" type, set a property on the
    // parent comment, and then nuke the fake "reply"
    if (comment.replies) {
      const loadMore = comment.replies.findIndex(c => c.type === COMMENT_LOAD_MORE);

      if (loadMore > -1) {
        comment.numReplies = comment.replies[loadMore].count;
        comment.loadMore = true;
        comment.replies.splice(loadMore, 1);
      }

      comment.replies = _normalizeCommentReplies(comment.replies, visitComment, false);
    }

    return visitComment(comment, isTopLevel);
  }).filter(c => c);
}
