import {
  COMMENT_LOAD_MORE,
  COMMENT,
  COMMENT_CONTINUE_THREAD,
} from '../models2/thingTypes';
import CommentModel from '../models2/CommentModel';
import LoadMoreModel from '../models2/LoadMoreModel';
import ContinueModel from '../models2/ContinueModel';


// All of these function rely on mutation, either for building the tree,
// or for performance reasons (things like building dictionaries), use/edit carefully

export function treeifyComments(comments=[]) {
  const commentDict = {};
  comments.forEach(c => {
    const comment = c.data;
    commentDict[comment.name] = comment;
  });

  const topLevelComments = [];

  // build the tree. this relies on references, so mutability is important here
  comments.forEach(c => {
    const comment = c.data;
    const parent = commentDict[comment.parent_id];
    if (!parent) {
      topLevelComments.push(c);
      return;
    }

    if (!parent.replies) { parent.replies = { data: { children: [] } }; }
    parent.replies.data.children.push(c);
  });

  return topLevelComments;
}

function getType(comment) {
  if (comment.kind === 'more') {
    if (comment.data.id === '_') {
      return COMMENT_CONTINUE_THREAD;
    }

    return COMMENT_LOAD_MORE;
  } else if (comment.kind === 't1') {
    return COMMENT;
  }
}

/**
 * takes the apiResponse and passes it to a function that recursively instantiates
 * the comments/loadMore/continueThread objects and adds them to apiResponse
 * @function
 * @param apiResponse
 * @returns build function
 **/
export const buildCommentsModels = (apiResponse, comments) => {
  const build = (comments, depth=0) => comments.forEach(data => {
    const comment = data.data ? data.data : data;
    comment.depth = depth;
    const type = getType(data);

    switch (type) {
      case COMMENT: {
        comment.replies = comment.replies ? comment.replies.data.children : [];
        const commentModel = CommentModel.fromJSON(comment);

        apiResponse.addResult(commentModel);
        build(comment.replies, depth + 1);
        break;
      }

      case COMMENT_LOAD_MORE: {
        const loadMoreModel = LoadMoreModel
          .fromJSON(comment);

        apiResponse.addResult(loadMoreModel);
        break;
      }

      case COMMENT_CONTINUE_THREAD: {
        const continueModel = ContinueModel
          .fromJSON(comment);

        apiResponse.addResult(continueModel);
        break;
      }
    }
  });

  return build(comments);
};
