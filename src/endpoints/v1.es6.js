import superagent from 'superagent';
import q from 'q';
import querystring from 'querystring';

import Account from '../models/account';
import Comment from '../models/comment';
import Link from '../models/link';
import Vote from '../models/vote';
import Subreddit from '../models/subreddit';
import Stylesheet from '../models/stylesheet';

import NoModelError from '../errors/noModelError';
import ValidationError from '../errors/validationError';

import LRU from 'lru-cache';

const defaultCacheConfig = {
 max: 500,
 maxAge: 1000 * 50 * 3,
};

function processMeta(res) {
  var headers = res.headers;

  return {
    moose: headers['x-moose'],
    tracking: headers['x-reddit-tracking'],
  }
}

// decode websafe_json encoding
function unsafeJson(text) {
  return text.replace(/&gt;/g, '>')
             .replace(/&lt;/g, '<')
             .replace(/&amp;/g, '&');
}

function res_type(str){
  return str.split(/ *; */).shift();
};

function massageAPIv1JsonRes(res) {
  // API v1 actually returns JSON with extra HTML escaping surprises,
  // re-parse the body in that case.
  if (res_type(res.headers['content-type'] || '') === 'application/json') {
    var text = res.text && res.text.replace(/^\s*|\s*$/g, '');
    res.body = text && JSON.parse(unsafeJson(text));
  }
}

function baseGet(cache={}, uri, options={}, request, formatBody) {
  var defer = q.defer();

  var query = options.query || {};
  var headers = options.headers || {};

  if (options.userAgent) {
    headers['User-Agent'] = options.userAgent;
  }

  var key = uri + '?' + querystring.stringify(query);

  if (options.useCache) {
    if (cache && cache.get(key)) {
      defer.resolve(cache.get(key));
      return defer.promise;
    }
  }

  request.get(uri)
    .set(headers)
    .query(query)
    .end((err, res) => {
      if (err) {
        return defer.reject(err);
      }

      if (!res.ok) {
        return defer.reject(res);
      }

      try {
        massageAPIv1JsonRes(res);
        var body = res.body;

        if (formatBody) {
          body = formatBody(body);
        }

        var data = {
          data: body,
          meta: processMeta(res),
        };

        if (options.useCache && cache) {
          cache.set(key, data);
        }

        defer.resolve(data);
      } catch (e) {
        defer.reject(e);
      }
    });

  return defer.promise;
}

function basePost(uri, options, request, formatBody) {
  var options = options || {};
  var defer = q.defer();

  var form = options.form || {};
  var headers = options.headers || {};

  if (options.userAgent) {
    headers['User-Agent'] = options.userAgent;
  }

  request.post(uri)
    .set(headers)
    .send(form)
    .type('form')
    .end((err, res) => {
      if (err) {
        return defer.reject(err);
      }

      if (!res.ok) {
        defer.reject(res);
      }

      try {
        massageAPIv1JsonRes(res);
        var body = res.body;

        if (formatBody) {
          body = formatBody(body);
        }

        var data = {
          data: body,
          meta: processMeta(res),
        }

        defer.resolve(data);
      } catch (e) {
        defer.reject(e);
      }
    });

  return defer.promise;
}

function bind(obj, context) {
  for (var p in obj) {
    if(obj.hasOwnProperty(p) && typeof obj[p] == 'function' ) {
      obj[p] = obj[p].bind(context);
    }
  }

  return obj;
}

class APIv1Endpoint {
  constructor (config = {}) {
    this.request = config.request || superagent;
    this.defaultHeaders = config.defaultHeaders;

    this.cache = {
      links: new LRU(defaultCacheConfig),
      comments: new LRU(defaultCacheConfig),
      users: new LRU(defaultCacheConfig),
      subreddits: new LRU(defaultCacheConfig),
      search: new LRU(defaultCacheConfig),
      stylesheets: new LRU(defaultCacheConfig),
      activity: new LRU(defaultCacheConfig),
    };
  }

  hydrate (endpoint, options, data) {
    var cache = this.cache[endpoint];
    var { uri, options } = this[endpoint].buildOptions(options);

    var key = uri + '?' + querystring.stringify(options.query);

    cache.set(key, data);
  }

