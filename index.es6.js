import Cache from 'restcache';
import { EventEmitter } from 'events';
import superagent from 'superagent';
import url from 'url';

import activities from './apis/activities';
import hidden from './apis/hidden';
import saves from './apis/saves';
import search from './apis/search';
import stylesheets from './apis/stylesheets';
import subreddits from './apis/subreddits';
import subscriptions from './apis/subscriptions';
import trophies from './apis/trophies';
import accounts from './apis/accounts';
import votes from './apis/votes';
import links from './apis/links';
import comments from './apis/comments';
import captcha from './apis/captcha';
import reports from './apis/reports';
import messages from './apis/messages';
import modListing from './apis/modListing';
import subredditRelationships from './apis/subredditRelationships';
import rules from './apis/rules';
import wiki from './apis/wiki';

import { v1 as _v1, errors as _errors, models as _models } from './old-src/api';

const APIs = {
  activities,
  captcha,
  hidden,
  saves,
  search,
  stylesheets,
  subreddits,
  subscriptions,
  trophies,
  accounts,
  votes,
  links,
  comments,
  reports,
  messages,
  modListing,
  subredditRelationships,
  rules,
  wiki,
};

const DEFAULT_API_ORIGIN = 'https://www.reddit.com';
const AUTHED_API_ORIGIN = 'https://oauth.reddit.com';

const SCOPES = 'history,identity,mysubreddits,read,subscribe,vote,submit,' +
               'save,edit,account,creddits,flair,livemanage,modconfig,' +
               'modcontributors,modflair,modlog,modothers,modposts,modself,' +
               'modwiki,privatemessages,report,wikiedit,wikiread';

class Snoode {
  constructor(config={}) {
    this.config = {
      origin: DEFAULT_API_ORIGIN,
      event: new EventEmitter(),
      userAgent: 'snoodev2',
      ...config,
    };

    this.event = this.config.event;

    this.cache = new Cache(this.buildCacheConfig());

    for (let a in APIs) {
      this[a] = new APIs[a](this);
    }
  }

  buildCacheConfig() {
    let dataTypes = {};

    for (let a in APIs) {
      let API = APIs[a];
      let apiName = (new API({})).api;

      dataTypes[apiName] = API.dataCacheConfig;
    }

    return {
      dataTypes,
    };
  }

  withAuth (token) {
    return new Snoode({...this.config, token});
  }

  withConfig (config) {
    // Merge the new config onto the old and return a new instance
    return new Snoode({...this.config, ...config});
  }

  login (username, pass) {
    return new Promise((r, x) => {
      if (!this.config.oauthAppOrigin) {
        x('Please set up a Reddit Oauth App, and pass in its URL as oauthAppOrigin to config.');
      }

      if (!this.config.clientId) {
        x('Please set up a Reddit Oauth App, and pass in its id as clientId to config.');
      }

      if (!this.config.clientSecret) {
        x('Please set up a Reddit Oauth App, and pass in its secret as clientSecret to config.');
      }

      superagent
        .post(`${this.config.origin}/api/login/${username}`)
        .type('form')
        .send({ user: username, passwd: pass, api_type: 'json' })
        .end((err, res) => {
          if (err || !res.ok) {
            return x(err || res);
          }

          const cookies = (res.header['set-cookie'] || []).map(c => {
            return c.split(';')[0];
          });

          if (res.header['set-cookie'].join('').indexOf('reddit_session')) {
            return this.convertCookiesToAuthToken(cookies).then(r,x);
          }

          x('Invalid login information.');
        });
    });
  }

  loginAndSave(username, pass) {
    this.login(username, pass).then((token) => {
      this.config.token = token.access_token;
      this.config.refreshToken = token.refresh_token;
      this.config.origin = this.config.authedOrigin || AUTHED_API_ORIGIN;
    }, err => { throw err; });
  }

  convertCookiesToAuthToken (cookies) {
    return new Promise((resolve, reject) => {
      if (!cookies) { reject('No cookies passed in'); }

      const endpoint = `${this.config.origin}/api/me.json`;

      const headers = {
        'User-Agent': this.config.userAgent,
        cookie: cookies.join('; '),
        ...this.config.defaultHeaders,
      };

      superagent
        .get(endpoint)
        .set(headers)
        .end((err, res) => {
          if (err || !res.ok) {
            if (err.timeout) { err.status = 504; }
            return reject(err || res);
          }

          if (res.body.error || !res.body.data) {
            return reject(401);
          }

          const modhash = res.body.data.modhash;
          const endpoint = `${this.config.origin}/api/v1/authorize`;

          const redirect_uri = `${this.config.oauthAppOrigin}/oauth2/token`;

          let clientId = this.config.clientId;
          let clientSecret = this.config.clientSecret;

          const postParams = {
            client_id: clientId,
            redirect_uri,
            scope: SCOPES,
            state: modhash,
            duration: 'permanent',
            authorize: 'yes',
          };

          headers['x-modhash'] = modhash;

          superagent
            .post(endpoint)
            .set(headers)
            .type('form')
            .send(postParams)
            .redirects(0)
            .end((err, res) => {
              if (res.status !== 302) {
                return resolve(res.status || 500);
              }

              if (res.body.error) {
                return resolve(401);
              }

              const location = url.parse(res.headers.location, true);
              const code = location.query.code;

              const endpoint = `${this.config.origin}/api/v1/access_token`;

              const postData = {
                grant_type: 'authorization_code',
                code,
                redirect_uri,
              };

              const b = new Buffer(
                `${clientId}:${clientSecret}`
              );

              const s = b.toString('base64');
              const basicAuth = `Basic ${s}`;

              const headers = {
                'User-Agent': this.config.userAgent,
                'Authorization': basicAuth,
                ...this.config.defaultHeaders,
              };

              superagent
                .post(endpoint)
                .set(headers)
                .send(postData)
                .type('form')
                .end(function(err, res) {
                  if (err || !res.ok) {
                    if (err.timeout) { err.status = 504; }
                    reject(err);
                  }

                  return resolve(res.body);
                });
            });
        });
    });
  }
}

export default Snoode;
export const v1 = _v1;
export const models = _models;
export const errors = _errors;
