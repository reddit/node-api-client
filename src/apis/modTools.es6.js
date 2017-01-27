import apiRequest from '../apiBase/apiRequest';

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

const distinguish = (apiOptions, fullname, distinguishType) => {
  // Distinguish a link or comment

  const distinguishTypeMap = {
    'moderator': 'yes',
    '': 'no',
  };

  const body = {
    how: distinguishTypeMap[distinguishType],
    id: fullname,
  };
  return apiRequest(apiOptions, 'POST', 'api/distinguish', { body, type: 'form' });
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

export default { remove, approve, distinguish, setSubredditSticky, DISTINGUISH_TYPES }
