import superagent from 'superagent';
import querystring from 'querystring';

import Account from '../models/account';
import Comment from '../models/comment';
import Link from '../models/link';
import Message from '../models/message';
import Vote from '../models/vote';
import Subreddit from '../models/subreddit';
import Stylesheet from '../models/stylesheet';
import Preferences from '../models/preferences';

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
  var query = options.query || {};
  var headers = options.headers || {};

  if (options.userAgent) {
    headers['User-Agent'] = options.userAgent;
  }

  var key = uri + '?' + querystring.stringify(query);

  if (options.useCache) {
    if (cache && cache.get(key)) {
      return new Promise(function(resolve) {
        resolve(cache.get(key));
      });
    }
  }

  return new Promise(function(resolve, reject) {
    request.get(uri)
      .set(headers)
      .query(query)
      .end((err, res) => {
        if (err) {
          return reject(err);
        }

        if (!res.ok) {
          return reject(res);
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

          resolve(data);
        } catch (e) {
          reject(e);
        }
      });
  });
}

function basePost(uri, options, request, formatBody) {
  var options = options || {};

  var form = options.form || {};
  var headers = options.headers || {};

  if (options.userAgent) {
    headers['User-Agent'] = options.userAgent;
  }

  return new Promise(function(resolve, reject) {
    request.post(uri)
      .set(headers)
      .send(form)
      .type('form')
      .end((err, res) => {
        if (err) {
          return reject(err);
        }

        if (!res.ok) {
          reject(res);
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

          resolve(data);
        } catch (e) {
          reject(e);
        }
      });
  });
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
      saved: new LRU(defaultCacheConfig),
      hidden: new LRU(defaultCacheConfig),
      notifications: new LRU(defaultCacheConfig),
      messages: new LRU(defaultCacheConfig),
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
          return new Promise(function(resolve, reject) {
            reject('Subscription', options.model, valid);
          });
        }
      }
    }, this);
  }

  get saved() {
    return bind({
      get: function(options = {}) {
        var uri = `${options.origin}/user/${options.user}/saved.json`;
        options.query = {
          feature: 'link_preview',
          sr_detail: 'true'
        };

        return baseGet(this.cache.saved, uri, options, this.request, (body) => {
          if (body) {
            var things = body.data.children;
            var data = [];

            things.forEach(function(t) {
              switch (t.kind) {
                case 't1':
                  data.push((new Comment(t.data)).toJSON());
                  break;
                case 't3':
                  data.push((new Link(t.data)).toJSON());
                  break;
              }
            });

            return data;
          }else {
            return null;
          }
        });
      },
      post: function (options = {}) {
        var uri = options.origin + '/api/save';

        if (!options.id) {
          throw('Must pass an `id` to `saved.post`.');
        }

        options.form = {
          id: options.id,
          category: options.category,
        };

        return basePost(uri, options, this.request, (body) => {
          this.cache.saved.reset();
          return body;
        });
      },
      delete: function (options = {}) {
        var uri = options.origin + '/api/unsave';

        if (!options.id) {
          throw('Must pass an `id` to `saved.delete`.');
        }

        options.form = {
          id: options.id,
          category: options.category,
        };

        return basePost(uri, options, this.request, (body) => {
          this.cache.saved.reset();
          return body;
        });
      }
    }, this);
  }

  get hidden() {
    return bind({
      get: function(options = {}) {
        var uri = `${options.origin}/user/${options.user}/hidden.json`;
        options.query = {
          feature: 'link_preview',
          sr_detail: 'true'
        };

        return baseGet(this.cache.hidden, uri, options, this.request, (body) => {
          if (body) {
            var things = body.data.children;
            var data = [];

            things.forEach(function(t) {
              switch (t.kind) {
                case 't1':
                  data.push((new Comment(t.data)).toJSON());
                  break;
                case 't3':
                  data.push((new Link(t.data)).toJSON());
                  break;
              }
            });

            return data;
          }else {
            return null;
          }
        });
      },
      post: function (options = {}) {
        var uri = options.origin + '/api/hide';

        if (!options.id) {
          throw('Must pass an `id` to `hidden.post`.');
        }

        options.form = {
          id: options.id,
          category: options.category,
        };

        return basePost(uri, options, this.request, (body) => {
          this.cache.hidden.reset();
          return body;
        });
      },
      delete: function (options = {}) {
        var uri = options.origin + '/api/unhide';

        if (!options.id) {
          throw('Must pass an `id` to `hidden.delete`.');
        }

        options.form = {
          id: options.id,
          category: options.category,
        };

        return basePost(uri, options, this.request, (body) => {
          this.cache.hidden.reset();
          return body;
        });
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
              if (listing.data.children.length) {
                if (listing.data.children[0].kind === 't3') {
                  linkListing = listing.data.children.map(c => new Link(c.data).toJSON())
                  meta.after = listing.data.after;
                  meta.before = listing.data.before;
                } else {
                  subredditListing = listing.data.children.map(c => new Subreddit(c.data).toJSON())
                }
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

  get preferences () {
    return bind({
      buildOptions: function(options) {
        var uri = options.origin + '/api/v1/me/prefs';
        return { uri, options };
      },

      get: function(options = {}) {
        var { uri, options } = this.preferences.buildOptions(options);

        return baseGet(this.cache.preferences, uri, options, this.request, (prefs) => {
          if (prefs && typeof prefs === 'object') {
            return new Preferences(prefs).toJSON();
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
        options.query.sr_detail = 'true';

        var uri = options.origin;

        if (options.user) {
          uri += `/user/${options.user}/submitted.json`;
        } else if (options.id) {
          uri += `/by_id/${options.id}.json`;
        } else if (options.query.ids) {
          uri += `/by_id/${options.query.id.join(',')}.json`;
        } else {
          if (options.query.subredditName) {
            uri += `/r/${options.query.subredditName}`;
          } else if (options.query.multi) {
            uri += `/user/${options.query.multiUser}/m/${options.query.multi}`
          }

          uri += `/${sort}.json`;
        }

        return { uri, options }
      },

      get: function(options = {}) {
        var { uri, options } = this.links.buildOptions(options);

        return baseGet(this.cache.links, uri, options, this.request, (body) => {
          if (body.data && body.data.children) {
            if (options.id) {
              return new Link(body.data.children[0].data).toJSON();
            } else {
              return body.data.children.map(c => new Link(c.data).toJSON());
            }
          } else {
            return [];
          }
        });
      },

      post: function(options = {}) {
        var uri = options.origin + '/api/submit';

        if (!options.model) {
          throw new NoModelError('/api/submit');
        }

        var valid = options.model.validate();

        if (valid === true) {
          var json = options.model.toJSON();

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

          return basePost(uri, options, this.request, (body) => {
            if (body.json && body.json.errors.length === 0) {
              if (!body.json.errors.length) {
                return body.json.data;
              }
            } else {
              throw body.json.errors;
            }
          });
        } else {
          throw new ValidationError('Link', options.model, valid);
        }
      },

      patch: function(options={}) {
        return this.updateCommentOrLink(options);
      },

      delete: function (options = {}) {
        return this.deleteCommentOrLink(options);
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
        options.query.sr_detail = 'true';

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
          return new Promise(function(resolve, reject) {
            reject('Comment', options.model, valid);
          });
        }
      },

      patch: function(options={}) {
        return this.updateCommentOrLink(options);
      },

      delete: function (options = {}) {
        return this.deleteCommentOrLink(options);
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
        options.query.sr_detail = 'true';
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
          throw new NoModelError('/api/vote');
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
              api_type: 'json',
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

  get captcha () {
    return bind({
      get: function (options = {}) {
        var uri = options.origin + '/api/needs_captcha';

        return baseGet({}, uri, options, this.request, (body) => {
          if (typeof body === 'boolean') {
            return body
          }else {
            return null;
          }
        });
      },

      post: function(options = {}) {
        var uri = options.origin + '/api/new_captcha';

        return basePost(uri, options, this.request, (body) => {
          if (!body.json.errors.length) {
            return body.json.data;
          } else {
            return body.json.errors;
          }
        })
      }
    }, this)
  }

  get notifications () {
    return bind({
      buildOptions: function(options) {
        var uri = options.origin + '/api/v1/me/notifications';

        if (options.id) {
          uri += '/' + options.id;
        }

        return { uri, options };
      },

      get: function(options = {}) {
        var { uri, options } = this.notifications.buildOptions(options);

        return baseGet(this.cache.notifications, uri, options, this.request, (body) => {
          return body;
        });
      }
    }, this);
  }

  get messages () {
    return bind({
      buildOptions: function(options) {
        var uri = options.origin + '/message/' + (options.view || 'inbox');

        return { uri, options };
      },

      get: function(options = {}) {
        var { uri, options } = this.messages.buildOptions(options);
        let data = [];
        let read = [];

        return baseGet(this.cache.messages, uri, options, this.request, (body) => {
          if (body && body.data && body.data.children) {
            body.data.children.forEach(function(t) {
              if (t.data.new) {
                read.push(t.data.name);
              }

              switch (t.kind) {
                case 't1':
                  data.push((new Comment(t.data)).toJSON());
                  break;
                case 't3':
                  data.push((new Link(t.data)).toJSON());
                  break;
                case 't4':
                  data.push((new Message(t.data)).toJSON());
                  break;
              }
            });
          }

          // Mark messages as read after we fetch them
          if (read.length > 0) {
            var readUrl = options.origin + '/api/read_message';

            var readOptions = Object.assign({
              form: {
                id: read.join(','),
              }
            }, options);

            basePost(readUrl, readOptions, this.request, () => {});
          }

          data.map(function(m) {
            if (m.replies) {
              m.replies = m.replies.data.children.filter(function(c) {
                return c && c.data;
              }).map(function(c){
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
        var uri = options.origin + '/api/comment';

        // New messages (not replies) go to the api/compose endpoint.
        if (!options.model.get('thingId')) {
          uri = options.origin + '/api/compose';
        }

        if (!options.model) {
          throw new NoModelError('/api/message');
        }

        var valid = options.model.validate();

        if (valid === true) {
          var json = options.model.toJSON();

          options.form = {
            api_type: 'json',
            text: json.text,
          };

          if (json.thingId) {
            options.form.thing_id = json.thingId;
          }

          if (json.fromSr) {
            options.form.from_sr = json.fromSr;
          }

          if (json.catpcha) {
            options.form.captcha = json.catpcha;
          }

          if (json.iden) {
            options.form.iden = json.iden;
          }

          if(json.subject) {
            options.form.subject = json.subject;
          }

          if (json.to) {
            options.form.to = json.to;
          }

          return basePost(uri, options, this.request, (body) => {
            if (body) {
              var message = body.json.data.things[0].data;
              return new Message(message).toJSON();
            } else {
              return null;
            }
          });
        } else {
          return new Promise(function(resolve, reject) {
            reject('Comment', options.model, valid);
          });
        }
      }
    }, this);
  }

  updateCommentOrLink (options) {
    var uri = options.origin + '/api/editusertext';

    if (!options.model) {
      throw new NoModelError('/api/editusertext');
    }
    // api only supports updating selftext
    var prop = options.model.props._type === 'Link' ? 'selftext' : 'body';
    options.model.set(prop, options.changeSet);

    var valid = options.model.validate();

    if (valid) {
      var json = options.model.toJSON();
      options.form = {
        api_type: 'json',
        text: json.selftext || json.body,
        thing_id: json.name,
      }

      return basePost(uri, options, this.request, (body) => {
        if (body.json.errors.length === 0) {
          var updatedThing = body.json.data.things[0].data;
           if (body.json.data.things[0].kind === 't3') {
             return new Link(updatedThing).toJSON();
           } else {
             return new Comment(updatedThing).toJSON();
           }
        } else {
          throw body.json.errors;
        }
      })
    } else {
      throw new ValidationError(options.model._type, options.model, valid);
    }
  }

  deleteCommentOrLink (options) {
    var uri = options.origin + '/api/del';

    if (!options.id) {
      throw('Must pass an `id` to `links.delete`.');
    }

    options.form = {
      id: options.id,
    };

    // api returns 200 and empty body in all cases no point
    // handling for now.
    return basePost(uri, options, this.request);
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
