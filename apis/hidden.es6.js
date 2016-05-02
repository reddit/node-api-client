import SavedOrHiddenEndpoint from './SavedAndHiddenCommon';

const getPath = (query) => {
  return `user/${query.user}/hidden.json`;
};

export default SavedOrHiddenEndpoint(
  getPath,
  'api/unhide',
  'api/hide',
);
