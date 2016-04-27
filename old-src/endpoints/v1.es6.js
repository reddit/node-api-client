import superagent from 'superagent';

import Cache from '@r/rest-cache';
import has from 'lodash/object/has';

import Account from '../../models/account';
import Award from '../../models/award';
import BlockedUser from '../../models/BlockedUser';
import Comment from '../../models/comment';
import Link from '../../models/link';
import Message from '../../models/message';
import Multi from '../../models/multi';
import MultiSubscription from '../../models/multiSubscription';
import Subreddit from '../../models/subreddit';
import Stylesheet from '../../models/stylesheet';
import Preferences from '../../models/preferences';
import WikiPage from '../../models/wikiPage';
import WikiRevision from '../../models/wikiRevision';
import WikiPageListing from '../../models/wikiPageListing';
import WikiPageSettings from '../../models/wikiPageSettings';

import NoModelError from '../../errors/noModelError';
import ValidationError from '../../errors/validationError';
import ResponseError from '../../errors/responseError';

import treeifyComments from '../../lib/treeifyComments';

const TYPES = {
  COMMENT: 't1',
  USER: 't2',
  LINK: 't3',
  MESSAGE: 't4',
};

function res_type(str) {
  return str.split(/ *; */).shift();
}

function massageAPIv1JsonRes(res) {
  // API v1 actually returns JSON with extra HTML escaping surprises,
  // re-parse the body in that case.
  if (res_type(res.headers['content-type'] || '') === 'application/json') {
    const text = res.text && res.text.replace(/^\s*|\s*$/g, '');
    res.body = text && JSON.parse(text);
  }
}

function processMeta(headers, body) {
  let meta = {
    moose: headers['x-moose'],
    tracking: headers['x-reddit-tracking'],
  };

  if (body.hasOwnProperty('before')) {
    meta.before = body.before;
  }

  if (body.hasOwnProperty('after')) {
    meta.after = body.after;
  }

  return meta;
}

const TIMEOUT = 15000;

function bindAll(obj, context) {
  for (let p in obj) {
    if (obj.hasOwnProperty(p) && typeof obj[p] == 'function') {
      obj[p] = obj[p].bind(context);
    }
  }

  return obj;
}

const CACHE_RULES = [
  function shouldCache(options) {
    const params = options[0];
    // Do not cache if the rendering environment is the server
    return params.env !== 'SERVER';
  },
];

class APIv1Endpoint {
  constructor (config = {}) {
    config.appName = config.appName || 'snoode';

    this.config = config;
    this.log = this.log.bind(this);

    // Set up a cache for links and subreddit data
    this.cache = new Cache({
      dataTypes: {
        links: {
          idProperty: 'name',
          cache: {
            max: 100,
            maxAge: 1000 * 60 * 5,
          },
        },
        subreddits: {
          idProperty: 'id',
          cache: {
            max: 200,
            maxAge: 1000 * 60 * 5,
          },
        },
        preferences: {
          idProperty: 'id',
          cache: {
            max: 1,
            maxAge: 1000 * 60 * 30,
          },
        },
        users: {
          idProperty: 'name',
          cache: {
            max: 5,
            maxAge: 1000 * 60 * 30,
          },
        },
      },
    });
  }

  returnGETPromise (options, formatBody, log) {
    const { appName } = this.config;

    return new Promise(function(resolve, reject) {
      let time = Date.now();

      log('requesting', 'GET', options.uri, options);

      const query = {
        raw_json: 1,
        ...options.query,
        app: `${appName}-${options.env.toLowerCase()}`
      };

      let sa = superagent
        .get(options.uri)
        .query(query)
        .set(options.headers || {})
        .timeout(options.timeout);

      if (options.env === 'SERVER') {
        sa.redirects(0);
      }

      sa.end((err, res) => {
        let status = res ? res.status : 500;

        if (err && err.timeout) {
          status = 'timeout';
          err.status = 504;
        }

        log('response', 'GET', options.uri, options, status, err, Date.now() - time);

        if (err) {
          // Sometimes the API decides to send back a 302 instead of a 404; for
          // example, unfound subs will redirect you to the search page.
          if (status === 302) {
            err.status = 404;
            return reject(new ResponseError(err, options.uri));
          }

          return reject(new ResponseError(err, options.uri));
        }

        if (!res.ok) {
          return reject(new ResponseError(res, options.uri));
        }

        try {
          massageAPIv1JsonRes(res);
          let body = res.body;

          if (formatBody) {
            body = formatBody(body);
          }

          return resolve({
            headers: processMeta(res.headers, res.body),
            body,
          });
        } catch (e) {
          return reject(new ResponseError(e, options.uri));
        }
      });
    });
  }

