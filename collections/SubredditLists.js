import { fetchAll } from '../apiBase/APIResponsePaging';
import Listing from './Listing';
import SubredditEndpoint from '../apis/SubredditEndpoint';

export class SubredditList extends Listing {
  static view = '';
  static limit = 100;
  static endpoint = SubredditEndpoint;

  static baseOptions() {
    return { sort: this.view, limit: this.limit };
  }

  static async fetch(apiOptions, all=true) {
    if (all) {
      const { get } = SubredditEndpoint;
      const allMergedSubreddits = await fetchAll(get, apiOptions, this.baseOptions());
      return new this(allMergedSubreddits);
    }

    const firstPage = await this.getResponse(apiOptions);
    return new this(firstPage);
  }

  get subreddits() {
    return this.apiResponse.results.map(this.apiResponse.getModelFromRecord);
  }
}

export class SubscribedSubreddits extends SubredditList {
  static view = 'mine/subscriber';
}

export class ModeratingSubreddits extends SubredditList {
  static view = 'mine/moderator';
}

export class ContributingSubreddits extends SubredditList {
  static view = 'mine/contributor';
}
