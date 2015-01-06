import * as superagent from 'superagent';
import * as q from 'q';
import * as querystring from 'querystring';

import Account from '../models/account';
import Comment from '../models/comment';
import Link from '../models/link';
import Vote from '../models/vote';

import NoModelError from '../errors/noModelError';
import ValidationError from '../errors/validationError';

import * as LRU from 'lru-cache';

var defaultCacheConfig = {
 max: 500,
 maxAge: 1000 * 50 * 3,
}

function baseGet(cache, uri, options, request, formatBody) {
  var options = options || {};
  var defer = q.defer();

  var query = options.query || {};
  var headers = options.headers || {};

  if (options.userAgent) {
    headers['User-Agent'] = options.userAgent;
  }

  var key = uri + '?' + querystring.stringify(query);

  if (headers.Authorization) {
    cache = cache.authed;
    key += '&auth=' + headers.Authorization;
  } else {
    cache = cache.unauthed;
  }

  if(cache.get(key)) {
    defer.resolve(cache.get(key));
    return defer.promise;
  }

  request.get(uri)
    .set(headers)
    .query(query)
    .end((res) => {
      if (!res.ok) {
        return defer.reject(res);
      }

      try {
        var body = res.body;

        if (formatBody) {
          body = formatBody(body);
        }

        cache.set(key, body);
        defer.resolve(body);
      } catch (e) {
        defer.reject(e);
      }
    });

  return defer.promise;
}

function basePost(cache, uri, options, request, formatBody) {
  var options = options || {};
  var defer = q.defer();

  var form = options.form || {};
  var headers = options.headers || {};

  var cache = cache.authed;
  cache.reset();

  if (options.userAgent) {
    headers['User-Agent'] = options.userAgent;
  }

  request.post(uri)
    .set(headers)
    .send(form)
    .type('form')
    .end((res) => {
      if (!res.ok) {
        defer.reject(res);
      }

      try {
        var body = res.body;

        if (formatBody) {
          body = formatBody(body);
        }

        defer.resolve(body);
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
    this.origin = config.origin || 'https://www.reddit.com';
    this.request = config.request || superagent;

    this.userAgent = config.userAgent;

    this.cache = {
      links: {
        unauthed: new LRU(defaultCacheConfig),
        authed: new LRU(defaultCacheConfig),
      },
      comments: {
        unauthed: new LRU(defaultCacheConfig),
        authed: new LRU(defaultCacheConfig),
      },
      users: {
        unauthed: new LRU(defaultCacheConfig),
        authed: new LRU(defaultCacheConfig),
      },
    }
  }

  hydrate (endpoint, options, data) {
    var cache = this.cache[endpoint];
    var { uri, options } = this[endpoint].buildOptions(options);

    var key = uri + '?' + querystring.stringify(options.query);

    if (options.headers.Authorization) {
      cache = cache.authed;
    } else {
      cache = cache.unauthed;
    }

    cache.set(key, data);
  }

  get links () {
    return bind({
      buildOptions: function(options) {
        var uri = this.origin + '/';
        var sort = options.sort || 'hot';

        if (options.query.subredditName) {
          uri += 'r/' + options.query.subredditName + '/';
        }

        uri += sort + '.json';

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
        var uri = this.origin + '/comments/' + options.linkId + '.json';

        if (options.coment) {
          options.query.comment = options.comment;
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
        var uri = this.origin + '/api/comment';

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

          return basePost(this.cache.comments, uri, options, this.request, (body) => {
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
        var uri = this.origin + '/';

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
            return new Account(body).toJSON();
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
        var uri = this.origin + '/api/vote';

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

          return basePost(this.cache.comments, uri, options, this.request, () => null);
        } else {
          throw new ValidationError('Vote', options.model, valid);
        }
      }
    }, this)
  }

  buildOptions (auth) {
    var options = {
      query: {},
      model: {},
      headers: {},
    };

    if (auth) {
      options.headers.Authorization = 'bearer ' + auth;
    }

    return options;
  }
}

export default APIv1Endpoint;
