import superagent from 'superagent';
import retry from 'superagent-retry';

retry(superagent);

import querystring from 'querystring';
import Cache from 'restcache';
import has from 'lodash/object/has';

import User from '../models/user';
import Comment from '../models/comment';
import Link from '../models/link';
import Message from '../models/message';
import Vote from '../models/vote';
import Subreddit from '../models/subreddit';
import Stylesheet from '../models/stylesheet';
import Preferences from '../models/preferences';

import NoModelError from '../errors/noModelError';
import ValidationError from '../errors/validationError';

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

function processMeta(headers) {
  return {
    moose: headers['x-moose'],
    tracking: headers['x-reddit-tracking'],
  }
}

const TIMEOUT = 5000;

function returnGETPromise (options, formatBody, log) {
  return new Promise(function(resolve, reject) {
    let time = Date.now();

    log('requesting', 'GET', options.uri, options);

    let sa = superagent
     .get(options.uri)
     .set(options.headers || {})
     .query(options.query || {})
     .timeout(options.timeout)

    if (options.env !== 'SERVER') {
      sa.retry(3)
    } else {
      // redirects break on the server, thanks superagent
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
          return reject(err);
        }

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

        return resolve({
          headers: processMeta(res.headers),
          body: body,
        });
      } catch (e) {
        return reject(e);
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

const CACHE_RULES = [
  function shouldCache(options) {
    var params = options[0];
    // Do not cache if the rendering environment is the server
    return params.env !== 'SERVER';
  }
]

class APIv1Endpoint {
  constructor (config = {}) {
    this.config = config;

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
        }
      }
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
    var query = options.query || {};
    var headers = options.headers || {};
    let log = this.log.bind(this);

    if (!options.env) {
      options.env = 'SERVER';
    }

    options.timeout = this.config.timeout || TIMEOUT;

    if (options.userAgent) {
      headers['User-Agent'] = options.userAgent;
    }

    options.uri = uri;

    if (options.cache) {
      let cacheOptions = Object.assign({
        name: uri,
        rules: CACHE_RULES,
      }, options.cache)

      if (options.id) {
        return this.cache.getById(cacheOptions.type, options.id, returnGETPromise, [options, formatBody, log], cacheOptions);
      } else {
        return this.cache.get(returnGETPromise, [options, formatBody, log], cacheOptions);
      }
    } else {
      return returnGETPromise(options, formatBody, log);
    }
  }

  basePost(uri, options, formatBody, dataType, id, mergeOpts) {
    return this.save('post', ...arguments);
  }

  basePatch(uri, options, formatBody, dataType, id, mergeOpts) {
    return this.save('patch', ...arguments);
  }

  save(method, uri, options, formatBody, dataType, id, mergeOpts) {
    var options = options || {};

    var form = options.form || {};
    var headers = options.headers || {};

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
            return reject(err);
          }

          if (!res.ok) {
            return reject(res);
          }

          if (cache.dataCache[dataType] && dataType && options.env === 'CLIENT') {
            if (!options.id) {
              cache.resetData(dataType);
            } else {
              if (!mergeOpts) {
                cache.dataCache[dataType].del(options.id);
              }

              var data = cache.dataCache[dataType].get(options.id);

              if (data) {
                cache.dataCache[dataType].set(options.id, Object.assign(data, mergeOpts));
              }
            }
          }

          try {
            massageAPIv1JsonRes(res);
            var body = res.body;

            if (formatBody) {
              body = formatBody(body);
            }

            resolve(body);
          } catch (e) {
            reject(e);
          }
        });
    });
  }

  hydrate (endpoint, baseOptions, data) {
    var cacheData;

    if (!data.body && !Array.isArray(data)) {
      cacheData = {
        body: [data],
      }
    } else {
      cacheData = Object.assign({}, data);
    }

    let { uri, options } = this[endpoint].buildOptions(baseOptions);
    options.uri = uri;

    if (!options.cache || !this[endpoint].formatBody) { return; }

    let formatBody = this[endpoint].formatBody(options);
    let hash = Cache.generateHash([options, formatBody]);

    if (options.cache.format) {
      cacheData.body = options.cache.format(cacheData.body);
    }

    this.cache.setCaches(uri, hash, cacheData, options.cache);

    if (options.cache.unformat) {
      cacheData.body = options.cache.unformat(cacheData.body);
    }
  }

  get preferences () {
    return bind({
      buildOptions: function(options) {
        var uri = options.origin + '/api/v1/me/prefs';

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
          }
        };

        return { uri, options };
      },

      get: function(options = {}) {
        var { uri, options } = this.preferences.buildOptions(options);

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

      patch: function(options = {}) {

        var { uri, options } = this.preferences.buildOptions(options);
        options.form = {
          api_type: 'json',
        };

        options.changeSet.forEach((prop) => {
          options.form[prop] = options.model.get(prop);
        })

        return this.basePatch(uri, options, (body) => {
          if (body) {
            return new Preferences(body).toJSON();
          } else {
            return {};
          }
        }, 'preferences');
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
          uri += `/by_id/${options.query.ids.join(',')}.json`;
        } else {
          if (options.query.subredditName) {
            uri += `/r/${options.query.subredditName}`;
          } else if (options.query.multi) {
            uri += `/user/${options.query.multiUser}/m/${options.query.multi}`
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
            return { links: d }
          },
          unformat: function(d) {
            return d.links;
          }
        };

        return { uri, options }
      },

      get: function(options = {}) {
        var { uri, options } = this.links.buildOptions(options);
        return this.baseGet(uri, options, this.links.formatBody(options));
      },

      formatBody: function(options) {
        return function(body) {
          if (body.data && body.data.children && body.data.children[0]) {
            if (options.id) {
              return new Link(body.data.children[0].data).toJSON()
            } else {
              return body.data.children.map(c => new Link(c.data).toJSON())
            }
          } else if (body.data.children) {
            return [];
          }
        }
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

        return { uri, options }
      },

      get: function(options = {}) {
        var { uri, options } = this.comments.buildOptions(options);

        return this.baseGet(uri, options, (body) => {
          if (Array.isArray(body)) {
            return body[1].data.children.map(mapReplies);
          } else if (body.json && body.json.data) {
            return body.json.data.things.map(mapReplies);
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

      delete: function (options = {}) {
        options.type = 'comment';
        return this.deleteCommentOrLink(options);
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

          var likes;

          if (options.model.props.direction === -1) {
            likes = false;
          } else if (options.model.props.direction === 1) {
            likes = true;
          }

          return this.basePost(uri, options, () => null,
                               options.type.toLowerCase() + 's',
                               options.form.id,
                               {
                                likes: likes,
                                score: options.score,
                               });
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

          return this.basePost(uri, options, () => null, 
                              options.model.props._type.toLowerCase() + 's',
                              options.form.thing_id,
                              {
                                hidden: true,
                              }
                              );
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

        return this.baseGet({}, uri, options, (body) => {
          if (typeof body === 'boolean') {
            return body;
          }
        });
      },

      post: function(options = {}) {
        var uri = options.origin + '/api/new_captcha';

        return this.basePost(uri, options, (body) => {
          if (!body.json.errors.length) {
            return body.json.data;
          } else {
            return body.json.errors;
          }
        })
      }
    }, this)
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

        return this.baseGet(uri, options, (body) => {
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

            this.basePost(readUrl, readOptions, () => {});
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

          if (json.from) {
            options.form.from_sr = json.from;
          }

          if (json.captcha) {
            options.form.captcha = json.captcha;
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

          return this.basePost(uri, options, (body) => {
            let res = body.json;

            if (res && res.data) {
              let message = res.data.things[0].data;
              return new Message(message).toJSON();
            } else if (res.errors.length){
              throw res;
            } else {
              return res;
            }
          });
        } else {
          throw new ValidationError(options.model._type, options.model, valid);
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

      return this.basePost(uri, options, (body) => {
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
      }, options.model.props._type.toLowerCase() + 's', options.form.thing_id, {
        text: options.form.text,
      });
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