  log (state, method, uri, options, status, err, duration) {
    if (this.config.debugLevel === 'info') {
      if (this.config.log) {
        this.config.log(...arguments);
      } else {
        console.log(...arguments);
      }
    }
  }

  baseGet (uri, options={}, formatBody) {
    let headers = options.headers || {};

    if (!options.env) {
      options.env = 'SERVER';
    }

    options.timeout = this.config.timeout || TIMEOUT;

    if (options.userAgent) {
      headers['User-Agent'] = options.userAgent;
    }

    options.uri = uri;

    const get = this.returnGETPromise.bind(this);

    if (options.cache) {
      let cacheOptions = Object.assign({
        name: uri,
        rules: CACHE_RULES,
      }, options.cache);

      if (options.id) {
        return this.cache.getById(
          cacheOptions.type,
          options.id,
          get,
          [options, formatBody, this.log],
          cacheOptions
        );
      } else {
        return this.cache.get(get, [options, formatBody, this.log], cacheOptions);
      }
    } else {
      return get(options, formatBody, this.log);
    }
  }

  basePost(uri, options, formatBody, dataType, id, mergeOpts) {
    return this.save('post', ...arguments);
  }

  basePatch(uri, options, formatBody, dataType, id, mergeOpts) {
    return this.save('patch', ...arguments);
  }

  save(method, uri, options, formatBody, dataType, id, mergeOpts) {
    options = options || {};

    let form = options.form || {};
    let headers = options.headers || {};

    const query = {
      raw_json: 1,
      ...options.query,
      app: `${this.config.appName}-${options.env.toLowerCase()}`
    };


    if (options.userAgent) {
      headers['User-Agent'] = options.userAgent;
    }

    let cache = this.cache;
    let type = method === 'patch' ? 'json' : 'form';
    let log = this.log.bind(this);

    if (type === 'json') {
      form = JSON.stringify(form);
    }

    let time = Date.now();

    return new Promise(function(resolve, reject) {
      log('requesting', method, uri, options);

      superagent[method](uri)
        .query(query)
        .set(headers)
        .send(form)
        .type(type)
        .end((err, res) => {
          let status = res ? res.status : 500;
          if (err && err.timeout) {
            status = 'timeout';
          }

          log('response', method, uri, options, status, err, Date.now() - time);

          if (err) {
            return reject(new ResponseError(err, uri));
          }

          if (!res.ok) {
            return reject(new ResponseError(res, uri));
          }

          if (cache.dataCache[dataType] && dataType && options.env === 'CLIENT') {
            if (!options.id) {
              cache.resetData(dataType);
            } else {
              if (!mergeOpts) {
                cache.dataCache[dataType].del(options.id);
              }

              const data = cache.dataCache[dataType].get(options.id);

              if (data) {
                cache.dataCache[dataType].set(options.id, Object.assign(data, mergeOpts));
              }
            }
          }

          try {
            massageAPIv1JsonRes(res);
            let body = res.body;

            if (formatBody) {
              body = formatBody(body);
            }

            resolve(body);
          } catch (e) {
            reject(new ResponseError(e, uri));
          }
        });
    });
  }

  hydrate (endpoint, baseOptions, data) {
    let cacheData;

    if (!data.body && !Array.isArray(data)) {
      cacheData = {
        body: [data],
      };
    } else {
      cacheData = Object.assign({}, data);
    }

    let { uri, options } = this[endpoint].buildOptions(baseOptions);

    Object.assign(options, {
      uri,
      timeout: this.config.timeout || TIMEOUT,
    });

    if (!options.cache || !this[endpoint].formatBody) { return; }

    let formatBody = this[endpoint].formatBody(options);
    let hash = Cache.generateHash([options, formatBody, this.log]);

    if (options.cache.format) {
      cacheData.body = options.cache.format(cacheData.body);
    }

    this.cache.setCaches(uri, hash, cacheData, options.cache);

    if (options.cache.unformat) {
      cacheData.body = options.cache.unformat(cacheData.body);
    }
  }

