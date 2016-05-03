(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("lodash/object"), require("lodash/array"), require("superagent"), require("lodash/collection"), require("lodash/lang"));
	else if(typeof define === 'function' && define.amd)
		define(["lodash/object", "lodash/array", "superagent", "lodash/collection", "lodash/lang"], factory);
	else if(typeof exports === 'object')
		exports["apiClient.js"] = factory(require("lodash/object"), require("lodash/array"), require("superagent"), require("lodash/collection"), require("lodash/lang"));
	else
		root["apiClient.js"] = factory(root["lodash/object"], root["lodash/array"], root["superagent"], root["lodash/collection"], root["lodash/lang"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_16__, __WEBPACK_EXTERNAL_MODULE_28__, __WEBPACK_EXTERNAL_MODULE_42__, __WEBPACK_EXTERNAL_MODULE_43__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 35);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony export */ exports["g"] = thingType;var COMMENT = 'comment';
	/* harmony export */ Object.defineProperty(exports, "a", {configurable: false, enumerable: true, get: function() { return COMMENT; }});
	var COMMENT_TYPE = 't1';/* unused harmony export COMMENT_TYPE */
	var COMMENT_LOAD_MORE = 'comment_load_more';
	/* harmony export */ Object.defineProperty(exports, "h", {configurable: false, enumerable: true, get: function() { return COMMENT_LOAD_MORE; }});

	var USER = 'user';
	/* harmony export */ Object.defineProperty(exports, "c", {configurable: false, enumerable: true, get: function() { return USER; }});
	var USER_TYPE = 't2';/* unused harmony export USER_TYPE */

	var POST = 'post';
	/* harmony export */ Object.defineProperty(exports, "b", {configurable: false, enumerable: true, get: function() { return POST; }});
	var POST_TYPE = 't3';
	/* harmony export */ Object.defineProperty(exports, "i", {configurable: false, enumerable: true, get: function() { return POST_TYPE; }});

	var MESSAGE = 'message';
	/* harmony export */ Object.defineProperty(exports, "d", {configurable: false, enumerable: true, get: function() { return MESSAGE; }});
	var MESSAGE_TYPE = 't4';/* unused harmony export MESSAGE_TYPE */

	var SUBREDDIT = 'subreddit';
	/* harmony export */ Object.defineProperty(exports, "e", {configurable: false, enumerable: true, get: function() { return SUBREDDIT; }});
	var SUBREDDIT_TYPE = 't5';/* unused harmony export SUBREDDIT_TYPE */

	var TROPHIE = 'trophie';/* unused harmony export TROPHIE */
	var TROPHIE_TYPE = 't6';/* unused harmony export TROPHIE_TYPE */

	var PROMOCAMPAIGN = 'promocampaign';/* unused harmony export PROMOCAMPAIGN */
	var PROMOCAMPAIGN_TYPE = 't8';/* unused harmony export PROMOCAMPAIGN_TYPE */

	var type_pairs = [[COMMENT, COMMENT_TYPE], [USER, USER_TYPE], [POST, POST_TYPE], [MESSAGE, MESSAGE_TYPE], [SUBREDDIT, SUBREDDIT_TYPE], [TROPHIE, TROPHIE_TYPE], [PROMOCAMPAIGN, PROMOCAMPAIGN_TYPE]];

	var TYPES = type_pairs.reduce(function (table, pair) {
	  table[pair[1]] = pair[0];
	  return table;
	}, {});
	/* harmony export */ Object.defineProperty(exports, "f", {configurable: false, enumerable: true, get: function() { return TYPES; }});

	var TYPE_TO_THING_TYPE = type_pairs.reduce(function (table, pair) {
	  table[pair[0]] = pair[1];
	  return table;
	}, {});/* unused harmony export TYPE_TO_THING_TYPE */

	function thingType(id) {
	  return TYPES[id.substring(0, 2)];
	}

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_superagent__ = __webpack_require__(28);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_superagent___default = __WEBPACK_IMPORTED_MODULE_0_superagent__ && __WEBPACK_IMPORTED_MODULE_0_superagent__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0_superagent__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0_superagent__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_0_superagent___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_0_superagent___default });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__errors_ValidationError__ = __webpack_require__(11);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__errors_NoModelError__ = __webpack_require__(7);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__APIResponse__ = __webpack_require__(5);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Events__ = __webpack_require__(25);
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };









	var EventEmitterShim = {
	  emit: function emit() {},
	  on: function on() {},
	  off: function off() {}
	};

	var DefaultOptions = {
	  userAgent: 'snoodev3',
	  origin: 'https://www.reddit.com',
	  appName: 'node-api-client-v3',
	  env: 'develop',
	  token: '',
	  timeout: 5000,
	  eventEmitter: EventEmitterShim
	};

	var makeOptions = function makeOptions() {
	  var overrides = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	  return _extends({}, DefaultOptions, overrides);
	};
	/* harmony export */ Object.defineProperty(exports, "c", {configurable: false, enumerable: true, get: function() { return makeOptions; }});

	var getEmitter = function getEmitter(apiOptions) {
	  return apiOptions.eventEmitter || EventEmitterShim;
	};

	var requestAuthHeader = function requestAuthHeader(apiOptions) {
	  var token = apiOptions.token;
	  if (!token) {
	    return {};
	  }
	  return { Authorization: 'Bearer ' + token };
	};

	var requestHeaders = function requestHeaders(apiOptions) {
	  var authHeaders = requestAuthHeader(apiOptions);
	  return _extends({}, apiOptions.defaultHeaders || {}, authHeaders);
	};

	var requestPath = function requestPath(apiOptions, path) {
	  return apiOptions.origin + '/' + path;
	};

	var appParameter = function appParameter(apiOptions) {
	  return apiOptions.appName + '-' + apiOptions.env;
	};

	var rawSend = function rawSend(apiOptions, method, path, data, kind, cb) {
	  var origin = apiOptions.origin;
	  var url = requestPath(apiOptions, path);

	  var fakeReq = {
	    origin: origin,
	    path: path,
	    url: url,
	    method: method,
	    query: _extends({}, data)
	  };

	  getEmitter(apiOptions).emit(/* harmony import */__WEBPACK_IMPORTED_MODULE_4__Events__["a"].request, fakeReq);
	  var s = /* harmony import */__WEBPACK_IMPORTED_MODULE_0_superagent___default.a[method](url);
	  s.set(requestHeaders(apiOptions));

	  data.app = appParameter(apiOptions);

	  if (kind === 'form') {
	    s.type('form');
	    s.send(data);
	  } else {
	    s.query(data);

	    if (s.redirects) {
	      s.redirects(0);
	    }
	  }

	  s.end(function (err, res) {
	    // handle super agent inconsistencies
	    var req = res ? res.request : fakeReq;
	    cb(err, res, req);
	  });
	};/* unused harmony export rawSend */

	var validateData = function validateData(data, method, apiName, validator) {
	  if (!(data && validator)) {
	    throw new /* harmony import */__WEBPACK_IMPORTED_MODULE_1__errors_ValidationError__["a"](apiName, undefined);
	  }
	  if (!validator(method)) {
	    throw new /* harmony import */__WEBPACK_IMPORTED_MODULE_1__errors_ValidationError__["a"](apiName, data);
	  }
	};
	/* harmony export */ Object.defineProperty(exports, "b", {configurable: false, enumerable: true, get: function() { return validateData; }});

	var save = function save(apiOptions, method, path, data, parseBody, parseMeta) {
	  if (!(apiOptions && method && path && data)) {
	    throw new /* harmony import */__WEBPACK_IMPORTED_MODULE_2__errors_NoModelError__["a"]();
	  }

	  return new Promise(function (resolve, reject) {
	    rawSend(apiOptions, method, path, data, 'form', function (err, res, req) {
	      handle(apiOptions, resolve, reject, err, res, req, data, method, parseBody, parseMeta);
	    });
	  });
	};/* unused harmony export save */

	var runQuery = function runQuery(apiOptions, method, path, query, rawQuery, parseBody, parseMeta) {
	  if (!(apiOptions && method && path && query && rawQuery)) {
	    throw new /* harmony import */__WEBPACK_IMPORTED_MODULE_2__errors_NoModelError__["a"]();
	  }

	  if (method === 'get') {
	    query.raw_json = 1;
	  }

	  return new Promise(function (resolve, reject) {
	    rawSend(apiOptions, method, path, query, 'query', function (err, res, req) {
	      handle(apiOptions, resolve, reject, err, res, req, rawQuery, method, parseBody, parseMeta);
	    });
	  });
	};
	/* harmony export */ Object.defineProperty(exports, "a", {configurable: false, enumerable: true, get: function() { return runQuery; }});

	var normalizeRequest = function normalizeRequest(res, req) {
	  if (res && !req) {
	    return res.request || res.req;
	  }

	  return req;
	};

	var handleRequestIfFailed = function handleRequestIfFailed(apiOptions, err, res, req, reject) {
	  if (!(err || res && !res.ok)) {
	    return;
	  }

	  getEmitter(apiOptions).emit(/* harmony import */__WEBPACK_IMPORTED_MODULE_4__Events__["a"].error, err, req);
	  var errorHandler = apiOptions.defaultErrorHandler || reject;
	  errorHandler(err || 500);
	  return true;
	};

	var handle = function handle(apiOptions, resolve, reject, err, res, req, query, method, parseBody, parseMeta) {

	  req = normalizeRequest(res, req);

	  if (handleRequestIfFailed(apiOptions, err, res, req, reject)) {
	    return;
	  }

	  getEmitter(apiOptions).emit(/* harmony import */__WEBPACK_IMPORTED_MODULE_4__Events__["a"].response, req, res);

	  var apiResponse = tryParseResponse(reject, res, req, method, query, parseBody, parseMeta);

	  getEmitter(apiOptions).emit(/* harmony import */__WEBPACK_IMPORTED_MODULE_4__Events__["a"].result, apiResponse);
	  resolve(apiResponse);
	};

	var tryParseResponse = function tryParseResponse(reject, res, req, method, query, parseBody, parseMeta) {
	  try {
	    return makeApiResponse(res, req, method, query, parseBody, parseMeta);
	  } catch (e) {
	    console.trace(e);
	    reject(e);
	  }
	};

	var makeApiResponse = function makeApiResponse(res, req, method, query, parseBody, parseMeta) {
	  if (!parseBody) {
	    return res.body;
	  }
	  var meta = parseMeta ? parseMeta(res, req, method) : res.headers;
	  var apiResponse = new /* harmony import */__WEBPACK_IMPORTED_MODULE_3__APIResponse__["a"](meta, query);
	  var start = Date.now();
	  parseBody(res, apiResponse, req, method);
	  var end = Date.now();
	  console.log('response parsing took ' + (end - start));
	  return apiResponse;
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__RedditModel__ = __webpack_require__(15);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__thingTypes__ = __webpack_require__(0);
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




	var T = /* harmony import */__WEBPACK_IMPORTED_MODULE_0__RedditModel__["a"].Types;

	var PostModel = function (_RedditModel) {
	  _inherits(PostModel, _RedditModel);

	  function PostModel() {
	    _classCallCheck(this, PostModel);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(PostModel).apply(this, arguments));
	  }

	  return PostModel;
	}(/* harmony import */__WEBPACK_IMPORTED_MODULE_0__RedditModel__["a"]);

	PostModel.type = /* harmony import */__WEBPACK_IMPORTED_MODULE_1__thingTypes__["b"];
	PostModel.PROPERTIES = {
	  author: T.string,
	  cleanPermalink: T.link,
	  cleanURL: T.link,
	  distinguished: T.string,
	  domain: T.string,
	  downs: T.number,
	  id: T.string,
	  likes: T.cubit,
	  malink: T.link,
	  name: T.string,
	  promoted: T.bool,
	  quarantine: T.bool,
	  saved: T.bool,
	  score: T.number,
	  sticked: T.bool,
	  thumbnail: T.string,
	  title: T.string,
	  ups: T.number,

	  // aliases
	  authorFlairCSSClass: T.string,
	  authorFlairText: T.string,
	  createdUTC: T.number,
	  hideScore: T.bool,
	  isSelf: T.bool,
	  linkFlairCSSClass: T.string,
	  linkFlairText: T.string,
	  mediaOembed: T.nop,
	  modReports: T.array,
	  numComments: T.number,
	  secureMedia: T.nop,
	  selfText: T.string,
	  sendReplies: T.bool,
	  userReports: T.array,

	  // derived
	  expandable: T.bool,
	  expandedContent: T.html,
	  preview: T.nop };
	PostModel.API_ALIASES = {
	  author_flair_css_class: 'authorFlairCSSClass',
	  author_flair_text: 'authorFlairText',
	  created_utc: 'createdUTC',
	  hide_score: 'hideScore',
	  is_self: 'isSelf',
	  link_flair_css_class: 'linkFlairCSSClass',
	  link_flair_text: 'linkFlairText',
	  media_oembed: 'mediaOembed',
	  mod_reports: 'modReports',
	  num_comments: 'numComments',
	  permalink: 'cleanPermalink',
	  secure_media: 'secureMedia',
	  selftext: 'selfText',
	  sendreplies: 'sendReplies',
	  url: 'cleanURL',
	  user_reports: 'userReports'
	};
	PostModel.DERIVED_PROPERTIES = {
	  expandable: function expandable(data) {
	    // If it has secure_media, or media, or selftext, it has expandable.
	    return !!(data.secure_media && data.secure_media.content || data.media_embed && data.media_embed.content || data.selftext);
	  },
	  expandedContent: function expandedContent(data) {
	    var content = void 0;

	    content = data.secure_media_embed && data.secure_media_embed.content || data.media_embed && data.media_embed.content;

	    if (!content && data.selftext) {
	      content = data.selftext;
	    }

	    return content;
	  },
	  preview: function preview(data) {
	    if (!(data.promoted && !data.preview)) {
	      return data.preview;
	    }
	    // we build fake preview data for ads and normal thumbnails

	    var resolutions = [];

	    if (data.mobile_ad_url) {
	      resolutions.push({
	        url: data.mobile_ad_url,
	        height: 628,
	        width: 1200
	      });
	    }

	    if (data.thumbnail) {
	      resolutions.push({
	        url: data.thumbnail,
	        height: 140,
	        width: 140
	      });
	    }

	    return {
	      images: [{
	        resolutions: resolutions
	      }]
	    };
	  }
	};
	/* harmony default export */ exports["a"] = PostModel;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__apiBase_APIResponsePaging__ = __webpack_require__(6);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash_object__ = __webpack_require__(4);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash_object___default = __WEBPACK_IMPORTED_MODULE_1_lodash_object__ && __WEBPACK_IMPORTED_MODULE_1_lodash_object__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_1_lodash_object__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_1_lodash_object__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_1_lodash_object___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_1_lodash_object___default });
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }




	var identity = function identity(id) {
	  return id;
	};

	// Base class for paged collections
	// TODO: rethink base options a bit, whould base options just really make everytyhing?
	// think more about next page and etc, it should be easy to do paged requests
	// in the very first fetch call

	var Listing = function () {
	  _createClass(Listing, null, [{
	    key: 'baseOptions',
	    value: function baseOptions() {
	      return {};
	    }
	  }, {
	    key: 'getResponse',
	    value: function () {
	      var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(apiOptions) {
	        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	        var res;
	        return regeneratorRuntime.wrap(function _callee$(_context) {
	          while (1) {
	            switch (_context.prev = _context.next) {
	              case 0:
	                _context.next = 2;
	                return this.endpoint.get(apiOptions, _extends({}, this.baseOptions(), options));

	              case 2:
	                res = _context.sent;
	                return _context.abrupt('return', res);

	              case 4:
	              case 'end':
	                return _context.stop();
	            }
	          }
	        }, _callee, this);
	      }));

	      function getResponse(_x, _x2) {
	        return ref.apply(this, arguments);
	      }

	      return getResponse;
	    }()
	  }, {
	    key: 'fetch',
	    value: function () {
	      var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(apiOptions) {
	        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	        return regeneratorRuntime.wrap(function _callee2$(_context2) {
	          while (1) {
	            switch (_context2.prev = _context2.next) {
	              case 0:
	                _context2.t0 = this;
	                _context2.next = 3;
	                return this.getResponse(apiOptions, options);

	              case 3:
	                _context2.t1 = _context2.sent;
	                return _context2.abrupt('return', new _context2.t0(_context2.t1));

	              case 5:
	              case 'end':
	                return _context2.stop();
	            }
	          }
	        }, _callee2, this);
	      }));

	      function fetch(_x4, _x5) {
	        return ref.apply(this, arguments);
	      }

	      return fetch;
	    }()
	  }]);

	  function Listing(apiResponse) {
	    _classCallCheck(this, Listing);

	    this.apiResponse = apiResponse;
	    this.nextResponse = this.nextResponse.bind(this);
	    this.prevResponse = this.prevResponse.bind(this);
	  }

	  _createClass(Listing, [{
	    key: 'hasNextPage',
	    value: function hasNextPage() {
	      return !!this.afterId;
	    }
	  }, {
	    key: 'hasPreviousPage',
	    value: function hasPreviousPage() {
	      return !!this.prevId;
	    }
	  }, {
	    key: 'nextResponse',
	    value: function () {
	      var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(apiOptions) {
	        var after, options;
	        return regeneratorRuntime.wrap(function _callee3$(_context3) {
	          while (1) {
	            switch (_context3.prev = _context3.next) {
	              case 0:
	                after = this.afterId;

	                if (after) {
	                  _context3.next = 3;
	                  break;
	                }

	                return _context3.abrupt('return');

	              case 3:
	                options = /* harmony import */__WEBPACK_IMPORTED_MODULE_1_lodash_object__["omit"].bind()(_extends({}, this.apiResponse.query, { after: after }), 'before');
	                _context3.next = 6;
	                return this.constructor.getResponse(apiOptions, options);

	              case 6:
	                return _context3.abrupt('return', _context3.sent);

	              case 7:
	              case 'end':
	                return _context3.stop();
	            }
	          }
	        }, _callee3, this);
	      }));

	      function nextResponse(_x7) {
	        return ref.apply(this, arguments);
	      }

	      return nextResponse;
	    }()
	  }, {
	    key: 'prevResponse',
	    value: function () {
	      var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(apiOptions) {
	        var before, options;
	        return regeneratorRuntime.wrap(function _callee4$(_context4) {
	          while (1) {
	            switch (_context4.prev = _context4.next) {
	              case 0:
	                before = this.prevId;

	                if (before) {
	                  _context4.next = 3;
	                  break;
	                }

	                return _context4.abrupt('return');

	              case 3:
	                options = /* harmony import */__WEBPACK_IMPORTED_MODULE_1_lodash_object__["omit"].bind()(_extends({}, this.apiResponse.query, { before: before }), 'after');
	                _context4.next = 6;
	                return this.constructor.getResponse(apiOptions, options);

	              case 6:
	                return _context4.abrupt('return', _context4.sent);

	              case 7:
	              case 'end':
	                return _context4.stop();
	            }
	          }
	        }, _callee4, this);
	      }));

	      function prevResponse(_x8) {
	        return ref.apply(this, arguments);
	      }

	      return prevResponse;
	    }()
	  }, {
	    key: 'fetchAndMakeInstance',
	    value: function () {
	      var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(fetchMethod, apiOptions, reduceResponse) {
	        var response;
	        return regeneratorRuntime.wrap(function _callee5$(_context5) {
	          while (1) {
	            switch (_context5.prev = _context5.next) {
	              case 0:
	                _context5.next = 2;
	                return fetchMethod(apiOptions);

	              case 2:
	                response = _context5.sent;

	                if (!response) {
	                  _context5.next = 5;
	                  break;
	                }

	                return _context5.abrupt('return', new this.constructor(reduceResponse(response)));

	              case 5:
	              case 'end':
	                return _context5.stop();
	            }
	          }
	        }, _callee5, this);
	      }));

	      function fetchAndMakeInstance(_x9, _x10, _x11) {
	        return ref.apply(this, arguments);
	      }

	      return fetchAndMakeInstance;
	    }()
	  }, {
	    key: 'nextPage',
	    value: function () {
	      var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee6(apiOptions) {
	        return regeneratorRuntime.wrap(function _callee6$(_context6) {
	          while (1) {
	            switch (_context6.prev = _context6.next) {
	              case 0:
	                return _context6.abrupt('return', this.fetchAndMakeInstance(this.nextResponse, apiOptions, identity));

	              case 1:
	              case 'end':
	                return _context6.stop();
	            }
	          }
	        }, _callee6, this);
	      }));

	      function nextPage(_x12) {
	        return ref.apply(this, arguments);
	      }

	      return nextPage;
	    }()
	  }, {
	    key: 'withNextPage',
	    value: function () {
	      var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee7(apiOptions) {
	        var nextResponse, apiResponse;
	        return regeneratorRuntime.wrap(function _callee7$(_context7) {
	          while (1) {
	            switch (_context7.prev = _context7.next) {
	              case 0:
	                nextResponse = this.nextResponse;
	                apiResponse = this.apiResponse;
	                return _context7.abrupt('return', this.fetchAndMakeInstance(nextResponse, apiOptions, apiResponse.appendResponse));

	              case 3:
	              case 'end':
	                return _context7.stop();
	            }
	          }
	        }, _callee7, this);
	      }));

	      function withNextPage(_x13) {
	        return ref.apply(this, arguments);
	      }

	      return withNextPage;
	    }()
	  }, {
	    key: 'prevPage',
	    value: function () {
	      var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee8(apiOptions) {
	        return regeneratorRuntime.wrap(function _callee8$(_context8) {
	          while (1) {
	            switch (_context8.prev = _context8.next) {
	              case 0:
	                return _context8.abrupt('return', this.fetchAndMakeInstance(this.prevResponse, apiOptions, identity));

	              case 1:
	              case 'end':
	                return _context8.stop();
	            }
	          }
	        }, _callee8, this);
	      }));

	      function prevPage(_x14) {
	        return ref.apply(this, arguments);
	      }

	      return prevPage;
	    }()
	  }, {
	    key: 'withPrevPage',
	    value: function () {
	      var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee9(apiOptions) {
	        var _this = this;

	        return regeneratorRuntime.wrap(function _callee9$(_context9) {
	          while (1) {
	            switch (_context9.prev = _context9.next) {
	              case 0:
	                return _context9.abrupt('return', this.fetchAndMakeInstance(this.prevResponse, apiOptions, function (prevResponse) {
	                  return prevResponse.appendResponse(_this.apiResponse);
	                }));

	              case 1:
	              case 'end':
	                return _context9.stop();
	            }
	          }
	        }, _callee9, this);
	      }));

	      function withPrevPage(_x15) {
	        return ref.apply(this, arguments);
	      }

	      return withPrevPage;
	    }()
	  }, {
	    key: 'afterId',
	    get: function get() {
	      return /* harmony import */__WEBPACK_IMPORTED_MODULE_0__apiBase_APIResponsePaging__["b"].bind()(this.apiResponse);
	    }
	  }, {
	    key: 'prevId',
	    get: function get() {
	      return /* harmony import */__WEBPACK_IMPORTED_MODULE_0__apiBase_APIResponsePaging__["c"].bind()(this.apiResponse);
	    }
	  }]);

	  return Listing;
	}();

	Listing.endpoint = {
	  get: function get() {}
	};
	/* harmony default export */ exports["a"] = Listing;

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("lodash/object");

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_collection__ = __webpack_require__(42);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_collection___default = __WEBPACK_IMPORTED_MODULE_0_lodash_collection__ && __WEBPACK_IMPORTED_MODULE_0_lodash_collection__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0_lodash_collection__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0_lodash_collection__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_0_lodash_collection___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_0_lodash_collection___default });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash_array__ = __webpack_require__(16);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash_array___default = __WEBPACK_IMPORTED_MODULE_1_lodash_array__ && __WEBPACK_IMPORTED_MODULE_1_lodash_array__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_1_lodash_array__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_1_lodash_array__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_1_lodash_array___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_1_lodash_array___default });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models2_thingTypes__ = __webpack_require__(0);
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }






	var APIResponseBase = function () {
	  function APIResponseBase() {
	    var _typeToTable;

	    _classCallCheck(this, APIResponseBase);

	    this.results = [];

	    this.posts = {};
	    this.comments = {};
	    this.users = {};
	    this.messages = {};
	    this.subreddits = {};

	    this.typeToTable = (_typeToTable = {}, _defineProperty(_typeToTable, /* harmony import */__WEBPACK_IMPORTED_MODULE_2__models2_thingTypes__["a"], this.comments), _defineProperty(_typeToTable, /* harmony import */__WEBPACK_IMPORTED_MODULE_2__models2_thingTypes__["b"], this.posts), _defineProperty(_typeToTable, /* harmony import */__WEBPACK_IMPORTED_MODULE_2__models2_thingTypes__["c"], this.users), _defineProperty(_typeToTable, /* harmony import */__WEBPACK_IMPORTED_MODULE_2__models2_thingTypes__["d"], this.messages), _defineProperty(_typeToTable, /* harmony import */__WEBPACK_IMPORTED_MODULE_2__models2_thingTypes__["e"], this.subreddits), _typeToTable);

	    this.addResult = this.addResult.bind(this);
	    this.addModel = this.addModel.bind(this);
	    this.makeRecord = this.makeRecord.bind(this);
	    this.addToTable = this.addToTable.bind(this);
	    this.getModelFromRecord = this.getModelFromRecord.bind(this);
	    this.appendResponse = this.appendResponse.bind(this);
	  }

	  _createClass(APIResponseBase, [{
	    key: 'addResult',
	    value: function addResult(model) {
	      if (!model) {
	        return this;
	      }
	      var record = this.makeRecord(model);
	      if (record) {
	        this.results.push(record);
	        this.addToTable(record, model);
	      }

	      return this;
	    }
	  }, {
	    key: 'addModel',
	    value: function addModel(model) {
	      if (!model) {
	        return this;
	      }
	      var record = this.makeRecord(model);
	      if (record) {
	        this.addToTable(record, model);
	      }

	      return this;
	    }
	  }, {
	    key: 'makeRecord',
	    value: function makeRecord(model) {
	      if (model.toRecord) {
	        return model.toRecord();
	      }
	      var uuid = model.uuid;

	      if (!uuid) {
	        return;
	      }

	      var type = /* harmony import */__WEBPACK_IMPORTED_MODULE_2__models2_thingTypes__["f"][model.kind] || /* harmony import */__WEBPACK_IMPORTED_MODULE_2__models2_thingTypes__["g"].bind()(uuid);
	      if (!type) {
	        return;
	      }
	      return { type: type, uuid: uuid };
	    }
	  }, {
	    key: 'addToTable',
	    value: function addToTable(record, model) {
	      var table = this.typeToTable[record.type];
	      if (table) {
	        table[record.uuid] = model;
	      }
	      return this;
	    }
	  }, {
	    key: 'getModelFromRecord',
	    value: function getModelFromRecord(record) {
	      var table = this.typeToTable[record.type];
	      if (table) {
	        return table[record.uuid];
	      }
	    }
	  }, {
	    key: 'appendResponse',
	    value: function appendResponse() {
	      throw new Error('Not implemented in base class');
	    }
	  }]);

	  return APIResponseBase;
	}();/* unused harmony export APIResponseBase */

	var APIResponse = function (_APIResponseBase) {
	  _inherits(APIResponse, _APIResponseBase);

	  function APIResponse() {
	    var meta = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var query = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    _classCallCheck(this, APIResponse);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(APIResponse).call(this));

	    _this.meta = meta;
	    _this.query = query;
	    return _this;
	  }

	  _createClass(APIResponse, [{
	    key: 'appendResponse',
	    value: function appendResponse(nextResponse) {
	      return new MergedApiReponse([this, nextResponse]);
	    }
	  }]);

	  return APIResponse;
	}(APIResponseBase);

	/* harmony default export */ exports["a"] = APIResponse;


	var MergedApiReponse = function (_APIResponseBase2) {
	  _inherits(MergedApiReponse, _APIResponseBase2);

	  function MergedApiReponse(apiResponses) {
	    _classCallCheck(this, MergedApiReponse);

	    var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(MergedApiReponse).call(this));

	    _this2.metas = apiResponses.map(function (response) {
	      return response.meta;
	    });
	    _this2.querys = apiResponses.map(function (response) {
	      return response.query;
	    });

	    _this2.apiResponses = apiResponses;

	    var seenResults = new Set();

	    var tableKeys = [/* harmony import */__WEBPACK_IMPORTED_MODULE_2__models2_thingTypes__["a"], /* harmony import */__WEBPACK_IMPORTED_MODULE_2__models2_thingTypes__["c"], /* harmony import */__WEBPACK_IMPORTED_MODULE_2__models2_thingTypes__["b"], /* harmony import */__WEBPACK_IMPORTED_MODULE_2__models2_thingTypes__["d"], /* harmony import */__WEBPACK_IMPORTED_MODULE_2__models2_thingTypes__["e"]];

	    /* harmony import */__WEBPACK_IMPORTED_MODULE_0_lodash_collection__["forEach"].bind()(apiResponses, function (apiResponse) {
	      /* harmony import */__WEBPACK_IMPORTED_MODULE_0_lodash_collection__["forEach"].bind()(apiResponse.results, function (record) {
	        if (!seenResults.has(record.uuid)) {
	          seenResults.add(record.uuid);
	          _this2.results.push(record);
	        }
	      });

	      /* harmony import */__WEBPACK_IMPORTED_MODULE_0_lodash_collection__["forEach"].bind()(tableKeys, function (tableKey) {
	        var table = _this2.typeToTable[tableKey];
	        Object.assign(table, apiResponse.typeToTable[tableKey]);
	      });
	    });
	    return _this2;
	  }

	  _createClass(MergedApiReponse, [{
	    key: 'appendResponse',
	    value: function appendResponse(response) {
	      var newReponses = this.apiResponses.slice();
	      newReponses.push(response);

	      return new MergedApiReponse(newReponses);
	    }
	  }, {
	    key: 'lastResponse',
	    get: function get() {
	      return /* harmony import */__WEBPACK_IMPORTED_MODULE_1_lodash_array__["last"].bind()(this.apiResponses);
	    }
	  }, {
	    key: 'lastQuery',
	    get: function get() {
	      return /* harmony import */__WEBPACK_IMPORTED_MODULE_1_lodash_array__["last"].bind()(this.querys);
	    }
	  }, {
	    key: 'lastMeta',
	    get: function get() {
	      return /* harmony import */__WEBPACK_IMPORTED_MODULE_1_lodash_array__["last"].bind()(this.meta);
	    }
	  }, {
	    key: 'query',
	    get: function get() {
	      // shorthand convenience
	      return this.latQuery;
	    }
	  }]);

	  return MergedApiReponse;
	}(APIResponseBase);
	/* harmony export */ Object.defineProperty(exports, "b", {configurable: false, enumerable: true, get: function() { return MergedApiReponse; }});

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_array__ = __webpack_require__(16);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_array___default = __WEBPACK_IMPORTED_MODULE_0_lodash_array__ && __WEBPACK_IMPORTED_MODULE_0_lodash_array__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0_lodash_array__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0_lodash_array__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_0_lodash_array___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_0_lodash_array___default });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__APIResponse__ = __webpack_require__(5);
	var _this = this;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }




	var withQueryAndResult = function withQueryAndResult(response, fn) {
	  var query = void 0;
	  var results = void 0;

	  if (response instanceof /* harmony import */__WEBPACK_IMPORTED_MODULE_1__APIResponse__["b"]) {
	    query = response.lastQuery;
	    results = response.lastResponse.results;
	  } else {
	    query = response.query;
	    results = response.results;
	  }

	  return fn(query, results);
	};
	/* harmony export */ Object.defineProperty(exports, "a", {configurable: false, enumerable: true, get: function() { return withQueryAndResult; }});

	var afterResponse = function afterResponse(response) {
	  return withQueryAndResult(response, function (query, results) {
	    var limit = query.limit || 25;
	    return results.length >= limit ? /* harmony import */__WEBPACK_IMPORTED_MODULE_0_lodash_array__["last"].bind()(results).uuid : null;
	  });
	};
	/* harmony export */ Object.defineProperty(exports, "b", {configurable: false, enumerable: true, get: function() { return afterResponse; }});

	var beforeResponse = function beforeResponse(response) {
	  return withQueryAndResult(response, function (query, results) {
	    return query.after ? results[0].uuid : null;
	  });
	};
	/* harmony export */ Object.defineProperty(exports, "c", {configurable: false, enumerable: true, get: function() { return beforeResponse; }});

	var fetchAll = function () {
	  var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(fetchFunction, apiOptions, initialParams) {
	    var params, response, after;
	    return regeneratorRuntime.wrap(function _callee$(_context) {
	      while (1) {
	        switch (_context.prev = _context.next) {
	          case 0:
	            params = _extends({}, initialParams);
	            _context.next = 3;
	            return fetchFunction(apiOptions, params);

	          case 3:
	            response = _context.sent;
	            after = afterResponse(response);

	          case 5:
	            if (!after) {
	              _context.next = 15;
	              break;
	            }

	            params = _extends({}, params, { after: after });
	            _context.t0 = response;
	            _context.next = 10;
	            return fetchFunction(apiOptions, params);

	          case 10:
	            _context.t1 = _context.sent;
	            response = _context.t0.appendResponse.call(_context.t0, _context.t1);

	            after = afterResponse(response);
	            _context.next = 5;
	            break;

	          case 15:
	            return _context.abrupt('return', response);

	          case 16:
	          case 'end':
	            return _context.stop();
	        }
	      }
	    }, _callee, _this);
	  }));

	  return function fetchAll(_x, _x2, _x3) {
	    return ref.apply(this, arguments);
	  };
	}();
	/* harmony export */ Object.defineProperty(exports, "d", {configurable: false, enumerable: true, get: function() { return fetchAll; }});

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__FakeError__ = __webpack_require__(8);
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



	var NoModelError = function (_FakeError) {
	  _inherits(NoModelError, _FakeError);

	  function NoModelError(endpoint) {
	    _classCallCheck(this, NoModelError);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(NoModelError).call(this, endpoint));

	    _this.name = 'NoModelError';
	    _this.message = 'No model given for api endpoint ' + endpoint;
	    _this.status = 400;
	    return _this;
	  }

	  return NoModelError;
	}(/* harmony import */__WEBPACK_IMPORTED_MODULE_0__FakeError__["a"]);

	/* harmony default export */ exports["a"] = NoModelError;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var FakeError = function FakeError(message) {
	  _classCallCheck(this, FakeError);

	  if (Error.hasOwnProperty('captureStackTrace')) {
	    Error.captureStackTrace(this, this.constructor);
	  } else {
	    Object.defineProperty(this, 'stack', {
	      value: new Error().stack
	    });

	    Object.defineProperty(this, 'message', {
	      value: message
	    });
	  }
	};

	/* harmony default export */ exports["a"] = FakeError;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Record = function Record(type, uuid) {
	  _classCallCheck(this, Record);

	  this.type = type;
	  this.uuid = uuid;
	};

	/* harmony default export */ exports["a"] = Record;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__FakeError__ = __webpack_require__(8);
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



	var NotImplementedError = function (_Error) {
	  _inherits(NotImplementedError, _Error);

	  function NotImplementedError(method, endpoint) {
	    _classCallCheck(this, NotImplementedError);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(NotImplementedError).call(this, method, endpoint));

	    _this.name = 'NotImplementedError';
	    _this.message = 'Method ' + method + ' not implemented for api endpoint ' + endpoint;
	    _this.status = 405;
	    return _this;
	  }

	  return NotImplementedError;
	}(Error);

	/* harmony default export */ exports["a"] = NotImplementedError;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__FakeError__ = __webpack_require__(8);
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



	var ValidationError = function (_FakeError) {
	  _inherits(ValidationError, _FakeError);

	  function ValidationError(name, model, errors) {
	    _classCallCheck(this, ValidationError);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ValidationError).call(this, name));

	    _this.name = 'NoModelError';

	    _this.message = name + ' had errors in: ' + errors.join(',') + ' with properties ' + JSON.stringify(model.toJSON());

	    _this.status = 422;
	    return _this;
	  }

	  return ValidationError;
	}(/* harmony import */__WEBPACK_IMPORTED_MODULE_0__FakeError__["a"]);

	/* harmony default export */ exports["a"] = ValidationError;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__RedditModel__ = __webpack_require__(15);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__apiBase_Record__ = __webpack_require__(9);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__thingTypes__ = __webpack_require__(0);
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





	var T = /* harmony import */__WEBPACK_IMPORTED_MODULE_0__RedditModel__["a"].Types;

	var CommentModel = function (_RedditModel) {
	  _inherits(CommentModel, _RedditModel);

	  function CommentModel() {
	    _classCallCheck(this, CommentModel);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(CommentModel).apply(this, arguments));
	  }

	  _createClass(CommentModel, [{
	    key: 'makeUUID',
	    value: function makeUUID(data) {
	      if (data.name === 't1__' && data.parent_id) {
	        // This is a stub for load more, parentId is needed to fetch more
	        return data.parent_id;
	      }

	      return data.name;
	    }
	  }, {
	    key: 'toRecord',
	    value: function toRecord() {
	      if (this.uuid === this.name) {
	        return _get(Object.getPrototypeOf(CommentModel.prototype), 'toRecord', this).call(this);
	      }

	      // otherwise its a load more stub for super nested comments
	      return new /* harmony import */__WEBPACK_IMPORTED_MODULE_1__apiBase_Record__["a"](/* harmony import */__WEBPACK_IMPORTED_MODULE_2__thingTypes__["h"], this.parentId);
	    }
	  }]);

	  return CommentModel;
	}(/* harmony import */__WEBPACK_IMPORTED_MODULE_0__RedditModel__["a"]);

	CommentModel.type = /* harmony import */__WEBPACK_IMPORTED_MODULE_2__thingTypes__["a"];
	CommentModel.PROPERTIES = {
	  archived: T.bool,
	  author: T.string,
	  authorFlairCSSClass: T.string,
	  authorFlairText: T.string,
	  children: T.nop,
	  cleanPermalink: T.link,
	  controversiality: T.number,
	  distinguished: T.string,
	  downs: T.number,
	  edited: T.bool,
	  gilded: T.number,
	  id: T.string,
	  likes: T.cubit,
	  name: T.string,
	  replies: T.array,
	  saved: T.bool,
	  score: T.number,
	  stickied: T.bool,
	  subreddit: T.string,
	  ups: T.number,

	  // aliases
	  approvedBy: T.string,
	  bannedBy: T.string,
	  bodyHTML: T.html,
	  createdUTC: T.number,
	  linkId: T.string,
	  modReports: T.array,
	  numReports: T.number,
	  parentId: T.string,
	  reportReasons: T.array,
	  scoreHidden: T.bool,
	  subredditId: T.string,
	  userReports: T.array
	};
	CommentModel.API_ALIASES = {
	  approved_by: 'approvedBy',
	  banned_by: 'bannedBy',
	  body_html: 'bodyHTML',
	  created_utc: 'createdUTC',
	  link_id: 'linkId',
	  mod_reports: 'modReports',
	  num_reports: 'numReports',
	  parent_id: 'parentId',
	  permalink: 'cleanPermalink',
	  report_reasons: 'reportReasons',
	  score_hidden: 'scoreHidden',
	  subreddit_id: 'subredditId',
	  user_reports: 'userReports'
	};
	/* harmony default export */ exports["a"] = CommentModel;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__RedditModel__ = __webpack_require__(15);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__thingTypes__ = __webpack_require__(0);
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




	var T = /* harmony import */__WEBPACK_IMPORTED_MODULE_0__RedditModel__["a"].Types;

	// If the data doesn't have all of the keys, get the full subreddit data
	// and then merge in the changes and submit _that_. The API requires the
	// full object be sent.
	// Whoever uses this new model for posting should confirm that
	// this is the full list of edit fields, you may just be able to
	// say something like
	var EDIT_FIELDS = ['default_set', 'subreddit_id', 'domain', 'show_media', 'wiki_edit_age', 'submit_text', 'spam_links', 'title', 'collapse_deleted_comments', 'wikimode', 'over_18', 'related_subreddits', 'suggested_comment_sort', 'description', 'submit_link_label', 'spam_comments', 'spam_selfposts', 'submit_text_label', 'key_color', 'language', 'wiki_edit_karma', 'hide_ads', 'header_hover_text', 'public_traffic', 'public_description', 'comment_score_hide_mins', 'subreddit_type', 'exclude_banned_modqueue', 'content_options'].sort();

	var Subreddit = function (_RedditModel) {
	  _inherits(Subreddit, _RedditModel);

	  function Subreddit() {
	    _classCallCheck(this, Subreddit);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Subreddit).apply(this, arguments));
	  }

	  return Subreddit;
	}(/* harmony import */__WEBPACK_IMPORTED_MODULE_0__RedditModel__["a"]);

	Subreddit.type = /* harmony import */__WEBPACK_IMPORTED_MODULE_1__thingTypes__["e"];
	Subreddit.fields = EDIT_FIELDS;
	Subreddit.PROPERTIES = {
	  accountsActive: T.number,
	  bannerImage: T.string,
	  bannerSize: T.arrayOf(T.number),
	  collapseDeletedComments: T.bool,
	  commentScoreHideMins: T.number,
	  createdUTC: T.number,
	  description: T.string,
	  displayName: T.string,
	  headerImage: T.string,
	  headerSize: T.arrayOf(T.number),
	  headerTitle: T.string,
	  hideAds: T.bool,
	  iconImage: T.string,
	  iconSize: T.arrayOf(T.number),
	  id: T.string,
	  keyColor: T.string,
	  lang: T.string,
	  name: T.string,
	  over18: T.bool,
	  publicDescription: T.string,
	  publicTraffic: T.nop,
	  quarantine: T.bool,
	  relatedSubreddits: T.array,
	  submitLinkLabel: T.string,
	  submitText: T.string,
	  submitTextLabel: T.string,
	  subredditType: T.string,
	  subscribers: T.number,
	  suggestedCommentSort: T.string,
	  title: T.string,
	  url: T.string,
	  userIsBanned: T.bool,
	  userIsContributor: T.bool,
	  userIsModerator: T.bool,
	  userIsMuted: T.bool,
	  userSrThemeEnabled: T.bool,
	  wikiEnabled: T.bool
	};
	Subreddit.API_ALIASES = {
	  accounts_active: 'accountsActive',
	  banner_img: 'bannerImage',
	  banner_size: 'bannerSize',
	  collapse_deleted_comments: 'collapseDeletedComments',
	  comment_score_hide_mins: 'commentScoreHideMins',
	  created_utc: 'createdUTC',
	  display_name: 'displayName',
	  header_img: 'headerImage',
	  header_size: 'headerSize',
	  header_title: 'headerTitle',
	  hide_ads: 'hideAds',
	  icon_img: 'iconImage',
	  icon_size: 'iconSize',
	  public_description: 'publicDescription',
	  public_traffic: 'publicTraffic',
	  related_subreddits: 'relatedSubreddits',
	  submit_link_label: 'submitLinkLabel',
	  submit_text_label: 'submitTextLabel',
	  submit_text: 'submitText',
	  subreddit_type: 'subredditType',
	  user_is_banned: 'userIsBanned',
	  user_is_contributor: 'userIsContributor',
	  user_is_moderator: 'userIsModerator',
	  user_is_muted: 'userIsMuted',
	  user_sr_theme_enabled: 'userSrThemeEnabled',
	  wiki_enabled: 'wikiEnabled'
	};
	/* harmony default export */ exports["a"] = Subreddit;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__FakeError__ = __webpack_require__(8);
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



	var DisconnectedError = function (_FakeError) {
	  _inherits(DisconnectedError, _FakeError);

	  function DisconnectedError(error, url) {
	    _classCallCheck(this, DisconnectedError);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DisconnectedError).call(this, error));

	    Object.assign(_this, error);
	    _this.message = 'URL ' + url + ' not reachable. You are probably disconnected from the internet.';
	    return _this;
	  }

	  return DisconnectedError;
	}(/* harmony import */__WEBPACK_IMPORTED_MODULE_0__FakeError__["a"]);
	/* harmony export */ Object.defineProperty(exports, "b", {configurable: false, enumerable: true, get: function() { return DisconnectedError; }});

	var codeMap = {
	  ECONNREFUSED: DisconnectedError,
	  ENOTFOUND: DisconnectedError
	};

	var ResponseError = function (_FakeError2) {
	  _inherits(ResponseError, _FakeError2);

	  function ResponseError(error, url) {
	    _classCallCheck(this, ResponseError);

	    // Make sure an error and url were actually passed in
	    if (!error) {
	      throw new Error('No error passed to ResponseError');
	    }
	    if (!url) {
	      throw new Error('No url passed to ResponseError');
	    }

	    // Check if it's a disconnection error or something else weird
	    if (error.code && error.syscall) {
	      var _ret;

	      return _ret = ResponseError.getSystemLevelError(error, url), _possibleConstructorReturn(_this2, _ret);
	    }

	    var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(ResponseError).call(this, error));

	    Object.assign(_this2, error);

	    _this2.name = 'ResponseError';
	    _this2.message = 'Status ' + error.status + ' returned from API request to ' + url;
	    return _this2;
	  }

	  _createClass(ResponseError, null, [{
	    key: 'getSystemLevelError',
	    value: function getSystemLevelError(error, url) {
	      var E = codeMap[error.code] || Error;
	      return new E(error, url);
	    }
	  }]);

	  return ResponseError;
	}(/* harmony import */__WEBPACK_IMPORTED_MODULE_0__FakeError__["a"]);

	/* harmony default export */ exports["a"] = ResponseError;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__apiBase_Model__ = __webpack_require__(17);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__thingTypes__ = __webpack_require__(0);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_isThingID__ = __webpack_require__(37);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_markdown__ = __webpack_require__(38);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__lib_unredditifyLink__ = __webpack_require__(39);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__mockgenerators_mockHTML__ = __webpack_require__(40);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__mockgenerators_mockLink__ = __webpack_require__(41);
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }












	// TYPES I'd like to add
	// mod: (type) => type
	// useage: bannedBy: T.mod(T.string),
	// purpose: Just to document that a field is only going to be there as a moderator
	//
	// record: val => val instanceOf Record ? val : new Record()
	// usage: replies: T.arrayOf(T.record)
	// purpose: Enforce that model relations are defined as records
	//
	// model: ModelClass => val => ModelClass.fromJSON(val)
	// usage: srDetail: T.model(SubredditDetailModel)
	// purpose: express nested model parsing for one off nested parts of your model

	var RedditModel = function (_Model) {
	  _inherits(RedditModel, _Model);

	  function RedditModel() {
	    _classCallCheck(this, RedditModel);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(RedditModel).apply(this, arguments));
	  }

	  _createClass(RedditModel, [{
	    key: 'makeUUID',
	    value: function makeUUID(data) {
	      if (/* harmony import */__WEBPACK_IMPORTED_MODULE_2__lib_isThingID__["a"].bind()(data.name)) {
	        return data.name;
	      }
	      if (/* harmony import */__WEBPACK_IMPORTED_MODULE_2__lib_isThingID__["a"].bind()(data.id)) {
	        return data.id;
	      }
	      return _get(Object.getPrototypeOf(RedditModel.prototype), 'makeUUID', this).call(this, data);
	    }
	  }, {
	    key: 'getType',
	    value: function getType(data, uuid) {
	      return _get(Object.getPrototypeOf(RedditModel.prototype), 'getType', this).call(this, data, uuid) || /* harmony import */__WEBPACK_IMPORTED_MODULE_1__thingTypes__["f"][data.kind] || /* harmony import */__WEBPACK_IMPORTED_MODULE_1__thingTypes__["g"].bind()(uuid) || 'Unknown';
	    }
	  }]);

	  return RedditModel;
	}(/* harmony import */__WEBPACK_IMPORTED_MODULE_0__apiBase_Model__["a"]);

	RedditModel.Types = _extends({}, /* harmony import */__WEBPACK_IMPORTED_MODULE_0__apiBase_Model__["a"].Types, {
	  html: function html(val) {
	    return /* harmony import */__WEBPACK_IMPORTED_MODULE_3__lib_markdown__["a"].bind()(/* harmony import */__WEBPACK_IMPORTED_MODULE_0__apiBase_Model__["a"].Types.string(val));
	  },
	  link: function link(val) {
	    return /* harmony import */__WEBPACK_IMPORTED_MODULE_4__lib_unredditifyLink__["a"].bind()(/* harmony import */__WEBPACK_IMPORTED_MODULE_0__apiBase_Model__["a"].Types.string(val));
	  }
	});
	RedditModel.MockTypes = _extends({}, /* harmony import */__WEBPACK_IMPORTED_MODULE_0__apiBase_Model__["a"].MockTypes, {
	  html: /* harmony import */__WEBPACK_IMPORTED_MODULE_5__mockgenerators_mockHTML__["a"],
	  link: /* harmony import */__WEBPACK_IMPORTED_MODULE_6__mockgenerators_mockLink__["a"]
	});
	/* harmony default export */ exports["a"] = RedditModel;

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = require("lodash/array");

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Record__ = __webpack_require__(9);
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



	var fakeUUID = function fakeUUID() {
	  return (Math.random() * 16).toFixed();
	};

	// Model class that handles parsing, serializing, and pseudo-validation.
	// Provides a mechanism for creating stubs (which will represent incremental UI updates)
	// and fulfill themselves to the proper result of api calls
	//
	// An example class will look like
	//
	// const T = Model.Types
	// class Post extends Model {
	//  static type = LINK;
	//
	//  static API_ALIASES = {
	//    body_html: 'bodyHTML,
	//    score_hidden: 'scoreHidden',
	//   }
	//
	//  static PROPERTIES = {
	//    id: T.string,
	//    author: T.string,
	//    bodyHTML: T.html,
	//    replies: T.array,
	//    links: T.arrayOf(T.link)
	//    cleanURL: T.link
	//  }
	// }
	//

	var Model = function () {
	  _createClass(Model, null, [{
	    key: 'fromJSON',
	    value: function fromJSON(obj) {
	      return new this(obj);
	    }

	    // put value transformers here. They'll take input and pseudo-validate it and
	    // transform it. You'll put thme in your subclasses PROPERITES dictionary.


	    /* examples of more semantic types you can build
	      // some more semantic types that apply transformations
	      html: val => process(Model.Types.string(val)),
	      link: val => unredditifyLink(Model.Types.string(val)),
	    */

	  }, {
	    key: 'Mock',
	    value: function Mock() {
	      var _this = this;

	      var data = Object.keys(this.PROPERTIES).reduce(function (prev, cur) {
	        return _extends({}, prev, _defineProperty({}, cur, _this.MOCKS[cur] ? _this.MOCKS[cur]() : null));
	      }, {});

	      return new this(data);
	    }
	  }]);

	  function Model(data, SUPER_SECRET_SHOULD_FREEZE_FLAG_THAT_ONLY_STUBS_CAN_USE) {
	    _classCallCheck(this, Model);

	    var _constructor = this.constructor;
	    var API_ALIASES = _constructor.API_ALIASES;
	    var PROPERTIES = _constructor.PROPERTIES;
	    var DERIVED_PROPERTIES = _constructor.DERIVED_PROPERTIES;

	    // Please note: the use of for loops and adding properties directly
	    // and then freezing (versus using defineProperty with writeable false)
	    // is very intentional. Because performance. Please consult schwers or frontend-platform
	    // before modifying

	    var dataKeys = Object.keys(data);
	    for (var i = 0; i < dataKeys.length; i++) {
	      var key = dataKeys[i];
	      if (DERIVED_PROPERTIES[key]) {
	        // skip if there's a dervied key of the same name
	        continue;
	      }

	      var keyName = API_ALIASES[key];
	      if (!keyName) {
	        keyName = key;
	      }

	      var typeFn = PROPERTIES[keyName];
	      if (typeFn) {
	        this[keyName] = typeFn(data[key]);
	      }
	    }

	    var derivedKeys = Object.keys(DERIVED_PROPERTIES);
	    for (var _i = 0; _i < derivedKeys.length; _i++) {
	      var derivedKey = derivedKeys[_i];
	      var derviceFn = DERIVED_PROPERTIES[derivedKey];
	      var _typeFn = PROPERTIES[derivedKey];

	      if (derviceFn && _typeFn) {
	        this[derivedKey] = _typeFn(derviceFn(data));
	      }
	    }

	    this.uuid = this.makeUUID(data);
	    this.type = this.getType(data, this.uuid);

	    if (!SUPER_SECRET_SHOULD_FREEZE_FLAG_THAT_ONLY_STUBS_CAN_USE) {
	      Object.freeze(this);
	    }
	  }

	  _createClass(Model, [{
	    key: '_diff',
	    value: function _diff(keyOrObject, value) {
	      return (typeof keyOrObject === 'undefined' ? 'undefined' : _typeof(keyOrObject)) === 'object' ? keyOrObject : _defineProperty({}, keyOrObject, value);
	    }
	  }, {
	    key: 'set',
	    value: function set(keyOrObject, value) {
	      return new this.constructor(_extends({}, this.toJSON(), this._diff(keyOrObject, value)));
	    }

	    // .stub() is for encoding optimistic updates and other transient states
	    //    while waiting for async actions.
	    //
	    // A reddit-example is voting. `link.upvote()` needs to handle
	    // a few edgecases like: 'you already upvoted, let's toggle your vote',
	    // 'you downvoted, so the score increase is really +2 for ui (instead of +1)',
	    // and 'we need to add +1 to the score'.
	    // It also needs to handle failure cases like 'that upvote failed, undo everything'.
	    //
	    // Stubs provide a way of encoding an optimistic ui update that includes
	    // all of these cases, that use javascript promises to encode the completion
	    // and final state of this.
	    //
	    // With stubs, `.upvote()` can return a stub object so that you can:
	    // ```javascript
	    // /* upvoteLink is a dispatch thunk */
	    // const upvoteLink = link => (dispatch, getState) => () => {
	    //    const stub = link.upvote();
	    //    dispatch(newLinkData(stub));
	    //
	    //    stub.reject(error => {
	    //      dispatch(failedToUpvote(link));
	    //      // Undo the optimistic ui update. Note: .upvote can choose to
	    //      // catch the reject and pass the old version back in Promise.resolve()
	    //      disaptch(newLinkData(link))
	    //   });
	    //
	    //   return stub.then(finalLink => dispatch(newLinkData(finalLink));
	    // };
	    // ```

	  }, {
	    key: 'stub',
	    value: function stub(_ref2, promise) {
	      var keyOrObject = _ref2.keyOrObject;
	      var value = _ref2.value;

	      var next = _extends({}, this.toJSON(), this._diff(keyOrObject, value));
	      var stub = new this.constructor(next, true);
	      stub.then = promise.then;
	      stub.reject = promise.reject;
	      Object.freeze(stub); // super important, don't break the super secret flag
	      return stub;
	    }
	  }, {
	    key: 'makeUUID',
	    value: function makeUUID(data) {
	      if (data.uuid) {
	        return data.uuid;
	      }
	      if (data.id) {
	        return data.id;
	      }
	      console.warn('generating fake uuid');
	      return fakeUUID();
	    }
	  }, {
	    key: 'getType',
	    value: function getType() /* data, uuid */{
	      return this.constructor.type;
	    }
	  }, {
	    key: 'toRecord',
	    value: function toRecord() {
	      return new /* harmony import */__WEBPACK_IMPORTED_MODULE_0__Record__["a"](this.type, this.uuid);
	    }
	  }, {
	    key: 'toJSON',
	    value: function toJSON() {
	      var _this2 = this;

	      var obj = {};
	      Object.keys(this).forEach(function (key) {
	        if (_this2.constructor.PROPERTIES[key]) {
	          obj[key] = _this2[key];
	        }
	      });

	      obj.__type = this.type;
	      return obj;
	    }
	  }]);

	  return Model;
	}();

	Model.Types = {
	  string: function string(val) {
	    return val ? String(val) : '';
	  },
	  number: function number(val) {
	    return val === undefined ? 0 : Number(val);
	  },
	  array: function array(val) {
	    return Array.isArray(val) ? val : [];
	  },
	  arrayOf: function arrayOf() {
	    var type = arguments.length <= 0 || arguments[0] === undefined ? Model.Types.nop : arguments[0];
	    return function (val) {
	      return Model.Types.array(val).map(type);
	    };
	  },
	  bool: function bool(val) {
	    return Boolean(val);
	  },
	  cubit: function cubit(val) {
	    var num = Number(val);
	    return num > 0 ? 1 : num < 0 ? -1 : 0;
	  },

	  nop: function nop(val) {
	    return val;
	  } };
	Model.MockTypes = {
	  string: function string() {
	    return Math.random().toString(36).substring(Math.floor(Math.random() * 10) + 5);
	  },
	  number: function number() {
	    return Math.floor(Math.random() * 100);
	  },
	  array: function array() {
	    return Array.apply(null, Array(Math.floor(Math.random() * 10)));
	  },
	  bool: function bool() {
	    return Math.floor(Math.random() * 10) < 5;
	  },
	  cubit: function cubit() {
	    return Math.round(Math.random() * (1 - -1) + -1);
	  },
	  nop: function nop() {
	    return null;
	  }
	};
	Model.API_ALIASES = {};
	Model.PROPERTIES = {};
	Model.MOCKS = {};
	Model.DERIVED_PROPERTIES = {};
	/* harmony default export */ exports["a"] = Model;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__apiBase_APIRequestUtils__ = __webpack_require__(1);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__BaseContentEndpoint__ = __webpack_require__(26);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash_object__ = __webpack_require__(4);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash_object___default = __WEBPACK_IMPORTED_MODULE_2_lodash_object__ && __WEBPACK_IMPORTED_MODULE_2_lodash_object__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_2_lodash_object__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_2_lodash_object__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_2_lodash_object___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_2_lodash_object___default });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models2_CommentModel__ = __webpack_require__(12);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models2_PostModel__ = __webpack_require__(2);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__lib_commentTreeUtils__ = __webpack_require__(36);
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };











	var formatQuery = function formatQuery(query, method) {
	  /* harmony import */__WEBPACK_IMPORTED_MODULE_1__BaseContentEndpoint__["a"].bind()(query, method);

	  if (query.ids) {
	    query.children = query.ids.join(',');
	    query.api_type = 'json';
	    query.link_id = query.linkId;

	    delete query.ids;
	    delete query.linkId;
	  }

	  return query;
	};

	var getPath = function getPath(query) {
	  if (query.user) {
	    return 'user/' + query.user + '/comments.json';
	  } else if (query.ids) {
	    return 'api/morechildren.json';
	  } else {
	    return 'comments/' + (query.id || query.linkId).replace(/^t3_/, '') + '.json';
	  }
	};

	var parseGetBody = function parseGetBody(res, apiResponse, req) {
	  var query = req.query;
	  var body = res.body;

	  var comments = [];

	  if (Array.isArray(body)) {
	    // The first part of the response is a link
	    var linkData = body[0].data;
	    if (linkData && linkData.children && linkData.children.length) {
	      linkData.children.forEach(function (link) {
	        apiResponse.addModel(/* harmony import */__WEBPACK_IMPORTED_MODULE_4__models2_PostModel__["a"].fromJSON(link.data));
	      });
	    }

	    comments = /* harmony import */__WEBPACK_IMPORTED_MODULE_5__lib_commentTreeUtils__["a"].bind()(/* harmony import */__WEBPACK_IMPORTED_MODULE_5__lib_commentTreeUtils__["b"].bind()(body[1].data.children));
	  } else if (body.json && body.json.data) {
	    if (query.children) {
	      // treeify 'load more comments' replies
	      comments = /* harmony import */__WEBPACK_IMPORTED_MODULE_5__lib_commentTreeUtils__["a"].bind()(/* harmony import */__WEBPACK_IMPORTED_MODULE_5__lib_commentTreeUtils__["b"].bind()(body.json.data.things));
	    } else {
	      comments = /* harmony import */__WEBPACK_IMPORTED_MODULE_5__lib_commentTreeUtils__["b"].bind()(body.json.data.things);
	    }
	  }

	  /* harmony import */__WEBPACK_IMPORTED_MODULE_5__lib_commentTreeUtils__["c"].bind()(comments, function (commentJSON, isTopLevel) {
	    // parsing is done bottom up, comment models are immutable
	    // but they'll rely on the records
	    var comment = /* harmony import */__WEBPACK_IMPORTED_MODULE_3__models2_CommentModel__["a"].fromJSON(commentJSON);
	    if (isTopLevel) {
	      apiResponse.addResult(comment);
	    } else {
	      apiResponse.addModel(comment);
	    }

	    // this sets replies to be records for consistency
	    return comment.toRecord();
	  });
	};

	var parsePostBody = function parsePostBody(res, apiResponse) {
	  var body = res.body;


	  if (/* harmony import */__WEBPACK_IMPORTED_MODULE_2_lodash_object__["has"].bind()(body, 'json.data.things.0.data')) {
	    var comment = body.json.data.things[0].data;
	    apiResponse.addResult(/* harmony import */__WEBPACK_IMPORTED_MODULE_3__models2_CommentModel__["a"].fromJSON(comment));
	  }
	};

	/* harmony default export */ exports["a"] = {
	  get: function get(apiOptions, query) {
	    var path = getPath(query);
	    var apiQuery = formatQuery(_extends({}, query));

	    return /* harmony import */__WEBPACK_IMPORTED_MODULE_0__apiBase_APIRequestUtils__["a"].bind()(apiOptions, 'get', path, apiQuery, query, parseGetBody);
	  },
	  post: function post(apiOptions, data) {
	    var path = 'api/comment';
	    var postData = {
	      api_type: 'json',
	      thing_id: data.thingId,
	      text: data.text
	    };

	    return /* harmony import */__WEBPACK_IMPORTED_MODULE_0__apiBase_APIRequestUtils__["a"].bind()(apiOptions, 'post', path, postData, data, parsePostBody);
	  }
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__SavedAndHiddenCommon__ = __webpack_require__(27);


	var getPath = function getPath(query) {
	  return 'user/' + query.user + '/hidden.json';
	};

	/* harmony default export */ exports["a"] = /* harmony import */__WEBPACK_IMPORTED_MODULE_0__SavedAndHiddenCommon__["a"].bind()(getPath, 'api/unhide', 'api/hide');

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__apiBase_APIRequestUtils__ = __webpack_require__(1);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models2_PostModel__ = __webpack_require__(2);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__BaseContentEndpoint__ = __webpack_require__(26);
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };






	var getPath = function getPath(query) {
	  if (query.user) {
	    return 'user/' + query.user + '/submitted.json';
	  } else if (query.id) {
	    return 'by_id/' + query.id + '.json';
	  } else if (query.ids) {
	    return 'by_id/' + query.query.ids.join(',') + '.json';
	  } else if (query.subredditName) {
	    return 'r/' + query.subredditName + '.json';
	  } else if (query.multi) {
	    return 'user/' + query.multiUser + '/m/' + query.multi + '.json';
	  }

	  query.sort = query.sort || 'hot';

	  return query.sort + '.json';
	};

	var formatQuery = function formatQuery(query, method) {
	  /* harmony import */__WEBPACK_IMPORTED_MODULE_2__BaseContentEndpoint__["a"].bind()(query, method);

	  if (method !== 'patch') {
	    query.feature = 'link_preview';
	    query.sr_detail = 'true';
	  }

	  if (method === 'del') {
	    query._method = 'post';
	  }

	  return query;
	};

	var formatPostData = function formatPostData(data) {
	  var postData = {
	    api_type: 'json',
	    thing_id: data.thingId,
	    title: data.title,
	    kind: data.kind,
	    sendreplies: data.sendreplies,
	    sr: data.sr,
	    iden: data.iden,
	    captcha: data.captcha,
	    resubmit: data.resubmit
	  };

	  if (data.text) {
	    postData.text = data.text;
	  } else if (data.url) {
	    postData.url = data.url;
	  }

	  return postData;
	};

	var parseBody = function parseBody(res, apiResponse, req, method) {
	  var body = res.body;


	  if (method === 'get') {
	    var data = body.data;


	    if (data && data.children && data.children[0]) {
	      if (data.children.length === 1) {
	        apiResponse.addResult(/* harmony import */__WEBPACK_IMPORTED_MODULE_1__models2_PostModel__["a"].fromJSON(data.children[0].data));
	        return;
	      } else {
	        data.children.forEach(function (c) {
	          return apiResponse.addResult(/* harmony import */__WEBPACK_IMPORTED_MODULE_1__models2_PostModel__["a"].fromJSON(c.data));
	        });
	        return;
	      }
	    } else if (data) {
	      return;
	    }
	  } else if (method !== 'del') {
	    if (body.json && body.json.errors.length === 0) {
	      apiResponse.addResult(body.json.data);
	      return;
	    } else {
	      throw body.json;
	    }
	  }
	};

	/* harmony default export */ exports["a"] = {
	  get: function get(apiOptions, query) {
	    var path = getPath(query);
	    var apiQuery = formatQuery(_extends({}, query), 'get');

	    return /* harmony import */__WEBPACK_IMPORTED_MODULE_0__apiBase_APIRequestUtils__["a"].bind()(apiOptions, 'get', path, apiQuery, query, parseBody);
	  },
	  post: function post(apiOptions, data) {
	    var path = 'api/submit';
	    var apiData = formatPostData(data);

	    return /* harmony import */__WEBPACK_IMPORTED_MODULE_0__apiBase_APIRequestUtils__["a"].bind()(apiOptions, 'post', path, apiData, data, parseBody);
	  }
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__SavedAndHiddenCommon__ = __webpack_require__(27);


	var getPath = function getPath(query) {
	  return 'user/' + query.user + '/saved.json';
	};

	/* harmony default export */ exports["a"] = /* harmony import */__WEBPACK_IMPORTED_MODULE_0__SavedAndHiddenCommon__["a"].bind()(getPath, 'api/unsave', 'api/save');

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__apiBase_APIRequestUtils__ = __webpack_require__(1);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models2_PostModel__ = __webpack_require__(2);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models2_Subreddit__ = __webpack_require__(13);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models2_thingTypes__ = __webpack_require__(0);
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };







	var getPath = function getPath(query) {
	  var path = '';

	  if (query.subreddit) {
	    path = 'r/' + query.subreddit + '/';
	  }

	  return path + 'search.json';
	};

	var formatQuery = function formatQuery(query) {
	  if (query.subreddit) {
	    query.restrict_sr = 'on';
	    delete query.subreddit;
	  }

	  return query;
	};

	var listsFromResponse = function listsFromResponse(res) {
	  var body = res.body;

	  if (!body) {
	    return [];
	  }

	  // If only one type is returned body will be an object;
	  return Array.isArray(body) ? body : [body];
	};

	var parseBody = function parseBody(res, apiResponse) {
	  var lists = listsFromResponse(res);
	  console.log('lists.length?', lists.length);
	  console.log(res.body);

	  lists.forEach(function (listing) {
	    if (listing.data.children.length) {
	      if (listing.data.children[0].kind === /* harmony import */__WEBPACK_IMPORTED_MODULE_3__models2_thingTypes__["i"]) {
	        listing.data.children.forEach(function (link) {
	          apiResponse.addResult(/* harmony import */__WEBPACK_IMPORTED_MODULE_1__models2_PostModel__["a"].fromJSON(link.data));
	        });

	        apiResponse.meta.after = listing.data.after;
	        apiResponse.meta.before = listing.data.before;
	      } else {
	        listing.data.children.forEach(function (subreddit) {
	          apiResponse.addResult(/* harmony import */__WEBPACK_IMPORTED_MODULE_2__models2_Subreddit__["a"].fromJSON(subreddit.data));
	        });
	      }
	    }
	  });
	};

	/* harmony default export */ exports["a"] = {
	  get: function get(apiOptions, query) {
	    var path = getPath(query);
	    var apiQuery = formatQuery(_extends({}, query));

	    return /* harmony import */__WEBPACK_IMPORTED_MODULE_0__apiBase_APIRequestUtils__["a"].bind()(apiOptions, 'get', path, apiQuery, query, parseBody);
	  }
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__apiBase_APIRequestUtils__ = __webpack_require__(1);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash_object__ = __webpack_require__(4);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash_object___default = __WEBPACK_IMPORTED_MODULE_1_lodash_object__ && __WEBPACK_IMPORTED_MODULE_1_lodash_object__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_1_lodash_object__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_1_lodash_object__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_1_lodash_object___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_1_lodash_object___default });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash_lang__ = __webpack_require__(43);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash_lang___default = __WEBPACK_IMPORTED_MODULE_2_lodash_lang__ && __WEBPACK_IMPORTED_MODULE_2_lodash_lang__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_2_lodash_lang__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_2_lodash_lang__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_2_lodash_lang___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_2_lodash_lang___default });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models2_Subreddit__ = __webpack_require__(13);
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };








	var DEFAULT_SUBREDDIT_OPTIONS = {
	  allow_top: true,
	  collapse_deleted_comments: false,
	  comment_score_hide_mins: 0,
	  description: '',
	  exclude_banned_modqueue: false,
	  'header-title': '',
	  hide_ads: false,
	  lang: 'en',
	  link_type: 'any',
	  name: '',
	  over_18: false,
	  public_description: '',
	  public_traffic: false,
	  show_media: true,
	  spam_comments: 'low',
	  spam_links: 'high',
	  spam_selfposts: 'high',
	  sr: '',
	  submit_link_label: '',
	  submit_text: '',
	  submit_text_label: '',
	  suggested_comment_sort: 'confidence',
	  title: '',
	  type: 'public',
	  wiki_edit_age: 0,
	  wiki_edit_karma: 100,
	  wikimode: 'disabled'
	};

	var requestPath = 'api/site_admin';

	var getPath = function getPath(query) {
	  if (query.id && query.view === 'mod') {
	    return 'r/' + query.id + '/about/edit.json';
	  }

	  if (query.id) {
	    return 'r/' + query.id + '/about.json';
	  }

	  return 'subreddits/' + (query.sort || 'default') + '.json';
	};

	var formatQuery = function formatQuery(query, method) {
	  if (method !== 'get') {
	    query.api_type = 'json';
	  }

	  return query;
	};

	var parseBody = function parseBody(res, apiResponse) {
	  var body = res.body;


	  if (body.data && Array.isArray(body.data.children)) {
	    body.data.children.forEach(function (c) {
	      return apiResponse.addResult(/* harmony import */__WEBPACK_IMPORTED_MODULE_3__models2_Subreddit__["a"].fromJSON(c.data));
	    });
	    // sometimes, we get back empty object and 200 for invalid sorts like
	    // `mine` when logged out
	  } else if (!/* harmony import */__WEBPACK_IMPORTED_MODULE_2_lodash_lang__["isEmpty"].bind()(body)) {
	      apiResponse.addResult(/* harmony import */__WEBPACK_IMPORTED_MODULE_3__models2_Subreddit__["a"].fromJSON(body.data || body));
	    }
	};

	var get = function get(apiOptions, query) {
	  var path = getPath(query);
	  var apiQuery = formatQuery(_extends({}, query));

	  return /* harmony import */__WEBPACK_IMPORTED_MODULE_0__apiBase_APIRequestUtils__["a"].bind()(apiOptions, 'get', path, apiQuery, query, parseBody);
	};

	var patch = function patch(apiOptions, data) {
	  // If the data doesn't have all of the keys, get the full subreddit data
	  // and then merge in the changes and submit _that_. The API requires the
	  // full object be sent.
	  if (Object.keys(data).sort() !== /* harmony import */__WEBPACK_IMPORTED_MODULE_3__models2_Subreddit__["a"].fields) {
	    return new Promise(function (resolve, reject) {
	      get(apiOptions, {
	        id: data.id,
	        view: 'mod'
	      }).then(function (apiResponse) {
	        if (!apiResponse.results.length === 1) {
	          reject();
	        }
	        var sub = apiResponse.getModelFromRecord(apiResponse.results[0]);

	        var postData = /* harmony import */__WEBPACK_IMPORTED_MODULE_1_lodash_object__["pick"].bind()(_extends({}, DEFAULT_SUBREDDIT_OPTIONS, sub, data, {
	          sr: sub.name
	        }), Object.keys(DEFAULT_SUBREDDIT_OPTIONS));

	        return post(apiOptions, postData);
	      }, reject);
	    });
	  }

	  return post(apiOptions, data);
	};

	var post = function post(apiOptions, data) {
	  var postData = /* harmony import */__WEBPACK_IMPORTED_MODULE_1_lodash_object__["pick"].bind()(_extends({}, DEFAULT_SUBREDDIT_OPTIONS, data), Object.keys(DEFAULT_SUBREDDIT_OPTIONS));

	  return /* harmony import */__WEBPACK_IMPORTED_MODULE_0__apiBase_APIRequestUtils__["a"].bind()(apiOptions, 'post', requestPath, postData, data, parseBody);
	};

	var put = function put(apiOptions, data) {
	  var modifiedData = _extends({}, data, { name: data.id });
	  return post(apiOptions, modifiedData);
	};

	/* harmony default export */ exports["a"] = {
	  get: get,
	  patch: patch,
	  post: post,
	  put: put
	};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Listing__ = __webpack_require__(3);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__apis_SavedEndpoint__ = __webpack_require__(21);
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




	var SavedPostsAndComments = function (_Listing) {
	  _inherits(SavedPostsAndComments, _Listing);

	  function SavedPostsAndComments() {
	    _classCallCheck(this, SavedPostsAndComments);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(SavedPostsAndComments).apply(this, arguments));
	  }

	  _createClass(SavedPostsAndComments, [{
	    key: 'postsAndComments',
	    get: function get() {
	      return this.apiResponse.results.map(this.apiResponse.getModelFromRecord);
	    }
	  }], [{
	    key: 'fetch',
	    value: function fetch(apiOptions, userOrOptions) {
	      var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

	      if (typeof userOrOptions === 'string') {
	        options.user = userOrOptions;
	      } else {
	        options = userOrOptions || {};
	      }

	      return _get(Object.getPrototypeOf(SavedPostsAndComments), 'fetch', this).call(this, apiOptions, options);
	    }
	  }]);

	  return SavedPostsAndComments;
	}(/* harmony import */__WEBPACK_IMPORTED_MODULE_0__Listing__["a"]);

	SavedPostsAndComments.endpoint = /* harmony import */__WEBPACK_IMPORTED_MODULE_1__apis_SavedEndpoint__["a"];
	/* harmony default export */ exports["a"] = SavedPostsAndComments;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony default export */ exports["a"] = {
	  request: 'request',
	  response: 'response',
	  error: 'error',
	  result: 'result'
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_object__ = __webpack_require__(4);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_object___default = __WEBPACK_IMPORTED_MODULE_0_lodash_object__ && __WEBPACK_IMPORTED_MODULE_0_lodash_object__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0_lodash_object__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0_lodash_object__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_0_lodash_object___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_0_lodash_object___default });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__apiBase_BaseEndpoint__ = __webpack_require__(34);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__apiBase_errors_NoModelError__ = __webpack_require__(7);
	var _this2 = this;

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





	var MOD_ACTION_MAP = {
	  approved: function approved(t, data) {
	    return [t ? 'api/approve' : 'api/remove', /* harmony import */__WEBPACK_IMPORTED_MODULE_0_lodash_object__["pick"].bind()(data, ['id', 'spam'])];
	  },
	  removed: function removed(t, data) {
	    return [t ? 'api/remove' : 'api/approve', /* harmony import */__WEBPACK_IMPORTED_MODULE_0_lodash_object__["pick"].bind()(data, ['id', 'spam'])];
	  },
	  distinguished: function distinguished(_, data) {
	    return ['api/distinguish', {
	      id: data.id,
	      how: data.distinguished
	    }];
	  },
	  ignoreReports: function ignoreReports(_, data) {
	    return ['api/ignore_reports', {
	      id: data.id,
	      spam: data.isSpam
	    }];
	  }
	};

	var formatBaseContentQuery = function formatBaseContentQuery(query, method) {
	  if (method !== 'patch') {
	    query.feature = 'link_preview';
	    query.sr_detail = 'true';
	  }

	  if (method === 'del') {
	    query._method = 'post';
	  }

	  return query;
	};
	/* harmony export */ Object.defineProperty(exports, "a", {configurable: false, enumerable: true, get: function() { return formatBaseContentQuery; }});

	var BaseContentEndpoint = function (_BaseEndpoint) {
	  _inherits(BaseContentEndpoint, _BaseEndpoint);

	  function BaseContentEndpoint() {
	    _classCallCheck(this, BaseContentEndpoint);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(BaseContentEndpoint).apply(this, arguments));
	  }

	  _createClass(BaseContentEndpoint, null, [{
	    key: 'formatQuery',
	    value: function formatQuery(query, method) {
	      if (method !== 'patch') {
	        query.feature = 'link_preview';
	        query.sr_detail = 'true';
	      }

	      if (method === 'del') {
	        query._method = 'post';
	      }

	      return query;
	    }
	  }, {
	    key: 'path',
	    value: function path(method) {
	      var query = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	      if (method === 'get') {
	        return this.getPath(query);
	      } else if (method === 'post') {
	        return this.postPath(query);
	      } else if (method === 'patch') {
	        return this.patchPath(query);
	      } else if (method === 'del') {
	        return this.deletePath(query);
	      }
	    }
	  }, {
	    key: 'patchPath',
	    value: function patchPath() {
	      return 'api/editusertext';
	    }
	  }, {
	    key: 'deletePath',
	    value: function deletePath() {
	      return 'api/del';
	    }
	  }]);

	  return BaseContentEndpoint;
	}(/* harmony import */__WEBPACK_IMPORTED_MODULE_1__apiBase_BaseEndpoint__["a"]);

	BaseContentEndpoint.move = /* harmony import */__WEBPACK_IMPORTED_MODULE_1__apiBase_BaseEndpoint__["a"].notImplemented('move');
	BaseContentEndpoint.copy = /* harmony import */__WEBPACK_IMPORTED_MODULE_1__apiBase_BaseEndpoint__["a"].notImplemented('copy');
	BaseContentEndpoint.put = /* harmony import */__WEBPACK_IMPORTED_MODULE_1__apiBase_BaseEndpoint__["a"].notImplemented('put');

	BaseContentEndpoint.patch = function (apiOptions, data) {
	  if (!data) {
	    throw new /* harmony import */__WEBPACK_IMPORTED_MODULE_2__apiBase_errors_NoModelError__["a"]('/api/editusertext');
	  }

	  var promises = [];

	  Object.keys(data).map(function (k) {
	    var prop = MOD_ACTION_MAP[k];
	    var val = data[k];

	    if (prop) {
	      (function () {
	        var _prop = prop(val, data);

	        var _prop2 = _slicedToArray(_prop, 2);

	        var api = _prop2[0];
	        var json = _prop2[1];

	        promises.push(new Promise(function (r, x) {
	          _this2.rawSend('post', api, json, function (err, res, req) {
	            if (err || !res.ok) {
	              x(err || res);
	            }

	            r(res, req);
	          });
	        }));
	      })();
	    }
	  });

	  if (data.text) {
	    var json = {
	      api_type: 'json',
	      thing_id: data.id,
	      text: data.text,
	      _method: 'post'
	    };

	    promises.push(_this2.save('patch', json));
	  }

	  return Promise.all(promises);
	};

	/* unused harmony default export */ var _unused_webpack_default_export = BaseContentEndpoint;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__apiBase_APIRequestUtils__ = __webpack_require__(1);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash_object__ = __webpack_require__(4);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash_object___default = __WEBPACK_IMPORTED_MODULE_1_lodash_object__ && __WEBPACK_IMPORTED_MODULE_1_lodash_object__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_1_lodash_object__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_1_lodash_object__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_1_lodash_object___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_1_lodash_object___default });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models2_CommentModel__ = __webpack_require__(12);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models2_PostModel__ = __webpack_require__(2);







	var CONSTRUCTORS = {
	  t1: /* harmony import */__WEBPACK_IMPORTED_MODULE_2__models2_CommentModel__["a"],
	  t3: /* harmony import */__WEBPACK_IMPORTED_MODULE_3__models2_PostModel__["a"]
	};

	var parseBody = function parseBody(res, apiResponse) {
	  var body = res.body;

	  if (!/* harmony import */__WEBPACK_IMPORTED_MODULE_1_lodash_object__["has"].bind()(body, 'data.children')) {
	    return;
	  }

	  var things = body.data.children;

	  things.forEach(function (t) {
	    apiResponse.addResult(CONSTRUCTORS[t.kind].fromJSON(t.data));
	  });
	};

	var formatQuery = function formatQuery(query) {
	  return /* harmony import */__WEBPACK_IMPORTED_MODULE_1_lodash_object__["omit"].bind()(query, 'user');
	};

	var validator = function validator(data) {
	  return !!data.id;
	};

	var dataFromQuery = function dataFromQuery(data) {
	  return {
	    id: data.id,
	    category: data.category
	  };
	};

	var _get = function _get(apiOptions, query, path) {
	  var apiQuery = formatQuery(query);

	  return /* harmony import */__WEBPACK_IMPORTED_MODULE_0__apiBase_APIRequestUtils__["a"].bind()(apiOptions, 'get', path, apiQuery, query, parseBody);
	};

	var _del = function _del(apiOptions, query, path) {
	  /* harmony import */__WEBPACK_IMPORTED_MODULE_0__apiBase_APIRequestUtils__["b"].bind()(query, 'del', 'saved', validator);
	  var postData = dataFromQuery(query);

	  return /* harmony import */__WEBPACK_IMPORTED_MODULE_0__apiBase_APIRequestUtils__["a"].bind()(apiOptions, 'post', path, postData, query, parseBody);
	};

	var _post = function _post(apiOptions, query, path) {
	  validator(query, 'post', 'saved', validator);
	  var postData = formatQuery(query);

	  return /* harmony import */__WEBPACK_IMPORTED_MODULE_0__apiBase_APIRequestUtils__["a"].bind()(apiOptions, 'post', path, postData, query, parseBody);
	};

	/* harmony default export */ exports["a"] = function (getPathFn, delPath, postPath) {
	  return {
	    get: function get(apiOptions, query) {
	      var path = getPathFn(query);
	      return _get(apiOptions, query, path);
	    },
	    del: function del(apiOptions, query) {
	      return _del(apiOptions, query, delPath);
	    },
	    post: function post(apiOptions, query) {
	      return _post(apiOptions, query, postPath);
	    }
	  };
	};

