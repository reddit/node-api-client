(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("lodash/object"), require("lodash/array"), require("lodash/collection"), require("superagent"));
	else if(typeof define === 'function' && define.amd)
		define(["lodash/object", "lodash/array", "lodash/collection", "superagent"], factory);
	else if(typeof exports === 'object')
		exports["apiClient.js"] = factory(require("lodash/object"), require("lodash/array"), require("lodash/collection"), require("superagent"));
	else
		root["apiClient.js"] = factory(root["lodash/object"], root["lodash/array"], root["lodash/collection"], root["superagent"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_16__, __WEBPACK_EXTERNAL_MODULE_74__, __WEBPACK_EXTERNAL_MODULE_76__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 64);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var THING_ID_REGEX = new RegExp('^t\\d_[0-9a-z]+', 'i');

	var Base = function () {
	  function Base() {
	    var props = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	    _classCallCheck(this, Base);

	    this._type = 'Base';

	    this.props = {};

	    for (var p in props) {
	      this.props[p] = props[p];
	    }
	  }

	  _createClass(Base, [{
	    key: 'validators',
	    value: function validators() {
	      return;
	    }
	  }, {
	    key: 'get',
	    value: function get(name) {
	      return this.props[name];
	    }
	  }, {
	    key: 'set',
	    value: function set(name, value) {
	      if ((typeof name === 'undefined' ? 'undefined' : _typeof(name)) === 'object') {
	        Object.assign(this.props, name);
	      } else {
	        this.props[name] = value;
	      }
	    }
	  }, {
	    key: 'validate',
	    value: function validate(keys) {
	      var validators = this.validators();

	      if (!validators) {
	        return true;
	      }

	      var invalid = [];
	      var p = void 0;

	      for (p in this.props) {
	        // Optionally, send in an array of keys to validate
	        if (!keys || keys.includes(p)) {
	          if (validators[p] && !validators[p](this.props[p])) {
	            invalid.push(p);
	          }
	        }
	      }

	      if (invalid.length === 0) {
	        return true;
	      }

	      return invalid;
	    }
	  }, {
	    key: 'uuid',
	    value: function uuid(props) {
	      if (Base.validators.thingId(props.name)) {
	        return props.name;
	      } else if (Base.validators.thingId(props.id)) {
	        return props.id;
	      }
	    }
	  }, {
	    key: 'toJSON',
	    value: function toJSON() {
	      var formatter = arguments.length <= 0 || arguments[0] === undefined ? this.noopFormat : arguments[0];

	      var props = this.props;
	      props._type = this._type;
	      props.uuid = this.uuid(props);

	      if (formatter && typeof formatter === 'function') {
	        return formatter(props);
	      }

	      return props;
	    }
	  }]);

	  return Base;
	}();

	Base.validators = {
	  integer: function integer(i) {
	    return i === parseInt(i);
	  },

	  string: function string(s) {
	    return s === s.toString();
	  },

	  min: function min(i, _min) {
	    return i >= _min;
	  },

	  max: function max(i, _max) {
	    return i <= _max;
	  },

	  maxLength: function maxLength(s, l) {
	    return Base.validators.max(s.length, l);
	  },

	  minLength: function minLength(s, l) {
	    return Base.validators.min(s.length, l);
	  },

	  regex: function regex(s, expr) {
	    return expr.test(s);
	  },

	  thingId: function thingId(id) {
	    return id == null || Base.validators.regex(id, THING_ID_REGEX);
	  }
	};
	/* harmony default export */ exports["a"] = Base;

/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__RedditModel__ = __webpack_require__(15);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__thingTypes__ = __webpack_require__(4);
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




	var T = /* harmony import */__WEBPACK_IMPORTED_MODULE_0__RedditModel__["a"].Types;

	var Link = function (_RedditModel) {
	  _inherits(Link, _RedditModel);

	  function Link() {
	    _classCallCheck(this, Link);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Link).apply(this, arguments));
	  }

	  return Link;
	}(/* harmony import */__WEBPACK_IMPORTED_MODULE_0__RedditModel__["a"]);

	Link.type = /* harmony import */__WEBPACK_IMPORTED_MODULE_1__thingTypes__["c"];
	Link.PROPERTIES = {
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
	Link.API_ALIASES = {
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
	Link.DERIVED_PROPERTIES = {
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
	/* harmony default export */ exports["a"] = Link;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("lodash/object");

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony export */ exports["b"] = thingType;var COMMENT = 'comment';
	/* harmony export */ Object.defineProperty(exports, "d", {configurable: false, enumerable: true, get: function() { return COMMENT; }});
	var COMMENT_TYPE = 't1';/* unused harmony export COMMENT_TYPE */
	var COMMENT_LOAD_MORE = 'comment_load_more';
	/* harmony export */ Object.defineProperty(exports, "i", {configurable: false, enumerable: true, get: function() { return COMMENT_LOAD_MORE; }});

	var USER = 'user';
	/* harmony export */ Object.defineProperty(exports, "e", {configurable: false, enumerable: true, get: function() { return USER; }});
	var USER_TYPE = 't2';
	/* harmony export */ Object.defineProperty(exports, "h", {configurable: false, enumerable: true, get: function() { return USER_TYPE; }});

	var LINK = 'link';
	/* harmony export */ Object.defineProperty(exports, "c", {configurable: false, enumerable: true, get: function() { return LINK; }});
	var LINK_TYPE = 't3';/* unused harmony export LINK_TYPE */

	var MESSAGE = 'message';
	/* harmony export */ Object.defineProperty(exports, "f", {configurable: false, enumerable: true, get: function() { return MESSAGE; }});
	var MESSAGE_TYPE = 't4';/* unused harmony export MESSAGE_TYPE */

	var SUBREDDIT = 'subreddit';
	/* harmony export */ Object.defineProperty(exports, "g", {configurable: false, enumerable: true, get: function() { return SUBREDDIT; }});
	var SUBREDDIT_TYPE = 't5';/* unused harmony export SUBREDDIT_TYPE */

	var TROPHIE = 'trophie';/* unused harmony export TROPHIE */
	var TROPHIE_TYPE = 't6';/* unused harmony export TROPHIE_TYPE */

	var PROMOCAMPAIGN = 'promocampaign';/* unused harmony export PROMOCAMPAIGN */
	var PROMOCAMPAIGN_TYPE = 't8';/* unused harmony export PROMOCAMPAIGN_TYPE */

	var type_pairs = [[COMMENT, COMMENT_TYPE], [USER, USER_TYPE], [LINK, LINK_TYPE], [MESSAGE, MESSAGE_TYPE], [SUBREDDIT, SUBREDDIT_TYPE], [TROPHIE, TROPHIE_TYPE], [PROMOCAMPAIGN, PROMOCAMPAIGN_TYPE]];

	var TYPES = type_pairs.reduce(function (table, pair) {
	  table[pair[1]] = pair[0];
	  return table;
	}, {});
	/* harmony export */ Object.defineProperty(exports, "a", {configurable: false, enumerable: true, get: function() { return TYPES; }});

	var TYPE_TO_THING_TYPE = type_pairs.reduce(function (table, pair) {
	  table[pair[0]] = pair[1];
	  return table;
	}, {});/* unused harmony export TYPE_TO_THING_TYPE */

	function thingType(id) {
	  return TYPES[id.substring(0, 2)];
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__RedditModel__ = __webpack_require__(15);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__apiBase_Record__ = __webpack_require__(30);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__thingTypes__ = __webpack_require__(4);
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





	var T = /* harmony import */__WEBPACK_IMPORTED_MODULE_0__RedditModel__["a"].Types;

	var Comment = function (_RedditModel) {
	  _inherits(Comment, _RedditModel);

	  function Comment() {
	    _classCallCheck(this, Comment);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Comment).apply(this, arguments));
	  }

	  _createClass(Comment, [{
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
	        return _get(Object.getPrototypeOf(Comment.prototype), 'toRecord', this).call(this);
	      }

	      // otherwise its a load more stub for super nested comments
	      return new /* harmony import */__WEBPACK_IMPORTED_MODULE_1__apiBase_Record__["a"](/* harmony import */__WEBPACK_IMPORTED_MODULE_2__thingTypes__["i"], this.parentId);
	    }
	  }]);

	  return Comment;
	}(/* harmony import */__WEBPACK_IMPORTED_MODULE_0__RedditModel__["a"]);

	Comment.type = /* harmony import */__WEBPACK_IMPORTED_MODULE_2__thingTypes__["d"];
	Comment.PROPERTIES = {
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
	Comment.API_ALIASES = {
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
	/* harmony default export */ exports["a"] = Comment;

/***/ },
/* 6 */,
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__apiBase_APIResponsePaging__ = __webpack_require__(8);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash_object__ = __webpack_require__(3);
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
	      var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(api) {
	        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	        var res;
	        return regeneratorRuntime.wrap(function _callee$(_context) {
	          while (1) {
	            switch (_context.prev = _context.next) {
	              case 0:
	                _context.next = 2;
	                return api[this.endpoint].get(_extends({}, this.baseOptions(), options));

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
	      var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(api) {
	        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	        return regeneratorRuntime.wrap(function _callee2$(_context2) {
	          while (1) {
	            switch (_context2.prev = _context2.next) {
	              case 0:
	                _context2.t0 = this;
	                _context2.next = 3;
	                return this.getResponse(api, options);

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
	      var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(api) {
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
	                return this.constructor.getResponse(api, options);

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
	      var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(api) {
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
	                return this.constructor.getResponse(api, options);

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
	      var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(fetchMethod, api, reduceResponse) {
	        var response;
	        return regeneratorRuntime.wrap(function _callee5$(_context5) {
	          while (1) {
	            switch (_context5.prev = _context5.next) {
	              case 0:
	                _context5.next = 2;
	                return fetchMethod(api);

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
	      var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee6(api) {
	        return regeneratorRuntime.wrap(function _callee6$(_context6) {
	          while (1) {
	            switch (_context6.prev = _context6.next) {
	              case 0:
	                return _context6.abrupt('return', this.fetchAndMakeInstance(this.nextResponse, api, identity));

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
	      var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee7(api) {
	        return regeneratorRuntime.wrap(function _callee7$(_context7) {
	          while (1) {
	            switch (_context7.prev = _context7.next) {
	              case 0:
	                return _context7.abrupt('return', this.fetchAndMakeInstance(this.nextResponse, api, this.apiResponse.appendResponse));

	              case 1:
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
	      var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee8(api) {
	        return regeneratorRuntime.wrap(function _callee8$(_context8) {
	          while (1) {
	            switch (_context8.prev = _context8.next) {
	              case 0:
	                return _context8.abrupt('return', this.fetchAndMakeInstance(this.prevResponse, api, identity));

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
	      var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee9(api) {
	        var _this = this;

	        return regeneratorRuntime.wrap(function _callee9$(_context9) {
	          while (1) {
	            switch (_context9.prev = _context9.next) {
	              case 0:
	                return _context9.abrupt('return', this.fetchAndMakeInstance(this.prevResponse, api, function (prevResponse) {
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

	Listing.endpoint = '';
	/* harmony default export */ exports["a"] = Listing;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_array__ = __webpack_require__(16);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_array___default = __WEBPACK_IMPORTED_MODULE_0_lodash_array__ && __WEBPACK_IMPORTED_MODULE_0_lodash_array__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0_lodash_array__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0_lodash_array__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_0_lodash_array___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_0_lodash_array___default });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__APIResponse__ = __webpack_require__(10);
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
	  var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(fetchFunction, initialParams) {
	    var params, response, after;
	    return regeneratorRuntime.wrap(function _callee$(_context) {
	      while (1) {
	        switch (_context.prev = _context.next) {
	          case 0:
	            params = _extends({}, initialParams);
	            _context.next = 3;
	            return fetchFunction(params);

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
	            return fetchFunction(params);

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

	  return function fetchAll(_x, _x2) {
	    return ref.apply(this, arguments);
	  };
	}();
	/* harmony export */ Object.defineProperty(exports, "d", {configurable: false, enumerable: true, get: function() { return fetchAll; }});

/***/ },
/* 9 */
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
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_collection__ = __webpack_require__(74);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_collection___default = __WEBPACK_IMPORTED_MODULE_0_lodash_collection__ && __WEBPACK_IMPORTED_MODULE_0_lodash_collection__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0_lodash_collection__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0_lodash_collection__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_0_lodash_collection___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_0_lodash_collection___default });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash_array__ = __webpack_require__(16);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash_array___default = __WEBPACK_IMPORTED_MODULE_1_lodash_array__ && __WEBPACK_IMPORTED_MODULE_1_lodash_array__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_1_lodash_array__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_1_lodash_array__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_1_lodash_array___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_1_lodash_array___default });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models2_thingTypes__ = __webpack_require__(4);
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

	    this.links = {};
	    this.comments = {};
	    this.users = {};
	    this.messages = {};
	    this.subreddits = {};

	    this.typeToTable = (_typeToTable = {}, _defineProperty(_typeToTable, /* harmony import */__WEBPACK_IMPORTED_MODULE_2__models2_thingTypes__["d"], this.comments), _defineProperty(_typeToTable, /* harmony import */__WEBPACK_IMPORTED_MODULE_2__models2_thingTypes__["c"], this.links), _defineProperty(_typeToTable, /* harmony import */__WEBPACK_IMPORTED_MODULE_2__models2_thingTypes__["e"], this.users), _defineProperty(_typeToTable, /* harmony import */__WEBPACK_IMPORTED_MODULE_2__models2_thingTypes__["f"], this.messages), _defineProperty(_typeToTable, /* harmony import */__WEBPACK_IMPORTED_MODULE_2__models2_thingTypes__["g"], this.subreddits), _typeToTable);

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

	      var type = /* harmony import */__WEBPACK_IMPORTED_MODULE_2__models2_thingTypes__["a"][model.kind] || /* harmony import */__WEBPACK_IMPORTED_MODULE_2__models2_thingTypes__["b"].bind()(uuid);
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

	    var tableKeys = [/* harmony import */__WEBPACK_IMPORTED_MODULE_2__models2_thingTypes__["d"], /* harmony import */__WEBPACK_IMPORTED_MODULE_2__models2_thingTypes__["e"], /* harmony import */__WEBPACK_IMPORTED_MODULE_2__models2_thingTypes__["c"], /* harmony import */__WEBPACK_IMPORTED_MODULE_2__models2_thingTypes__["f"], /* harmony import */__WEBPACK_IMPORTED_MODULE_2__models2_thingTypes__["g"]];

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
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__FakeError__ = __webpack_require__(9);
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
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__FakeError__ = __webpack_require__(9);
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
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__RedditModel__ = __webpack_require__(15);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__thingTypes__ = __webpack_require__(4);
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

	Subreddit.type = /* harmony import */__WEBPACK_IMPORTED_MODULE_1__thingTypes__["g"];
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

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__FakeError__ = __webpack_require__(9);
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

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__apiBase_Model__ = __webpack_require__(63);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__thingTypes__ = __webpack_require__(4);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_isThingID__ = __webpack_require__(66);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_markdown__ = __webpack_require__(67);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__lib_unredditifyLink__ = __webpack_require__(68);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__mockgenerators_mockHTML__ = __webpack_require__(72);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__mockgenerators_mockLink__ = __webpack_require__(73);
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
	      return _get(Object.getPrototypeOf(RedditModel.prototype), 'getType', this).call(this, data, uuid) || /* harmony import */__WEBPACK_IMPORTED_MODULE_1__thingTypes__["a"][data.kind] || /* harmony import */__WEBPACK_IMPORTED_MODULE_1__thingTypes__["b"].bind()(uuid) || 'Unknown';
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

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__FakeError__ = __webpack_require__(9);
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
/* 18 */,
/* 19 */,
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Listing__ = __webpack_require__(7);
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
	    value: function fetch(api, user) {
	      var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

	      options.user = user;

	      return _get(Object.getPrototypeOf(SavedPostsAndComments), 'fetch', this).call(this, api, options);
	    }
	  }]);

	  return SavedPostsAndComments;
	}(/* harmony import */__WEBPACK_IMPORTED_MODULE_0__Listing__["a"]);

	SavedPostsAndComments.endpoint = 'saved';
	/* harmony default export */ exports["a"] = SavedPostsAndComments;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base__ = __webpack_require__(0);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models2_thingTypes__ = __webpack_require__(4);
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




	var Account = function (_Base) {
	  _inherits(Account, _Base);

	  function Account() {
	    var _Object$getPrototypeO;

	    var _temp, _this, _ret;

	    _classCallCheck(this, Account);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Account)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this._type = 'Account', _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(Account, [{
	    key: 'validators',
	    value: function validators() {
	      var thingId = this.thingIdValidator.bind(this);

	      return {
	        thingId: thingId
	      };
	    }
	  }, {
	    key: 'uuid',
	    value: function uuid(props) {
	      if (/* harmony import */__WEBPACK_IMPORTED_MODULE_0__base__["a"].validators.thingId(props.id)) {
	        return props.id;
	      }

	      return /* harmony import */__WEBPACK_IMPORTED_MODULE_1__models2_thingTypes__["h"] + '_' + props.id;
	    }
	  }, {
	    key: 'thingIdValidator',
	    value: function thingIdValidator() {
	      var thingId = this.get('thingId');
	      return /* harmony import */__WEBPACK_IMPORTED_MODULE_0__base__["a"].validators.thingId(thingId);
	    }
	  }]);

	  return Account;
	}(/* harmony import */__WEBPACK_IMPORTED_MODULE_0__base__["a"]);

	/* harmony default export */ exports["a"] = Account;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base__ = __webpack_require__(0);
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



	var Message = function (_Base) {
	  _inherits(Message, _Base);

	  function Message(props) {
	    _classCallCheck(this, Message);

	    if (props.replies === '') {
	      props.replies = [];
	    }

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Message).call(this, props));

	    _this._type = 'Message';
	    return _this;
	  }

	  _createClass(Message, [{
	    key: 'validators',
	    value: function validators() {
	      var text = this.textValidator.bind(this);
	      var subject = this.subjectValidator.bind(this);
	      var to = this.toValidator.bind(this);

	      return {
	        text: text,
	        subject: subject,
	        to: to
	      };
	    }
	  }, {
	    key: 'textValidator',
	    value: function textValidator() {
	      return /* harmony import */__WEBPACK_IMPORTED_MODULE_0__base__["a"].validators.minLength(this.get('text'), 1) && /* harmony import */__WEBPACK_IMPORTED_MODULE_0__base__["a"].validators.maxLength(this.get('text'), 10000);
	    }
	  }, {
	    key: 'subjectValidator',
	    value: function subjectValidator() {
	      return /* harmony import */__WEBPACK_IMPORTED_MODULE_0__base__["a"].validators.minLength(this.get('subject'), 1) && /* harmony import */__WEBPACK_IMPORTED_MODULE_0__base__["a"].validators.maxLength(this.get('subject'), 100);
	    }
	  }, {
	    key: 'toValidator',
	    value: function toValidator() {
	      return /* harmony import */__WEBPACK_IMPORTED_MODULE_0__base__["a"].validators.minLength(this.get('to'), 1);
	    }
	  }]);

	  return Message;
	}(/* harmony import */__WEBPACK_IMPORTED_MODULE_0__base__["a"]);

	/* harmony default export */ exports["a"] = Message;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base__ = __webpack_require__(0);
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



	var Report = function (_Base) {
	  _inherits(Report, _Base);

	  function Report() {
	    var _Object$getPrototypeO;

	    var _temp, _this, _ret;

	    _classCallCheck(this, Report);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Report)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this._type = 'Report', _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(Report, [{
	    key: 'validators',
	    value: function validators() {
	      var reason = this.reasonValidator.bind(this);
	      var otherReason = this.otherReasonValidator.bind(this);
	      var thingId = this.thingIdValidator.bind(this);

	      this.validators = {
	        reason: reason,
	        otherReason: otherReason,
	        thingId: thingId
	      };
	    }
	  }, {
	    key: 'reasonValidator',
	    value: function reasonValidator() {
	      if (this.get('other_reason') && !(this.get('reason') === 'other')) {
	        return false;
	      }

	      var reasonValid = /* harmony import */__WEBPACK_IMPORTED_MODULE_0__base__["a"].validators.minLength(this.get('reason'), 1) && /* harmony import */__WEBPACK_IMPORTED_MODULE_0__base__["a"].validators.maxLength(this.get('reason'), 100);

	      var otherReasonValid = !this.get('other_reason') || /* harmony import */__WEBPACK_IMPORTED_MODULE_0__base__["a"].validators.minLength(this.get('other_reason'), 1) && /* harmony import */__WEBPACK_IMPORTED_MODULE_0__base__["a"].validators.maxLength(this.get('other_reason'), 100);

	      return reasonValid && otherReasonValid;
	    }
	  }, {
	    key: 'otherReasonValidator',
	    value: function otherReasonValidator() {
	      if (this.get('reason') !== 'other') {
	        if (this.get('other_reason')) {
	          return false;
	        }
	      } else if (!this.get('reason')) {
	        return false;
	      }

	      return /* harmony import */__WEBPACK_IMPORTED_MODULE_0__base__["a"].validators.maxLength(this.get('thing_id'), 100);
	    }
	  }, {
	    key: 'thingIdValidator',
	    value: function thingIdValidator() {
	      return /* harmony import */__WEBPACK_IMPORTED_MODULE_0__base__["a"].validators.minLength(this.get('thing_id'), 6) && /* harmony import */__WEBPACK_IMPORTED_MODULE_0__base__["a"].validators.maxLength(this.get('thing_id'), 10);
	    }
	  }]);

	  return Report;
	}(/* harmony import */__WEBPACK_IMPORTED_MODULE_0__base__["a"]);

	/* harmony default export */ exports["a"] = Report;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base__ = __webpack_require__(0);
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



	var _subscriptionAllowedActions = {
	  'sub': true,
	  'unsub': true
	};

	var Subscription = function (_Base) {
	  _inherits(Subscription, _Base);

	  function Subscription() {
	    var _Object$getPrototypeO;

	    var _temp, _this, _ret;

	    _classCallCheck(this, Subscription);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Subscription)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this._type = 'Subscription', _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(Subscription, [{
	    key: 'validators',
	    value: function validators() {
	      var action = this.actionValidator.bind(this);
	      var sr = this.srValidator.bind(this);

	      return {
	        action: action,
	        sr: sr
	      };
	    }
	  }, {
	    key: 'actionValidator',
	    value: function actionValidator(val) {
	      return _subscriptionAllowedActions[val];
	    }
	  }, {
	    key: 'srValidator',
	    value: function srValidator(val) {
	      return /* harmony import */__WEBPACK_IMPORTED_MODULE_0__base__["a"].validators.string(val);
	    }
	  }]);

	  return Subscription;
	}(/* harmony import */__WEBPACK_IMPORTED_MODULE_0__base__["a"]);

	/* harmony default export */ exports["a"] = Subscription;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base__ = __webpack_require__(0);
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



	var Vote = function (_Base) {
	  _inherits(Vote, _Base);

	  function Vote() {
	    var _Object$getPrototypeO;

	    var _temp, _this, _ret;

	    _classCallCheck(this, Vote);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Vote)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this._type = 'Vote', _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(Vote, [{
	    key: 'validators',
	    value: function validators() {
	      var direction = this.directionValidator.bind(this);

	      return {
	        direction: direction
	      };
	    }
	  }, {
	    key: 'directionValidator',
	    value: function directionValidator(v) {
	      return [-1, 0, 1].indexOf(v) > -1;
	    }
	  }]);

	  return Vote;
	}(/* harmony import */__WEBPACK_IMPORTED_MODULE_0__base__["a"]);

	/* harmony default export */ exports["a"] = Vote;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base__ = __webpack_require__(0);
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



	var WikiPage = function (_Base) {
	  _inherits(WikiPage, _Base);

	  function WikiPage(props) {
	    _classCallCheck(this, WikiPage);

	    delete props.content_html;

	    if (props.revision_by) {
	      props.revision_by = props.revision_by.data;
	    }

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(WikiPage).call(this, props));

	    _this._type = 'WikiPage';
	    return _this;
	  }

	  return WikiPage;
	}(/* harmony import */__WEBPACK_IMPORTED_MODULE_0__base__["a"]);

	/* harmony default export */ exports["a"] = WikiPage;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base__ = __webpack_require__(0);
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



	var WikiPageListing = function (_Base) {
	  _inherits(WikiPageListing, _Base);

	  function WikiPageListing(props) {
	    _classCallCheck(this, WikiPageListing);

	    props.pages = props.data.slice();
	    delete props.data;
	    delete props.kind;

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(WikiPageListing).call(this, props));

	    _this._type = 'WikiPageListing';
	    return _this;
	  }

	  return WikiPageListing;
	}(/* harmony import */__WEBPACK_IMPORTED_MODULE_0__base__["a"]);

	/* harmony default export */ exports["a"] = WikiPageListing;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base__ = __webpack_require__(0);
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



	var WikiPageSettings = function (_Base) {
	  _inherits(WikiPageSettings, _Base);

	  function WikiPageSettings(props) {
	    _classCallCheck(this, WikiPageSettings);

	    props.pageEditorsList = props.editors.map(function (item) {
	      return item.data;
	    });

	    delete props.editors;

	    props.listedInPagesIndex = props.listed;
	    delete props.listed;

	    props.editingPermissionLevel = WikiPageSettings._permissionLevels[props.permlevel];
	    delete props.permlevel;

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(WikiPageSettings).call(this, props));

	    _this._type = 'WikiPageSettings';
	    return _this;
	  }

	  return WikiPageSettings;
	}(/* harmony import */__WEBPACK_IMPORTED_MODULE_0__base__["a"]);

	WikiPageSettings._permissionLevels = {
	  0: 'use wiki settings',
	  1: 'only approved editors',
	  2: 'only Mods'
	};


	/* harmony default export */ exports["a"] = WikiPageSettings;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base__ = __webpack_require__(0);
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



	var WikiRevision = function (_Base) {
	  _inherits(WikiRevision, _Base);

	  function WikiRevision(props) {
	    _classCallCheck(this, WikiRevision);

	    if (props.author && props.author.data) {
	      props.author = props.author.data;
	    }

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(WikiRevision).call(this, props));

	    _this._type = 'WikiRevision';
	    return _this;
	  }

	  return WikiRevision;
	}(/* harmony import */__WEBPACK_IMPORTED_MODULE_0__base__["a"]);

	/* harmony default export */ exports["a"] = WikiRevision;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Record = function Record(type, uuid) {
	  _classCallCheck(this, Record);

	  this.type = type;
	  this.uuid = uuid;
	};

	/* harmony default export */ exports["a"] = Record;

/***/ },
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__models2_Link__ = __webpack_require__(2);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__apiBase_APIRequestUtils__ = __webpack_require__(77);
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }





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
	  if (method !== 'patch') {
	    query.feature = 'link_preview';
	    query.sr_detail = 'true';
	  }

	  if (method === 'del') {
	    query._method = 'post';
	  }

	  return query;
	};/* unused harmony export formatQuery */

	var parseBody = function parseBody(res, apiResponse, req, method) {
	  console.log('in parse');
	  var body = res.body;


	  if (method === 'get') {
	    var data = body.data;


	    if (data && data.children && data.children[0]) {
	      if (data.children.length === 1) {
	        apiResponse.addResult(/* harmony import */__WEBPACK_IMPORTED_MODULE_0__models2_Link__["a"].fromJSON(data.children[0].data));
	        return;
	      } else {
	        data.children.forEach(function (c) {
	          return apiResponse.addResult(/* harmony import */__WEBPACK_IMPORTED_MODULE_0__models2_Link__["a"].fromJSON(c.data));
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
	    var apiQuery = formatQuery(_extends({}, query));

	    return /* harmony import */__WEBPACK_IMPORTED_MODULE_1__apiBase_APIRequestUtils__["a"].bind()(apiOptions, 'get', path, apiQuery, query, parseBody);
	  }
	};

	var LinksEndpoint = function () {
	  function LinksEndpoint() {
	    _classCallCheck(this, LinksEndpoint);
	  }

	  _createClass(LinksEndpoint, null, [{
	    key: 'postPath',
	    value: function postPath() {
	      return 'api/submit';
	    }
	  }]);

	  return LinksEndpoint;
	}();/* unused harmony export LinksEndpoint */

	LinksEndpoint.post = function (apiOptions, data) {
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

	  return BaseContentEndpoint.post(apiOptions, postData);
	};

/***/ },
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Listing__ = __webpack_require__(7);
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

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
	    key: 'topLevelComments',
	    get: function get() {
	      return this.apiResponse.results.map(this.apiResponse.getModelFromRecord);
	    }
	  }], [{
	    key: 'fetch',
	    value: function fetch(api, id) {
	      return _get(Object.getPrototypeOf(CommentsPage), 'fetch', this).call(this, api, { id: id });
	    }
	  }, {
	    key: 'fetchMoreChildre',
	    value: function fetchMoreChildre(api, comment) {
	      return _get(Object.getPrototypeOf(CommentsPage), 'fetch', this).call(this, api, { ids: comment.children });
	    }
	  }]);

	  return CommentsPage;
	}(/* harmony import */__WEBPACK_IMPORTED_MODULE_0__Listing__["a"]);

	CommentsPage.endpoint = 'comments';
	/* harmony default export */ exports["a"] = CommentsPage;

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__SavedPostsAndComments__ = __webpack_require__(20);
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
	HiddenPostsAndComments.endpoint = 'hidden';

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Listing__ = __webpack_require__(7);
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
	    value: function fetch(api, subredditNameOrOptions) {
	      var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

	      if (typeof subredditNameOrOptions === 'string') {
	        options.subredditName = subredditNameOrOptions;
	      } else {
	        options = subredditNameOrOptions || {};
	      }

	      return _get(Object.getPrototypeOf(PostsFromSubreddit), 'fetch', this).call(this, api, options);
	    }
	  }]);

	  return PostsFromSubreddit;
	}(/* harmony import */__WEBPACK_IMPORTED_MODULE_0__Listing__["a"]);

	PostsFromSubreddit.endpoint = 'links';
	/* harmony default export */ exports["a"] = PostsFromSubreddit;

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Listing__ = __webpack_require__(7);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash_array__ = __webpack_require__(16);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash_array___default = __WEBPACK_IMPORTED_MODULE_1_lodash_array__ && __WEBPACK_IMPORTED_MODULE_1_lodash_array__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_1_lodash_array__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_1_lodash_array__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_1_lodash_array___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_1_lodash_array___default });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__apiBase_APIResponsePaging__ = __webpack_require__(8);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models2_thingTypes__ = __webpack_require__(4);
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

	      return /* harmony import */__WEBPACK_IMPORTED_MODULE_2__apiBase_APIResponsePaging__["a"].bind()(this.apiResponse, function (query, results) {
	        var limit = _this2.expectedNumberOfPosts(query);
	        var posts = results.filter(function (record) {
	          return record.type === /* harmony import */__WEBPACK_IMPORTED_MODULE_3__models2_thingTypes__["c"];
	        });
	        return posts.length >= limit ? /* harmony import */__WEBPACK_IMPORTED_MODULE_1_lodash_array__["last"].bind()(posts).uuid : null;
	      });
	    }
	  }, {
	    key: 'posts',
	    get: function get() {
	      return this.apiResponse.results.filter(function (record) {
	        return record.type === /* harmony import */__WEBPACK_IMPORTED_MODULE_3__models2_thingTypes__["c"];
	      }).map(this.apiResponse.getModelFromRecord);
	    }
	  }, {
	    key: 'subreddits',
	    get: function get() {
	      return this.apiResponse.results.filter(function (record) {
	        return record.type === /* harmony import */__WEBPACK_IMPORTED_MODULE_3__models2_thingTypes__["g"];
	      }).map(this.apiResponse.getModelFromRecord);
	    }
	  }], [{
	    key: 'fetch',
	    value: function fetch(api, query) {
	      var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

	      options.q = query;

	      return _get(Object.getPrototypeOf(SearchQuery), 'fetch', this).call(this, api, options);
	    }
	  }, {
	    key: 'fetchInSubreddit',
	    value: function fetchInSubreddit(api, query, subreddit, options) {
	      options.subreddit = subreddit;
	      return this.fetch(api, query, options);
	    }
	  }]);

	  return SearchQuery;
	}(/* harmony import */__WEBPACK_IMPORTED_MODULE_0__Listing__["a"]);

	SearchQuery.endpoint = 'search';
	/* harmony default export */ exports["a"] = SearchQuery;

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__apiBase_APIResponsePaging__ = __webpack_require__(8);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Listing__ = __webpack_require__(7);
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
	      var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(api) {
	        var all = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];
	        var allMergedSubreddits, firstPage;
	        return regeneratorRuntime.wrap(function _callee$(_context) {
	          while (1) {
	            switch (_context.prev = _context.next) {
	              case 0:
	                if (!all) {
	                  _context.next = 5;
	                  break;
	                }

	                _context.next = 3;
	                return /* harmony import */__WEBPACK_IMPORTED_MODULE_0__apiBase_APIResponsePaging__["d"].bind()(api.subreddits.get, this.baseOptions());

	              case 3:
	                allMergedSubreddits = _context.sent;
	                return _context.abrupt('return', new this(allMergedSubreddits));

	              case 5:
	                _context.next = 7;
	                return this.getResponse(api);

	              case 7:
	                firstPage = _context.sent;
	                return _context.abrupt('return', new this(firstPage));

	              case 9:
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
	SubredditList.endpoint = 'subreddits';
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
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base__ = __webpack_require__(0);
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



	var BlockedUser = function (_Base) {
	  _inherits(BlockedUser, _Base);

	  function BlockedUser() {
	    var _Object$getPrototypeO;

	    var _temp, _this, _ret;

	    _classCallCheck(this, BlockedUser);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(BlockedUser)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this._type = 'BlockedUser', _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(BlockedUser, [{
	    key: 'validators',
	    value: function validators() {
	      var date = /* harmony import */__WEBPACK_IMPORTED_MODULE_0__base__["a"].validators.integer;
	      var id = /* harmony import */__WEBPACK_IMPORTED_MODULE_0__base__["a"].validators.thingId;
	      var name = /* harmony import */__WEBPACK_IMPORTED_MODULE_0__base__["a"].validators.string;

	      return {
	        date: date,
	        id: id,
	        name: name
	      };
	    }
	  }]);

	  return BlockedUser;
	}(/* harmony import */__WEBPACK_IMPORTED_MODULE_0__base__["a"]);

	/* harmony default export */ exports["a"] = BlockedUser;

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base__ = __webpack_require__(0);
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



	var Award = function (_Base) {
	  _inherits(Award, _Base);

	  function Award() {
	    var _Object$getPrototypeO;

	    var _temp, _this, _ret;

	    _classCallCheck(this, Award);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Award)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this._type = 'Award', _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  return Award;
	}(/* harmony import */__WEBPACK_IMPORTED_MODULE_0__base__["a"]);

	/* harmony default export */ exports["a"] = Award;

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base__ = __webpack_require__(0);
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



	var Block = function (_Base) {
	  _inherits(Block, _Base);

	  function Block() {
	    var _Object$getPrototypeO;

	    var _temp, _this, _ret;

	    _classCallCheck(this, Block);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Block)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this._type = 'Block', _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(Block, [{
	    key: 'validators',
	    value: function validators() {
	      return {
	        thingId: /* harmony import */__WEBPACK_IMPORTED_MODULE_0__base__["a"].validators.thingId
	      };
	    }
	  }]);

	  return Block;
	}(/* harmony import */__WEBPACK_IMPORTED_MODULE_0__base__["a"]);

	/* harmony default export */ exports["a"] = Block;

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base__ = __webpack_require__(0);
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



	var Preferences = function (_Base) {
	  _inherits(Preferences, _Base);

	  function Preferences() {
	    var _Object$getPrototypeO;

	    var _temp, _this, _ret;

	    _classCallCheck(this, Preferences);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Preferences)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this._type = 'Preferences', _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  return Preferences;
	}(/* harmony import */__WEBPACK_IMPORTED_MODULE_0__base__["a"]);

	/* harmony default export */ exports["a"] = Preferences;

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base__ = __webpack_require__(0);
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



	var PromoCampaign = function (_Base) {
	  _inherits(PromoCampaign, _Base);

	  function PromoCampaign() {
	    var _Object$getPrototypeO;

	    var _temp, _this, _ret;

	    _classCallCheck(this, PromoCampaign);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(PromoCampaign)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this._type = 'PromoCampaign', _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  return PromoCampaign;
	}(/* harmony import */__WEBPACK_IMPORTED_MODULE_0__base__["a"]);

	/* harmony default export */ exports["a"] = PromoCampaign;

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony default export */ exports["a"] = {
	  request: 'request',
	  response: 'response',
	  error: 'error',
	  result: 'result'
	};

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Record__ = __webpack_require__(30);
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
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__apis_links__ = __webpack_require__(38);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__apiBase_APIResponse__ = __webpack_require__(10);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__apiBase_APIResponsePaging__ = __webpack_require__(8);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__apiBase_errors_NoModelError__ = __webpack_require__(11);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__apiBase_errors_ResponseError__ = __webpack_require__(14);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__apiBase_errors_ValidationError__ = __webpack_require__(12);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__apiBase_errors_NotImplementedError__ = __webpack_require__(17);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__models_account__ = __webpack_require__(21);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__models_award__ = __webpack_require__(58);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__models_base__ = __webpack_require__(0);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__models_block__ = __webpack_require__(59);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__models_BlockedUser__ = __webpack_require__(57);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__models2_Comment__ = __webpack_require__(5);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__models2_Link__ = __webpack_require__(2);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__models_message__ = __webpack_require__(22);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__models_promocampaign__ = __webpack_require__(61);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__models_preferences__ = __webpack_require__(60);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__models2_Subreddit__ = __webpack_require__(13);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__models_subscription__ = __webpack_require__(24);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__models_vote__ = __webpack_require__(25);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__models_report__ = __webpack_require__(23);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__models_wikiPage__ = __webpack_require__(26);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__models_wikiRevision__ = __webpack_require__(29);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__models_wikiPageListing__ = __webpack_require__(27);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__models_wikiPageSettings__ = __webpack_require__(28);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__collections_SubredditLists__ = __webpack_require__(56);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__collections_CommentsPage__ = __webpack_require__(52);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__collections_HiddenPostsAndComments__ = __webpack_require__(53);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__collections_PostsFromSubreddit__ = __webpack_require__(54);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__collections_SavedPostsAndComments__ = __webpack_require__(20);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__collections_SearchQuery__ = __webpack_require__(55);
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	// import activities from './apis/activities';
	// import hidden from './apis/hidden';
	// import saved from './apis/saved';
	// import search from './apis/search';
	// import stylesheets from './apis/stylesheets';
	// import subreddits from './apis/subreddits';
	// import subscriptions from './apis/subscriptions';
	// import trophies from './apis/trophies';
	// import accounts from './apis/accounts';
	// import votes from './apis/votes';

	// import comments from './apis/comments';
	// import captcha from './apis/captcha';
	// import reports from './apis/reports';
	// import messages from './apis/messages';
	// import modListing from './apis/modListing';
	// import subredditRelationships from './apis/subredditRelationships';
	// import rules from './apis/rules';
	// import wiki from './apis/wiki';
	// import multis from './apis/multis';
	// import multiSubscriptions from './apis/multiSubscriptions';




	var APIResponses = {
	  APIResponse: /* harmony import */__WEBPACK_IMPORTED_MODULE_1__apiBase_APIResponse__["APIResponse"],
	  MergedApiReponse: /* harmony import */__WEBPACK_IMPORTED_MODULE_1__apiBase_APIResponse__["b"]
	};
	/* harmony export */ Object.defineProperty(exports, "APIResponses", {configurable: false, enumerable: true, get: function() { return APIResponses; }});

	var APIResponsePaging = {
	  withQueryAndResult: /* harmony import */__WEBPACK_IMPORTED_MODULE_2__apiBase_APIResponsePaging__["a"],
	  afterResponse: /* harmony import */__WEBPACK_IMPORTED_MODULE_2__apiBase_APIResponsePaging__["b"],
	  beforeResponse: /* harmony import */__WEBPACK_IMPORTED_MODULE_2__apiBase_APIResponsePaging__["c"],
	  fetchAll: /* harmony import */__WEBPACK_IMPORTED_MODULE_2__apiBase_APIResponsePaging__["d"]
	};
	/* harmony export */ Object.defineProperty(exports, "APIResponsePaging", {configurable: false, enumerable: true, get: function() { return APIResponsePaging; }});

	var APIs = {
	  // activities,
	  // captcha,
	  // hidden,
	  // saved,
	  // search,
	  // stylesheets,
	  // subreddits,
	  // subscriptions,
	  // trophies,
	  // accounts,
	  // votes,
	  links: /* harmony import */__WEBPACK_IMPORTED_MODULE_0__apis_links__["a"]
	};
	/* harmony export */ Object.defineProperty(exports, "APIs", {configurable: false, enumerable: true, get: function() { return APIs; }});

	// comments,
	// reports,
	// messages,
	// modListing,
	// subredditRelationships,
	// rules,
	// wiki,
	// multis,
	// multiSubscriptions,






	var errors = {
	  NoModelError: /* harmony import */__WEBPACK_IMPORTED_MODULE_3__apiBase_errors_NoModelError__["a"],
	  ValidationError: /* harmony import */__WEBPACK_IMPORTED_MODULE_5__apiBase_errors_ValidationError__["a"],
	  ResponseError: /* harmony import */__WEBPACK_IMPORTED_MODULE_4__apiBase_errors_ResponseError__["a"],
	  DisconnectedError: /* harmony import */__WEBPACK_IMPORTED_MODULE_4__apiBase_errors_ResponseError__["b"],
	  NotImplementedError: /* harmony import */__WEBPACK_IMPORTED_MODULE_6__apiBase_errors_NotImplementedError__["a"]
	};
	/* harmony export */ Object.defineProperty(exports, "errors", {configurable: false, enumerable: true, get: function() { return errors; }});





























	var models = {
	  Account: /* harmony import */__WEBPACK_IMPORTED_MODULE_7__models_account__["a"],
	  Award: /* harmony import */__WEBPACK_IMPORTED_MODULE_8__models_award__["a"],
	  Base: /* harmony import */__WEBPACK_IMPORTED_MODULE_9__models_base__["a"],
	  Block: /* harmony import */__WEBPACK_IMPORTED_MODULE_10__models_block__["a"],
	  BlockedUser: /* harmony import */__WEBPACK_IMPORTED_MODULE_11__models_BlockedUser__["a"],
	  Comment: /* harmony import */__WEBPACK_IMPORTED_MODULE_12__models2_Comment__["a"],
	  Link: /* harmony import */__WEBPACK_IMPORTED_MODULE_13__models2_Link__["a"],
	  Message: /* harmony import */__WEBPACK_IMPORTED_MODULE_14__models_message__["a"],
	  PromoCampaign: /* harmony import */__WEBPACK_IMPORTED_MODULE_15__models_promocampaign__["a"],
	  Preferences: /* harmony import */__WEBPACK_IMPORTED_MODULE_16__models_preferences__["a"],
	  Subreddit: /* harmony import */__WEBPACK_IMPORTED_MODULE_17__models2_Subreddit__["a"],
	  Subscription: /* harmony import */__WEBPACK_IMPORTED_MODULE_18__models_subscription__["a"],
	  Vote: /* harmony import */__WEBPACK_IMPORTED_MODULE_19__models_vote__["a"],
	  Report: /* harmony import */__WEBPACK_IMPORTED_MODULE_20__models_report__["a"],
	  WikiPage: /* harmony import */__WEBPACK_IMPORTED_MODULE_21__models_wikiPage__["a"],
	  WikiRevision: /* harmony import */__WEBPACK_IMPORTED_MODULE_22__models_wikiRevision__["a"],
	  WikiPageListing: /* harmony import */__WEBPACK_IMPORTED_MODULE_23__models_wikiPageListing__["a"],
	  WikiPageSettings: /* harmony import */__WEBPACK_IMPORTED_MODULE_24__models_wikiPageSettings__["a"]
	};
	/* harmony export */ Object.defineProperty(exports, "models", {configurable: false, enumerable: true, get: function() { return models; }});

	var collections = {
	  CommentsPage: /* harmony import */__WEBPACK_IMPORTED_MODULE_26__collections_CommentsPage__["a"],
	  ContributingSubreddits: /* harmony import */__WEBPACK_IMPORTED_MODULE_25__collections_SubredditLists__["a"],
	  HiddenPostsAndComments: /* harmony import */__WEBPACK_IMPORTED_MODULE_27__collections_HiddenPostsAndComments__["default"],
	  ModeratingSubreddits: /* harmony import */__WEBPACK_IMPORTED_MODULE_25__collections_SubredditLists__["b"],
	  PostsFromSubreddit: /* harmony import */__WEBPACK_IMPORTED_MODULE_28__collections_PostsFromSubreddit__["a"],
	  SavedPostsAndComments: /* harmony import */__WEBPACK_IMPORTED_MODULE_29__collections_SavedPostsAndComments__["a"],
	  SearchQuery: /* harmony import */__WEBPACK_IMPORTED_MODULE_30__collections_SearchQuery__["a"],
	  SubscribedSubreddits: /* harmony import */__WEBPACK_IMPORTED_MODULE_25__collections_SubredditLists__["c"]
	};
	/* harmony export */ Object.defineProperty(exports, "collections", {configurable: false, enumerable: true, get: function() { return collections; }});

	var DEFAULT_API_ORIGIN = 'https://www.reddit.com';
	var AUTHED_API_ORIGIN = 'https://oauth.reddit.com';

	var SCOPES = 'history,identity,mysubreddits,read,subscribe,vote,submit,' + 'save,edit,account,creddits,flair,livemanage,modconfig,' + 'modcontributors,modflair,modlog,modothers,modposts,modself,' + 'modwiki,privatemessages,report,wikiedit,wikiread';

	// Webpack 2 has an export bug where a library's export object does not state
	// that it is an es6 module. Without this tag defined on the exports object,
	// Webpack does not import the library correctly.
	var __esModule = true;
	/* harmony export */ Object.defineProperty(exports, "__esModule", {configurable: false, enumerable: true, get: function() { return __esModule; }});

	// shim event emitter. You can pass an instance in to the config
	// but we don't include it be default to keep the payload smaller
	var EventEmitterShim = {
	  emit: function emit() {},
	  on: function on() {},
	  off: function off() {}
	};

	var Snoode = function () {
	  function Snoode() {
	    var config = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	    _classCallCheck(this, Snoode);

	    this.config = _extends({
	      origin: DEFAULT_API_ORIGIN,
	      event: config.eventEmitter || EventEmitterShim,
	      userAgent: 'snoodev2',
	      appName: 'snoodev2',
	      env: 'dev'
	    }, config);

	    this.event = this.config.event;

	    for (var a in APIs) {
	      if (a === 'links') {
	        this[a] = APIs[a];
	      } else {
	        this[a] = new APIs[a](this);
	      }
	    }
	  }

	  _createClass(Snoode, [{
	    key: 'withAuth',
	    value: function withAuth(token) {
	      var changeOrigin = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

	      return new Snoode(_extends({}, this.config, {
	        token: token,
	        origin: changeOrigin ? AUTHED_API_ORIGIN : this.config.origin
	      }));
	    }
	  }, {
	    key: 'withConfig',
	    value: function withConfig(config) {
	      // Merge the new config onto the old and return a new instance
	      return new Snoode(_extends({}, this.config, config));
	    }
	  }]);

	  return Snoode;
	}();

	Snoode.APIs = Object.keys(APIs);
	/* harmony default export */ exports["default"] = Snoode;

/***/ },
/* 65 */,
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony export */ exports["a"] = isThingID;var THING_ID_REGEX = new RegExp('^t\\d_[0-9a-z]+', 'i');

	function isThingID(val) {
	  return THING_ID_REGEX.test(val);
	}

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony export */ exports["a"] = process;function process(text) {
	  if (!text) return text;

	  text = text.replace(/<a/g, '<a target="_blank"');

	  return text;
	}

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony export */ exports["a"] = unredditifyLink;function unredditifyLink(url) {
	  if (!url) {
	    return;
	  }
	  return url.replace(/^https?:\/\/(?:www\.)?reddit.com/, '');
	}

/***/ },
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony export */ exports["a"] = mockHTML;function mockHTML() {
	  // more randomization here at somepoint
	  /* eslint-disable max-len */
	  return '<h1>This is a header or something</h1><sup><sup>TM</sup></sup><a href="https://www.reddit.com/r/reactjs">reactjs subreddit</a>';
	  /* eslint-enable */
	}

/***/ },
/* 73 */
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
/* 74 */
/***/ function(module, exports) {

	module.exports = require("lodash/collection");

/***/ },
/* 75 */,
/* 76 */
/***/ function(module, exports) {

	module.exports = require("superagent");

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_superagent__ = __webpack_require__(76);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_superagent___default = __WEBPACK_IMPORTED_MODULE_0_superagent__ && __WEBPACK_IMPORTED_MODULE_0_superagent__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0_superagent__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0_superagent__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_0_superagent___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_0_superagent___default });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__errors_ValidationError__ = __webpack_require__(12);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__errors_NoModelError__ = __webpack_require__(11);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__errors_NotImplementedError__ = __webpack_require__(17);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__APIResponse__ = __webpack_require__(10);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Events__ = __webpack_require__(62);
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };










	var EventEmitterShim = {
	  emit: function emit() {},
	  on: function on() {},
	  off: function off() {}
	};

	var DefaultOptions = {
	  origin: 'https://www.reddit.com',
	  appName: 'node-api-client-v3',
	  env: 'develop',
	  token: '',
	  timeout: 5000,
	  eventEmiiter: EventEmitterShim
	};

	var makeOptions = function makeOptions() {
	  var overrides = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	  return _extends({}, DefaultOptions, overrides);
	};/* unused harmony export makeOptions */

	var getEmitter = function getEmitter(apiOptions) {
	  return apiOptions.eventEmiiter || EventEmitterShim;
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

	  var fakeReq = {
	    origin: origin,
	    path: path,
	    method: method,
	    query: _extends({}, data)
	  };

	  console.log('raw send ' + origin + ' ' + path + ' ' + data);

	  getEmitter(apiOptions).emit(/* harmony import */__WEBPACK_IMPORTED_MODULE_5__Events__["a"].request, fakeReq);

	  var s = /* harmony import */__WEBPACK_IMPORTED_MODULE_0_superagent___default.a[method](requestPath(apiOptions, path));
	  s.set(requestHeaders(apiOptions));

	  data.app = appParameter(apiOptions);

	  if (kind === 'form') {
	    console.log('is form');
	    s.type('form');
	    s.send(data);
	  } else {
	    console.log('is query');
	    s.query(data);

	    if (s.redirects) {
	      s.redirects(0);
	    }
	  }

	  s.end(function (err, res) {
	    // handle super agent inconsistencies
	    console.log('request returned');
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
	};/* unused harmony export validateData */

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

	  getEmitter(apiOptions).emit(/* harmony import */__WEBPACK_IMPORTED_MODULE_5__Events__["a"].error, err, req);
	  var errorHandler = apiOptions.defaultErrorHandler || reject;
	  errorHandler(err || 500);
	  return true;
	};

	var handle = function handle(apiOptions, resolve, reject, err, res, req, query, method, parseBody, parseMeta) {

	  req = normalizeRequest(res, req);

	  if (handleRequestIfFailed(apiOptions, err, res, req, reject)) {
	    return;
	  }

	  getEmitter(apiOptions).emit(/* harmony import */__WEBPACK_IMPORTED_MODULE_5__Events__["a"].response, req, res);

	  var apiResponse = tryParseResponse(reject, res, req, method, query, parseBody, parseMeta);

	  getEmitter(apiOptions).emit(/* harmony import */__WEBPACK_IMPORTED_MODULE_5__Events__["a"].result, apiResponse);
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
	  var apiResponse = new /* harmony import */__WEBPACK_IMPORTED_MODULE_4__APIResponse__["a"](meta, query);
	  var start = Date.now();
	  parseBody(res, apiResponse, req, method);
	  var end = Date.now();
	  console.log('response time took ' + (end - start));
	  return apiResponse;
	};

/***/ }
/******/ ])
});
;