  get subreddits() {
    return bindAll({
      buildOptions: function (options) {
        let uri = options.origin;

        if (options.query.sort) {
          uri += `/subreddits/${options.query.sort}.json`;
        } else {
          uri += `/r/${options.id}/about.json`;
        }

        options.query.feature = 'mobile_settings';

        options.cache = {
          type: 'subreddits',
          cache: {
            max: 1,
            maxAge: 1000 * 60 * 5,
          },
          format: function(d) {
            if (d && Array.isArray(d)) {
              return {
                subreddits: d.map(function(s) {
                  s.id = s.display_name.toLowerCase();
                  return s;
                }),
              };
            } else if (d) {
              d.id = d.display_name.toLowerCase();
            }

            return { subreddits: d };
          },
          unformat: function(d) {
            return d.subreddits;
          },
        };

        return { uri, options };
      },

      get: function (opts={}) {
        const { uri, options } = this.subreddits.buildOptions(opts);
        return this.baseGet(uri, options, this.subreddits.formatBody(options));
      },

      formatBody: function(options) {
        return function(body) {
          if (options.query.sort && body.data && body.data.children) {
            return body.data.children.map(c => new Subreddit(c.data).toJSON());
          } else if (options.id && body) {
            return new Subreddit(body.data || body).toJSON();
          }
        };
      },
    }, this);
  }

  get subscriptions() {
    return bindAll({
      post: function (options = {}) {
        const uri = options.origin + '/api/subscribe';

        if (!options.model) {
          throw new NoModelError('/api/subscribe');
        }

        const valid = options.model.validate();
        if (valid) {
          const json = options.model.toJSON();

          options.form = {
            api_type: 'json',
            action: json.action,
            sr: json.sr,
          };

          return this.basePost(uri, options, (body) => {
            // Update the subscriber request cache to include or exclude
            // the new subreddit if the request didn't fail
            if (!Object.keys(body).length) {
              this.subscriptions.updateSubscribedCache(options, json.action);
            }

            return body;
          }, 'subreddits', json.sr, {
            user_is_subscriber: json.action === 'sub',
          });
        } else {
          return new Promise(function(resolve, reject) {
            reject('Subscription', options.model, valid);
          });
        }
      },
      updateSubscribedCache: function(options, action) {
        if (!options.id || !options.id.length || !action.length) {
          return;
        }

        const subscribedCacheKey = `${options.origin}/subreddits/mine/subscriber.json`;

        const subscribedRequestCache = this.cache.requestCache.get(subscribedCacheKey);

        if (!subscribedRequestCache) { return };

        // if there's not the default entry we'll assume something fancy
        // is going on and not update the cache
        const keys = subscribedRequestCache.keys();
        if (keys.length !== 1) {
          // if there's more keys just blow away the cache
          subscribedRequestCache.reset();
          return;
        };

        const key = keys[0];
        const requestCache = subscribedRequestCache.get(key);
        if (!requestCache) { return; }

        let subreddits = requestCache.subreddits || [];
        const updateId = options.id;
        if (action === 'unsub') {
          subreddits = subreddits.filter(function(id) {
            return id !== updateId;
          });
        } else {
          if (!subreddits.some(function(id) { return id === updateId; })) {
            subreddits.push(updateId);
          }
        }

        subscribedRequestCache.set(key, {subreddits: subreddits});
      }
    }, this);
  }

  get multis () {
    return bindAll({
      get: function (options = {}) {
      },
    });
  }

  get multiSubscriptoins () {
    return bindAll({
      get: function (options = {}) {
      },
    });
  }

  get saved() {
    return bindAll({
      get: function(options = {}) {
        const uri = `${options.origin}/user/${options.user}/saved.json`;

        options.query = {
          ...options.query,
          feature: 'link_preview',
          sr_detail: 'true',
        };

        return this.baseGet(uri, options, (body) => {
          if (body) {
            const things = body.data.children;
            const data = [];

            things.forEach(function(t) {
              switch (t.kind) {
                case TYPES.COMMENT:
                  data.push((new Comment(t.data)).toJSON());
                  break;
                case TYPES.LINK:
                  data.push((new Link(t.data)).toJSON());
                  break;
              }
            });

            return data;
          }
        });
      },
      post: function (options = {}) {
        const uri = options.origin + '/api/save';

        if (!options.id) {
          throw new Error('Must pass an `id` to `saved.post`.');
        }

        options.form = {
          id: options.id,
          category: options.category,
        };

        return this.basePost(uri, options, (body) => {
          return body;
        }, options.type + 's', options.id, {
          saved: true,
        });
      },
      delete: function (options = {}) {
        const uri = options.origin + '/api/unsave';

        if (!options.id) {
          throw new Error('Must pass an `id` to `saved.delete`.');
        }

        options.form = {
          id: options.id,
          category: options.category,
        };

        return this.basePost(uri, options, (body) => {
          return body;
        }, options.type + 's', options.id, {
          saved: false,
        });
      },
    }, this);
  }

