import * as superagent from 'superagent';
import * as q from 'q';

import Account from '../models/account';
import Comment from '../models/comment';
import Link from '../models/link';
import Vote from '../models/vote';


function baseGet(uri, options, request, formatBody) {
  var options = options || {};
  var defer = q.defer();

  var query = options.query || {};
  var headers = options.headers || {};

  headers['User-Agent'] = options.userAgent;

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

        defer.resolve(body);
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

  headers['User-Agent'] = options.userAgent;

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
    this.userAgent = config.userAgent || 'SNOODE UNREGISTERED v0.0.2';
  }

  get links () {
    return bind({
      get: function(options = {}) {
        var uri = this.origin + '/';
        var sort = options.sort || 'hot';

        if (options.subredditName) {
          uri += 'r/' + options.subredditName + '/';
        }

        uri += sort + '.json';

        options.userAgent = this.userAgent;

        return baseGet(uri, options, this.request, (body) => {
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
      get: function(options = {}) {
        var uri = this.origin + '/comments/' + options.linkId + '.json';

        options.userAgent = this.userAgent;

        if (options.coment) {
          options.query.comment = options.comment;
        }

        return baseGet(uri, options, this.request, (body) => {
          return {
            listing: body[0].data.children[0].data,
            comments: body[1].data.children.map (mapReplies)
          }
        });
      }
    }, this);
  }

  get users () {
    return bind({
      get: function(options = {}) {
        var uri = this.origin + '/';

        if (options.user === 'me') { // current oauth doesn't return user id
          uri += 'api/v1/me';
        } else {
          uri += 'user/' + options.user + '/about.json';
        }

        options.userAgent = this.userAgent;

        return baseGet(uri, options, this.request, (body) => {
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

        options.userAgent = this.userAgent;

        options.form = options.model.toJSON((props) => {
          return {
            id: props.id,
            dir: props.direction,
          };
        });

        return basePost (uri, options, this.request, () => null);
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