/***/ },
/* 28 */
/***/ function(module, exports) {

	module.exports = require("superagent");

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Listing__ = __webpack_require__(3);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__apis_CommentsEndpoint__ = __webpack_require__(18);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__apiBase_errors_NotImplementedError__ = __webpack_require__(10);
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





	var CommentsPage = function (_Listing) {
	  _inherits(CommentsPage, _Listing);

	  function CommentsPage() {
	    _classCallCheck(this, CommentsPage);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(CommentsPage).apply(this, arguments));
	  }

	  _createClass(CommentsPage, [{
	    key: 'replies',
	    value: function replies(comment) {
	      return comment.replies.map(this.apiResponse.getModelFromRecord);
	    }
	  }, {
	    key: 'nextResponse',
	    value: function () {
	      var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
	        return regeneratorRuntime.wrap(function _callee$(_context) {
	          while (1) {
	            switch (_context.prev = _context.next) {
	              case 0:
	                throw new /* harmony import */__WEBPACK_IMPORTED_MODULE_2__apiBase_errors_NotImplementedError__["a"]('comments collection pageing not supported yet');

	              case 1:
	              case 'end':
	                return _context.stop();
	            }
	          }
	        }, _callee, this);
	      }));

	      function nextResponse() {
	        return ref.apply(this, arguments);
	      }

	      return nextResponse;
	    }()
	  }, {
	    key: 'prevResponse',
	    value: function () {
	      var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
	        return regeneratorRuntime.wrap(function _callee2$(_context2) {
	          while (1) {
	            switch (_context2.prev = _context2.next) {
	              case 0:
	                throw new /* harmony import */__WEBPACK_IMPORTED_MODULE_2__apiBase_errors_NotImplementedError__["a"]('comments collection pageing not supported yet');

	              case 1:
	              case 'end':
	                return _context2.stop();
	            }
	          }
	        }, _callee2, this);
	      }));

	      function prevResponse() {
	        return ref.apply(this, arguments);
	      }

	      return prevResponse;
	    }()
	  }, {
	    key: 'topLevelComments',
	    get: function get() {
	      return this.apiResponse.results.map(this.apiResponse.getModelFromRecord);
	    }
	  }], [{
	    key: 'fetch',
	    value: function fetch(apiOptions, id) {
	      if (typeof id === 'string') {
	        id = { id: id };
	      }

	      return _get(Object.getPrototypeOf(CommentsPage), 'fetch', this).call(this, apiOptions, id);
	    }
	  }, {
	    key: 'fetchMoreChildren',
	    value: function fetchMoreChildren(apiOptions, comment) {
	      return _get(Object.getPrototypeOf(CommentsPage), 'fetch', this).call(this, apiOptions, { ids: comment.children });
	    }
	  }]);

	  return CommentsPage;
	}(/* harmony import */__WEBPACK_IMPORTED_MODULE_0__Listing__["a"]);

	CommentsPage.endpoint = /* harmony import */__WEBPACK_IMPORTED_MODULE_1__apis_CommentsEndpoint__["a"];
	/* harmony default export */ exports["a"] = CommentsPage;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__SavedPostsAndComments__ = __webpack_require__(24);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__apis_HiddenEndpoint__ = __webpack_require__(19);
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




	var HiddenPostsAndComments = function (_SavedPostsAndComment) {
	  _inherits(HiddenPostsAndComments, _SavedPostsAndComment);

	  function HiddenPostsAndComments() {
	    _classCallCheck(this, HiddenPostsAndComments);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(HiddenPostsAndComments).apply(this, arguments));
	  }

	  return HiddenPostsAndComments;
	}(/* harmony import */__WEBPACK_IMPORTED_MODULE_0__SavedPostsAndComments__["a"]);/* unused harmony export HiddenPostsAndComments */
	HiddenPostsAndComments.endpoint = /* harmony import */__WEBPACK_IMPORTED_MODULE_1__apis_HiddenEndpoint__["a"];

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Listing__ = __webpack_require__(3);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__apis_PostsEndpoint__ = __webpack_require__(20);
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




	var PostsFromSubreddit = function (_Listing) {
	  _inherits(PostsFromSubreddit, _Listing);

	  function PostsFromSubreddit() {
	    _classCallCheck(this, PostsFromSubreddit);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(PostsFromSubreddit).apply(this, arguments));
	  }

	  _createClass(PostsFromSubreddit, [{
	    key: 'posts',
	    get: function get() {
	      return this.apiResponse.results.map(this.apiResponse.getModelFromRecord);
	    }
	  }], [{
	    key: 'fetch',
	    value: function fetch(apiOptions, subredditNameOrOptions) {
	      var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

	      if (typeof subredditNameOrOptions === 'string') {
	        options.subredditName = subredditNameOrOptions;
	      } else {
	        options = subredditNameOrOptions || {};
	      }

	      return _get(Object.getPrototypeOf(PostsFromSubreddit), 'fetch', this).call(this, apiOptions, options);
	    }
	  }]);

	  return PostsFromSubreddit;
	}(/* harmony import */__WEBPACK_IMPORTED_MODULE_0__Listing__["a"]);

	PostsFromSubreddit.endpoint = /* harmony import */__WEBPACK_IMPORTED_MODULE_1__apis_PostsEndpoint__["a"];
	/* harmony default export */ exports["a"] = PostsFromSubreddit;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Listing__ = __webpack_require__(3);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__apis_SearchEndpoint__ = __webpack_require__(22);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash_array__ = __webpack_require__(16);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash_array___default = __WEBPACK_IMPORTED_MODULE_2_lodash_array__ && __WEBPACK_IMPORTED_MODULE_2_lodash_array__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_2_lodash_array__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_2_lodash_array__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_2_lodash_array___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_2_lodash_array___default });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__apiBase_APIResponsePaging__ = __webpack_require__(6);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models2_thingTypes__ = __webpack_require__(0);
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }








	var RESERVED_FOR_SUBBREDITS = 3; // api reserves 3 slots for subreddit results

	var SearchQuery = function (_Listing) {
	  _inherits(SearchQuery, _Listing);

	  function SearchQuery() {
	    _classCallCheck(this, SearchQuery);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(SearchQuery).apply(this, arguments));
	  }

	  _createClass(SearchQuery, [{
	    key: 'expectedNumberOfPosts',
	    value: function expectedNumberOfPosts(query) {
	      return (query.limit || 25) - RESERVED_FOR_SUBBREDITS;
	    }
	  }, {
	    key: 'afterId',
	    get: function get() {
	      var _this2 = this;

	      return /* harmony import */__WEBPACK_IMPORTED_MODULE_3__apiBase_APIResponsePaging__["a"].bind()(this.apiResponse, function (query, results) {
	        var limit = _this2.expectedNumberOfPosts(query);
	        var posts = results.filter(function (record) {
	          return record.type === /* harmony import */__WEBPACK_IMPORTED_MODULE_4__models2_thingTypes__["b"];
	        });
	        return posts.length >= limit ? /* harmony import */__WEBPACK_IMPORTED_MODULE_2_lodash_array__["last"].bind()(posts).uuid : null;
	      });
	    }
	  }, {
	    key: 'posts',
	    get: function get() {
	      return this.apiResponse.results.filter(function (record) {
	        return record.type === /* harmony import */__WEBPACK_IMPORTED_MODULE_4__models2_thingTypes__["b"];
	      }).map(this.apiResponse.getModelFromRecord);
	    }
	  }, {
	    key: 'subreddits',
	    get: function get() {
	      return this.apiResponse.results.filter(function (record) {
	        return record.type === /* harmony import */__WEBPACK_IMPORTED_MODULE_4__models2_thingTypes__["e"];
	      }).map(this.apiResponse.getModelFromRecord);
	    }
	  }], [{
	    key: 'fetch',
	    value: function fetch(apiOptions, queryOrOptions) {
	      var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

	      if (typeof queryOrOptions === 'string') {
	        options.q = queryOrOptions;
	      } else {
	        options = _extends({}, options, queryOrOptions);
	      }

	      return _get(Object.getPrototypeOf(SearchQuery), 'fetch', this).call(this, apiOptions, options);
	    }
	  }, {
	    key: 'fetchPostsAndComments',
	    value: function fetchPostsAndComments(apiOptions, queryOrOptions) {
	      var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

	      options = _extends({}, options, {
	        include_facets: 'off',
	        type: ['sr', 'link'],
	        sort: 'relevance',
	        t: 'all'
	      });

	      return this.fetch(apiOptions, queryOrOptions, options);
	    }
	  }, {
	    key: 'fetchPosts',
	    value: function fetchPosts(apiOptions, queryOrOptions) {
	      var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

	      options = _extends({}, options, {
	        include_facets: 'off',
	        type: ['link'],
	        sort: 'relevance',
	        t: 'all'
	      });

	      return this.fetch(apiOptions, queryOrOptions, options);
	    }
	  }, {
	    key: 'fetchSubreddits',
	    value: function fetchSubreddits(apiOptions, queryOrOptions) {
	      var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

	      options = _extends({}, options, {
	        include_facets: 'off',
	        type: ['sr'],
	        sort: 'relevance',
	        t: 'all'
	      });

	      return this.fetch(apiOptions, queryOrOptions, options);
	    }
	  }]);

	  return SearchQuery;
	}(/* harmony import */__WEBPACK_IMPORTED_MODULE_0__Listing__["a"]);

	SearchQuery.endpoint = /* harmony import */__WEBPACK_IMPORTED_MODULE_1__apis_SearchEndpoint__["a"];
	/* harmony default export */ exports["a"] = SearchQuery;

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__apiBase_APIResponsePaging__ = __webpack_require__(6);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Listing__ = __webpack_require__(3);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__apis_SubredditEndpoint__ = __webpack_require__(23);
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





	var SubredditList = function (_Listing) {
	  _inherits(SubredditList, _Listing);

	  function SubredditList() {
	    _classCallCheck(this, SubredditList);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(SubredditList).apply(this, arguments));
	  }

	  _createClass(SubredditList, [{
	    key: 'subreddits',
	    get: function get() {
	      return this.apiResponse.results.map(this.apiResponse.getModelFromRecord);
	    }
	  }], [{
	    key: 'baseOptions',
	    value: function baseOptions() {
	      return { sort: this.view, limit: this.limit };
	    }
	  }, {
	    key: 'fetch',
	    value: function () {
	      var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(apiOptions) {
	        var all = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];
	        var get, allMergedSubreddits, firstPage;
	        return regeneratorRuntime.wrap(function _callee$(_context) {
	          while (1) {
	            switch (_context.prev = _context.next) {
	              case 0:
	                if (!all) {
	                  _context.next = 6;
	                  break;
	                }

	                get = /* harmony import */__WEBPACK_IMPORTED_MODULE_2__apis_SubredditEndpoint__["a"].get;
	                _context.next = 4;
	                return /* harmony import */__WEBPACK_IMPORTED_MODULE_0__apiBase_APIResponsePaging__["d"].bind()(get, apiOptions, this.baseOptions());

	              case 4:
	                allMergedSubreddits = _context.sent;
	                return _context.abrupt('return', new this(allMergedSubreddits));

	              case 6:
	                _context.next = 8;
	                return this.getResponse(apiOptions);

	              case 8:
	                firstPage = _context.sent;
	                return _context.abrupt('return', new this(firstPage));

	              case 10:
	              case 'end':
	                return _context.stop();
	            }
	          }
	        }, _callee, this);
	      }));

	      function fetch(_x, _x2) {
	        return ref.apply(this, arguments);
	      }

	      return fetch;
	    }()
	  }]);

	  return SubredditList;
	}(/* harmony import */__WEBPACK_IMPORTED_MODULE_1__Listing__["a"]);/* unused harmony export SubredditList */

	SubredditList.view = '';
	SubredditList.limit = 100;
	SubredditList.endpoint = /* harmony import */__WEBPACK_IMPORTED_MODULE_2__apis_SubredditEndpoint__["a"];
	var SubscribedSubreddits = function (_SubredditList) {
	  _inherits(SubscribedSubreddits, _SubredditList);

	  function SubscribedSubreddits() {
	    _classCallCheck(this, SubscribedSubreddits);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(SubscribedSubreddits).apply(this, arguments));
	  }

	  return SubscribedSubreddits;
	}(SubredditList);
	/* harmony export */ Object.defineProperty(exports, "c", {configurable: false, enumerable: true, get: function() { return SubscribedSubreddits; }});

	SubscribedSubreddits.view = 'mine/subscriber';
	var ModeratingSubreddits = function (_SubredditList2) {
	  _inherits(ModeratingSubreddits, _SubredditList2);

	  function ModeratingSubreddits() {
	    _classCallCheck(this, ModeratingSubreddits);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(ModeratingSubreddits).apply(this, arguments));
	  }

	  return ModeratingSubreddits;
	}(SubredditList);
	/* harmony export */ Object.defineProperty(exports, "b", {configurable: false, enumerable: true, get: function() { return ModeratingSubreddits; }});

	ModeratingSubreddits.view = 'mine/moderator';
	var ContributingSubreddits = function (_SubredditList3) {
	  _inherits(ContributingSubreddits, _SubredditList3);

	  function ContributingSubreddits() {
	    _classCallCheck(this, ContributingSubreddits);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(ContributingSubreddits).apply(this, arguments));
	  }

	  return ContributingSubreddits;
	}(SubredditList);
	/* harmony export */ Object.defineProperty(exports, "a", {configurable: false, enumerable: true, get: function() { return ContributingSubreddits; }});
	ContributingSubreddits.view = 'mine/contributor';

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_superagent__ = __webpack_require__(28);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_superagent___default = __WEBPACK_IMPORTED_MODULE_0_superagent__ && __WEBPACK_IMPORTED_MODULE_0_superagent__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0_superagent__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0_superagent__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_0_superagent___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_0_superagent___default });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__errors_ValidationError__ = __webpack_require__(11);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__errors_NoModelError__ = __webpack_require__(7);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__errors_NotImplementedError__ = __webpack_require__(10);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__APIResponse__ = __webpack_require__(5);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Events__ = __webpack_require__(25);
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _this = this;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }










	var EventEmitterShim = {
	  emit: function emit() {},
	  on: function on() {},
	  off: function off() {}
	};

	var getEmitter = function getEmitter(apiOptions) {
	  return apiOptions.eventEmiiter || EventEmitterShim;
	};

	var StaticAPIBase = function () {
	  function StaticAPIBase() {
	    _classCallCheck(this, StaticAPIBase);
	  }

	  _createClass(StaticAPIBase, null, [{
	    key: 'basePath',
	    value: function basePath() {
	      return '/';
	    }
	  }, {
	    key: 'appParameter',
	    value: function appParameter(apiOptions) {
	      return apiOptions.appName + '-' + apiOptions.env;
	    }
	  }, {
	    key: 'path',
	    value: function path(method) {
	      var query = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	      var basePath = this.basePath();

	      if (['string', 'number'].contains(_typeof(query.id))) {
	        basePath += '/' + query.id;
	      }

	      return basePath;
	    }
	  }, {
	    key: 'fullPath',
	    value: function fullPath(apiOptions, method) {
	      var query = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

	      return apiOptions.origin + '/' + this.path(method, query);
	    }
	  }, {
	    key: 'formatMeta',
	    value: function formatMeta(res) {
	      return res.headers;
	    }
	  }, {
	    key: 'buildAuthHeader',
	    value: function buildAuthHeader(apiOptions) {
	      var token = apiOptions.token;

	      if (token) {
	        return { Authorization: 'Bearer ' + token };
	      }

	      return {};
	    }
	  }, {
	    key: 'buildHeaders',
	    value: function buildHeaders(apiOptions) {
	      return apiOptions.defaultHeaders || {};
	    }
	  }, {
	    key: 'formatQuery',
	    value: function formatQuery(query) {
	      return query;
	    }
	  }, {
	    key: 'parseBody',
	    value: function parseBody(res, apiResponse /*, req, method*/) {
	      apiResponse.addResult(res.body);
	      return;
	    }
	  }, {
	    key: 'formatData',
	    value: function formatData(data) {
	      return data;
	    }
	  }, {
	    key: 'rawSend',
	    value: function rawSend(apiOptions, method, path, data, cb) {
	      var origin = apiOptions.origin;

	      var s = /* harmony import */__WEBPACK_IMPORTED_MODULE_0_superagent___default.a[method](origin + '/' + path);
	      s.type('form');

	      if (apiOptions.token) {
	        s.set('Authorization', 'bearer ' + apiOptions.token);
	      }

	      s.send(data).end(function (err, res) {
	        var fakeReq = {
	          origin: origin,
	          path: path,
	          method: method,
	          query: data
	        };

	        var req = res ? res.request : fakeReq;
	        cb(err, res, req);
	      });
	    }

	    // Get the source, then save it, modified by data.


	    // Get the old one, save the new one, then delete the old one if save succeeded

	  }]);

	  return StaticAPIBase;
	}();

	StaticAPIBase.Events = /* harmony import */__WEBPACK_IMPORTED_MODULE_5__Events__["a"];
	StaticAPIBase.api = '<base>';

	StaticAPIBase.runQuery = function (apiOptions, method, rawQuery) {
	  var originalMethod = method;
	  var query = _this.formatQuery(_extends({}, rawQuery), method);
	  query.app = _this.appParameter;

	  var handle = _this.handle;
	  var path = _this.fullPath(apiOptions, method, _extends({}, rawQuery));

	  var fakeReq = { url: path, method: method, query: query };
	  getEmitter(apiOptions).emit(/* harmony import */__WEBPACK_IMPORTED_MODULE_5__Events__["a"].request, fakeReq);

	  method = query._method || method;
	  delete query._method;

	  return new Promise(function (resolve, reject) {
	    var s = /* harmony import */__WEBPACK_IMPORTED_MODULE_0_superagent___default.a[method](path).timeout(apiOptions.timeout || 5000);

	    if (s.redirects) {
	      s.redirects(0);
	    }

	    s.query(query);

	    s.set(_this.buildAuthHeader(apiOptions));
	    s.set(_this.buildHeaders(apiOptions));

	    if (query.id && !Array.isArray(query.id)) {
	      delete query.id;
	    }

	    s.end(function (err, res) {
	      if (err && err.timeout) {
	        err.status = 504;
	      }

	      var origin = apiOptions.origin;
	      var path = _this.path(method, rawQuery);

	      var fakeReq = { origin: origin, path: path, method: method, query: query };
	      var req = res ? res.request : fakeReq;

	      handle(resolve, reject)(err, res, req, rawQuery, originalMethod);
	    });
	  });
	};

	StaticAPIBase.save = function (method) {
	  var data = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	  return new Promise(function (resolve, reject) {
	    if (!data) {
	      return reject(new /* harmony import */__WEBPACK_IMPORTED_MODULE_2__errors_NoModelError__["a"](_this.api));
	    }

	    data = _this.formatQuery(data, method);
	    data.app = _this.appParameter;

	    if (_this.model) {
	      var model = new _this.model(data);

	      var keys = void 0;

	      // Only validate keys being sent in, if this is a patch
	      if (method === 'patch') {
	        keys = Object.keys(data);
	      }

	      var valid = model.validate(keys);

	      if (valid !== true) {
	        return reject(new /* harmony import */__WEBPACK_IMPORTED_MODULE_1__errors_ValidationError__["a"](_this.api, model));
	      }

	      if (method !== 'patch') {
	        data = model.toJSON();
	      }
	    }

	    var path = _this.path(method, data);
	    var _method = method;

	    method = data._method || method;

	    data = _this.formatData(data, _method);

	    _this.rawSend(method, path, data, function (err, res, req) {
	      _this.handle(resolve, reject)(err, res, req, data, method);
	    });
	  });
	};

	StaticAPIBase.head = function (apiOptions) {
	  var query = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	  return _this.runQuery(apiOptions, 'head', query);
	};

	StaticAPIBase.get = function (apiOptions, query) {
	  query = _extends({
	    raw_json: 1
	  }, query || {});

	  return _this.runQuery(apiOptions, 'get', query);
	};

	StaticAPIBase.del = function (apiOptions) {
	  var query = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	  return _this.runQuery(apiOptions, 'del', query);
	};

	StaticAPIBase.post = function (apiOptions, data) {
	  return _this.save(apiOptions, 'post', data);
	};

	StaticAPIBase.put = function (apiOptions, data) {
	  return _this.save(apiOptions, 'put', data);
	};

	StaticAPIBase.patch = function (apiOptions, data) {
	  return _this.save(apiOptions, 'patch', data);
	};

	StaticAPIBase.copy = function (apiOptions, fromId, data) {
	  return new Promise(function (resolve, reject) {
	    _this.get(apiOptions, fromId).then(function (oldData) {
	      _this.save(apiOptions, 'copy', _extends({}, oldData, {
	        _method: data.id ? 'put' : 'post'
	      }, data)).then(resolve, reject);
	    });
	  });
	};

	StaticAPIBase.move = function (apiOptions, fromId, toId, data) {
	  return new Promise(function (resolve, reject) {
	    _this.get(apiOptions, fromId).then(function (oldData) {
	      _this.save(apiOptions, 'move', _extends({
	        _method: 'put'
	      }, oldData, {
	        id: toId
	      }, data)).then(function (data) {
	        _this.del({ id: fromId }).then(function () {
	          resolve(data);
	        }, reject);
	      }, reject);
	    });
	  });
	};

	StaticAPIBase.notImplemented = function (method) {
	  return function () {
	    throw new /* harmony import */__WEBPACK_IMPORTED_MODULE_3__errors_NotImplementedError__["a"](method, _this.api);
	  };
	};

	StaticAPIBase.handle = function (apiOptions, resolve, reject, err, res, req, query, method) {
	  // lol handle the twelve ways superagent sends request back
	  if (res && !req) {
	    req = res.request || res.req;
	  }

	  if (err || res && !res.ok) {
	    getEmitter(apiOptions).emit(/* harmony import */__WEBPACK_IMPORTED_MODULE_5__Events__["a"].error, err, req);

	    if (apiOptions.defaultErrorHandler) {
	      return apiOptions.defaultErrorHandler(err || 500);
	    } else {
	      return reject(err || 500);
	    }
	  }

	  getEmitter(apiOptions).emit(/* harmony import */__WEBPACK_IMPORTED_MODULE_5__Events__["a"].response, req, res);

	  var meta = void 0;
	  var body = void 0;
	  var apiResponse = void 0;

	  try {
	    meta = _this.formatMeta(res, req, method);
	    var start = Date.now();
	    apiResponse = new /* harmony import */__WEBPACK_IMPORTED_MODULE_4__APIResponse__["a"](meta, query);
	    try {
	      _this.parseBody(res, apiResponse, req, method);
	      _this.parseTime = Date.now() - start;
	    } catch (e) {
	      getEmitter(apiOptions).emit(/* harmony import */__WEBPACK_IMPORTED_MODULE_5__Events__["a"].error, e, req);
	      console.trace(e);
	    }

	    if (_this.formatBody) {
	      // shim for older apis or ones were we haven't figured out normalization yet
	      body = _this.formatBody(res, req, method);
	    }
	  } catch (e) {
	    if ({"NODE_ENV":"production"}.DEBUG_API_CLIENT_BASE) {
	      console.trace(e);
	    }

	    return reject(e);
	  }

	  getEmitter(apiOptions).emit(/* harmony import */__WEBPACK_IMPORTED_MODULE_5__Events__["a"].result, body || apiResponse);

	  resolve(body || apiResponse);
	};

	/* harmony default export */ exports["a"] = StaticAPIBase;

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__apiBase_APIRequestUtils__ = __webpack_require__(1);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__apis_CommentsEndpoint__ = __webpack_require__(18);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__apis_HiddenEndpoint__ = __webpack_require__(19);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__apis_PostsEndpoint__ = __webpack_require__(20);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__apis_SavedEndpoint__ = __webpack_require__(21);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__apis_SearchEndpoint__ = __webpack_require__(22);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__apis_SubredditEndpoint__ = __webpack_require__(23);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__apiBase_APIResponse__ = __webpack_require__(5);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__apiBase_Model__ = __webpack_require__(17);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__apiBase_Record__ = __webpack_require__(9);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__apiBase_APIResponsePaging__ = __webpack_require__(6);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__apiBase_errors_NoModelError__ = __webpack_require__(7);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__apiBase_errors_ResponseError__ = __webpack_require__(14);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__apiBase_errors_ValidationError__ = __webpack_require__(11);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__apiBase_errors_NotImplementedError__ = __webpack_require__(10);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__models2_CommentModel__ = __webpack_require__(12);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__models2_PostModel__ = __webpack_require__(2);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__models2_Subreddit__ = __webpack_require__(13);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__collections_SubredditLists__ = __webpack_require__(33);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__collections_CommentsPage__ = __webpack_require__(29);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__collections_HiddenPostsAndComments__ = __webpack_require__(30);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__collections_PostsFromSubreddit__ = __webpack_require__(31);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__collections_SavedPostsAndComments__ = __webpack_require__(24);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__collections_SearchQuery__ = __webpack_require__(32);
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



	// import accounts from './apis/accounts';
	// import activities from './apis/activities';
	// import captcha from './apis/captcha';
	// import messages from './apis/messages';
	// import modListing from './apis/modListing';
	// import multis from './apis/multis';
	// import multiSubscriptions from './apis/multiSubscriptions';
	// import reports from './apis/reports';
	// import rules from './apis/rules';
	// import stylesheets from './apis/stylesheets';
	// import subredditRelationships from './apis/subredditRelationships';
	// import subscriptions from './apis/subscriptions';
	// import trophies from './apis/trophies';
	// import votes from './apis/votes';
	// import wiki from './apis/wiki';













	var APIResponses = {
	  APIResponse: /* harmony import */__WEBPACK_IMPORTED_MODULE_7__apiBase_APIResponse__["APIResponse"],
	  MergedApiReponse: /* harmony import */__WEBPACK_IMPORTED_MODULE_7__apiBase_APIResponse__["b"]
	};
	/* harmony export */ Object.defineProperty(exports, "APIResponses", {configurable: false, enumerable: true, get: function() { return APIResponses; }});

	var APIResponsePaging = {
	  withQueryAndResult: /* harmony import */__WEBPACK_IMPORTED_MODULE_10__apiBase_APIResponsePaging__["a"],
	  afterResponse: /* harmony import */__WEBPACK_IMPORTED_MODULE_10__apiBase_APIResponsePaging__["b"],
	  beforeResponse: /* harmony import */__WEBPACK_IMPORTED_MODULE_10__apiBase_APIResponsePaging__["c"],
	  fetchAll: /* harmony import */__WEBPACK_IMPORTED_MODULE_10__apiBase_APIResponsePaging__["d"]
	};
	/* harmony export */ Object.defineProperty(exports, "APIResponsePaging", {configurable: false, enumerable: true, get: function() { return APIResponsePaging; }});

	var endpoints = {
	  // accounts,
	  // activities,
	  // captcha,
	  // messages,
	  // modListing,
	  // multis,
	  // multiSubscriptions,
	  // reports,
	  // rules,
	  // stylesheets,
	  // subredditRelationships,
	  // subscriptions,
	  // trophies,
	  // votes,
	  // wiki,
	  CommentsEndpoint: /* harmony import */__WEBPACK_IMPORTED_MODULE_1__apis_CommentsEndpoint__["a"],
	  HiddenEndpoint: /* harmony import */__WEBPACK_IMPORTED_MODULE_2__apis_HiddenEndpoint__["a"],
	  PostsEndpoint: /* harmony import */__WEBPACK_IMPORTED_MODULE_3__apis_PostsEndpoint__["a"],
	  SavedEndpoint: /* harmony import */__WEBPACK_IMPORTED_MODULE_4__apis_SavedEndpoint__["a"],
	  SearchEndpoint: /* harmony import */__WEBPACK_IMPORTED_MODULE_5__apis_SearchEndpoint__["a"],
	  SubredditEndpoint: /* harmony import */__WEBPACK_IMPORTED_MODULE_6__apis_SubredditEndpoint__["a"]
	};
	/* harmony export */ Object.defineProperty(exports, "endpoints", {configurable: false, enumerable: true, get: function() { return endpoints; }});







	var errors = {
	  NoModelError: /* harmony import */__WEBPACK_IMPORTED_MODULE_11__apiBase_errors_NoModelError__["a"],
	  ValidationError: /* harmony import */__WEBPACK_IMPORTED_MODULE_13__apiBase_errors_ValidationError__["a"],
	  ResponseError: /* harmony import */__WEBPACK_IMPORTED_MODULE_12__apiBase_errors_ResponseError__["a"],
	  DisconnectedError: /* harmony import */__WEBPACK_IMPORTED_MODULE_12__apiBase_errors_ResponseError__["b"],
	  NotImplementedError: /* harmony import */__WEBPACK_IMPORTED_MODULE_14__apiBase_errors_NotImplementedError__["a"]
	};
	/* harmony export */ Object.defineProperty(exports, "errors", {configurable: false, enumerable: true, get: function() { return errors; }});

	// import Account from './models/account';
	// import Award from './models/award';
	// import Base from './models/base';
	// import Block from './models/block';
	// import BlockedUser from './models/BlockedUser';
	// import Message from './models/message';
	// import PromoCampaign from './models/promocampaign';
	// import Preferences from './models/preferences';
	// import Subscription from './models/subscription';
	// import Vote from './models/vote';
	// import Report from './models/report';
	// import WikiPage from './models/wikiPage';
	// import WikiRevision from './models/wikiRevision';
	// import WikiPageListing from './models/wikiPageListing';
	// import WikiPageSettings from './models/wikiPageSettings';

	// new models












	var models = {
	  // Account,
	  // Award,
	  // Base,
	  // Block,
	  // BlockedUser,
	  // Message,
	  // PromoCampaign,
	  // Preferences,
	  // Subreddit,
	  // Subscription,
	  // Vote,
	  // Report,
	  // WikiPage,
	  // WikiRevision,
	  // WikiPageListing,
	  // WikiPageSettings,
	  Model: /* harmony import */__WEBPACK_IMPORTED_MODULE_8__apiBase_Model__["a"],
	  Record: /* harmony import */__WEBPACK_IMPORTED_MODULE_9__apiBase_Record__["a"],

	  CommentModel: /* harmony import */__WEBPACK_IMPORTED_MODULE_15__models2_CommentModel__["a"],
	  PostModel: /* harmony import */__WEBPACK_IMPORTED_MODULE_16__models2_PostModel__["a"],
	  Subreddit: /* harmony import */__WEBPACK_IMPORTED_MODULE_17__models2_Subreddit__["a"]
	};
	/* harmony export */ Object.defineProperty(exports, "models", {configurable: false, enumerable: true, get: function() { return models; }});

	var collections = {
	  CommentsPage: /* harmony import */__WEBPACK_IMPORTED_MODULE_19__collections_CommentsPage__["a"],
	  ContributingSubreddits: /* harmony import */__WEBPACK_IMPORTED_MODULE_18__collections_SubredditLists__["a"],
	  HiddenPostsAndComments: /* harmony import */__WEBPACK_IMPORTED_MODULE_20__collections_HiddenPostsAndComments__["default"],
	  ModeratingSubreddits: /* harmony import */__WEBPACK_IMPORTED_MODULE_18__collections_SubredditLists__["b"],
	  PostsFromSubreddit: /* harmony import */__WEBPACK_IMPORTED_MODULE_21__collections_PostsFromSubreddit__["a"],
	  SavedPostsAndComments: /* harmony import */__WEBPACK_IMPORTED_MODULE_22__collections_SavedPostsAndComments__["a"],
	  SearchQuery: /* harmony import */__WEBPACK_IMPORTED_MODULE_23__collections_SearchQuery__["a"],
	  SubscribedSubreddits: /* harmony import */__WEBPACK_IMPORTED_MODULE_18__collections_SubredditLists__["c"]
	};
	/* harmony export */ Object.defineProperty(exports, "collections", {configurable: false, enumerable: true, get: function() { return collections; }});

	var DEFAULT_API_ORIGIN = 'https://www.reddit.com';
	var AUTHED_API_ORIGIN = 'https://oauth.reddit.com';

	// Webpack 2 has an export bug where a library's export object does not state
	// that it is an es6 module. Without this tag defined on the exports object,
	// Webpack does not import the library correctly.
	var __esModule = true;
	/* harmony export */ Object.defineProperty(exports, "__esModule", {configurable: false, enumerable: true, get: function() { return __esModule; }});

	var DefaultOptions = {
	  origin: DEFAULT_API_ORIGIN,
	  userAgent: 'snoodev3',
	  appName: 'snoodev3',
	  env: "production" || 'dev'
	};

	/* harmony default export */ exports["default"] = /* harmony import */__WEBPACK_IMPORTED_MODULE_0__apiBase_APIRequestUtils__["c"].bind()(DefaultOptions);

	var optionsWithAuth = function optionsWithAuth(token) {
	  return _extends({}, DefaultOptions, {
	    token: token,
	    origin: token ? AUTHED_API_ORIGIN : DEFAULT_API_ORIGIN
	  });
	};
	/* harmony export */ Object.defineProperty(exports, "optionsWithAuth", {configurable: false, enumerable: true, get: function() { return optionsWithAuth; }});

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony export */ exports["a"] = treeifyComments;/* harmony export */ exports["b"] = parseCommentList;/* harmony export */ exports["c"] = normalizeCommentReplies;// All of these function rely on mutation, either for building the tree,
	// or for performance reasons (things like building dictionaryies), use/edit carefully

	function treeifyComments() {
	  var comments = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

	  var commentDict = {};
	  comments.forEach(function (c) {
	    commentDict[c.uuid] = c;
	  });

	  var topLevelComments = [];

	  // build the tree. this relies on references, so mutability is important here
	  comments.forEach(function (c) {
	    var parent = commentDict[c.parent_id];
	    if (!parent) {
	      topLevelComments.push(c);
	      return;
	    }

	    if (!parent.replies) {
	      parent.replies = [];
	    }
	    parent.replies.push(c);
	  });

	  return topLevelComments;
	}

	function parseCommentList(commentList) {
	  return commentList.map(parseCommentData);
	}

	function parseCommentData(data) {
	  var comment = data.data;
	  if (comment.replies) {
	    comment.replies = comment.replies.data.children.map(parseCommentData);
	  } else {
	    comment.replies = [];
	  }

	  return comment;
	}

	function normalizeCommentReplies(comments, visitComment) {
	  return _normalizeCommentReplies(comments, visitComment, true);
	}

	function _normalizeCommentReplies(comments, visitComment, isTopLevel) {
	  if (!comments.length) {
	    return;
	  }

	  return comments.map(function (comment) {
	    comment.replies = _normalizeCommentReplies(comment.replies, visitComment, false);
	    return visitComment(comment, isTopLevel);
	  });
	}

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony export */ exports["a"] = isThingID;var THING_ID_REGEX = new RegExp('^t\\d_[0-9a-z]+', 'i');

	function isThingID(val) {
	  return THING_ID_REGEX.test(val);
	}

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony export */ exports["a"] = process;function process(text) {
	  if (!text) return text;

	  text = text.replace(/<a/g, '<a target="_blank"');

	  return text;
	}

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony export */ exports["a"] = unredditifyLink;function unredditifyLink(url) {
	  if (!url) {
	    return;
	  }
	  return url.replace(/^https?:\/\/(?:www\.)?reddit.com/, '');
	}

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony export */ exports["a"] = mockHTML;function mockHTML() {
	  // more randomization here at somepoint
	  /* eslint-disable max-len */
	  return '<h1>This is a header or something</h1><sup><sup>TM</sup></sup><a href="https://www.reddit.com/r/reactjs">reactjs subreddit</a>';
	  /* eslint-enable */
	}

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony export */ exports["a"] = mockLink;function mockLink() {
	  var seed = Math.toFixed(Math.random() * 10);
	  if (seed <= 3) {
	    return 'https://www.reddit.com/r/theonion';
	  }
	  if (seed <= 6) {
	    return 'https://www.reddit.com/r/nothteonion';
	  }
	  return 'https://www.theonion.com';
	}

/***/ },
/* 42 */
/***/ function(module, exports) {

	module.exports = require("lodash/collection");

/***/ },
/* 43 */
/***/ function(module, exports) {

	module.exports = require("lodash/lang");

/***/ }
/******/ ])
});
;