  get hidden() {
    return bindAll({
      get: function(options = {}) {
        const uri = `${options.origin}/user/${options.user}/hidden.json`;

        options.query = {
          feature: 'link_preview',
          sr_detail: 'true',
        };

        return this.baseGet(uri, options, (body) => {
          if (body) {
            const things = body.data.children;
            let data = [];

            things.forEach(function(t) {
              switch (t.kind) {
                case TYPES.COMMENT:
                  data.push((new Comment(t.data)).toJSON());
                  break;
                case TYPES.LINK:
                  data.push((new Link(t.data)).toJSON());
                  break;
              }
            });

            return data;
          }
        });
      },
      post: function (options = {}) {
        const uri = options.origin + '/api/hide';

        if (!options.id) {
          throw new Error('Must pass an `id` to `hidden.post`.');
        }

        options.form = {
          id: options.id,
          category: options.category,
        };

        return this.basePost(uri, options, (body) => {
          return body;
        }, options.type + 's', options.id, {
          hidden: true,
        });
      },
      delete: function (options = {}) {
        const uri = options.origin + '/api/unhide';

        if (!options.id) {
          throw new Error('Must pass an `id` to `hidden.delete`.');
        }

        options.form = {
          id: options.id,
          category: options.category,
        };

        return this.basePost(uri, options, (body) => {
          return body;
        }, options.type + 's', options.id, {
          hidden: false,
        });
      },
    }, this);
  }

  get search () {
    return bindAll({
      buildOptions: function(options) {
        let uri = options.origin;

        if (options.query.subreddit) {
          uri += `/r/${options.query.subreddit}`;
          options.query.restrict_sr = 'on';
        }

        uri += '/search.json';

        return { uri, options };
      },

      get: function(opts={}) {
        /*
         * Params:
         *  [q] - a query string no longer than 512 characters
         *  [limit] - the maximum number of items desired (default: 25, maximum: 100)
         *  [after] - fullname of a thing
         *  [before] -fullname of a thing
         *  [subreddit] - the name of subreddit (optional)
         *  [include_facets] - has to be "on" if you need summary of subreddits (optional)
         */
        const { uri, options } = this.search.buildOptions(opts);

        return this.baseGet(uri, options, (body) => {
          if (body) {
            // just in case. If only one type is returned body will still be an object
            body = Array.isArray(body) ? body : [body];

            let linkListing = [];
            let subredditListing = [];
            let meta = {};

            body.map((listing) => {
              if (listing.data.children.length) {
                if (listing.data.children[0].kind === 't3') {
                  linkListing = listing.data.children.map(function(c) {
                    return new Link(c.data).toJSON();
                  });
                  meta.after = listing.data.after;
                  meta.before = listing.data.before;
                } else {
                  subredditListing = listing.data.children.map(function(c) {
                    return new Subreddit(c.data).toJSON();
                  });
                }
              }
            });

            return {
              meta,
              links: linkListing,
              subreddits: subredditListing,
            };
          } else {
            return {};
          }
        });
      },
    }, this);
  }

  get stylesheet () {
    return bindAll({
      buildOptions: function(options) {
        let uri = options.origin;

        if (options.query.op) {
          uri += '/api/subreddit_stylesheet.json';
        } else {
          uri += `/r/${options.subredditName}/about/stylesheet.json`;
        }

        return { uri, options };
      },

      get: function(opts={}) {
        const { uri, options } = this.stylesheet.buildOptions(opts);

        return this.baseGet(uri, options, (body) => {
          if (body.data && body.data.images && body.data.stylesheet) {
            return new Stylesheet(body.data).toJSON();
          } else {
            return {};
          }
        });
      },
    }, this);
  }

  get preferences () {
    return bindAll({
      buildOptions: function(options) {
        let uri = options.origin + '/api/v1/me/prefs';

        options.cache = {
          type: 'preferences',
          cache: {
            max: 1,
            maxAge: 1000 * 60 * 30,
          },
          format: function(d) {
            if (d && Array.isArray(d)) {
              d[0].id = 'me';
              return { preferences: d[0] };
            } else if (d) {
              d.id = 'me';
              return { preferences: d };
            }
          },
          unformat: function(d) {
            return d.preferences;
          },
        };

        return { uri, options };
      },

      get: function(opts={}) {
        const { uri, options } = this.preferences.buildOptions(opts);
        return this.baseGet(uri, options, this.preferences.formatBody(options));
      },

      formatBody: function(options) {
        return function(prefs) {
          if (prefs && typeof prefs === 'object') {
            return new Preferences(prefs).toJSON();
          } else {
            return {};
          }
        };
      },

      patch: function(opts={}) {
        const { uri, options } = this.preferences.buildOptions(opts);

        options.form = {
          api_type: 'json',
        };

        options.changeSet.forEach((prop) => {
          options.form[prop] = options.model.get(prop);
        });

        return this.basePatch(uri, options, (body) => {
          if (body) {
            return new Preferences(body).toJSON();
          } else {
            return {};
          }
        }, 'preferences');
      },
    }, this);
  }

