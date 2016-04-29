import { fetchAll } from '../apis/APIResponsePaging';
import Listing from './Listing';

export class SubredditList extends Listing {
  static view = '';
  static limit = 100;
  static endpoint = 'subreddits';

  static baseOptions() {
    return { sort: this.view, limit: this.limit };
  }

  static async fetch(api, all=true) {
    if (all) {
      const allMergedSubreddits = await fetchAll(api.subreddits.get, this.baseOptions());
      return new this(allMergedSubreddits);
    }

    const firstPage = await this.getResponse(api);
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
