import BaseAPI from './baseContent.es6.js';
import Rule from '../models/rule.es6.js';
import has from 'lodash/object/has';

const SUBREDDIT_REGEX =  /.*\/r\/(.+)\/about\/rules\.json.*/;
const ADD_RULE_PATH = 'api/add_subreddit_rule';
const REMOVE_RULE_PATH = 'api/remove_subreddit_rule';
const UPDATE_RULE_PATH = 'api/update_subreddit_rule';

export default class Rules extends BaseAPI {
  static dataCacheConfig = null;

  get requestCacheRules() { return null; }

  model = Rule;

  move = this.notImplemented('move');
  copy = this.notImplemented('copy');
  put = this.notImplemented('put');

  formatQuery(query, method) {
    if (method !== 'get') {
      query._method = 'post';
    }
    query.raw_json = 1;
    query.api_type = 'json';

    return query;
  }

  path(method, query={}) {
    if (method === 'get') {
      return `r/${query.subredditName}/about/rules.json`;
    } else if (method === 'post') {
      return ADD_RULE_PATH;
    } else if (method === 'patch') {
      return UPDATE_RULE_PATH;
    } else if (method === 'del') {
      return REMOVE_RULE_PATH;
    }
  }

  post(data) {
    const postData = {
      api_type: 'json',
      short_name: data.short_name,
      description: data.description,
      kind: data.kind || 'all',
      r: data.subredditName || data.r,
    };

    return super.post(postData);
  }

  patch(id, changes={}) {
    const patchData = {
      r: id.r || id.subredditName,
      short_name: id.short_name,
    };

    if (changes.short_name) {
      patchData.old_short_name = patchData.short_name;
    }

    return super.patch({
      ...patchData,
      ...changes,
    });
  }

  del(data) {
    return super.del({
      api_type: 'json',
      r: data.subredditName || data.r,
      short_name: data.short_name,
    });
  }

  formatBody(res, req) {
    const { body } = res;

    if (req.method === 'GET') {
      return this.formatGetBody(body, res, req);
    } else if (req.url.indexOf(ADD_RULE_PATH) > -1) {
      return this.formatAddRuleBody(body, res, req);
    } else if (req.url.indexOf(UPDATE_RULE_PATH) > -1) {
      return this.formatUpdateRuleBody(body, res, req);
    } else if (req.url.indexOf(REMOVE_RULE_PATH) > -1) {
      return this.formatRemoveRuleBody(body);
    }
  }

  formatGetBody(body, res, req) {
    let r;
    const match = req.url.match(SUBREDDIT_REGEX);
    if (match && match.length > 1) {
      r = match[1];
    }

    let subredditRules = [];
    if (has(body, 'rules') && Array.isArray(body.rules)) {

      subredditRules = body.rules.map(function(ruleData) {
        return new Rule({ ...ruleData, r}).toJSON();
      });
    }

    let siteRules = [];
    if (has(body, 'site_rules') && Array.isArray(body.site_rules)) {
      siteRules = body.site_rules;
    }

    return {
      subredditRules,
      siteRules,
    };
  }

  formatAddRuleBody(body, res, req) {
    if (has(body, 'json.errors') && body.json.errors.length) {
      throw body.json.errors;
    }

    // Have to pull the object back from the request..
    if (body.json) {
      const ruleData = this.getRuleData(req._data);
      if (has(body, 'json.data.description_html')) {
        ruleData.description_html = body.json.data.description_html;
      }

      return new Rule(ruleData).toJSON();
    }
  }

  formatUpdateRuleBody(body, res, req) {
    console.log('runing patch body');
    return { body, res, req };
  }

  formatRemoveRuleBody(body) {
    console.log('running remove');
    if (has(body, 'json.errors') && body.json.errors.length) {
      throw body.json.errors;
    }
  }

  getRuleData(requestData) {
    return {
      kind: requestData.kind || 'all',
      description: requestData.description || '',
      description_html: '',
      short_name: requestData.short_name,
      r: requestData.r,
    };
  }
}