  get links () {
    return bindAll({
      buildOptions: function(options) {
        const sort = options.query.sort || 'hot';

        options.query.feature = 'link_preview';
        options.query.sr_detail = 'true';

        let uri = options.origin;

        if (options.user) {
          uri += `/user/${options.user}/submitted.json`;
        } else if (options.id) {
          uri += `/by_id/${options.id}.json`;
        } else if (options.query.ids) {
          uri += `/by_id/${options.query.ids.join(',')}.json`;
        } else {
          if (options.query.subredditName) {
            uri += `/r/${options.query.subredditName}`;
          } else if (options.query.multi) {
            uri += `/user/${options.query.multiUser}/m/${options.query.multi}`;
          }

          uri += `/${sort}.json`;
        }

        options.cache = {
          type: 'links',
          cache: {
            max: 5,
            maxAge: 1000 * 60 * 5,
          },
          format: function(d) {
            return { links: d };
          },
          unformat: function(d) {
            return d.links;
          },
        };

        return { uri, options };
      },

      get: function(opts={}) {
        const { uri, options } = this.links.buildOptions(opts);
        return this.baseGet(uri, options, this.links.formatBody(options));
      },

      formatBody: function(options) {
        return function(body) {
          if (body.data && body.data.children && body.data.children[0]) {
            if (options.id) {
              return new Link(body.data.children[0].data).toJSON();
            } else {
              return body.data.children.map(c => new Link(c.data).toJSON());
            }
          } else if (body.data.children) {
            return [];
          }
        };
      },

      post: function(options = {}) {
        const uri = options.origin + '/api/submit';

        if (!options.model) {
          throw new NoModelError('/api/submit');
        }

        const valid = options.model.validate();

        if (valid === true) {
          const json = options.model.toJSON();

          options.form = {
            api_type: 'json',
            thing_id: json.thingId,
            title: json.title,
            kind: json.kind,
            sendreplies: json.sendreplies,
            sr: json.sr,
            iden: json.iden,
            captcha: json.captcha,
            resubmit: json.resubmit,
          };

          if (json.text) {
            options.form.text = json.text;
          } else if (json.url) {
            options.form.url = json.url;
          }

          return this.basePost(uri, options, (body) => {
            if (body.json && body.json.errors.length === 0) {
              return body.json.data;
            } else {
              throw body.json;
            }
          }, 'links');
        } else {
          throw new ValidationError('Link', options.model, valid);
        }
      },

      patch: function(options={}) {
        return this.updateCommentOrLink(options);
      },

      delete: function (options = {}) {
        options.type = 'link';
        return this.deleteCommentOrLink(options);
      },
    }, this);
  }

  get comments () {
    function mapReplies (data) {
      let comment = data.data;

      if (comment.replies) {
        comment.replies = comment.replies.data.children.map(mapReplies);
      } else {
        comment.replies = [];
      }

      return new Comment(comment).toJSON();
    }

    return bindAll({
      buildOptions: function(options) {
        let uri = options.origin;

        if (options.user) {
          uri += `/user/${options.user}/comments.json`;
        } else if (options.query.ids) {
          uri += `/api/morechildren.json`;
          options.query.children = options.query.ids;
          options.query.api_type = 'json';
          options.query.link_id = options.linkId;
          delete options.query.ids;
        } else {
          uri += `/comments/${options.linkId}.json`;
        }

        options.query.feature = 'link_preview';
        options.query.sr_detail = 'true';

        if (options.comment) {
          options.query.comment = options.comment;
        }

        if (options.sort) {
          options.query.sort = options.sort;
        }

        return { uri, options };
      },

      get: function(opts={}) {
        const { uri, options } = this.comments.buildOptions(opts);

        return this.baseGet(uri, options, (body) => {
          if (Array.isArray(body)) {
            return body[1].data.children.map(mapReplies);
          } else if (body.json && body.json.data) {
            if (options.query.children) { // treeify 'load more comments' replies
              return treeifyComments(body.json.data.things.map(mapReplies));
            }
            return body.json.data.things.map(mapReplies);
          }
        });
      },

      post: function(options={}) {
        const uri = options.origin + '/api/comment';

        if (!options.model) {
          throw new NoModelError('/api/comment');
        }

        const valid = options.model.validate();

        if (valid === true) {
          const json = options.model.toJSON();

          options.form = {
            api_type: 'json',
            thing_id: json.thingId,
            text: json.text,
          };

          return this.basePost(uri, options, (body) => {
            if (has(body, 'json.data.things.0.data')) {
              const comment = body.json.data.things[0].data;
              return new Comment(comment).toJSON();
            } else {
              throw body.json;
            }
          }, options.parentType + 's', options.form.thing_id);
        } else {
          return new Promise(function(resolve, reject) {
            reject('Comment', options.model, valid);
          });
        }
      },

      patch: function(options={}) {
        return this.updateCommentOrLink(options);
      },

      delete: function (options={}) {
        options.type = 'comment';
        return this.deleteCommentOrLink(options);
      },
    }, this);
  }