  get subreddits() {
    return bind({
      buildOptions: function (options) {
        var uri = options.origin;
        if (options.query.sort) {
          uri += `/subreddits/${options.query.sort}.json`;
        } else {
          uri += `/r/${options.query.subreddit}/about.json`;
        }
        return { uri, options };
      },

      get: function (options = {}) {
        var { uri, options } = this.subreddits.buildOptions(options);

        return baseGet(this.cache.subreddits, uri, options, this.request, (body) => {
          if (options.query.sort && body.data && body.data.children) {
            return body.data.children.map(c => new Subreddit(c.data).toJSON());
          } else if (options.query.subreddit && body) {
            return new Subreddit(body.data || body).toJSON();
          } else {
            return null;
          }
        });
      },
    }, this);
  }

  get subscriptions() {
    return bind({
      post: function (options = {}) {
        var uri = options.origin + '/api/subscribe';

        if (!options.model) {
          throw new NoModelError('/api/subscribe');
        }

        var valid = options.model.validate();
        if (valid) {
          var json = options.model.toJSON();

          options.form = {
            api_type: 'json',
            action: json.action,
            sr: json.sr
          };

          return basePost(uri, options, this.request, (body) => {
            return body;
          });
        } else {
          var defer = q.defer();
          defer.reject('Subscription', options.model, valid);
          return defer.promise;
        }
      }
    }, this);
  }

  get search () {
    return bind({
      buildOptions: function(options) {
        var uri = options.origin;
        if (options.query.subreddit) {
          uri += `/r/${options.query.subreddit}`;
          options.query.restrict_sr = 'on';
        }
        uri += '/search.json';

        return { uri, options }
      },

      get: function(options = {}) {
        /*
         * Params:
         *  [q] - a query string no longer than 512 characters
         *  [limit] - the maximum number of items desired (default: 25, maximum: 100)
         *  [after] - fullname of a thing
         *  [before] -fullname of a thing
         *  [subreddit] - the name of subreddit (optional)
         *  [include_facets] - has to be "on" if you need summary of subreddits (optional)
         */
        var { uri, options } = this.search.buildOptions(options);

        return baseGet(this.cache.search, uri, options, this.request, (body) => {
          if (body) {
            // just in case. If only one type is returned body will still be an object
            body = Array.isArray(body) ? body : [body];

            var linkListing = [];
            var subredditListing = [];
            var meta = {};

            body.map((listing) => {
              if (listing.data.children[0].kind === 't3') {
                linkListing = listing.data.children.map(c => new Link(c.data).toJSON())
                meta.after = listing.data.after;
                meta.before = listing.data.before;
              } else {
                subredditListing = listing.data.children.map(c => new Subreddit(c.data).toJSON())
              }
            })
            return {
              links: linkListing,
              subreddits: subredditListing,
              meta: meta
            };
          } else {
            return {};
          }
        });
      }
    }, this);
  }

  get stylesheet () {
    return bind({
      buildOptions: function(options) {
        var uri = options.origin;

        if (options.query.op) {
          uri += '/api/subreddit_stylesheet.json';
        } else {
          uri += `/r/${options.subredditName}/about/stylesheet.json`;
        }

        return { uri, options };
      },

      get: function(options = {}) {
        var { uri, options } = this.stylesheet.buildOptions(options);

        return baseGet(this.cache.stylesheets, uri, options, this.request, (body) => {
          if (body.data && body.data.images && body.data.stylesheet) {
            return new Stylesheet(body.data).toJSON();
          } else {
            return {};
          }
        });
      }
    }, this);
  }

  get links () {
    return bind({
      buildOptions: function(options) {
        var sort = options.query.sort || 'hot';
        options.query.feature = 'link_preview';

        var uri = options.origin;

        if (options.user) {
          uri += '/user/' + options.user + '/submitted.json';
        } else {
          if (options.query.subredditName) {
            uri += '/r/' + options.query.subredditName;
          } else if (options.query.multi) {
            uri += '/user/' + options.query.multiUser + '/m/' + options.query.multi;
          }

          uri += '/' + sort + '.json';
        }

        return { uri, options }
      },

      get: function(options = {}) {
        var { uri, options } = this.links.buildOptions(options);

        return baseGet(this.cache.links, uri, options, this.request, (body) => {
          if (body.data && body.data.children) {
            return body.data.children.map(c => new Link(c.data).toJSON());
          }else {
            return [];
          }
        });
      }
    }, this);
  }

