import apiRequest from '../apiBase/apiRequest';
import SubredditRule from '../models2/SubredditRule';

const ADD_RULE_PATH = 'api/add_subreddit_rule';
const REMOVE_RULE_PATH = 'api/remove_subreddit_rule';
const UPDATE_RULE_PATH = 'api/update_subreddit_rule';

export default {
  /**
   * Get the rules for the given subreddit.
   * Models are added to the APIResponse object, and can be retrieved using
   * its `getModelFromRecord` method.  E.g.
   * 
   *    const res = await SubredditRulesEndpoint.get(apiOptions, { id: 'beta' });
   *    const rules = res.results.map(r => res.getModelFromRecord(r));
   * 
   * @function
   * @param {Object} apiOptions
   * @param {string} subredditName The name of a subreddit
   * @returns {Promise<Object>} A promise resolving with the ApiResponse
   */
  async get(apiOptions, subredditName) {
    const path = `r/${subredditName}/about/rules.json`;
    const query = {
      raw_json: 1,
    };

    const apiResponse = await apiRequest(apiOptions, 'GET', path, { query });
    const { rules } = apiResponse.response.body;
    
    if (!(rules && rules.length)) { return apiResponse; }

    rules.forEach(rule => {
      // The SubredditRule model expects the rule to contain the name of the
      // subreddit to which the rule belongs in order to make UUIDs. That is 
      // not actually returned from the API, though, so add it now.
      rule.subredditName = subredditName;
      apiResponse.addResult(SubredditRule.fromJSON(rule))
    });

    return apiResponse;
  },

  /**
   * Create a new subreddit rule.
   * 
   * @function 
   * @param {Object} apiOptions
   * @param {string} subredditName The name of a subreddit
   * @param {Object} data
   * @param {string} data.description Markdown formatted description of the rule
   * @param {SubredditRule~RULE_TARGET} data.kind The types of things the rule applies to
   * @param {string} data.shortName A short, plaintext title for the rule
   * @param {?string} data.violationReason A short, plaintext string to use for reporting
   *    a violation of the rule.  If omitted, the shortName will be used.
   */
  async post(apiOptions, subredditName, data) {
    const path = ADD_RULE_PATH;
    const body = {
      api_type: 'json',
      raw_json: 1,
      r: subredditName,
      description: data.description,
      kind: data.kind,
      short_name: data.shortName,
    };

    if (data.violationReason) {
      body.violation_reason = data.violation_reason;
    }

    return apiRequest(apiOptions, 'POST', path, { body, type: 'form' });
  },

  /**
   * Update a subreddit rule.
   * @function
   * @param {Object} apiOptions
   * @param {string} subredditName The name of a subreddit
   * @param {string} shortName The target rule's current shortName
   * @param {Object} data
   * @param {string} data.description Markdown formatted description of the rule
   * @param {SubredditRule~RULE_TARGET} data.kind The types of things the rule applies to
   * @param {string} data.shortName A short, plaintext title for the rule
   */
  async put(apiOptions, subredditName, shortName, data) {
    const path = UPDATE_RULE_PATH;
    const body = {
      api_type: 'json',
      raw_json: 1,
      r: subredditName,
      old_short_name: shortName,
      description: data.description,
      kind: data.kind,
      short_name: data.shortName,
    };

    // Reddit's API will return the value of short_name if violation_reason doesn't exist.
    // To support pulling down a rule, editing an unrelated field (e.g. description) and
    // putting it back to the API w/o side effects, we should treat violationReason as empty
    // if it is identical to shortName.  It's necessary to use the old value of shortName
    // here so that we don't keep it as the violationReason if only the shortName changes.
    if (data.violationReason && data.violationReason !== shortName) {
      data.violation_reason = data.violationReason;
    }

    return apiRequest(apiOptions, 'POST', path, { body, type: 'form' });
  },

  /**
   * Delete a subreddit rule.
   * @function
   * @param {Object} apiOptions
   * @param {string} subredditName The name of a subreddit
   * @param {string} shortName The target rule's current shortName
   */
  async del(apiOptions, subredditName, shortName) {
    const path = REMOVE_RULE_PATH;
    const body = {
      api_type: 'json',
      raw_json: 1,
      r: subredditName,
      short_name: shortName,
    };

    return apiRequest(apiOptions, 'POST', path, { body, type: 'form' });
  },
};