  get users () {
    return bindAll({
      buildOptions: function(options) {
        let uri = options.origin + '/';

        if (options.user === 'me') { // current oauth doesn't return user id
          uri += 'api/v1/me';
        } else {
          uri += 'user/' + options.user + '/about.json';
        }

        options.cache = {
          type: 'users',
          cache: {
            max: 1,
            maxAge: 1000 * 60 * 30,
          },
          format: function(d) {
            return { users: d };
          },
          unformat: function(d) {
            return d.users;
          },
        };

        return { uri, options };
      },

      get: function(opts={}) {
        const { uri, options } = this.users.buildOptions(opts);
        return this.baseGet(uri, options, this.users.formatBody(options));
      },

      formatBody: function(options) {
        return function(body) {
          if (body) {
            return new Account(body.data || body).toJSON();
          }
        };
      },

    }, this);
  }

  get trophies () {
    return bindAll({
      buildOptions: function(options) {
        const uri = `${options.origin}/api/v1/user/${options.user}/trophies.json`;
        return { uri, options };
      },

      get: function(opts={}) {
        const { uri, options } = this.trophies.buildOptions(opts);

        return this.baseGet(null, uri, options, (body) => {
          if (body) {
            const trophies = body.data;
            return trophies.map(function(t) {
              return new Award(t).toJSON();
            });
          }
        });
      },
    }, this);
  }

  get activities () {
    return bindAll({
      buildOptions: function(options) {
        const uri = `${options.origin}/user/${options.user}/${options.activity}.json`;
        options.query.feature = 'link_preview';
        options.query.sr_detail = 'true';
        return { uri, options };
      },

      get: function(opts={}) {
        const { uri, options } = this.activities.buildOptions(opts);

        return this.baseGet(uri, options, (body) => {
          if (body) {
            const activities = body.data.children;
            let data = [];

            activities.forEach(function(a) {
              switch (a.kind) {
                case TYPES.COMMENT:
                  data.push((new Comment(a.data)).toJSON());
                  break;
                case TYPES.LINK:
                  data.push((new Link(a.data)).toJSON());
                  break;
              }
            });

            return data;
          }
        });
      },
    }, this);
  }

  get votes () {
    return bindAll({
      post: function(options = {}) {
        const uri = options.origin + '/api/vote';

        if (!options.model) {
          throw new NoModelError('/api/vote');
        }

        const valid = options.model.validate();

        if (valid === true) {
          options.form = options.model.toJSON((props) => {
            return {
              id: props.id,
              dir: props.direction,
            };
          });

          let likes;

          if (options.model.props.direction === -1) {
            likes = false;
          } else if (options.model.props.direction === 1) {
            likes = true;
          }

          return this.basePost(uri, options, () => null,
                               options.type.toLowerCase() + 's',
                               options.form.id, {
                                 likes: likes,
                                 score: options.score,
                               });
        } else {
          throw new ValidationError('Vote', options.model, valid);
        }
      },
    }, this);
  }

  get reports () {
    return bindAll({
      post: function(options = {}) {
        const uri = options.origin + '/api/report';

        if (!options.model) {
          throw new NoModelError('/api/report');
        }

        const valid = options.model.validate();

        if (valid === true) {
          options.form = options.model.toJSON((props) => {
            return {
              api_type: 'json',
              reason: props.reason,
              other_reason: props.other_reason,
              thing_id: props.thing_id,
            };
          });

          return this.basePost(
                              uri,
                              options,
                              () => null,
                              options.model.props._type.toLowerCase() + 's',
                              options.form.thing_id, {
                                hidden: true,
                              });
        } else {
          throw new ValidationError('Report', options.model, valid);
        }
      },
    }, this);
  }