  get comments () {
    function mapReplies (comment) {
      var comment = comment.data;

      if (comment.replies) {
        comment.replies = comment.replies.data.children.map(mapReplies);
      } else {
        comment.replies = [];
      }

      return new Comment(comment).toJSON();
    }

    return bind({
      buildOptions: function(options) {
        var uri;

        if (options.user) {
          uri = options.origin + '/user/' + options.user + '/comments.json';
        } else {
          uri = options.origin + '/comments/' + options.linkId + '.json';
        }
        options.query.feature = 'link_preview';

        if (options.comment) {
          options.query.comment = options.comment;
        }

        if (options.sort) {
          options.query.sort = options.sort;
        }

        return { uri, options }
      },

      get: function(options = {}) {
        var { uri, options } = this.comments.buildOptions(options);

        return baseGet(this.cache.comments, uri, options, this.request, (body) => {
          return {
            listing: new Link(body[0].data.children[0].data).toJSON(),
            comments: body[1].data.children.map(mapReplies)
          }
        });
      },

      post: function(options = {}) {
        var uri = options.origin + '/api/comment';

        if (!options.model) {
          throw new NoModelError('/api/comment');
        }

        var valid = options.model.validate();

        if (valid === true) {
          var json = options.model.toJSON();

          options.form = {
            api_type: 'json',
            thing_id: json.thingId,
            text: json.text,
          };

          this.cache.comments.reset();

          return basePost(uri, options, this.request, (body) => {
            if (body) {
              var comment = body.json.data.things[0].data;
              return new Comment(comment).toJSON();
            } else {
              return null;
            }
          });
        } else {
          var defer = q.defer();
          defer.reject('Comment', options.model, valid);
          return defer.promise;
        }
      }
    }, this);
  }

  get users () {
    return bind({
      buildOptions: function(options) {
        var uri = options.origin + '/';

        if (options.user === 'me') { // current oauth doesn't return user id
          uri += 'api/v1/me';
        } else {
          uri += 'user/' + options.user + '/about.json';
        }

        return { uri, options }
      },

      get: function(options = {}) {
        var { uri, options } = this.users.buildOptions(options);

        return baseGet(this.cache.users, uri, options, this.request, (body) => {
          if (body) {
            return new Account(body.data || body).toJSON();
          }else {
            return null;
          }
        });
      }
    }, this);
  }

  get trophies () {
    return bind({
      buildOptions: function(options) {
        var uri = `${options.origin}/api/v1/user/${options.user}/trophies.json`;
        return { uri, options }
      },

      get: function(options = {}) {
        var { uri, options } = this.trophies.buildOptions(options);

        return baseGet(null, uri, options, this.request, (body) => {
          if (body) {
            var trophies = body.data;
            return new Award(user).toJSON();
          }else {
            return null;
          }
        });
      }
    }, this);
  }

  get activities () {
    return bind({
      buildOptions: function(options) {
        var uri = `${options.origin}/user/${options.user}/${options.activity}.json`;
        options.query.feature = 'link_preview';
        return { uri, options }
      },

      get: function(options = {}) {
        var { uri, options } = this.activities.buildOptions(options);

        return baseGet(this.cache.activity, uri, options, this.request, (body) => {
          if (body) {
            var activities = body.data.children;
            var data = [];

            activities.forEach(function(a) {
              switch (a.kind) {
                case 't1':
                  data.push((new Comment(a.data)).toJSON());
                  break;
                case 't3':
                  data.push((new Link(a.data)).toJSON());
                  break;
              }
            });

            return data;
          }else {
            return null;
          }
        });
      }
    }, this);
  }

  get votes () {
    return bind({
      post: function(options = {}) {
        var uri = options.origin + '/api/vote';

        if (!options.model) {
          throw new NoModelError('/api/comment');
        }

        var valid = options.model.validate();

        if (valid === true) {
          options.form = options.model.toJSON((props) => {
            return {
              id: props.id,
              dir: props.direction,
            };
          });

          this.cache.links.reset();
          this.cache.comments.reset();

          return basePost(uri, options, this.request, () => null);
        } else {
          throw new ValidationError('Vote', options.model, valid);
        }
      }
    }, this)
  }

  get reports () {
    return bind({
      post: function(options = {}) {
        var uri = options.origin + '/api/report';

        if (!options.model) {
          throw new NoModelError('/api/report');
        }

        var valid = options.model.validate();

        if (valid === true) {
          options.form = options.model.toJSON((props) => {
            return {
              reason: props.reason,
              other_reason: props.other_reason,
              thing_id: props.thing_id,
            };
          });

          return basePost(uri, options, this.request, () => null);
        } else {
          throw new ValidationError('Report', options.model, valid);
        }
      }
    }, this)
  }

  buildOptions (options) {
    var fullHeaders = {};
    Object.assign(fullHeaders, this.defaultHeaders, options.headers);

    return {
      query: {},
      model: {},
      headers: fullHeaders,
      origin: options.origin,
      useCache: options.useCache,
    };
  }
}

export default APIv1Endpoint;
