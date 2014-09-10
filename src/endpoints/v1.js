var request = require('request');
var Comment = require('../models/comment');
var Account = require('../models/account');
var Link = require('../models/link');
var Message = require('../models/message');
var Subreddit = require('../models/subreddit');
var Award = require('../models/award');
var PromoCampaign = require('../models/promocampaign');

var q = require('q');

var commonQueryParameters = [
  'after',
  'before',
  'limit',
  'count',
  'show'
];

var commonHeaderParameters = [
];

function buildQuery(options) {
  var query = {};

  commonQueryParameters.forEach(function(q) {
    if(options[q]) {
      query[q] = options[q];
    }
  });

  return query;
}

function buildHeaders(options) {
  var headers = {};

  commonHeaderParameters.forEach(function(q) {
    if(options[q]) {
      headers[q] = options[q];
    }
  });

  return headers;
}

function APIv1Endpoint(config) {
  var config = config || {};
  this.origin = config.origin || 'https://www.reddit.com';
  this.request = config.request || request;
};

function baseGet(uri, options, request, processOptions, formatBody) {
  var options = options || {};
  var defer = q.defer();

  var query = buildQuery(options);
  var headers = buildHeaders(options);

  var requestOptions = {
    uri: uri,
    headers: headers,
    query: query
  }

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
      return body.data.children.map(function(c) {
        return new Link(c.data);
      });
    });
  }

  return {
    get: get.bind(this)
  }
}

APIv1Endpoint.prototype.comments = function() {
  var get = function(options) {
    var options = options || {};
    var uri = this.origin + '/comments/' + options.linkId + '.json';

    return baseGet(uri, options, this.request, function(options, requestOptions) {
      if (options.comment) {
        requestOptions.query.comment = options.comment;
      }

      return requestOptions;
    }, function(body) {
      return body[1].data.children.map(function(c) {
        return new Comment(c.data);
      });
    });
  }

  return {
    get: get.bind(this)
  }
}

module.exports = APIv1Endpoint;
