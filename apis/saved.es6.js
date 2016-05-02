import SavedOrHiddenEndpoint from './SavedAndHiddenCommon';

const getPath = (query) => {
  return `user/${query.user}/saved.json`;
};

export default SavedOrHiddenEndpoint(
  getPath,
  'api/unsave',
  'api/save',
);