  get blocks () {
    return bindAll({
      post: function(options = {}) {
        const uri = `${options.origin}/api/block`;
        const { model } = options;

        if (!model) {
          throw new NoModelError('/api/block');
        }

        const valid = model.validate();
        if (!valid) {
          throw new ValidationError('Block', model, valid);
        }

        options.form = model.toJSON((props) => {
          return {
            id: props.thingId,
          };
        });

        return this.basePost(uri, options, () => null);
      },

      get: function(options = {}) {
        const uri = `${options.origin}/prefs/blocked`;

        return this.baseGet(uri, options, (body) => {
          if (has(body, 'data.children') && Array.isArray(body.data.children)) {
            return body.data.children.map(b => (new BlockedUser(b).toJSON()));
          } else {
            return [];
          }
        });
      },

      del: function(options = {}) {
        const uri = `${options.origin}/api/unfriend`;
        const { model } = options;

        if (!model) {
          throw new NoModelError('/api/unblock');
        }

        const valid = model.validate();
        if (!valid) {
          throw new ValidationError('BlockedUser', model, valid);
        }

        if (!options.myUserId) {
          throw new ValidationError('/api/unblock', options, false);
        }

        const container = `${TYPES.USER}_${options.myUserId}`;
        delete options.myUserId;

        options.form = model.toJSON((props) => {
          return {
            id: props.id,
            type: 'enemy',
            container,
          };
        })

        return this.basePost(uri, options, () => null);
      }
    }, this);
  }

  get captcha () {
    return bindAll({
      get: function (options = {}) {
        const uri = options.origin + '/api/needs_captcha';

        return this.baseGet({}, uri, options, (body) => {
          if (typeof body === 'boolean') {
            return body;
          }
        });
      },

      post: function(options = {}) {
        const uri = options.origin + '/api/new_captcha';

        return this.basePost(uri, options, (body) => {
          if (!body.json.errors.length) {
            return body.json.data;
          } else {
            return body.json.errors;
          }
        });
      },
    }, this);
  }

  get notifications () {
    return bindAll({
      buildOptions: function(options) {
        let uri = options.origin + '/api/v1/me/notifications';

        if (options.id) {
          uri += '/' + options.id;
        }

        return { uri, options };
      },

      get: function(opts={}) {
        const { uri, options } = this.notifications.buildOptions(opts);

        return this.baseGet(uri, options, (body) => {
          return body;
        });
      },
    }, this);
  }

  get messages () {
    return bindAll({
      buildOptions: function(options) {
        const { filter, subredditName, origin, view = 'inbox' } = options;
        const sub = subredditName ? `/r/${subredditName}` : '';
        const filterPath = filter ? `/${filter}` : '';
        const uri = `${origin}${sub}/message/${view}${filterPath}`;

        return { uri, options };
      },

      get: function(opts={}) {
        const { uri, options } = this.messages.buildOptions(opts);
        let data = [];
        let read = [];

        return this.baseGet(uri, options, (body) => {
          if (body && body.data && body.data.children) {
            body.data.children.forEach(function(t) {
              if (t.data.new) {
                read.push(t.data.name);
              }

              switch (t.kind) {
                case TYPES.COMMENT:
                  data.push((new Comment(t.data)).toJSON());
                  break;
                case TYPES.LINK:
                  data.push((new Link(t.data)).toJSON());
                  break;
                case TYPES.MESSAGE:
                  data.push((new Message(t.data)).toJSON());
                  break;
              }
            });
          }

          // Reset users so that the current user's inbox_count is set to zero.
          // So, the thing is, we don't know _which_ user should be set to
          // zero, so we reset all of them. User caches aren't used that often
          // anyways, so it shouldn't be a particularly big hit.
          if (this.cache.dataCache.users) {
            this.cache.dataCache.users.reset();
          }

          // Mark messages as read after we fetch them
          if (!options.leaveUnread && read.length > 0) {
            const readUrl = opts.origin + '/api/read_message';

            const readOptions = Object.assign({
              form: {
                id: read.join(','),
              },
            }, opts);

            this.basePost(readUrl, readOptions, () => {});
          }

          data.map(function(m) {
            if ((!Array.isArray(m.replies) && m._type === 'Message') ||
                m._type === 'Comment' && m.replies) {
              m.replies = m.replies.data.children.filter(function(c) {
                return c && c.data;
              }).map(function(c) {
                return (new Message(c.data)).toJSON();
              });
            }
          });

          return data;
        });
      },
      post: function(options = {}) {
        // `api/comment` is intentional; message replies are treated as
        // comments.
        let uri = options.origin + '/api/comment';

        // New messages (not replies) go to the api/compose endpoint.
        if (!options.model.get('thingId')) {
          uri = options.origin + '/api/compose';
        }

        if (!options.model) {
          throw new NoModelError('/api/message');
        }

        const valid = options.model.validate();

        if (valid === true) {
          const json = options.model.toJSON();

          options.form = {
            api_type: 'json',
            text: json.text,
          };

          if (json.thingId) {
            options.form.thing_id = json.thingId;
          }

          if (json.from) {
            options.form.from_sr = json.from;
          }

          if (json.captcha) {
            options.form.captcha = json.captcha;
          }

          if (json.iden) {
            options.form.iden = json.iden;
          }

          if (json.subject) {
            options.form.subject = json.subject;
          }

          if (json.to) {
            options.form.to = json.to;
          }

          return this.basePost(uri, options, (body) => {
            let res = body.json;

            if (res && res.data) {
              let message = res.data.things[0].data;
              return new Message(message).toJSON();
            } else if (res.errors.length) {
              throw res;
            } else {
              return res;
            }
          });
        } else {
          throw new ValidationError(options.model._type, options.model, valid);
        }
      },
    }, this);
  }

