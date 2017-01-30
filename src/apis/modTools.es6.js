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

export default { remove, approve, distinguish, DISTINGUISH_TYPES }
