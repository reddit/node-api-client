import { runForm } from '../apiBase/APIRequestUtils';

const PATH = '/api/search_reddit_names.json'

export default {
  get(apiOptions, searchTerm, over18) {
    const query = { query: searchTerm, include_over_18: over18 };
    return runForm(apiOptions, 'post', PATH, query);
  }
}