  get wiki () {
    return bindAll({
      buildOptions: function(options) {
        let uri = options.origin;
        if (options.subreddit) {
          uri += `/r/${options.subreddit}/wiki/${options.path}.json`;
        } else {
          uri += `/wiki/${options.path}.json`;
        }

        return { uri, options };
      },

      formatBody: function(options) {
        return function(body) {
          const type = body.type || body.kind;
          switch (type) {
            case 'wikipage':
              return new WikiPage(body.data).toJSON();
            case 'Listing':
              if (body.data && body.data.children) {
                const children = body.data.children;

                // when either discussions or revisions requests have nothing to show
                // the response looks identical, so we pass in a type when the request
                // is made.
                if (options.type === 'discussions') {
                  return {
                    conversations: children.map(c => new Link(c.data).toJSON()),
                    _type: 't3',
                  };
                } else if (options.type === 'revisions') {
                  return {
                    revisions: body.data.children.map(c => new WikiRevision(c).toJSON()),
                    _type: 'WikiRevision',
                  };
                }
              }
              break;
            case 'wikipagelisting':
              return new WikiPageListing(body).toJSON();
            case 'wikipagesettings':
              return new WikiPageSettings(body.data).toJSON();
          }
        };
      },

      get: function(reqOptions={}) {
        const { uri, options } = this.wiki.buildOptions(reqOptions);

        return this.baseGet(uri, options, this.wiki.formatBody(options));
      },
    }, this);
  }

  updateCommentOrLink (options) {
    const uri = options.origin + '/api/editusertext';

    if (!options.model) {
      throw new NoModelError('/api/editusertext');
    }
    // api only supports updating selftext
    const prop = options.model.props._type === 'Link' ? 'selftext' : 'body';
    options.model.set(prop, options.changeSet);

    const valid = options.model.validate();

    if (valid) {
      const json = options.model.toJSON();
      options.form = {
        api_type: 'json',
        text: json.selftext || json.body,
        thing_id: json.name,
      };

      return this.basePost(uri, options, (body) => {
        if (body.json.errors.length === 0) {
          const updatedThing = body.json.data.things[0].data;
          if (body.json.data.things[0].kind === 't3') {
            return new Link(updatedThing).toJSON();
          } else {
            return new Comment(updatedThing).toJSON();
          }
        } else {
          throw body.json.errors;
        }
      }, options.model.props._type.toLowerCase() + 's', options.form.thing_id, {
        text: options.form.text,
      });
    } else {
      throw new ValidationError(options.model._type, options.model, valid);
    }
  }

  deleteCommentOrLink (options) {
    const uri = options.origin + '/api/del';

    if (!options.id) {
      throw new Error('Must pass an `id` to `links.delete`.');
    }

    options.form = {
      id: options.id,
    };

    // api returns 200 and empty body in all cases no point
    // handling for now.
    return this.basePost(uri, options, ()=>{},
                          options.type.toLowerCase() + 's',
                          options.form.id);
  }

  buildOptions (options) {
    options.headers = options.headers || {};
    options.query = options.query || {};
    options.model = options.model || {};

    Object.assign(options.headers, this.config.defaultHeaders, options.headers);

    return options;
  }
}

export default APIv1Endpoint;
