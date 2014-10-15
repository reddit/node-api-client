import * as request from 'request';
import * as q from 'q';

import Account from '../models/account';
import Comment from '../models/comment';
import Link from '../models/link';
import Vote from '../models/vote';


function baseGet(uri, options, request, processOptions, formatBody) {
  var options = options || {};
  var defer = q.defer();

  var requestOptions = {
    uri: uri,
    headers: options.headers || {},
    qs: options.query,
  }

  requestOptions.headers['User-Agent'] = this.userAgent;

  if (processOptions) {
    requestOptions = processOptions(options, requestOptions);
  }

  request(requestOptions, (err, res) => {
    if (err) {
      defer.reject(err, res);
    } else {
      try {
        var body = JSON.parse(res.body);

        if (formatBody) {
          body = formatBody(body);
        }

        defer.resolve(body);
      } catch (e) {
        defer.reject(e);
      }
    }
  });

  return defer.promise;
}

function basePost(uri, options, request, processOptions, formatBody) {
  var options = options || {};
  var defer = q.defer();

  var requestOptions = {
    uri: uri,
    headers: options.headers || {},
    form: options.form,
  }

  requestOptions.headers['User-Agent'] = this.userAgent;

  if (processOptions) {
    requestOptions = processOptions(options, requestOptions);
  }

  request.post(requestOptions, (err, res) => {
    if (err) {
      defer.reject(err, res);
    } else {
      try {
        var body = JSON.parse(res.body);

        if (formatBody) {
          body = formatBody(body);
        }

        defer.resolve(body);
      } catch (e) {
        defer.reject(e);
      }
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
    var config = config || {};
    this.origin = config.origin || 'https://www.reddit.com';
    this.request = config.request || request;
    this.userAgent = config.userAgent || 'SNOODE UNREGISTERED v0.0.2';
  }

  get links () {
    return bind({
      get: function(options = {}) {
        var uri = this.origin + '/';
        var sort = options.sort || 'hot';

        if (options.query && options.query.subredditName) {
          uri += 'r/' + options.query.subredditName + '/';
        }

        uri += sort + '.json';

        return baseGet(uri, options, this.request, null, (body) => {
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

        return baseGet(uri, options, this.request, (options, requestOptions) => {
          if (options.comment) {
            requestOptions.query.comment = options.comment;
          }

          return requestOptions;
        }, (body) => {
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

        return baseGet(uri, options, this.request, null, (body) => {
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

        options.form = options.model.toJSON((props) => {
          return {
            id: props.id,
            dir: props.direction,
          };
        });

        return basePost (uri, options, this.request, null, () => null);
      }
    }, this)
  }
}

export default APIv1Endpoint;
