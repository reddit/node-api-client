import apiRequest from '../apiBase/apiRequest';

/**
 * Valid distinguish types.
 * Note that the API endpoint used to distinguish posts and comments accepts
 * 'yes' instead of 'moderator' and 'no' instead of ''.  See #distinguish
 * @enum
 */
const DISTINGUISH_TYPES = {
  NONE: '',
  MODERATOR: 'moderator',
  ADMIN: 'admin',
};

const remove = (apiOptions, fullname, spam) => {
  // Remove a link, comment, or modmail message.
  const body = {
    id: fullname,
    spam: spam
  };

  return apiRequest(apiOptions, 'POST', 'api/remove', { body, type: 'form' });
}

const approve = (apiOptions, fullname) => {
  // Approve a link or comment
  const body = { id: fullname };
  return apiRequest(apiOptions, 'POST', 'api/approve', { body, type: 'form' });
}

/**
 * Distinguish a link or comment
 * @function
 * @param {Object} apiOptions
 * @param {string} fullname The fullname of the target comment
 * @param {DISTINGUISH_TYPES} distinguishType What type of distinguish is being set
 * @param {?bool} [_sticky] For internal use by #setStickyComment
 */
const distinguish = (apiOptions, fullname, distinguishType, _sticky=null) => {
  const distinguishTypeMap = {
    [DISTINGUISH_TYPES.MODERATOR]: 'yes',
    [DISTINGUISH_TYPES.NONE]: 'no',
  };

  const body = {
    id: fullname,
  };
  const how = distinguishTypeMap[distinguishType] || distinguishType;

  if (_sticky !== null) {
    body.sticky = _sticky;
  }

  return apiRequest(apiOptions, 'POST', `api/distinguish/${how}`, { body, type: 'form' });
}

const markNSFW = (apiOptions, id) => {
  // Mark a link as NSFW
  const body = { id };
  return apiRequest(apiOptions, 'POST', 'api/marknsfw', { body, type: 'form' });
}

const unmarkNSFW = (apiOptions, id) => {
  // Unmark a link as NSFW
  const body = { id };
  return apiRequest(apiOptions, 'POST', 'api/unmarknsfw', { body, type: 'form' });
}

const lock = (apiOptions, id) => {
  // Lock a link
  const body = { id };
  return apiRequest(apiOptions, 'POST', 'api/lock', { body, type: 'form' });
}

const unlock = (apiOptions, id) => {
  // Unlock a link
  const body = { id };
  return apiRequest(apiOptions, 'POST', 'api/unlock', { body, type: 'form' });
}

/**
 * Set or unset a stickied post (AKA an "Annoucement").
 * See also: https://www.reddit.com/dev/api#POST_api_set_subreddit_sticky
 * @function
 * @param {Object} apiOptions
 * @param {string} fullname The fullname of the target post
 * @param {boolean} isStickied Whether to sticky or unsticky the post
 * @param {?number} [stickyNum] Allows for specifying the "slot" to sticky the post
 *      into, or for specifying which post to unsticky.
 */
const setSubredditSticky = (apiOptions, fullname, isStickied, stickyNum=null) => {
  const body = {
    id: fullname,
    state: isStickied,
  };

  if (stickyNum) {
    body.num = stickyNum;
  }

  return apiRequest(apiOptions, 'POST', 'api/set_subreddit_sticky', { body, type: 'form' });
}

/**
 * Sticky or unsticky a comment.
 * Sticky comments are a special case of distinguished comments, and are done
 * through the same API endpoint (api/distinguish).  That endpoint also handles
 * distinguishing posts, but it does *not* handle sticky posts.  To avoid
 * confusion, we'll keep sticky comments separated here.
 * @function
 * @param {Object} apiOptions
 * @param {string} fullname The fullname of the target comment
 * @param {boolean} isStickied Whether to sticky or unsticky the comment
 */
const setStickyComment = (apiOptions, fullname, isStickied) => {
  const distinguishType = isStickied ? DISTINGUISH_TYPES.MODERATOR : DISTINGUISH_TYPES.NONE;
  return distinguish(apiOptions, fullname, distinguishType, isStickied);
};

export default {
  remove,
  approve,
  distinguish,
  markNSFW,
  unmarkNSFW,
  lock,
  unlock,
  setStickyComment,
  setSubredditSticky,
  DISTINGUISH_TYPES,
};
