var request = require('request');
var Comment = require('../models/comment');
var Account = require('../models/account');
var Link = require('../models/link');
var Message = require('../models/message');
var Subreddit = require('../models/subreddit');
var Award = require('../models/award');
var PromoCampaign = require('../models/promocampaign');

var q = require('q');

function APIv1Endpoint(config) {
  var config = config || {};
  this.origin = config.origin || 'https://www.reddit.com';
  this.request = config.request || request;
  this.userAgent = config.userAgent || 'SNOODE UNREGISTERED v0.0.2';
};

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

  request(requestOptions, function(err, res) {
    if(err) {
      defer.reject(err, res);
    } else {
      try {
        var body = JSON.parse(res.body);

        if(formatBody) {
          body = formatBody(body);
        }

        defer.resolve(body);
      } catch(e) {
        defer.reject(e);
      }
    }
  });

  return defer.promise;
}

APIv1Endpoint.prototype.links = function() {
  var get = function(options) {
    var options = options || {};
    var uri = this.origin + '/';
    var view = options.view || 'hot';

    if (options.subredditName) {
      uri += 'r/' + options.subredditName + '/';
    }

    uri += view + '.json';

    return baseGet(uri, options, this.request, null, function(body) {
      if(body.data && body.data.children) {
        return body.data.children.map(function(c) {
          return new Link(c.data);
        });
      }else{
        return [];
      }
    });
  }

  return {
    get: get.bind(this)
  }
}

APIv1Endpoint.prototype.comments = function() {
  function mapReplies(comment) {
    var comment = comment.data;

    if (comment.replies) {
      comment.replies = comment.replies.data.children.map(mapReplies);
    } else {
      comment.replies = [];
    }

    return new Comment(comment);
  }

  var get = function(options) {
    var options = options || {};
    var uri = this.origin + '/comments/' + options.linkId + '.json';

    return baseGet(uri, options, this.request, function(options, requestOptions) {
      if (options.comment) {
        requestOptions.query.comment = options.comment;
      }

      return requestOptions;
    }, function(body) {
      return {
        listing: body[0].data.children[0].data,
        comments: body[1].data.children.map(mapReplies)
      }
    });
  }

  return {
    get: get.bind(this)
  }
}

APIv1Endpoint.prototype.users = function() {
  var get = function(options) {
    var options = options || {};
    var uri = this.origin + '/';

    if (options.user === 'me') { // current oauth doesn't return user id
      uri += 'api/v1/me';
    } else {
      uri += 'user/' + options.user + '/about.json';
    }

    return baseGet(uri, options, this.request, null, function(body) {
      if(body) {
        return new Account(body);
      }else{
        return null;
      }
    });
  }

  return {
    get: get.bind(this)
  }
}

module.exports = APIv1Endpoint;
