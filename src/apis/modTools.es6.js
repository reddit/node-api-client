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

export default { remove, approve, distinguish, setStickyComment, DISTINGUISH_TYPES }
