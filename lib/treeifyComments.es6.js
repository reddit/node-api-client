export default function treeifyComments(comments=[]) {
  // convert the list into a dict
  const commentDict = comments.reduce((prev, cur) => ({ ...prev, [cur.name]: cur }), {});

  // build the tree. this relies on references, so mutability is important here
  comments.forEach(c => {
    const parent = commentDict[c.parent_id];
    if (!parent) { return; } // handles top level comments
    if (!parent.replies) { parent.replies = []; }
    parent.replies.push(c);
  });

  // return the top level comments
  return comments.filter(c => !commentDict[c.parent_id]);
}
