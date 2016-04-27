(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("lodash/object"), require("superagent"), require("lodash/lang"));
	else if(typeof define === 'function' && define.amd)
		define(["lodash/object", "superagent", "lodash/lang"], factory);
	else if(typeof exports === 'object')
		exports["apiClient.js"] = factory(require("lodash/object"), require("superagent"), require("lodash/lang"));
	else
		root["apiClient.js"] = factory(root["lodash/object"], root["superagent"], root["lodash/lang"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_24__, __WEBPACK_EXTERNAL_MODULE_66__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 55);
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
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_superagent__ = __webpack_require__(24);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_superagent___default = __WEBPACK_IMPORTED_MODULE_0_superagent__ && __WEBPACK_IMPORTED_MODULE_0_superagent__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0_superagent__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0_superagent__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_0_superagent___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_0_superagent___default });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__thingTypes__ = __webpack_require__(6);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__errors_validationError__ = __webpack_require__(8);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__errors_noModelError__ = __webpack_require__(7);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__errors_notImplementedError__ = __webpack_require__(14);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__APIResponse__ = __webpack_require__(54);
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }








	var EVENTS = {
	  request: 'request',
	  response: 'response',
	  error: 'error'
	};

	var BaseAPI = function () {
	  function BaseAPI(base) {
	    var _this = this;

	    _classCallCheck(this, BaseAPI);

	    this.runQuery = function (method, rawQuery) {
	      var originalMethod = method;
	      var query = _this.formatQuery(_extends({}, rawQuery), method);
	      query.app = _this.appParameter;

	      var handle = _this.handle;
	      var path = _this.fullPath(method, _extends({}, rawQuery));

	      var fakeReq = { url: path, method: method, query: query };
	      _this.event.emit(EVENTS.request, fakeReq);

	      method = query._method || method;
	      delete query._method;

	      return new Promise(function (resolve, reject) {
	        var s = /* harmony import */__WEBPACK_IMPORTED_MODULE_0_superagent___default.a[method](path).timeout(_this.config.timeout || 5000);

	        if (s.redirects) {
	          s.redirects(0);
	        }

	        s.query(query);

	        s.set(_this.buildAuthHeader());
	        s.set(_this.buildHeaders());

	        if (query.id && !Array.isArray(query.id)) {
	          delete query.id;
	        }

	        s.end(function (err, res) {
	          if (err && err.timeout) {
	            err.status = 504;
	          }

	          var origin = _this.origin;
	          var path = _this.path(method, rawQuery);

	          var fakeReq = { origin: origin, path: path, method: method, query: query };
	          var req = res ? res.request : fakeReq;

	          handle(resolve, reject)(err, res, req, originalMethod);
	        });
	      });
	    };

	    this.handle = function (resolve, reject) {
	      return function (err, res, req, method) {
	        // lol handle the twelve ways superagent sends request back
	        if (res && !req) {
	          req = res.request || res.req;
	        }

	        if (err || res && !res.ok) {
	          //this.event.emit(EVENTS.error, err, req);

	          if (_this.config.defaultErrorHandler) {
	            return _this.config.defaultErrorHandler(err || 500);
	          } else {
	            return reject(err || 500);
	          }
	        }

	        _this.event.emit(EVENTS.response, req, res);

	        var meta = void 0;
	        var body = void 0;
	        var apiResponse = void 0;

	        try {
	          meta = _this.formatMeta(res, req, method);
	          apiResponse = new /* harmony import */__WEBPACK_IMPORTED_MODULE_5__APIResponse__["a"](meta);
	          _this.parseBody(res, apiResponse, req, method);

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

	        resolve(body || apiResponse);
	      };
	    };

	    this.config = base.config;
	    this.event = base.event;

	    if (base.config) {
	      this.origin = base.config.origin;

	      if (base.config.origins) {
	        var name = this.constructor.name.toLowerCase();

	        this.origin = base.config.origins[name] || this.config.origin;
	      }
	    }
	  }

	  // Used to format/unformat for caching; `links` or `comments`, for example.
	  // Should match the constructor name.


	  _createClass(BaseAPI, [{
	    key: 'path',
	    value: function path(method) {
	      var query = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	      var basePath = this.api;

	      if (['string', 'number'].contains(_typeof(query.id))) {
	        basePath += '/' + query.id;
	      }

	      return basePath;
	    }
	  }, {
	    key: 'fullPath',
	    value: function fullPath(method) {
	      var query = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	      return this.origin + '/' + this.path(method, query);
	    }
	  }, {
	    key: 'formatMeta',
	    value: function formatMeta(res) {
	      return res.headers;
	    }
	  }, {
	    key: 'buildQueryParams',
	    value: function buildQueryParams(method, data) {
	      return [data, method, data];
	    }
	  }, {
	    key: 'buildAuthHeader',
	    value: function buildAuthHeader() {
	      var token = this.config.token;

	      if (token) {
	        return { Authorization: 'Bearer ' + token };
	      }

	      return {};
	    }
	  }, {
	    key: 'buildHeaders',
	    value: function buildHeaders() {
	      return this.config.defaultHeaders || {};
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
	    value: function rawSend(method, path, data, cb) {
	      var origin = this.origin;

	      var s = /* harmony import */__WEBPACK_IMPORTED_MODULE_0_superagent___default.a[method](origin + '/' + path);
	      s.type('form');

	      if (this.config.token) {
	        s.set('Authorization', 'bearer ' + this.config.token);
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
	  }, {
	    key: 'save',
	    value: function save(method) {
	      var _this2 = this;

	      var data = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	      return new Promise(function (resolve, reject) {
	        if (!data) {
	          return reject(new /* harmony import */__WEBPACK_IMPORTED_MODULE_3__errors_noModelError__["a"](_this2.api));
	        }

	        data = _this2.formatQuery(data, method);
	        data.app = _this2.appParameter;

	        if (_this2.model) {
	          var model = new _this2.model(data);

	          var keys = void 0;

	          // Only validate keys being sent in, if this is a patch
	          if (method === 'patch') {
	            keys = Object.keys(data);
	          }

	          var valid = model.validate(keys);

	          if (valid !== true) {
	            return reject(new /* harmony import */__WEBPACK_IMPORTED_MODULE_2__errors_validationError__["a"](_this2.api, model));
	          }

	          if (method !== 'patch') {
	            data = model.toJSON();
	          }
	        }

	        var path = _this2.path(method, data);
	        var _method = method;

	        method = data._method || method;

	        data = _this2.formatData(data, _method);

	        _this2.rawSend(method, path, data, function (err, res, req) {
	          _this2.handle(resolve, reject)(err, res, req, method);
	        });
	      });
	    }
	  }, {
	    key: 'head',
	    value: function head() {
	      var query = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	      return this.runQuery('head', query);
	    }
	  }, {
	    key: 'get',
	    value: function get(query) {
	      query = _extends({
	        raw_json: 1
	      }, query || {});

	      return this.runQuery('get', query);
	    }
	  }, {
	    key: 'del',
	    value: function del() {
	      var query = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	      return this.runQuery('del', query);
	    }
	  }, {
	    key: 'post',
	    value: function post(data) {
	      return this.save('post', data);
	    }
	  }, {
	    key: 'put',
	    value: function put(data) {
	      return this.save('put', data);
	    }
	  }, {
	    key: 'patch',
	    value: function patch(data) {
	      return this.save('patch', data);
	    }

	    // Get the source, then save it, modified by data.

	  }, {
	    key: 'copy',
	    value: function copy(fromId, data) {
	      var _this3 = this;

	      return new Promise(function (resolve, reject) {
	        _this3.get(fromId).then(function (oldData) {
	          _this3.save('copy', _extends({}, oldData, {
	            _method: data.id ? 'put' : 'post'
	          }, data)).then(resolve, reject);
	        });
	      });
	    }

	    // Get the old one, save the new one, then delete the old one if save succeeded

	  }, {
	    key: 'move',
	    value: function move(fromId, toId, data) {
	      var _this4 = this;

	      return new Promise(function (resolve, reject) {
	        _this4.get(fromId).then(function (oldData) {
	          _this4.save('move', _extends({
	            _method: 'put'
	          }, oldData, {
	            id: toId
	          }, data)).then(function (data) {
	            _this4.del({ id: fromId }).then(function () {
	              resolve(data);
	            }, reject);
	          }, reject);
	        });
	      });
	    }
	  }, {
	    key: 'notImplemented',
	    value: function notImplemented(method) {
	      return function () {
	        throw new /* harmony import */__WEBPACK_IMPORTED_MODULE_4__errors_notImplementedError__["a"](method, this.api);
	      };
	    }
	  }, {
	    key: 'buildResponse',
	    value: function buildResponse(body, meta) {
	      var results = body.results;
	      var errors = body.errors;
	      var users = body.users;
	      var links = body.links;
	      var comments = body.comments;
	      var messages = body.messages;
	      var subreddits = body.subreddits;

	      if (errors) {
	        return { errors: errors, meta: meta };
	      }

	      var response = { results: results, meta: meta };
	      if (users) {
	        response.users = users;
	      }
	      if (links) {
	        response.links = links;
	      }
	      if (comments) {
	        response.comments = comments;
	      }
	      if (messages) {
	        response.messages = messages;
	      }
	      if (subreddits) {
	        response.subreddits = subreddits;
	      }
	      return response;
	    }
	  }, {
	    key: 'dataType',
	    get: function get() {
	      return this.constructor.name.toLowerCase();
	    }
	  }, {
	    key: 'api',
	    get: function get() {
	      return this.constructor.name.toLowerCase();
	    }
	  }, {
	    key: 'appParameter',
	    get: function get() {
	      return this.config.appName + '-' + this.config.env;
	    }
	  }], [{
	    key: 'thingType',
	    value: function thingType(id) {
	      return /* harmony import */__WEBPACK_IMPORTED_MODULE_1__thingTypes__["g"].bind()(id);
	    }
	  }]);

	  return BaseAPI;
	}();

	BaseAPI.EVENTS = EVENTS;


	/* harmony default export */ exports["a"] = BaseAPI;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base__ = __webpack_require__(0);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_markdown__ = __webpack_require__(25);
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




	var Comment = function (_Base) {
	  _inherits(Comment, _Base);

	  function Comment() {
	    var _Object$getPrototypeO;

	    var _temp, _this, _ret;

	    _classCallCheck(this, Comment);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Comment)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this._type = 'Comment', _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(Comment, [{
	    key: 'validators',
	    value: function validators() {
	      var body = this.bodyValidator.bind(this);
	      var thingId = this.thingIdValidator.bind(this);

	      return {
	        body: body,
	        thingId: thingId
	      };
	    }
	  }, {
	    key: 'bodyValidator',
	    value: function bodyValidator() {
	      return /* harmony import */__WEBPACK_IMPORTED_MODULE_0__base__["a"].validators.minLength(this.get('body'), 1);
	    }
	  }, {
	    key: 'thingIdValidator',
	    value: function thingIdValidator() {
	      var thingId = this.get('thingId');
	      return /* harmony import */__WEBPACK_IMPORTED_MODULE_0__base__["a"].validators.thingId(thingId);
	    }
	  }, {
	    key: 'toJSON',
	    value: function toJSON() {
	      var props = this.props;
	      props.uuid = this.uuid(props);
	      props._type = this._type;
	      props.bodyHtml = this.bodyHtml;
	      props._type = this._type;
	      return props;
	    }
	  }, {
	    key: 'bodyHtml',
	    get: function get() {
	      return /* harmony import */__WEBPACK_IMPORTED_MODULE_1__lib_markdown__["a"].bind()(this.get('body'));
	    }
	  }]);

	  return Comment;
	}(/* harmony import */__WEBPACK_IMPORTED_MODULE_0__base__["a"]);

	/* harmony default export */ exports["a"] = Comment;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("lodash/object");

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base__ = __webpack_require__(0);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_markdown__ = __webpack_require__(25);
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




	var Link = function (_Base) {
	  _inherits(Link, _Base);

	  function Link(props) {
	    _classCallCheck(this, Link);

	    delete props.selftext_html;

	    if (props.promoted && !props.preview) {
	      var resolutions = [];

	      if (props.mobile_ad_url) {
	        resolutions.push({
	          url: props.mobile_ad_url,
	          height: 628,
	          width: 1200
	        });
	        delete props.mobile_ad_url;
	      }

	      if (props.thumbnail) {
	        resolutions.push({
	          url: props.thumbnail,
	          height: 140,
	          width: 140
	        });
	        delete props.thumbnail;
	      }

	      props.preview = {
	        images: [{
	          resolutions: resolutions
	        }]
	      };
	    }

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Link).call(this, props));

	    _this._type = 'Link';
	    return _this;
	  }

	  _createClass(Link, [{
	    key: 'validators',
	    value: function validators() {
	      var title = this.titleValidator.bind(this);
	      var sendReplies = this.sendRepliesValidator.bind(this);
	      var thingId = this.thingIdValidator.bind(this);

	      return {
	        title: title,
	        sendReplies: sendReplies,
	        thingId: thingId
	      };
	    }
	  }, {
	    key: 'titleValidator',
	    value: function titleValidator() {
	      return /* harmony import */__WEBPACK_IMPORTED_MODULE_0__base__["a"].validators.maxLength(this.get('title'), 300);
	    }
	  }, {
	    key: 'sendRepliesValidator',
	    value: function sendRepliesValidator() {
	      return typeof this.get('sendreplies') === 'boolean';
	    }
	  }, {
	    key: 'thingIdValidator',
	    value: function thingIdValidator() {
	      var thingId = this.get('thingId');
	      return /* harmony import */__WEBPACK_IMPORTED_MODULE_0__base__["a"].validators.thingId(thingId);
	    }
	  }, {
	    key: 'unredditify',
	    value: function unredditify(url) {
	      if (!url) {
	        return;
	      }
	      return url.replace(/^https?:\/\/(?:www\.)?reddit.com/, '');
	    }
	  }, {
	    key: 'toJSON',
	    value: function toJSON() {
	      var props = this.props;
	      props._type = this._type;
	      props.uuid = this.uuid(props);

	      props.thumbnail = this.thumbnail;
	      props.expandable = this.expandable;
	      props.expandContent = this.expandContent;

	      props.cleanPermalink = this.unredditify(props.permalink);
	      props.cleanUrl = this.unredditify(props.url);

	      props._type = this._type;

	      return props;
	    }
	  }, {
	    key: 'expandContent',
	    get: function get() {
	      if (!this.expandable) {
	        return;
	      }

	      var props = this.props;
	      var content = void 0;

	      content = props.secure_media_embed && props.secure_media_embed.content || props.media_embed && props.media_embed.content;

	      if (!content && props.selftext) {
	        content = /* harmony import */__WEBPACK_IMPORTED_MODULE_1__lib_markdown__["a"].bind()(props.selftext);
	      }

	      return content;
	    }
	  }, {
	    key: 'expandable',
	    get: function get() {
	      var props = this.props;

	      // If it has secure_media, or media, or selftext, it has expandable.
	      return !!(props.secure_media && props.secure_media.content || props.media_embed && props.media_embed.content || props.selftext);
	    }
	  }, {
	    key: 'thumbnail',
	    get: function get() {
	      var props = this.props;

	      if (props.thumbnail && (props.thumbnail === 'default' || props.thumbnail === 'self' || props.thumbnail === 'nsfw')) {
	        return;
	      }

	      return props.thumbnail;
	    }
	  }]);

	  return Link;
	}(/* harmony import */__WEBPACK_IMPORTED_MODULE_0__base__["a"]);

	/* harmony default export */ exports["a"] = Link;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_object__ = __webpack_require__(3);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_object___default = __WEBPACK_IMPORTED_MODULE_0_lodash_object__ && __WEBPACK_IMPORTED_MODULE_0_lodash_object__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0_lodash_object__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0_lodash_object__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_0_lodash_object___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_0_lodash_object___default });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__base_es6_js__ = __webpack_require__(1);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__errors_noModelError__ = __webpack_require__(7);
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

	var BaseContent = function (_BaseAPI) {
	  _inherits(BaseContent, _BaseAPI);

	  function BaseContent() {
	    var _Object$getPrototypeO;

	    var _temp, _this, _ret;

	    _classCallCheck(this, BaseContent);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(BaseContent)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.move = _this.notImplemented('move'), _this.copy = _this.notImplemented('copy'), _this.put = _this.notImplemented('put'), _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(BaseContent, [{
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
	  }, {
	    key: 'patch',
	    value: function patch(data) {
	      var _this2 = this;

	      if (!data) {
	        throw new /* harmony import */__WEBPACK_IMPORTED_MODULE_2__errors_noModelError__["a"]('/api/editusertext');
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

	        promises.push(this.save('patch', json));
	      }

	      return Promise.all(promises);
	    }
	  }]);

	  return BaseContent;
	}(/* harmony import */__WEBPACK_IMPORTED_MODULE_1__base_es6_js__["a"]);

	/* harmony default export */ exports["a"] = BaseContent;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony export */ exports["g"] = thingType;var COMMENT = 'comment';
	/* harmony export */ Object.defineProperty(exports, "a", {configurable: false, enumerable: true, get: function() { return COMMENT; }});
	var COMMENT_TYPE = 't1';/* unused harmony export COMMENT_TYPE */

	var USER = 'user';
	/* harmony export */ Object.defineProperty(exports, "c", {configurable: false, enumerable: true, get: function() { return USER; }});
	var USER_TYPE = 't2';
	/* harmony export */ Object.defineProperty(exports, "i", {configurable: false, enumerable: true, get: function() { return USER_TYPE; }});

	var LINK = 'link';
	/* harmony export */ Object.defineProperty(exports, "b", {configurable: false, enumerable: true, get: function() { return LINK; }});
	var LINK_TYPE = 't3';
	/* harmony export */ Object.defineProperty(exports, "h", {configurable: false, enumerable: true, get: function() { return LINK_TYPE; }});

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

	var type_pairs = [[COMMENT, COMMENT_TYPE], [USER, USER_TYPE], [LINK, LINK_TYPE], [MESSAGE, MESSAGE_TYPE], [SUBREDDIT, SUBREDDIT_TYPE], [TROPHIE, TROPHIE_TYPE], [PROMOCAMPAIGN, PROMOCAMPAIGN_TYPE]];

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
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__error__ = __webpack_require__(11);
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
	}(/* harmony import */__WEBPACK_IMPORTED_MODULE_0__error__["a"]);

	/* harmony default export */ exports["a"] = NoModelError;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__error__ = __webpack_require__(11);
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
	}(/* harmony import */__WEBPACK_IMPORTED_MODULE_0__error__["a"]);

	/* harmony default export */ exports["a"] = ValidationError;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base__ = __webpack_require__(0);
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



	var EDIT_FIELDS = ['default_set', 'subreddit_id', 'domain', 'show_media', 'wiki_edit_age', 'submit_text', 'spam_links', 'title', 'collapse_deleted_comments', 'wikimode', 'over_18', 'related_subreddits', 'suggested_comment_sort', 'description', 'submit_link_label', 'spam_comments', 'spam_selfposts', 'submit_text_label', 'key_color', 'language', 'wiki_edit_karma', 'hide_ads', 'header_hover_text', 'public_traffic', 'public_description', 'comment_score_hide_mins', 'subreddit_type', 'exclude_banned_modqueue', 'content_options'].sort();

	var Subreddit = function (_Base) {
	  _inherits(Subreddit, _Base);

	  function Subreddit(props) {
	    _classCallCheck(this, Subreddit);

	    delete props.submit_text_html;
	    delete props.description_html;
	    delete props.public_description_html;

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Subreddit).call(this, props));

	    _this._type = 'Subreddit';
	    return _this;
	  }

	  return Subreddit;
	}(/* harmony import */__WEBPACK_IMPORTED_MODULE_0__base__["a"]);

	Subreddit.fields = EDIT_FIELDS;


	/* harmony default export */ exports["a"] = Subreddit;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__error__ = __webpack_require__(11);
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
	}(/* harmony import */__WEBPACK_IMPORTED_MODULE_0__error__["a"]);
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
	}(/* harmony import */__WEBPACK_IMPORTED_MODULE_0__error__["a"]);

	/* harmony default export */ exports["a"] = ResponseError;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ErrorClass = function ErrorClass(message) {
	  _classCallCheck(this, ErrorClass);

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

	/* harmony default export */ exports["a"] = ErrorClass;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_es6_js__ = __webpack_require__(1);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_multi_es6_js__ = __webpack_require__(26);
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




	var ID_REGEX = /^user\/[^\/]+\/m\/[^\/]+$/;

	var Multis = function (_BaseAPI) {
	  _inherits(Multis, _BaseAPI);

	  function Multis() {
	    var _Object$getPrototypeO;

	    var _temp, _this, _ret;

	    _classCallCheck(this, Multis);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Multis)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.model = /* harmony import */__WEBPACK_IMPORTED_MODULE_1__models_multi_es6_js__["a"], _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(Multis, [{
	    key: 'path',
	    value: function path(method) {
	      var query = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	      var id = Multis.buildId(query);

	      switch (method) {
	        case 'get':
	          if (query.username) {
	            if (query.username === 'me') {
	              return 'api/multi/mine';
	            } else if (id) {
	              return 'api/multi/' + id;
	            }

	            return 'api/multi/user/' + query.username;
	          }

	          return 'api/multi';
	        case 'put':
	        case 'patch':
	        case 'post':
	        case 'del':
	          return 'api/multi/' + id;
	        case 'copy':
	          return 'api/multi/copy';
	        case 'move':
	          return 'api/multi/rename';
	      }
	    }
	  }, {
	    key: 'formatQuery',
	    value: function formatQuery(query, method) {
	      if (method === 'get') {
	        if (query.user) {
	          query.username = query.user;
	          delete query.user;
	        }
	      }

	      return query;
	    }
	  }, {
	    key: 'formatBody',
	    value: function formatBody(res) {
	      var body = res.body;


	      if (body && Array.isArray(body)) {
	        return body.map(function (m) {
	          var multi = m.data;

	          multi.subreddits = Multis.mapSubreddits(multi.subreddits);
	          return new /* harmony import */__WEBPACK_IMPORTED_MODULE_1__models_multi_es6_js__["a"](multi).toJSON();
	        });
	      } else if (body) {
	        var multi = body.data;
	        multi.subreddits = Multis.mapSubreddits(multi.subreddits);
	        return new /* harmony import */__WEBPACK_IMPORTED_MODULE_1__models_multi_es6_js__["a"](multi);
	      }
	    }
	  }, {
	    key: 'formatData',
	    value: function formatData(data) {
	      return Multis.formatData(data);
	    }
	  }, {
	    key: 'copy',
	    value: function copy(fromId, data) {
	      if (!ID_REGEX.exec(fromId)) {
	        throw new Error('ID did not match `user/{username}/m/{multiname}` format.');
	      }

	      data = {
	        from: fromId,
	        to: data.id,
	        _method: 'post'
	      };

	      if (data && data.displayName) {
	        data.display_name = data.displayName;
	      }

	      return this.save('copy', data);
	    }
	  }, {
	    key: 'move',
	    value: function move(fromId, toId, data) {
	      if (!ID_REGEX.exec(fromId) || !ID_REGEX.exec(toId)) {
	        throw new Error('ID did not match `user/{username}/m/{multiname}` format.');
	      }

	      var moveData = {
	        _method: 'post',
	        from: fromId,
	        to: toId
	      };

	      if (data && data.displayName) {
	        moveData.display_name = data.displayName;
	      }

	      return this.save('move', moveData);
	    }
	  }, {
	    key: 'formatBody',
	    value: function formatBody(res) {
	      var body = res.body;

	      if (body) {
	        return new /* harmony import */__WEBPACK_IMPORTED_MODULE_1__models_multi_es6_js__["a"](body.data || body).toJSON();
	      }
	    }
	  }, {
	    key: 'requestCacheRules',
	    get: function get() {
	      return undefined;
	    }
	  }], [{
	    key: 'mapSubreddits',
	    value: function mapSubreddits(subs) {
	      return subs.map(function (s) {
	        return s.name;
	      });
	    }
	  }, {
	    key: 'formatData',
	    value: function formatData() {
	      var data = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	      var method = arguments[1];

	      if (method === 'post' || method === 'put') {
	        return {
	          model: JSON.stringify({
	            description_md: data.description,
	            display_name: data.displayName,
	            icon_name: data.iconName,
	            key_color: data.keyColor,
	            visibility: data.visibility,
	            weighting_scheme: data.weightingScheme,
	            subreddits: data.subreddits ? data.subreddits.map(function (s) {
	              return { name: s };
	            }) : undefined
	          }),
	          name: data.name
	        };
	      }
	      return data;
	    }
	  }, {
	    key: 'buildId',
	    value: function buildId(_ref) {
	      var username = _ref.username;
	      var name = _ref.name;
	      var id = _ref.id;

	      if (username && name) {
	        return 'user/' + username + '/m/' + name;
	      }

	      if (id) {
	        return id;
	      }
	    }
	  }]);

	  return Multis;
	}(/* harmony import */__WEBPACK_IMPORTED_MODULE_0__base_es6_js__["a"]);

	Multis.dataCacheConfig = undefined;


	/* harmony default export */ exports["a"] = Multis;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_es6_js__ = __webpack_require__(1);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_save_es6_js__ = __webpack_require__(27);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash_object__ = __webpack_require__(3);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash_object___default = __WEBPACK_IMPORTED_MODULE_2_lodash_object__ && __WEBPACK_IMPORTED_MODULE_2_lodash_object__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_2_lodash_object__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_2_lodash_object__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_2_lodash_object___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_2_lodash_object___default });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_comment_es6_js__ = __webpack_require__(2);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_link_es6_js__ = __webpack_require__(4);
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }









	var CONSTRUCTORS = {
	  t1: /* harmony import */__WEBPACK_IMPORTED_MODULE_3__models_comment_es6_js__["a"],
	  t3: /* harmony import */__WEBPACK_IMPORTED_MODULE_4__models_link_es6_js__["a"]
	};

	var Saved = function (_BaseAPI) {
	  _inherits(Saved, _BaseAPI);

	  function Saved() {
	    var _Object$getPrototypeO;

	    var _temp, _this, _ret;

	    _classCallCheck(this, Saved);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Saved)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.model = /* harmony import */__WEBPACK_IMPORTED_MODULE_1__models_save_es6_js__["a"], _this.move = _this.notImplemented('move'), _this.copy = _this.notImplemented('copy'), _this.put = _this.notImplemented('put'), _this.patch = _this.notImplemented('patch'), _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(Saved, [{
	    key: 'path',
	    value: function path(method) {
	      var query = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	      switch (method) {
	        case 'get':
	          return 'user/' + query.user + '/saved.json';
	        case 'post':
	          return 'api/save';
	        case 'del':
	          return 'api/unsave';
	      }
	    }
	  }, {
	    key: 'formatQuery',
	    value: function formatQuery(query) {
	      delete query.user;
	      return query;
	    }
	  }, {
	    key: 'post',
	    value: function post(data) {
	      var postData = {
	        id: data.id,
	        category: data.category
	      };

	      return _get(Object.getPrototypeOf(Saved.prototype), 'post', this).call(this, postData);
	    }
	  }, {
	    key: 'del',
	    value: function del(data) {
	      var postData = {
	        id: data.id,
	        category: data.category,
	        _method: 'post'
	      };

	      return _get(Object.getPrototypeOf(Saved.prototype), 'del', this).call(this, postData);
	    }
	  }, {
	    key: 'parseBody',
	    value: function parseBody(res, apiResponse) {
	      var body = res.body;

	      if (!/* harmony import */__WEBPACK_IMPORTED_MODULE_2_lodash_object__["has"].bind()(body, 'data.children')) {
	        return [];
	      }

	      var things = body.data.children;

	      things.forEach(function (t) {
	        var constructor = CONSTRUCTORS[t.kind];
	        apiResponse.addResult(new constructor(t.data).toJSON());
	      });
	    }
	  }]);

	  return Saved;
	}(/* harmony import */__WEBPACK_IMPORTED_MODULE_0__base_es6_js__["a"]);

	/* harmony default export */ exports["a"] = Saved;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

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
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base__ = __webpack_require__(0);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__apis_thingTypes__ = __webpack_require__(6);
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

	      return /* harmony import */__WEBPACK_IMPORTED_MODULE_1__apis_thingTypes__["i"] + '_' + props.id;
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
/* 16 */
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
/* 17 */
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
/* 18 */
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
/* 19 */
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
/* 20 */
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
/* 21 */
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
/* 22 */
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
/* 23 */
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
/* 24 */
/***/ function(module, exports) {

	module.exports = require("superagent");

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony export */ exports["a"] = process;function process(text) {
	  if (!text) return text;

	  text = text.replace(/<a/g, '<a target="_blank"');

	  return text;
	}

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base__ = __webpack_require__(0);
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



	var Multi = function (_Base) {
	  _inherits(Multi, _Base);

	  function Multi() {
	    var _Object$getPrototypeO;

	    var _temp, _this, _ret;

	    _classCallCheck(this, Multi);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Multi)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this._type = 'Multi', _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  return Multi;
	}(/* harmony import */__WEBPACK_IMPORTED_MODULE_0__base__["a"]);

	/* harmony default export */ exports["a"] = Multi;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base__ = __webpack_require__(0);
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



	var Save = function (_Base) {
	  _inherits(Save, _Base);

	  function Save() {
	    var _Object$getPrototypeO;

	    var _temp, _this, _ret;

	    _classCallCheck(this, Save);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Save)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this._type = 'Save', _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(Save, [{
	    key: 'validators',
	    value: function validators() {
	      var id = /* harmony import */__WEBPACK_IMPORTED_MODULE_0__base__["a"].validators.id;
	      var category = this.categoryValidator;

	      return {
	        id: id,
	        category: category
	      };
	    }
	  }, {
	    key: 'categoryValidator',
	    value: function categoryValidator(category) {
	      if (!category) {
	        return true;
	      }

	      return /* harmony import */__WEBPACK_IMPORTED_MODULE_0__base__["a"].validators.string(category);
	    }
	  }]);

	  return Save;
	}(/* harmony import */__WEBPACK_IMPORTED_MODULE_0__base__["a"]);

	/* harmony default export */ exports["a"] = Save;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_es6_js__ = __webpack_require__(1);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_account_es6_js__ = __webpack_require__(15);
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




	var Accounts = function (_BaseAPI) {
	  _inherits(Accounts, _BaseAPI);

	  function Accounts() {
	    var _Object$getPrototypeO;

	    var _temp, _this, _ret;

	    _classCallCheck(this, Accounts);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Accounts)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.move = _this.notImplemented('move'), _this.copy = _this.notImplemented('copy'), _this.put = _this.notImplemented('put'), _this.patch = _this.notImplemented('patch'), _this.post = _this.notImplemented('post'), _this.del = _this.notImplemented('del'), _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(Accounts, [{
	    key: 'path',
	    value: function path(method) {
	      var query = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	      if (query.user === 'me') {
	        return 'api/v1/me';
	      } else {
	        return 'user/' + query.user + '/about.json';
	      }
	    }
	  }, {
	    key: 'parseBody',
	    value: function parseBody(res, apiResponse) {
	      var body = res.body;


	      if (body) {
	        apiResponse.addResult(new /* harmony import */__WEBPACK_IMPORTED_MODULE_1__models_account_es6_js__["a"](body.data || body).toJSON());
	      }
	    }
	  }]);

	  return Accounts;
	}(/* harmony import */__WEBPACK_IMPORTED_MODULE_0__base_es6_js__["a"]);

	/* harmony default export */ exports["a"] = Accounts;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_es6_js__ = __webpack_require__(1);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_comment_es6_js__ = __webpack_require__(2);
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






	var CONSTRUCTORS = {
	  t1: /* harmony import */__WEBPACK_IMPORTED_MODULE_1__models_comment_es6_js__["a"],
	  t3: /* harmony import */__WEBPACK_IMPORTED_MODULE_1__models_comment_es6_js__["a"]
	};

	var Activities = function (_BaseAPI) {
	  _inherits(Activities, _BaseAPI);

	  function Activities() {
	    var _Object$getPrototypeO;

	    var _temp, _this, _ret;

	    _classCallCheck(this, Activities);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Activities)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.move = _this.notImplemented('move'), _this.copy = _this.notImplemented('copy'), _this.put = _this.notImplemented('put'), _this.patch = _this.notImplemented('patch'), _this.post = _this.notImplemented('post'), _this.del = _this.notImplemented('del'), _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(Activities, [{
	    key: 'formatQuery',
	    value: function formatQuery(query) {
	      query.feature = 'link_preview';
	      query.sr_detail = 'true';

	      return query;
	    }
	  }, {
	    key: 'path',
	    value: function path(method) {
	      var query = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	      return 'user/' + query.user + '/' + query.activity + '.json';
	    }
	  }, {
	    key: 'parseBody',
	    value: function parseBody(res, apiResponse) {
	      var body = res.body;


	      if (body) {
	        var activities = body.data.children;

	        activities.forEach(function (a) {
	          var constructor = CONSTRUCTORS[a.kind];
	          apiResponse.addResult(new constructor(a.data).toJSON());
	        });
	      }
	    }
	  }, {
	    key: 'requestCacheRules',
	    get: function get() {
	      return null;
	    }
	  }]);

	  return Activities;
	}(/* harmony import */__WEBPACK_IMPORTED_MODULE_0__base_es6_js__["a"]);

	Activities.dataCacheConfig = null;


	/* harmony default export */ exports["a"] = Activities;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_es6_js__ = __webpack_require__(1);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash_object__ = __webpack_require__(3);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash_object___default = __WEBPACK_IMPORTED_MODULE_1_lodash_object__ && __WEBPACK_IMPORTED_MODULE_1_lodash_object__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_1_lodash_object__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_1_lodash_object__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_1_lodash_object___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_1_lodash_object___default });
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




	var Captcha = function (_BaseAPI) {
	  _inherits(Captcha, _BaseAPI);

	  function Captcha() {
	    var _Object$getPrototypeO;

	    var _temp, _this, _ret;

	    _classCallCheck(this, Captcha);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Captcha)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.move = _this.notImplemented('move'), _this.copy = _this.notImplemented('copy'), _this.put = _this.notImplemented('put'), _this.patch = _this.notImplemented('patch'), _this.del = _this.notImplemented('del'), _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(Captcha, [{
	    key: 'path',
	    value: function path(method) {
	      return 'api/' + (method === 'post' ? 'new_captcha' : 'needs_captcha');
	    }
	  }, {
	    key: 'formatBody',
	    value: function formatBody(res) {
	      var body = res.body;


	      if (/* harmony import */__WEBPACK_IMPORTED_MODULE_1_lodash_object__["has"].bind()(body, 'json.errors.0')) {
	        return body.json.errors;
	      } else if (/* harmony import */__WEBPACK_IMPORTED_MODULE_1_lodash_object__["has"].bind()(body, 'json.data.iden')) {
	        return body.json.data;
	      }

	      return body;
	    }
	  }, {
	    key: 'requestCacheRules',
	    get: function get() {
	      return null;
	    }
	  }]);

	  return Captcha;
	}(/* harmony import */__WEBPACK_IMPORTED_MODULE_0__base_es6_js__["a"]);

	Captcha.dataCacheConfig = null;


	/* harmony default export */ exports["a"] = Captcha;

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_object__ = __webpack_require__(3);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_object___default = __WEBPACK_IMPORTED_MODULE_0_lodash_object__ && __WEBPACK_IMPORTED_MODULE_0_lodash_object__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0_lodash_object__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0_lodash_object__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_0_lodash_object___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_0_lodash_object___default });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__baseContent__ = __webpack_require__(5);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_comment__ = __webpack_require__(2);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_link__ = __webpack_require__(4);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__lib_commentTreeUtils__ = __webpack_require__(56);
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }









	var Comments = function (_BaseAPI) {
	  _inherits(Comments, _BaseAPI);

	  function Comments() {
	    var _Object$getPrototypeO;

	    var _temp, _this, _ret;

	    _classCallCheck(this, Comments);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Comments)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.model = /* harmony import */__WEBPACK_IMPORTED_MODULE_2__models_comment__["a"], _this.move = _this.notImplemented('move'), _this.copy = _this.notImplemented('copy'), _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(Comments, [{
	    key: 'formatQuery',
	    value: function formatQuery(query, method) {
	      query = _get(Object.getPrototypeOf(Comments.prototype), 'formatQuery', this).call(this, query, method);

	      if (query.ids) {
	        query.children = query.ids.join(',');
	        query.api_type = 'json';
	        query.link_id = query.linkId;

	        delete query.ids;
	        delete query.linkId;
	      }

	      return query;
	    }
	  }, {
	    key: 'getPath',
	    value: function getPath(query) {
	      if (query.user) {
	        return 'user/' + query.user + '/comments.json';
	      } else if (query.ids) {
	        return 'api/morechildren.json';
	      } else {
	        return 'comments/' + query.linkId + '.json';
	      }
	    }
	  }, {
	    key: 'postPath',
	    value: function postPath() {
	      return 'api/comment';
	    }
	  }, {
	    key: 'post',
	    value: function post(data) {
	      var postData = {
	        api_type: 'json',
	        thing_id: data.thingId,
	        text: data.text
	      };

	      return _get(Object.getPrototypeOf(Comments.prototype), 'post', this).call(this, postData);
	    }
	  }, {
	    key: 'parseBody',
	    value: function parseBody(res, apiResponse, req, originalMethod) {
	      var query = req.query;
	      var body = res.body;

	      var comments = [];

	      if (originalMethod === 'get') {
	        if (Array.isArray(body)) {
	          // The first part of the response is a link
	          var linkData = body[0].data;

	          if (linkData && linkData.children && linkData.children.length) {
	            linkData.children.forEach(function (link) {
	              apiResponse.addModel(new /* harmony import */__WEBPACK_IMPORTED_MODULE_3__models_link__["a"](link.data).toJSON());
	            });
	          }

	          comments = /* harmony import */__WEBPACK_IMPORTED_MODULE_4__lib_commentTreeUtils__["a"].bind()(/* harmony import */__WEBPACK_IMPORTED_MODULE_4__lib_commentTreeUtils__["b"].bind()(body[1].data.children));
	        } else if (body.json && body.json.data) {
	          if (query.children) {
	            // treeify 'load more comments' replies
	            comments = /* harmony import */__WEBPACK_IMPORTED_MODULE_4__lib_commentTreeUtils__["a"].bind()(/* harmony import */__WEBPACK_IMPORTED_MODULE_4__lib_commentTreeUtils__["b"].bind()(body.json.data.things));
	          } else {
	            comments = /* harmony import */__WEBPACK_IMPORTED_MODULE_4__lib_commentTreeUtils__["b"].bind()(body.json.data.things);
	          }
	        }

	        /* harmony import */__WEBPACK_IMPORTED_MODULE_4__lib_commentTreeUtils__["c"].bind()(comments, function (comment, isTopLevel) {
	          if (isTopLevel) {
	            apiResponse.addResult(comment);
	          } else {
	            apiResponse.addModel(comment);
	          }

	          // this sets replies to be records for consistency
	          return apiResponse.makeRecord(comment);
	        });
	      } else {
	        if (/* harmony import */__WEBPACK_IMPORTED_MODULE_0_lodash_object__["has"].bind()(body, 'json.data.things.0.data')) {
	          var comment = body.json.data.things[0].data;
	          apiResponse.addResult(new /* harmony import */__WEBPACK_IMPORTED_MODULE_2__models_comment__["a"](comment).toJSON());
	        }
	      }
	    }
	  }]);

	  return Comments;
	}(/* harmony import */__WEBPACK_IMPORTED_MODULE_1__baseContent__["a"]);

	/* harmony default export */ exports["a"] = Comments;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__saved_es6_js__ = __webpack_require__(13);
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



	var Hidden = function (_Saved) {
	  _inherits(Hidden, _Saved);

	  function Hidden() {
	    _classCallCheck(this, Hidden);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Hidden).apply(this, arguments));
	  }

	  _createClass(Hidden, [{
	    key: 'path',
	    value: function path(method) {
	      var query = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	      switch (method) {
	        case 'get':
	          return 'user/' + query.user + '/hidden.json';
	        case 'post':
	          return 'api/hide';
	        case 'del':
	          return 'api/unhide';
	      }
	    }
	  }]);

	  return Hidden;
	}(/* harmony import */__WEBPACK_IMPORTED_MODULE_0__saved_es6_js__["a"]);

	/* harmony default export */ exports["a"] = Hidden;

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__baseContent_es6_js__ = __webpack_require__(5);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_link_es6_js__ = __webpack_require__(4);
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




	var Links = function (_BaseAPI) {
	  _inherits(Links, _BaseAPI);

	  function Links() {
	    var _Object$getPrototypeO;

	    var _temp, _this, _ret;

	    _classCallCheck(this, Links);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Links)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.model = /* harmony import */__WEBPACK_IMPORTED_MODULE_1__models_link_es6_js__["a"], _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(Links, [{
	    key: 'getPath',
	    value: function getPath(query) {
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
	    }
	  }, {
	    key: 'postPath',
	    value: function postPath() {
	      return 'api/submit';
	    }
	  }, {
	    key: 'post',
	    value: function post(data) {
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

	      return _get(Object.getPrototypeOf(Links.prototype), 'post', this).call(this, postData);
	    }
	  }, {
	    key: 'parseBody',
	    value: function parseBody(res, apiResponse, req, method) {
	      var body = res.body;


	      if (method === 'get') {
	        var data = body.data;


	        if (data && data.children && data.children[0]) {
	          if (data.children.length === 1) {
	            apiResponse.addResult(new /* harmony import */__WEBPACK_IMPORTED_MODULE_1__models_link_es6_js__["a"](data.children[0].data).toJSON());
	            return;
	          } else {
	            data.children.forEach(function (c) {
	              return apiResponse.addResult(new /* harmony import */__WEBPACK_IMPORTED_MODULE_1__models_link_es6_js__["a"](c.data).toJSON());
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
	    }
	  }]);

	  return Links;
	}(/* harmony import */__WEBPACK_IMPORTED_MODULE_0__baseContent_es6_js__["a"]);

	/* harmony default export */ exports["a"] = Links;

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_object__ = __webpack_require__(3);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_object___default = __WEBPACK_IMPORTED_MODULE_0_lodash_object__ && __WEBPACK_IMPORTED_MODULE_0_lodash_object__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0_lodash_object__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0_lodash_object__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_0_lodash_object___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_0_lodash_object___default });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__base_es6_js__ = __webpack_require__(1);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_comment_es6_js__ = __webpack_require__(2);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_message_es6_js__ = __webpack_require__(16);
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }







	var CONSTRUCTORS = {
	  t1: /* harmony import */__WEBPACK_IMPORTED_MODULE_2__models_comment_es6_js__["a"],
	  t3: /* harmony import */__WEBPACK_IMPORTED_MODULE_2__models_comment_es6_js__["a"],
	  t4: /* harmony import */__WEBPACK_IMPORTED_MODULE_3__models_message_es6_js__["a"]
	};

	var Messages = function (_BaseAPI) {
	  _inherits(Messages, _BaseAPI);

	  function Messages() {
	    var _Object$getPrototypeO;

	    var _temp, _this, _ret;

	    _classCallCheck(this, Messages);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Messages)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.move = _this.notImplemented('move'), _this.copy = _this.notImplemented('copy'), _this.put = _this.notImplemented('put'), _this.patch = _this.notImplemented('patch'), _this.del = _this.notImplemented('del'), _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(Messages, [{
	    key: 'formatQuery',
	    value: function formatQuery(query) {
	      return _extends({}, /* harmony import */__WEBPACK_IMPORTED_MODULE_0_lodash_object__["omit"].bind()(query, 'thingId'), {
	        api_type: 'json',
	        mark: true,
	        thing_id: query.thingId
	      });
	    }
	  }, {
	    key: 'path',
	    value: function path(method) {
	      var query = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	      var subreddit = query.subreddit;
	      var view = query.view;
	      var thingId = query.thingId;

	      if (method === 'get') {
	        var sub = subreddit ? 'r/' + subreddit + '/' : '';
	        return sub + 'message/' + (view || 'inbox');
	      }
	      if (!thingId) {
	        return 'api/compose';
	      }
	      return 'api/comment';
	    }
	  }, {
	    key: 'parseBody',
	    value: function parseBody(res, apiResponse, req, method) {
	      var body = res.body;


	      if (method === 'get') {
	        if (!body) {
	          return;
	        }

	        body.data.children.forEach(function (datum) {
	          var thing = new CONSTRUCTORS[datum.kind](datum.data).toJSON();

	          if (datum.kind === 't4' && thing.replies && thing.replies.data && thing.replies.data.children) {

	            thing.replies = thing.replies.data.children.map(function (messageDatum) {
	              var message = new /* harmony import */__WEBPACK_IMPORTED_MODULE_3__models_message_es6_js__["a"](messageDatum.data).toJSON();
	              apiResponse.addModel(message);
	              return apiResponse.makeRecord(message);
	            });
	          }

	          apiResponse.addResult(thing);
	        });
	      } else if (method === 'post') {
	        if (body && body.json) {
	          var message = body.json.things[0].data;
	          apiResponse.addResult(new /* harmony import */__WEBPACK_IMPORTED_MODULE_3__models_message_es6_js__["a"](message).toJSON());
	        } else if (body && body.json.errors.length) {
	          throw body.json.errors;
	        } else {
	          apiResponse.addResult(res);
	        }
	      }
	    }
	  }]);

	  return Messages;
	}(/* harmony import */__WEBPACK_IMPORTED_MODULE_1__base_es6_js__["a"]);

	/* harmony default export */ exports["a"] = Messages;

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__baseContent_es6_js__ = __webpack_require__(5);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash_object__ = __webpack_require__(3);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash_object___default = __WEBPACK_IMPORTED_MODULE_1_lodash_object__ && __WEBPACK_IMPORTED_MODULE_1_lodash_object__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_1_lodash_object__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_1_lodash_object__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_1_lodash_object___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_1_lodash_object___default });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_link_es6_js__ = __webpack_require__(4);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_comment_es6_js__ = __webpack_require__(2);
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }







	var ModListing = function (_BaseAPI) {
	  _inherits(ModListing, _BaseAPI);

	  function ModListing() {
	    var _Object$getPrototypeO;

	    var _temp, _this, _ret;

	    _classCallCheck(this, ModListing);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(ModListing)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.move = _this.notImplemented('move'), _this.copy = _this.notImplemented('copy'), _this.put = _this.notImplemented('put'), _this.patch = _this.notImplemented('patch'), _this.del = _this.notImplemented('del'), _this.post = _this.notImplemented('post'), _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(ModListing, [{
	    key: 'path',
	    value: function path(method) {
	      var query = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	      var subreddit = query.subreddit;
	      var modPath = query.modPath;

	      return 'r/' + subreddit + '/about/' + modPath + '.json';
	    }
	  }, {
	    key: 'formatQuery',
	    value: function formatQuery(options) {
	      options.sr_detail = 'true';

	      return options;
	    }
	  }, {
	    key: 'parseBody',
	    value: function parseBody(res, apiResponse) {
	      var body = res.body;


	      if (/* harmony import */__WEBPACK_IMPORTED_MODULE_1_lodash_object__["has"].bind()(body, 'data.children.0')) {
	        body.data.children.forEach(function (c) {
	          if (c.kind == 't3') {
	            apiResponse.addResult(new /* harmony import */__WEBPACK_IMPORTED_MODULE_2__models_link_es6_js__["a"](c.data).toJSON());
	          } else if (c.kind === 't1') {
	            apiResponse.addResult(new /* harmony import */__WEBPACK_IMPORTED_MODULE_3__models_comment_es6_js__["a"](c.data).toJSON());
	          }
	        });
	      }
	    }
	  }, {
	    key: 'requestCacheRules',
	    get: function get() {
	      return undefined;
	    }
	  }]);

	  return ModListing;
	}(/* harmony import */__WEBPACK_IMPORTED_MODULE_0__baseContent_es6_js__["a"]);

	ModListing.dataCacheConfig = undefined;


	/* harmony default export */ exports["a"] = ModListing;

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_es6_js__ = __webpack_require__(1);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_multi_es6_js__ = __webpack_require__(26);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__multis__ = __webpack_require__(12);
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






	var MultiSubscriptions = function (_BaseAPI) {
	  _inherits(MultiSubscriptions, _BaseAPI);

	  function MultiSubscriptions() {
	    var _Object$getPrototypeO;

	    var _temp, _this, _ret;

	    _classCallCheck(this, MultiSubscriptions);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(MultiSubscriptions)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.model = /* harmony import */__WEBPACK_IMPORTED_MODULE_1__models_multi_es6_js__["a"], _this.move = _this.notImplemented('move'), _this.copy = _this.notImplemented('copy'), _this.get = _this.notImplemented('get'), _this.post = _this.notImplemented('post'), _this.patch = _this.notImplemented('patch'), _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(MultiSubscriptions, [{
	    key: 'path',
	    value: function path(method, query) {
	      var id = /* harmony import */__WEBPACK_IMPORTED_MODULE_2__multis__["a"].buildId(query);
	      return 'api/multi/' + id + '/r/' + query.subreddit;
	    }
	  }, {
	    key: 'formatData',
	    value: function formatData(data, method) {
	      if (method === 'put') {
	        return {
	          model: JSON.stringify({ name: data.subreddit })
	        };
	      }
	    }
	  }, {
	    key: 'requestCacheRules',
	    get: function get() {
	      return undefined;
	    }
	  }]);

	  return MultiSubscriptions;
	}(/* harmony import */__WEBPACK_IMPORTED_MODULE_0__base_es6_js__["a"]);

	MultiSubscriptions.dataCacheConfig = undefined;


	/* harmony default export */ exports["a"] = MultiSubscriptions;

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_es6_js__ = __webpack_require__(1);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_report_es6_js__ = __webpack_require__(17);
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




	var Reports = function (_BaseAPI) {
	  _inherits(Reports, _BaseAPI);

	  function Reports() {
	    var _Object$getPrototypeO;

	    var _temp, _this, _ret;

	    _classCallCheck(this, Reports);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Reports)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.model = /* harmony import */__WEBPACK_IMPORTED_MODULE_1__models_report_es6_js__["a"], _this.move = _this.notImplemented('move'), _this.copy = _this.notImplemented('copy'), _this.get = _this.notImplemented('get'), _this.put = _this.notImplemented('put'), _this.patch = _this.notImplemented('patch'), _this.del = _this.notImplemented('del'), _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(Reports, [{
	    key: 'path',
	    value: function path() {
	      return 'api/report';
	    }
	  }, {
	    key: 'post',
	    value: function post(data) {
	      return _get(Object.getPrototypeOf(Reports.prototype), 'post', this).call(this, _extends({}, data, {
	        reason: 'other',
	        api_type: 'json'
	      }));
	    }
	  }]);

	  return Reports;
	}(/* harmony import */__WEBPACK_IMPORTED_MODULE_0__base_es6_js__["a"]);

	/* harmony default export */ exports["a"] = Reports;

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__baseContent_es6_js__ = __webpack_require__(5);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_rule_es6_js__ = __webpack_require__(57);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash_object__ = __webpack_require__(3);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash_object___default = __WEBPACK_IMPORTED_MODULE_2_lodash_object__ && __WEBPACK_IMPORTED_MODULE_2_lodash_object__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_2_lodash_object__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_2_lodash_object__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_2_lodash_object___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_2_lodash_object___default });
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





	var SUBREDDIT_REGEX = /.*\/r\/(.+)\/about\/rules\.json.*/;
	var ADD_RULE_PATH = 'api/add_subreddit_rule';
	var REMOVE_RULE_PATH = 'api/remove_subreddit_rule';
	var UPDATE_RULE_PATH = 'api/update_subreddit_rule';

	var Rules = function (_BaseAPI) {
	  _inherits(Rules, _BaseAPI);

	  function Rules() {
	    var _Object$getPrototypeO;

	    var _temp, _this, _ret;

	    _classCallCheck(this, Rules);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Rules)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.model = /* harmony import */__WEBPACK_IMPORTED_MODULE_1__models_rule_es6_js__["a"], _this.move = _this.notImplemented('move'), _this.copy = _this.notImplemented('copy'), _this.put = _this.notImplemented('put'), _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(Rules, [{
	    key: 'formatQuery',
	    value: function formatQuery(query, method) {
	      if (method !== 'get') {
	        query._method = 'post';
	      }
	      query.raw_json = 1;
	      query.api_type = 'json';

	      return query;
	    }
	  }, {
	    key: 'path',
	    value: function path(method) {
	      var query = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	      if (method === 'get') {
	        return 'r/' + query.subredditName + '/about/rules.json';
	      } else if (method === 'post') {
	        return ADD_RULE_PATH;
	      } else if (method === 'patch') {
	        return UPDATE_RULE_PATH;
	      } else if (method === 'del') {
	        return REMOVE_RULE_PATH;
	      }
	    }
	  }, {
	    key: 'post',
	    value: function post(data) {
	      var postData = {
	        api_type: 'json',
	        short_name: data.short_name,
	        description: data.description,
	        kind: data.kind || 'all',
	        r: data.subredditName || data.r
	      };

	      return _get(Object.getPrototypeOf(Rules.prototype), 'post', this).call(this, postData);
	    }
	  }, {
	    key: 'patch',
	    value: function patch(id) {
	      var changes = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	      var patchData = {
	        r: id.r || id.subredditName,
	        short_name: id.short_name
	      };

	      if (changes.short_name) {
	        patchData.old_short_name = patchData.short_name;
	      }

	      return _get(Object.getPrototypeOf(Rules.prototype), 'patch', this).call(this, _extends({}, patchData, changes));
	    }
	  }, {
	    key: 'del',
	    value: function del(data) {
	      return _get(Object.getPrototypeOf(Rules.prototype), 'del', this).call(this, {
	        api_type: 'json',
	        r: data.subredditName || data.r,
	        short_name: data.short_name
	      });
	    }
	  }, {
	    key: 'formatBody',
	    value: function formatBody(res, req) {
	      var body = res.body;


	      if (req.method === 'GET') {
	        return this.formatGetBody(body, res, req);
	      } else if (req.url.indexOf(ADD_RULE_PATH) > -1) {
	        return this.formatAddRuleBody(body, res, req);
	      } else if (req.url.indexOf(UPDATE_RULE_PATH) > -1) {
	        return this.formatUpdateRuleBody(body, res, req);
	      } else if (req.url.indexOf(REMOVE_RULE_PATH) > -1) {
	        return this.formatRemoveRuleBody(body);
	      }
	    }
	  }, {
	    key: 'formatGetBody',
	    value: function formatGetBody(body, res, req) {
	      var r = void 0;
	      var match = req.url.match(SUBREDDIT_REGEX);
	      if (match && match.length > 1) {
	        r = match[1];
	      }

	      var subredditRules = [];
	      if (/* harmony import */__WEBPACK_IMPORTED_MODULE_2_lodash_object__["has"].bind()(body, 'rules') && Array.isArray(body.rules)) {

	        subredditRules = body.rules.map(function (ruleData) {
	          return new /* harmony import */__WEBPACK_IMPORTED_MODULE_1__models_rule_es6_js__["a"](_extends({}, ruleData, { r: r })).toJSON();
	        });
	      }

	      var siteRules = [];
	      if (/* harmony import */__WEBPACK_IMPORTED_MODULE_2_lodash_object__["has"].bind()(body, 'site_rules') && Array.isArray(body.site_rules)) {
	        siteRules = body.site_rules;
	      }

	      return {
	        subredditRules: subredditRules,
	        siteRules: siteRules
	      };
	    }
	  }, {
	    key: 'formatAddRuleBody',
	    value: function formatAddRuleBody(body, res, req) {
	      if (/* harmony import */__WEBPACK_IMPORTED_MODULE_2_lodash_object__["has"].bind()(body, 'json.errors') && body.json.errors.length) {
	        throw body.json.errors;
	      }

	      // Have to pull the object back from the request..
	      if (body.json) {
	        var ruleData = this.getRuleData(req._data);
	        if (/* harmony import */__WEBPACK_IMPORTED_MODULE_2_lodash_object__["has"].bind()(body, 'json.data.description_html')) {
	          ruleData.description_html = body.json.data.description_html;
	        }

	        return new /* harmony import */__WEBPACK_IMPORTED_MODULE_1__models_rule_es6_js__["a"](ruleData).toJSON();
	      }
	    }
	  }, {
	    key: 'formatUpdateRuleBody',
	    value: function formatUpdateRuleBody(body, res, req) {
	      return { body: body, res: res, req: req };
	    }
	  }, {
	    key: 'formatRemoveRuleBody',
	    value: function formatRemoveRuleBody(body) {
	      if (/* harmony import */__WEBPACK_IMPORTED_MODULE_2_lodash_object__["has"].bind()(body, 'json.errors') && body.json.errors.length) {
	        throw body.json.errors;
	      }
	    }
	  }, {
	    key: 'getRuleData',
	    value: function getRuleData(requestData) {
	      return {
	        kind: requestData.kind || 'all',
	        description: requestData.description || '',
	        description_html: '',
	        short_name: requestData.short_name,
	        r: requestData.r
	      };
	    }
	  }, {
	    key: 'requestCacheRules',
	    get: function get() {
	      return null;
	    }
	  }]);

	  return Rules;
	}(/* harmony import */__WEBPACK_IMPORTED_MODULE_0__baseContent_es6_js__["a"]);

	Rules.dataCacheConfig = null;
	/* harmony default export */ exports["a"] = Rules;

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base__ = __webpack_require__(1);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_save__ = __webpack_require__(27);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_link__ = __webpack_require__(4);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_subreddit__ = __webpack_require__(9);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__apis_thingTypes__ = __webpack_require__(6);
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }








	var Search = function (_BaseAPI) {
	  _inherits(Search, _BaseAPI);

	  function Search() {
	    var _Object$getPrototypeO;

	    var _temp, _this, _ret;

	    _classCallCheck(this, Search);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Search)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.model = /* harmony import */__WEBPACK_IMPORTED_MODULE_1__models_save__["a"], _this.move = _this.notImplemented('move'), _this.copy = _this.notImplemented('copy'), _this.put = _this.notImplemented('put'), _this.patch = _this.notImplemented('patch'), _this.post = _this.notImplemented('post'), _this.del = _this.notImplemented('del'), _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(Search, [{
	    key: 'path',
	    value: function path(method) {
	      var query = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	      var path = '';

	      if (query.subreddit) {
	        path = 'r/' + query.subreddit;
	      }

	      return path + '/search.json';
	    }
	  }, {
	    key: 'formatQuery',
	    value: function formatQuery(query) {
	      if (query.subreddit) {
	        query.restrict_sr = 'on';
	        delete query.subreddit;
	      }

	      return query;
	    }
	  }, {
	    key: 'listsFromResponse',
	    value: function listsFromResponse(res) {
	      var body = res.body;

	      if (!body) {
	        return [];
	      }

	      // If only one type is returned body will be an object;
	      return Array.isArray(body) ? body : [body];
	    }
	  }, {
	    key: 'parseBody',
	    value: function parseBody(res, apiResponse) {
	      var lists = this.listsFromResponse(res);

	      lists.forEach(function (listing) {
	        if (listing.data.children.length) {
	          if (listing.data.children[0].kind === /* harmony import */__WEBPACK_IMPORTED_MODULE_4__apis_thingTypes__["h"]) {
	            listing.data.children.forEach(function (link) {
	              apiResponse.addResult(new /* harmony import */__WEBPACK_IMPORTED_MODULE_2__models_link__["a"](link.data).toJSON());
	            });

	            apiResponse.meta.after = listing.data.after;
	            apiResponse.meta.before = listing.data.before;
	          } else {
	            listing.data.children.forEach(function (subreddit) {
	              apiResponse.addResult(new /* harmony import */__WEBPACK_IMPORTED_MODULE_3__models_subreddit__["a"](subreddit.data).toJSON());
	            });
	          }
	        }
	      });
	    }
	  }]);

	  return Search;
	}(/* harmony import */__WEBPACK_IMPORTED_MODULE_0__base__["a"]);

	/* harmony default export */ exports["a"] = Search;

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_es6_js__ = __webpack_require__(1);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_stylesheet__ = __webpack_require__(58);
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




	var Stylesheets = function (_BaseAPI) {
	  _inherits(Stylesheets, _BaseAPI);

	  function Stylesheets() {
	    var _Object$getPrototypeO;

	    var _temp, _this, _ret;

	    _classCallCheck(this, Stylesheets);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Stylesheets)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.move = _this.notImplemented('move'), _this.copy = _this.notImplemented('copy'), _this.put = _this.notImplemented('put'), _this.patch = _this.notImplemented('patch'), _this.post = _this.notImplemented('post'), _this.del = _this.notImplemented('del'), _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(Stylesheets, [{
	    key: 'path',
	    value: function path(method) {
	      var query = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	      if (query.subredditName) {
	        return 'r/' + query.subredditName + '/about/stylesheet.json';
	      }

	      return 'api/subreddit_stylesheet.json';
	    }
	  }, {
	    key: 'formatBody',
	    value: function formatBody(res) {
	      var body = res.body;
	      var data = body.data;


	      if (data && data.images && data.stylesheet) {
	        return new /* harmony import */__WEBPACK_IMPORTED_MODULE_1__models_stylesheet__["a"](data).toJSON();
	      } else {
	        return {};
	      }
	    }
	  }, {
	    key: 'requestCacheRules',
	    get: function get() {
	      return null;
	    }
	  }]);

	  return Stylesheets;
	}(/* harmony import */__WEBPACK_IMPORTED_MODULE_0__base_es6_js__["a"]);

	Stylesheets.dataCacheConfig = null;


	/* harmony default export */ exports["a"] = Stylesheets;

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__baseContent_es6_js__ = __webpack_require__(5);
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



	var MODACTIONS = {
	  contributor: 'friend',
	  leaveContrib: 'leavecontributor',
	  moderator_invite: 'friend',
	  leaveMod: 'leavemoderator',
	  acceptModInvite: 'accept_moderator_invite',
	  banned: 'friend',
	  muted: 'friend',
	  wikibanned: 'friend',
	  wikicontributor: 'friend'
	};

	var SubredditRelationships = function (_BaseAPI) {
	  _inherits(SubredditRelationships, _BaseAPI);

	  function SubredditRelationships() {
	    var _Object$getPrototypeO;

	    var _temp, _this, _ret;

	    _classCallCheck(this, SubredditRelationships);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(SubredditRelationships)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.move = _this.notImplemented('move'), _this.copy = _this.notImplemented('copy'), _this.put = _this.notImplemented('put'), _this.patch = _this.notImplemented('patch'), _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(SubredditRelationships, [{
	    key: 'path',
	    value: function path(method) {
	      var query = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	      var subreddit = query.subreddit;
	      var type = query.type;
	      var filter = query.filter;

	      if (method === 'get') {
	        return path = 'r/' + subreddit + '/about/' + filter;
	      }

	      var sub = subreddit ? 'r/' + subreddit + '/' : '';
	      var path = MODACTIONS[type];

	      if (method === 'del' && path === 'friend') {
	        path = 'unfriend';
	      }

	      return sub + 'api/' + path;
	    }
	  }, {
	    key: 'get',
	    value: function get(data) {
	      data.count = 25;
	      return _get(Object.getPrototypeOf(SubredditRelationships.prototype), 'get', this).call(this, data);
	    }
	  }, {
	    key: 'post',
	    value: function post(data) {
	      data.api_type = 'json';
	      return _get(Object.getPrototypeOf(SubredditRelationships.prototype), 'post', this).call(this, data);
	    }
	  }, {
	    key: 'del',
	    value: function del(data) {
	      data._method = 'post';
	      return _get(Object.getPrototypeOf(SubredditRelationships.prototype), 'del', this).call(this, data);
	    }
	  }, {
	    key: 'requestCacheRules',
	    get: function get() {
	      return undefined;
	    }
	  }]);

	  return SubredditRelationships;
	}(/* harmony import */__WEBPACK_IMPORTED_MODULE_0__baseContent_es6_js__["a"]);

	SubredditRelationships.dataCacheConfig = undefined;


	/* harmony default export */ exports["a"] = SubredditRelationships;

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_object__ = __webpack_require__(3);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_object___default = __WEBPACK_IMPORTED_MODULE_0_lodash_object__ && __WEBPACK_IMPORTED_MODULE_0_lodash_object__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0_lodash_object__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0_lodash_object__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_0_lodash_object___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_0_lodash_object___default });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash_lang__ = __webpack_require__(66);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash_lang___default = __WEBPACK_IMPORTED_MODULE_1_lodash_lang__ && __WEBPACK_IMPORTED_MODULE_1_lodash_lang__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_1_lodash_lang__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_1_lodash_lang__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_1_lodash_lang___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_1_lodash_lang___default });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__base__ = __webpack_require__(1);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_subreddit__ = __webpack_require__(9);
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }







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

	var Subreddits = function (_BaseAPI) {
	  _inherits(Subreddits, _BaseAPI);

	  function Subreddits() {
	    var _Object$getPrototypeO;

	    var _temp, _this, _ret;

	    _classCallCheck(this, Subreddits);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Subreddits)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.model = /* harmony import */__WEBPACK_IMPORTED_MODULE_3__models_subreddit__["a"], _this.move = _this.notImplemented('move'), _this.copy = _this.notImplemented('copy'), _this.del = _this.notImplemented('del'), _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(Subreddits, [{
	    key: 'patch',
	    value: function patch(data) {
	      var post = this.post.bind(this);
	      var get = this.get.bind(this);
	      // If the data doesn't have all of the keys, get the full subreddit data
	      // and then merge in the changes and submit _that_. The API requires the
	      // full object be sent.
	      if (Object.keys(data).sort() !== /* harmony import */__WEBPACK_IMPORTED_MODULE_3__models_subreddit__["a"].fields) {
	        return new Promise(function (r, x) {
	          get({
	            id: data.id,
	            view: 'mod'
	          }).then(function (sub) {
	            var postData = /* harmony import */__WEBPACK_IMPORTED_MODULE_0_lodash_object__["pick"].bind()(_extends({}, DEFAULT_SUBREDDIT_OPTIONS, sub, data, {
	              sr: sub.name
	            }), Object.keys(DEFAULT_SUBREDDIT_OPTIONS));

	            return post(postData);
	          }, x);
	        });
	      }

	      return _get(Object.getPrototypeOf(Subreddits.prototype), 'post', this).call(this, data);
	    }
	  }, {
	    key: 'post',
	    value: function post(data) {
	      var postData = /* harmony import */__WEBPACK_IMPORTED_MODULE_0_lodash_object__["pick"].bind()(_extends({}, DEFAULT_SUBREDDIT_OPTIONS, data), Object.keys(DEFAULT_SUBREDDIT_OPTIONS));

	      return _get(Object.getPrototypeOf(Subreddits.prototype), 'post', this).call(this, postData);
	    }
	  }, {
	    key: 'put',
	    value: function put(data) {
	      var postData = /* harmony import */__WEBPACK_IMPORTED_MODULE_0_lodash_object__["pick"].bind()(_extends({}, DEFAULT_SUBREDDIT_OPTIONS, data, {
	        name: data.id
	      }), Object.keys(DEFAULT_SUBREDDIT_OPTIONS));

	      return _get(Object.getPrototypeOf(Subreddits.prototype), 'post', this).call(this, postData);
	    }
	  }, {
	    key: 'formatQuery',
	    value: function formatQuery(query, method) {
	      if (method !== 'get') {
	        query.api_type = 'json';
	      }

	      return query;
	    }
	  }, {
	    key: 'parseBody',
	    value: function parseBody(res, apiResponse) {
	      var body = res.body;


	      if (body.data && Array.isArray(body.data.children)) {
	        body.data.children.forEach(function (c) {
	          return apiResponse.addResult(new /* harmony import */__WEBPACK_IMPORTED_MODULE_3__models_subreddit__["a"](c.data).toJSON());
	        });
	        // sometimes, we get back empty object and 200 for invalid sorts like
	        // `mine` when logged out
	      } else if (!/* harmony import */__WEBPACK_IMPORTED_MODULE_1_lodash_lang__["isEmpty"].bind()(body)) {
	          apiResponse.addResult(new /* harmony import */__WEBPACK_IMPORTED_MODULE_3__models_subreddit__["a"](body.data || body).toJSON());
	        }
	    }
	  }, {
	    key: 'path',
	    value: function path(method) {
	      var query = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	      if (method === 'get') {
	        if (query.id && query.view === 'mod') {
	          return 'r/' + query.id + '/about/edit.json';
	        }

	        if (query.id) {
	          return 'r/' + query.id + '/about.json';
	        }

	        return 'subreddits/' + (query.sort || 'default') + '.json';
	      }

	      return 'api/site_admin';
	    }
	  }]);

	  return Subreddits;
	}(/* harmony import */__WEBPACK_IMPORTED_MODULE_2__base__["a"]);

	/* harmony default export */ exports["a"] = Subreddits;

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_es6_js__ = __webpack_require__(1);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_subscription_es6_js__ = __webpack_require__(18);
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




	var Subscriptions = function (_BaseAPI) {
	  _inherits(Subscriptions, _BaseAPI);

	  function Subscriptions() {
	    var _Object$getPrototypeO;

	    var _temp, _this, _ret;

	    _classCallCheck(this, Subscriptions);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Subscriptions)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.model = /* harmony import */__WEBPACK_IMPORTED_MODULE_1__models_subscription_es6_js__["a"], _this.move = _this.notImplemented('move'), _this.copy = _this.notImplemented('copy'), _this.put = _this.notImplemented('put'), _this.patch = _this.notImplemented('patch'), _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(Subscriptions, [{
	    key: 'path',
	    value: function path() {
	      return 'api/subscribe';
	    }
	  }, {
	    key: 'post',
	    value: function post(data) {
	      var postData = {
	        sr: data.subreddit,
	        action: 'sub',
	        api_type: 'json'
	      };

	      return _get(Object.getPrototypeOf(Subscriptions.prototype), 'post', this).call(this, postData);
	    }
	  }, {
	    key: 'del',
	    value: function del(data) {
	      var postData = {
	        sr: data.subreddit,
	        action: 'unsub',
	        api_type: 'json',
	        _method: 'post'
	      };

	      return _get(Object.getPrototypeOf(Subscriptions.prototype), 'del', this).call(this, postData);
	    }
	  }]);

	  return Subscriptions;
	}(/* harmony import */__WEBPACK_IMPORTED_MODULE_0__base_es6_js__["a"]);

	/* harmony default export */ exports["a"] = Subscriptions;

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_es6_js__ = __webpack_require__(1);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_trophy_es6_js__ = __webpack_require__(59);
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





	var Trophies = function (_BaseAPI) {
	  _inherits(Trophies, _BaseAPI);

	  function Trophies() {
	    var _Object$getPrototypeO;

	    var _temp, _this, _ret;

	    _classCallCheck(this, Trophies);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Trophies)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.move = _this.notImplemented('move'), _this.copy = _this.notImplemented('copy'), _this.put = _this.notImplemented('put'), _this.patch = _this.notImplemented('patch'), _this.post = _this.notImplemented('post'), _this.del = _this.notImplemented('del'), _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(Trophies, [{
	    key: 'path',
	    value: function path(method) {
	      var query = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	      return 'api/v1/user/' + query.user + '/trophies.json';
	    }
	  }, {
	    key: 'formatBody',
	    value: function formatBody(res) {
	      var body = res.body;


	      if (body) {
	        return new /* harmony import */__WEBPACK_IMPORTED_MODULE_1__models_trophy_es6_js__["a"](body.data).toJSON();
	      }
	    }
	  }, {
	    key: 'requestCacheRules',
	    get: function get() {
	      return null;
	    }
	  }]);

	  return Trophies;
	}(/* harmony import */__WEBPACK_IMPORTED_MODULE_0__base_es6_js__["a"]);

	Trophies.dataCacheConfig = null;


	/* harmony default export */ exports["a"] = Trophies;

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_es6_js__ = __webpack_require__(1);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_vote_es6_js__ = __webpack_require__(19);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__errors_validationError__ = __webpack_require__(8);
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






	var Votes = function (_BaseAPI) {
	  _inherits(Votes, _BaseAPI);

	  function Votes() {
	    var _Object$getPrototypeO;

	    var _temp, _this, _ret;

	    _classCallCheck(this, Votes);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Votes)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.model = /* harmony import */__WEBPACK_IMPORTED_MODULE_1__models_vote_es6_js__["a"], _this.move = _this.notImplemented('move'), _this.copy = _this.notImplemented('copy'), _this.get = _this.notImplemented('get'), _this.put = _this.notImplemented('put'), _this.patch = _this.notImplemented('patch'), _this.del = _this.notImplemented('del'), _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(Votes, [{
	    key: 'path',
	    value: function path() {
	      return 'api/vote';
	    }
	  }, {
	    key: 'post',
	    value: function post(data) {
	      var vote = new /* harmony import */__WEBPACK_IMPORTED_MODULE_1__models_vote_es6_js__["a"](data);
	      var valid = vote.validate();

	      if (valid !== true) {
	        throw new /* harmony import */__WEBPACK_IMPORTED_MODULE_2__errors_validationError__["a"]('Vote', vote, valid);
	      }

	      var likes = void 0;
	      if (data.direction === -1) {
	        likes = false;
	      } else if (data.direction === 1) {
	        likes = true;
	      }

	      return _get(Object.getPrototypeOf(Votes.prototype), 'post', this).call(this, {
	        id: data.id,
	        dir: data.direction,
	        likes: likes,
	        score: data.score
	      });
	    }
	  }, {
	    key: 'requestCacheRules',
	    get: function get() {
	      return null;
	    }
	  }]);

	  return Votes;
	}(/* harmony import */__WEBPACK_IMPORTED_MODULE_0__base_es6_js__["a"]);

	Votes.defaultCacheConfig = null;
	/* harmony default export */ exports["a"] = Votes;

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_es6_js__ = __webpack_require__(1);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_link__ = __webpack_require__(4);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_wikiPage__ = __webpack_require__(20);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_wikiRevision__ = __webpack_require__(23);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_wikiPageListing__ = __webpack_require__(21);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_wikiPageSettings__ = __webpack_require__(22);
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }









	var Votes = function (_BaseAPI) {
	  _inherits(Votes, _BaseAPI);

	  function Votes() {
	    var _Object$getPrototypeO;

	    var _temp, _this, _ret;

	    _classCallCheck(this, Votes);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Votes)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.move = _this.notImplemented('move'), _this.copy = _this.notImplemented('copy'), _this.put = _this.notImplemented('put'), _this.del = _this.notImplemented('del'), _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(Votes, [{
	    key: 'path',
	    value: function path(method) {
	      var query = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	      var subredditName = query.subredditName;
	      var path = query.path;

	      if (method === 'get') {
	        if (subredditName) {
	          return 'r/' + subredditName + '/wiki/' + path + '.json';
	        }

	        return 'wiki/' + path + '.json';
	      }

	      return 'r/' + subredditName + '/api/wiki/' + path + '.json';
	    }
	  }, {
	    key: 'patch',
	    value: function patch(data) {
	      data._method = 'post';
	      return _get(Object.getPrototypeOf(Votes.prototype), 'patch', this).call(this, data);
	    }
	  }, {
	    key: 'formatBody',
	    value: function formatBody(res, req) {
	      var body = res.body;


	      if (req.method === 'GET') {
	        var type = body.type || body.kind;

	        switch (type) {
	          case 'wikipage':
	            return new /* harmony import */__WEBPACK_IMPORTED_MODULE_2__models_wikiPage__["a"](body.data).toJSON();
	          case 'Listing':
	            if (body.data && body.data.children) {
	              var children = body.data.children;
	              // when either discussions or revisions requests have nothing to show
	              // the response looks identical, so we pass in a type when the request
	              // is made.
	              if (req.url.includes('/wiki/discussions')) {
	                return {
	                  conversations: children.map(function (c) {
	                    return new /* harmony import */__WEBPACK_IMPORTED_MODULE_1__models_link__["a"](c.data).toJSON();
	                  }),
	                  _type: 't3'
	                };
	              } else if (req.url.includes('/wiki/revisions')) {
	                return {
	                  revisions: children.map(function (c) {
	                    return new /* harmony import */__WEBPACK_IMPORTED_MODULE_3__models_wikiRevision__["a"](c).toJSON();
	                  }),
	                  _type: 'WikiRevision'
	                };
	              }
	            }
	            break;
	          case 'wikipagelisting':
	            return new /* harmony import */__WEBPACK_IMPORTED_MODULE_4__models_wikiPageListing__["a"](body).toJSON();
	          case 'wikipagesettings':
	            return new /* harmony import */__WEBPACK_IMPORTED_MODULE_5__models_wikiPageSettings__["a"](body.data).toJSON();
	        }
	      } else {
	        return body;
	      }
	    }
	  }, {
	    key: 'requestCacheRules',
	    get: function get() {
	      return null;
	    }
	  }]);

	  return Votes;
	}(/* harmony import */__WEBPACK_IMPORTED_MODULE_0__base_es6_js__["a"]);

	Votes.defaultCacheConfig = null;
	/* harmony default export */ exports["a"] = Votes;

/***/ },
/* 47 */
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
/* 48 */
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
/* 49 */
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
/* 50 */
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
/* 51 */
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
/* 52 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	function EventEmitter() {
	  this._events = this._events || {};
	  this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;

	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;

	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;

	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;

	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function(n) {
	  if (!isNumber(n) || n < 0 || isNaN(n))
	    throw TypeError('n must be a positive number');
	  this._maxListeners = n;
	  return this;
	};

	EventEmitter.prototype.emit = function(type) {
	  var er, handler, len, args, i, listeners;

	  if (!this._events)
	    this._events = {};

	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
	    if (!this._events.error ||
	        (isObject(this._events.error) && !this._events.error.length)) {
	      er = arguments[1];
	      if (er instanceof Error) {
	        throw er; // Unhandled 'error' event
	      }
	      throw TypeError('Uncaught, unspecified "error" event.');
	    }
	  }

	  handler = this._events[type];

	  if (isUndefined(handler))
	    return false;

	  if (isFunction(handler)) {
	    switch (arguments.length) {
	      // fast cases
	      case 1:
	        handler.call(this);
	        break;
	      case 2:
	        handler.call(this, arguments[1]);
	        break;
	      case 3:
	        handler.call(this, arguments[1], arguments[2]);
	        break;
	      // slower
	      default:
	        args = Array.prototype.slice.call(arguments, 1);
	        handler.apply(this, args);
	    }
	  } else if (isObject(handler)) {
	    args = Array.prototype.slice.call(arguments, 1);
	    listeners = handler.slice();
	    len = listeners.length;
	    for (i = 0; i < len; i++)
	      listeners[i].apply(this, args);
	  }

	  return true;
	};

	EventEmitter.prototype.addListener = function(type, listener) {
	  var m;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events)
	    this._events = {};

	  // To avoid recursion in the case that type === "newListener"! Before
	  // adding it to the listeners, first emit "newListener".
	  if (this._events.newListener)
	    this.emit('newListener', type,
	              isFunction(listener.listener) ?
	              listener.listener : listener);

	  if (!this._events[type])
	    // Optimize the case of one listener. Don't need the extra array object.
	    this._events[type] = listener;
	  else if (isObject(this._events[type]))
	    // If we've already got an array, just append.
	    this._events[type].push(listener);
	  else
	    // Adding the second element, need to change to array.
	    this._events[type] = [this._events[type], listener];

	  // Check for listener leak
	  if (isObject(this._events[type]) && !this._events[type].warned) {
	    if (!isUndefined(this._maxListeners)) {
	      m = this._maxListeners;
	    } else {
	      m = EventEmitter.defaultMaxListeners;
	    }

	    if (m && m > 0 && this._events[type].length > m) {
	      this._events[type].warned = true;
	      console.error('(node) warning: possible EventEmitter memory ' +
	                    'leak detected. %d listeners added. ' +
	                    'Use emitter.setMaxListeners() to increase limit.',
	                    this._events[type].length);
	      if (typeof console.trace === 'function') {
	        // not supported in IE 10
	        console.trace();
	      }
	    }
	  }

	  return this;
	};

	EventEmitter.prototype.on = EventEmitter.prototype.addListener;

	EventEmitter.prototype.once = function(type, listener) {
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  var fired = false;

	  function g() {
	    this.removeListener(type, g);

	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }

	  g.listener = listener;
	  this.on(type, g);

	  return this;
	};

	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function(type, listener) {
	  var list, position, length, i;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events || !this._events[type])
	    return this;

	  list = this._events[type];
	  length = list.length;
	  position = -1;

	  if (list === listener ||
	      (isFunction(list.listener) && list.listener === listener)) {
	    delete this._events[type];
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);

	  } else if (isObject(list)) {
	    for (i = length; i-- > 0;) {
	      if (list[i] === listener ||
	          (list[i].listener && list[i].listener === listener)) {
	        position = i;
	        break;
	      }
	    }

	    if (position < 0)
	      return this;

	    if (list.length === 1) {
	      list.length = 0;
	      delete this._events[type];
	    } else {
	      list.splice(position, 1);
	    }

	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	  }

	  return this;
	};

	EventEmitter.prototype.removeAllListeners = function(type) {
	  var key, listeners;

	  if (!this._events)
	    return this;

	  // not listening for removeListener, no need to emit
	  if (!this._events.removeListener) {
	    if (arguments.length === 0)
	      this._events = {};
	    else if (this._events[type])
	      delete this._events[type];
	    return this;
	  }

	  // emit removeListener for all listeners on all events
	  if (arguments.length === 0) {
	    for (key in this._events) {
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }
	    this.removeAllListeners('removeListener');
	    this._events = {};
	    return this;
	  }

	  listeners = this._events[type];

	  if (isFunction(listeners)) {
	    this.removeListener(type, listeners);
	  } else if (listeners) {
	    // LIFO order
	    while (listeners.length)
	      this.removeListener(type, listeners[listeners.length - 1]);
	  }
	  delete this._events[type];

	  return this;
	};

	EventEmitter.prototype.listeners = function(type) {
	  var ret;
	  if (!this._events || !this._events[type])
	    ret = [];
	  else if (isFunction(this._events[type]))
	    ret = [this._events[type]];
	  else
	    ret = this._events[type].slice();
	  return ret;
	};

	EventEmitter.prototype.listenerCount = function(type) {
	  if (this._events) {
	    var evlistener = this._events[type];

	    if (isFunction(evlistener))
	      return 1;
	    else if (evlistener)
	      return evlistener.length;
	  }
	  return 0;
	};

	EventEmitter.listenerCount = function(emitter, type) {
	  return emitter.listenerCount(type);
	};

	function isFunction(arg) {
	  return typeof arg === 'function';
	}

	function isNumber(arg) {
	  return typeof arg === 'number';
	}

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}

	function isUndefined(arg) {
	  return arg === void 0;
	}


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	'use strict';

	var punycode = __webpack_require__(60);
	var util = __webpack_require__(64);

	exports.parse = urlParse;
	exports.resolve = urlResolve;
	exports.resolveObject = urlResolveObject;
	exports.format = urlFormat;

	exports.Url = Url;

	function Url() {
	  this.protocol = null;
	  this.slashes = null;
	  this.auth = null;
	  this.host = null;
	  this.port = null;
	  this.hostname = null;
	  this.hash = null;
	  this.search = null;
	  this.query = null;
	  this.pathname = null;
	  this.path = null;
	  this.href = null;
	}

	// Reference: RFC 3986, RFC 1808, RFC 2396

	// define these here so at least they only have to be
	// compiled once on the first module load.
	var protocolPattern = /^([a-z0-9.+-]+:)/i,
	    portPattern = /:[0-9]*$/,

	    // Special case for a simple path URL
	    simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,

	    // RFC 2396: characters reserved for delimiting URLs.
	    // We actually just auto-escape these.
	    delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],

	    // RFC 2396: characters not allowed for various reasons.
	    unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),

	    // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
	    autoEscape = ['\''].concat(unwise),
	    // Characters that are never ever allowed in a hostname.
	    // Note that any invalid chars are also handled, but these
	    // are the ones that are *expected* to be seen, so we fast-path
	    // them.
	    nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
	    hostEndingChars = ['/', '?', '#'],
	    hostnameMaxLen = 255,
	    hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
	    hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
	    // protocols that can allow "unsafe" and "unwise" chars.
	    unsafeProtocol = {
	      'javascript': true,
	      'javascript:': true
	    },
	    // protocols that never have a hostname.
	    hostlessProtocol = {
	      'javascript': true,
	      'javascript:': true
	    },
	    // protocols that always contain a // bit.
	    slashedProtocol = {
	      'http': true,
	      'https': true,
	      'ftp': true,
	      'gopher': true,
	      'file': true,
	      'http:': true,
	      'https:': true,
	      'ftp:': true,
	      'gopher:': true,
	      'file:': true
	    },
	    querystring = __webpack_require__(63);

	function urlParse(url, parseQueryString, slashesDenoteHost) {
	  if (url && util.isObject(url) && url instanceof Url) return url;

	  var u = new Url;
	  u.parse(url, parseQueryString, slashesDenoteHost);
	  return u;
	}

	Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
	  if (!util.isString(url)) {
	    throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
	  }

	  // Copy chrome, IE, opera backslash-handling behavior.
	  // Back slashes before the query string get converted to forward slashes
	  // See: https://code.google.com/p/chromium/issues/detail?id=25916
	  var queryIndex = url.indexOf('?'),
	      splitter =
	          (queryIndex !== -1 && queryIndex < url.indexOf('#')) ? '?' : '#',
	      uSplit = url.split(splitter),
	      slashRegex = /\\/g;
	  uSplit[0] = uSplit[0].replace(slashRegex, '/');
	  url = uSplit.join(splitter);

	  var rest = url;

	  // trim before proceeding.
	  // This is to support parse stuff like "  http://foo.com  \n"
	  rest = rest.trim();

	  if (!slashesDenoteHost && url.split('#').length === 1) {
	    // Try fast path regexp
	    var simplePath = simplePathPattern.exec(rest);
	    if (simplePath) {
	      this.path = rest;
	      this.href = rest;
	      this.pathname = simplePath[1];
	      if (simplePath[2]) {
	        this.search = simplePath[2];
	        if (parseQueryString) {
	          this.query = querystring.parse(this.search.substr(1));
	        } else {
	          this.query = this.search.substr(1);
	        }
	      } else if (parseQueryString) {
	        this.search = '';
	        this.query = {};
	      }
	      return this;
	    }
	  }

	  var proto = protocolPattern.exec(rest);
	  if (proto) {
	    proto = proto[0];
	    var lowerProto = proto.toLowerCase();
	    this.protocol = lowerProto;
	    rest = rest.substr(proto.length);
	  }

	  // figure out if it's got a host
	  // user@server is *always* interpreted as a hostname, and url
	  // resolution will treat //foo/bar as host=foo,path=bar because that's
	  // how the browser resolves relative URLs.
	  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
	    var slashes = rest.substr(0, 2) === '//';
	    if (slashes && !(proto && hostlessProtocol[proto])) {
	      rest = rest.substr(2);
	      this.slashes = true;
	    }
	  }

	  if (!hostlessProtocol[proto] &&
	      (slashes || (proto && !slashedProtocol[proto]))) {

	    // there's a hostname.
	    // the first instance of /, ?, ;, or # ends the host.
	    //
	    // If there is an @ in the hostname, then non-host chars *are* allowed
	    // to the left of the last @ sign, unless some host-ending character
	    // comes *before* the @-sign.
	    // URLs are obnoxious.
	    //
	    // ex:
	    // http://a@b@c/ => user:a@b host:c
	    // http://a@b?@c => user:a host:c path:/?@c

	    // v0.12 TODO(isaacs): This is not quite how Chrome does things.
	    // Review our test case against browsers more comprehensively.

	    // find the first instance of any hostEndingChars
	    var hostEnd = -1;
	    for (var i = 0; i < hostEndingChars.length; i++) {
	      var hec = rest.indexOf(hostEndingChars[i]);
	      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
	        hostEnd = hec;
	    }

	    // at this point, either we have an explicit point where the
	    // auth portion cannot go past, or the last @ char is the decider.
	    var auth, atSign;
	    if (hostEnd === -1) {
	      // atSign can be anywhere.
	      atSign = rest.lastIndexOf('@');
	    } else {
	      // atSign must be in auth portion.
	      // http://a@b/c@d => host:b auth:a path:/c@d
	      atSign = rest.lastIndexOf('@', hostEnd);
	    }

	    // Now we have a portion which is definitely the auth.
	    // Pull that off.
	    if (atSign !== -1) {
	      auth = rest.slice(0, atSign);
	      rest = rest.slice(atSign + 1);
	      this.auth = decodeURIComponent(auth);
	    }

	    // the host is the remaining to the left of the first non-host char
	    hostEnd = -1;
	    for (var i = 0; i < nonHostChars.length; i++) {
	      var hec = rest.indexOf(nonHostChars[i]);
	      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
	        hostEnd = hec;
	    }
	    // if we still have not hit it, then the entire thing is a host.
	    if (hostEnd === -1)
	      hostEnd = rest.length;

	    this.host = rest.slice(0, hostEnd);
	    rest = rest.slice(hostEnd);

	    // pull out port.
	    this.parseHost();

	    // we've indicated that there is a hostname,
	    // so even if it's empty, it has to be present.
	    this.hostname = this.hostname || '';

	    // if hostname begins with [ and ends with ]
	    // assume that it's an IPv6 address.
	    var ipv6Hostname = this.hostname[0] === '[' &&
	        this.hostname[this.hostname.length - 1] === ']';

	    // validate a little.
	    if (!ipv6Hostname) {
	      var hostparts = this.hostname.split(/\./);
	      for (var i = 0, l = hostparts.length; i < l; i++) {
	        var part = hostparts[i];
	        if (!part) continue;
	        if (!part.match(hostnamePartPattern)) {
	          var newpart = '';
	          for (var j = 0, k = part.length; j < k; j++) {
	            if (part.charCodeAt(j) > 127) {
	              // we replace non-ASCII char with a temporary placeholder
	              // we need this to make sure size of hostname is not
	              // broken by replacing non-ASCII by nothing
	              newpart += 'x';
	            } else {
	              newpart += part[j];
	            }
	          }
	          // we test again with ASCII char only
	          if (!newpart.match(hostnamePartPattern)) {
	            var validParts = hostparts.slice(0, i);
	            var notHost = hostparts.slice(i + 1);
	            var bit = part.match(hostnamePartStart);
	            if (bit) {
	              validParts.push(bit[1]);
	              notHost.unshift(bit[2]);
	            }
	            if (notHost.length) {
	              rest = '/' + notHost.join('.') + rest;
	            }
	            this.hostname = validParts.join('.');
	            break;
	          }
	        }
	      }
	    }

	    if (this.hostname.length > hostnameMaxLen) {
	      this.hostname = '';
	    } else {
	      // hostnames are always lower case.
	      this.hostname = this.hostname.toLowerCase();
	    }

	    if (!ipv6Hostname) {
	      // IDNA Support: Returns a punycoded representation of "domain".
	      // It only converts parts of the domain name that
	      // have non-ASCII characters, i.e. it doesn't matter if
	      // you call it with a domain that already is ASCII-only.
	      this.hostname = punycode.toASCII(this.hostname);
	    }

	    var p = this.port ? ':' + this.port : '';
	    var h = this.hostname || '';
	    this.host = h + p;
	    this.href += this.host;

	    // strip [ and ] from the hostname
	    // the host field still retains them, though
	    if (ipv6Hostname) {
	      this.hostname = this.hostname.substr(1, this.hostname.length - 2);
	      if (rest[0] !== '/') {
	        rest = '/' + rest;
	      }
	    }
	  }

	  // now rest is set to the post-host stuff.
	  // chop off any delim chars.
	  if (!unsafeProtocol[lowerProto]) {

	    // First, make 100% sure that any "autoEscape" chars get
	    // escaped, even if encodeURIComponent doesn't think they
	    // need to be.
	    for (var i = 0, l = autoEscape.length; i < l; i++) {
	      var ae = autoEscape[i];
	      if (rest.indexOf(ae) === -1)
	        continue;
	      var esc = encodeURIComponent(ae);
	      if (esc === ae) {
	        esc = escape(ae);
	      }
	      rest = rest.split(ae).join(esc);
	    }
	  }


	  // chop off from the tail first.
	  var hash = rest.indexOf('#');
	  if (hash !== -1) {
	    // got a fragment string.
	    this.hash = rest.substr(hash);
	    rest = rest.slice(0, hash);
	  }
	  var qm = rest.indexOf('?');
	  if (qm !== -1) {
	    this.search = rest.substr(qm);
	    this.query = rest.substr(qm + 1);
	    if (parseQueryString) {
	      this.query = querystring.parse(this.query);
	    }
	    rest = rest.slice(0, qm);
	  } else if (parseQueryString) {
	    // no query string, but parseQueryString still requested
	    this.search = '';
	    this.query = {};
	  }
	  if (rest) this.pathname = rest;
	  if (slashedProtocol[lowerProto] &&
	      this.hostname && !this.pathname) {
	    this.pathname = '/';
	  }

	  //to support http.request
	  if (this.pathname || this.search) {
	    var p = this.pathname || '';
	    var s = this.search || '';
	    this.path = p + s;
	  }

	  // finally, reconstruct the href based on what has been validated.
	  this.href = this.format();
	  return this;
	};

	// format a parsed object into a url string
	function urlFormat(obj) {
	  // ensure it's an object, and not a string url.
	  // If it's an obj, this is a no-op.
	  // this way, you can call url_format() on strings
	  // to clean up potentially wonky urls.
	  if (util.isString(obj)) obj = urlParse(obj);
	  if (!(obj instanceof Url)) return Url.prototype.format.call(obj);
	  return obj.format();
	}

	Url.prototype.format = function() {
	  var auth = this.auth || '';
	  if (auth) {
	    auth = encodeURIComponent(auth);
	    auth = auth.replace(/%3A/i, ':');
	    auth += '@';
	  }

	  var protocol = this.protocol || '',
	      pathname = this.pathname || '',
	      hash = this.hash || '',
	      host = false,
	      query = '';

	  if (this.host) {
	    host = auth + this.host;
	  } else if (this.hostname) {
	    host = auth + (this.hostname.indexOf(':') === -1 ?
	        this.hostname :
	        '[' + this.hostname + ']');
	    if (this.port) {
	      host += ':' + this.port;
	    }
	  }

	  if (this.query &&
	      util.isObject(this.query) &&
	      Object.keys(this.query).length) {
	    query = querystring.stringify(this.query);
	  }

	  var search = this.search || (query && ('?' + query)) || '';

	  if (protocol && protocol.substr(-1) !== ':') protocol += ':';

	  // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
	  // unless they had them to begin with.
	  if (this.slashes ||
	      (!protocol || slashedProtocol[protocol]) && host !== false) {
	    host = '//' + (host || '');
	    if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
	  } else if (!host) {
	    host = '';
	  }

	  if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
	  if (search && search.charAt(0) !== '?') search = '?' + search;

	  pathname = pathname.replace(/[?#]/g, function(match) {
	    return encodeURIComponent(match);
	  });
	  search = search.replace('#', '%23');

	  return protocol + host + pathname + search + hash;
	};

	function urlResolve(source, relative) {
	  return urlParse(source, false, true).resolve(relative);
	}

	Url.prototype.resolve = function(relative) {
	  return this.resolveObject(urlParse(relative, false, true)).format();
	};

	function urlResolveObject(source, relative) {
	  if (!source) return relative;
	  return urlParse(source, false, true).resolveObject(relative);
	}

	Url.prototype.resolveObject = function(relative) {
	  if (util.isString(relative)) {
	    var rel = new Url();
	    rel.parse(relative, false, true);
	    relative = rel;
	  }

	  var result = new Url();
	  var tkeys = Object.keys(this);
	  for (var tk = 0; tk < tkeys.length; tk++) {
	    var tkey = tkeys[tk];
	    result[tkey] = this[tkey];
	  }

	  // hash is always overridden, no matter what.
	  // even href="" will remove it.
	  result.hash = relative.hash;

	  // if the relative url is empty, then there's nothing left to do here.
	  if (relative.href === '') {
	    result.href = result.format();
	    return result;
	  }

	  // hrefs like //foo/bar always cut to the protocol.
	  if (relative.slashes && !relative.protocol) {
	    // take everything except the protocol from relative
	    var rkeys = Object.keys(relative);
	    for (var rk = 0; rk < rkeys.length; rk++) {
	      var rkey = rkeys[rk];
	      if (rkey !== 'protocol')
	        result[rkey] = relative[rkey];
	    }

	    //urlParse appends trailing / to urls like http://www.example.com
	    if (slashedProtocol[result.protocol] &&
	        result.hostname && !result.pathname) {
	      result.path = result.pathname = '/';
	    }

	    result.href = result.format();
	    return result;
	  }

	  if (relative.protocol && relative.protocol !== result.protocol) {
	    // if it's a known url protocol, then changing
	    // the protocol does weird things
	    // first, if it's not file:, then we MUST have a host,
	    // and if there was a path
	    // to begin with, then we MUST have a path.
	    // if it is file:, then the host is dropped,
	    // because that's known to be hostless.
	    // anything else is assumed to be absolute.
	    if (!slashedProtocol[relative.protocol]) {
	      var keys = Object.keys(relative);
	      for (var v = 0; v < keys.length; v++) {
	        var k = keys[v];
	        result[k] = relative[k];
	      }
	      result.href = result.format();
	      return result;
	    }

	    result.protocol = relative.protocol;
	    if (!relative.host && !hostlessProtocol[relative.protocol]) {
	      var relPath = (relative.pathname || '').split('/');
	      while (relPath.length && !(relative.host = relPath.shift()));
	      if (!relative.host) relative.host = '';
	      if (!relative.hostname) relative.hostname = '';
	      if (relPath[0] !== '') relPath.unshift('');
	      if (relPath.length < 2) relPath.unshift('');
	      result.pathname = relPath.join('/');
	    } else {
	      result.pathname = relative.pathname;
	    }
	    result.search = relative.search;
	    result.query = relative.query;
	    result.host = relative.host || '';
	    result.auth = relative.auth;
	    result.hostname = relative.hostname || relative.host;
	    result.port = relative.port;
	    // to support http.request
	    if (result.pathname || result.search) {
	      var p = result.pathname || '';
	      var s = result.search || '';
	      result.path = p + s;
	    }
	    result.slashes = result.slashes || relative.slashes;
	    result.href = result.format();
	    return result;
	  }

	  var isSourceAbs = (result.pathname && result.pathname.charAt(0) === '/'),
	      isRelAbs = (
	          relative.host ||
	          relative.pathname && relative.pathname.charAt(0) === '/'
	      ),
	      mustEndAbs = (isRelAbs || isSourceAbs ||
	                    (result.host && relative.pathname)),
	      removeAllDots = mustEndAbs,
	      srcPath = result.pathname && result.pathname.split('/') || [],
	      relPath = relative.pathname && relative.pathname.split('/') || [],
	      psychotic = result.protocol && !slashedProtocol[result.protocol];

	  // if the url is a non-slashed url, then relative
	  // links like ../.. should be able
	  // to crawl up to the hostname, as well.  This is strange.
	  // result.protocol has already been set by now.
	  // Later on, put the first path part into the host field.
	  if (psychotic) {
	    result.hostname = '';
	    result.port = null;
	    if (result.host) {
	      if (srcPath[0] === '') srcPath[0] = result.host;
	      else srcPath.unshift(result.host);
	    }
	    result.host = '';
	    if (relative.protocol) {
	      relative.hostname = null;
	      relative.port = null;
	      if (relative.host) {
	        if (relPath[0] === '') relPath[0] = relative.host;
	        else relPath.unshift(relative.host);
	      }
	      relative.host = null;
	    }
	    mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
	  }

	  if (isRelAbs) {
	    // it's absolute.
	    result.host = (relative.host || relative.host === '') ?
	                  relative.host : result.host;
	    result.hostname = (relative.hostname || relative.hostname === '') ?
	                      relative.hostname : result.hostname;
	    result.search = relative.search;
	    result.query = relative.query;
	    srcPath = relPath;
	    // fall through to the dot-handling below.
	  } else if (relPath.length) {
	    // it's relative
	    // throw away the existing file, and take the new path instead.
	    if (!srcPath) srcPath = [];
	    srcPath.pop();
	    srcPath = srcPath.concat(relPath);
	    result.search = relative.search;
	    result.query = relative.query;
	  } else if (!util.isNullOrUndefined(relative.search)) {
	    // just pull out the search.
	    // like href='?foo'.
	    // Put this after the other two cases because it simplifies the booleans
	    if (psychotic) {
	      result.hostname = result.host = srcPath.shift();
	      //occationaly the auth can get stuck only in host
	      //this especially happens in cases like
	      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
	      var authInHost = result.host && result.host.indexOf('@') > 0 ?
	                       result.host.split('@') : false;
	      if (authInHost) {
	        result.auth = authInHost.shift();
	        result.host = result.hostname = authInHost.shift();
	      }
	    }
	    result.search = relative.search;
	    result.query = relative.query;
	    //to support http.request
	    if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
	      result.path = (result.pathname ? result.pathname : '') +
	                    (result.search ? result.search : '');
	    }
	    result.href = result.format();
	    return result;
	  }

	  if (!srcPath.length) {
	    // no path at all.  easy.
	    // we've already handled the other stuff above.
	    result.pathname = null;
	    //to support http.request
	    if (result.search) {
	      result.path = '/' + result.search;
	    } else {
	      result.path = null;
	    }
	    result.href = result.format();
	    return result;
	  }

	  // if a url ENDs in . or .., then it must get a trailing slash.
	  // however, if it ends in anything else non-slashy,
	  // then it must NOT get a trailing slash.
	  var last = srcPath.slice(-1)[0];
	  var hasTrailingSlash = (
	      (result.host || relative.host || srcPath.length > 1) &&
	      (last === '.' || last === '..') || last === '');

	  // strip single dots, resolve double dots to parent dir
	  // if the path tries to go above the root, `up` ends up > 0
	  var up = 0;
	  for (var i = srcPath.length; i >= 0; i--) {
	    last = srcPath[i];
	    if (last === '.') {
	      srcPath.splice(i, 1);
	    } else if (last === '..') {
	      srcPath.splice(i, 1);
	      up++;
	    } else if (up) {
	      srcPath.splice(i, 1);
	      up--;
	    }
	  }

	  // if the path is allowed to go above the root, restore leading ..s
	  if (!mustEndAbs && !removeAllDots) {
	    for (; up--; up) {
	      srcPath.unshift('..');
	    }
	  }

	  if (mustEndAbs && srcPath[0] !== '' &&
	      (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
	    srcPath.unshift('');
	  }

	  if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {
	    srcPath.push('');
	  }

	  var isAbsolute = srcPath[0] === '' ||
	      (srcPath[0] && srcPath[0].charAt(0) === '/');

	  // put the host back
	  if (psychotic) {
	    result.hostname = result.host = isAbsolute ? '' :
	                                    srcPath.length ? srcPath.shift() : '';
	    //occationaly the auth can get stuck only in host
	    //this especially happens in cases like
	    //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
	    var authInHost = result.host && result.host.indexOf('@') > 0 ?
	                     result.host.split('@') : false;
	    if (authInHost) {
	      result.auth = authInHost.shift();
	      result.host = result.hostname = authInHost.shift();
	    }
	  }

	  mustEndAbs = mustEndAbs || (result.host && srcPath.length);

	  if (mustEndAbs && !isAbsolute) {
	    srcPath.unshift('');
	  }

	  if (!srcPath.length) {
	    result.pathname = null;
	    result.path = null;
	  } else {
	    result.pathname = srcPath.join('/');
	  }

	  //to support request.http
	  if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
	    result.path = (result.pathname ? result.pathname : '') +
	                  (result.search ? result.search : '');
	  }
	  result.auth = relative.auth || result.auth;
	  result.slashes = result.slashes || relative.slashes;
	  result.href = result.format();
	  return result;
	};

	Url.prototype.parseHost = function() {
	  var host = this.host;
	  var port = portPattern.exec(host);
	  if (port) {
	    port = port[0];
	    if (port !== ':') {
	      this.port = port.substr(1);
	    }
	    host = host.substr(0, host.length - port.length);
	  }
	  if (host) this.hostname = host;
	};


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__thingTypes__ = __webpack_require__(6);
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



	var APIResponse = function () {
	  function APIResponse() {
	    var _typeToTable;

	    var meta = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	    _classCallCheck(this, APIResponse);

	    this.meta = meta;
	    this.results = [];

	    this.links = {};
	    this.comments = {};
	    this.users = {};
	    this.messages = {};
	    this.subreddits = {};

	    this.typeToTable = (_typeToTable = {}, _defineProperty(_typeToTable, /* harmony import */__WEBPACK_IMPORTED_MODULE_0__thingTypes__["a"], this.comments), _defineProperty(_typeToTable, /* harmony import */__WEBPACK_IMPORTED_MODULE_0__thingTypes__["b"], this.links), _defineProperty(_typeToTable, /* harmony import */__WEBPACK_IMPORTED_MODULE_0__thingTypes__["c"], this.users), _defineProperty(_typeToTable, /* harmony import */__WEBPACK_IMPORTED_MODULE_0__thingTypes__["d"], this.messages), _defineProperty(_typeToTable, /* harmony import */__WEBPACK_IMPORTED_MODULE_0__thingTypes__["e"], this.subreddits), _typeToTable);
	  }

	  _createClass(APIResponse, [{
	    key: 'addResult',
	    value: function addResult(model) {
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
	      var record = this.makeRecord(model);
	      if (record) {
	        this.addToTable(record, model);
	      }

	      return this;
	    }
	  }, {
	    key: 'makeRecord',
	    value: function makeRecord(model) {
	      var uuid = model.uuid;

	      if (!uuid) {
	        return;
	      }

	      var type = /* harmony import */__WEBPACK_IMPORTED_MODULE_0__thingTypes__["f"][model.kind] || /* harmony import */__WEBPACK_IMPORTED_MODULE_0__thingTypes__["g"].bind()(uuid);
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
	  }]);

	  return APIResponse;
	}();

	/* harmony default export */ exports["a"] = APIResponse;

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_events__ = __webpack_require__(52);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_events___default = __WEBPACK_IMPORTED_MODULE_0_events__ && __WEBPACK_IMPORTED_MODULE_0_events__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0_events__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0_events__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_0_events___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_0_events___default });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_superagent__ = __webpack_require__(24);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_superagent___default = __WEBPACK_IMPORTED_MODULE_1_superagent__ && __WEBPACK_IMPORTED_MODULE_1_superagent__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_1_superagent__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_1_superagent__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_1_superagent___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_1_superagent___default });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_url__ = __webpack_require__(53);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_url___default = __WEBPACK_IMPORTED_MODULE_2_url__ && __WEBPACK_IMPORTED_MODULE_2_url__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_2_url__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_2_url__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_2_url___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_2_url___default });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__apis_activities__ = __webpack_require__(29);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__apis_hidden__ = __webpack_require__(32);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__apis_saved__ = __webpack_require__(13);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__apis_search__ = __webpack_require__(39);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__apis_stylesheets__ = __webpack_require__(40);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__apis_subreddits__ = __webpack_require__(42);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__apis_subscriptions__ = __webpack_require__(43);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__apis_trophies__ = __webpack_require__(44);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__apis_accounts__ = __webpack_require__(28);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__apis_votes__ = __webpack_require__(45);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__apis_links__ = __webpack_require__(33);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__apis_comments__ = __webpack_require__(31);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__apis_captcha__ = __webpack_require__(30);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__apis_reports__ = __webpack_require__(37);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__apis_messages__ = __webpack_require__(34);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__apis_modListing__ = __webpack_require__(35);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__apis_subredditRelationships__ = __webpack_require__(41);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__apis_rules__ = __webpack_require__(38);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__apis_wiki__ = __webpack_require__(46);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__apis_multis__ = __webpack_require__(12);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__apis_multiSubscriptions__ = __webpack_require__(36);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__errors_noModelError__ = __webpack_require__(7);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__errors_responseError__ = __webpack_require__(10);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__errors_validationError__ = __webpack_require__(8);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__errors_notImplementedError__ = __webpack_require__(14);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__models_account__ = __webpack_require__(15);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__models_award__ = __webpack_require__(48);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__models_base__ = __webpack_require__(0);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__models_block__ = __webpack_require__(49);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__models_BlockedUser__ = __webpack_require__(47);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__models_comment__ = __webpack_require__(2);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__models_link__ = __webpack_require__(4);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__models_message__ = __webpack_require__(16);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__models_promocampaign__ = __webpack_require__(51);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__models_preferences__ = __webpack_require__(50);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__models_subreddit__ = __webpack_require__(9);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__models_subscription__ = __webpack_require__(18);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__models_vote__ = __webpack_require__(19);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__models_report__ = __webpack_require__(17);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__models_wikiPage__ = __webpack_require__(20);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43__models_wikiRevision__ = __webpack_require__(23);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44__models_wikiPageListing__ = __webpack_require__(21);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_45__models_wikiPageSettings__ = __webpack_require__(22);
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



























	var APIs = {
	  activities: /* harmony import */__WEBPACK_IMPORTED_MODULE_3__apis_activities__["a"],
	  captcha: /* harmony import */__WEBPACK_IMPORTED_MODULE_15__apis_captcha__["a"],
	  hidden: /* harmony import */__WEBPACK_IMPORTED_MODULE_4__apis_hidden__["a"],
	  saved: /* harmony import */__WEBPACK_IMPORTED_MODULE_5__apis_saved__["a"],
	  search: /* harmony import */__WEBPACK_IMPORTED_MODULE_6__apis_search__["a"],
	  stylesheets: /* harmony import */__WEBPACK_IMPORTED_MODULE_7__apis_stylesheets__["a"],
	  subreddits: /* harmony import */__WEBPACK_IMPORTED_MODULE_8__apis_subreddits__["a"],
	  subscriptions: /* harmony import */__WEBPACK_IMPORTED_MODULE_9__apis_subscriptions__["a"],
	  trophies: /* harmony import */__WEBPACK_IMPORTED_MODULE_10__apis_trophies__["a"],
	  accounts: /* harmony import */__WEBPACK_IMPORTED_MODULE_11__apis_accounts__["a"],
	  votes: /* harmony import */__WEBPACK_IMPORTED_MODULE_12__apis_votes__["a"],
	  links: /* harmony import */__WEBPACK_IMPORTED_MODULE_13__apis_links__["a"],
	  comments: /* harmony import */__WEBPACK_IMPORTED_MODULE_14__apis_comments__["a"],
	  reports: /* harmony import */__WEBPACK_IMPORTED_MODULE_16__apis_reports__["a"],
	  messages: /* harmony import */__WEBPACK_IMPORTED_MODULE_17__apis_messages__["a"],
	  modListing: /* harmony import */__WEBPACK_IMPORTED_MODULE_18__apis_modListing__["a"],
	  subredditRelationships: /* harmony import */__WEBPACK_IMPORTED_MODULE_19__apis_subredditRelationships__["a"],
	  rules: /* harmony import */__WEBPACK_IMPORTED_MODULE_20__apis_rules__["a"],
	  wiki: /* harmony import */__WEBPACK_IMPORTED_MODULE_21__apis_wiki__["a"],
	  multis: /* harmony import */__WEBPACK_IMPORTED_MODULE_22__apis_multis__["a"],
	  multiSubscriptions: /* harmony import */__WEBPACK_IMPORTED_MODULE_23__apis_multiSubscriptions__["a"]
	};
	/* harmony export */ Object.defineProperty(exports, "APIs", {configurable: false, enumerable: true, get: function() { return APIs; }});







	var errors = {
	  NoModelError: /* harmony import */__WEBPACK_IMPORTED_MODULE_24__errors_noModelError__["a"],
	  ValidationError: /* harmony import */__WEBPACK_IMPORTED_MODULE_26__errors_validationError__["a"],
	  ResponseError: /* harmony import */__WEBPACK_IMPORTED_MODULE_25__errors_responseError__["a"],
	  DisconnectedError: /* harmony import */__WEBPACK_IMPORTED_MODULE_25__errors_responseError__["b"],
	  NotImplementedError: /* harmony import */__WEBPACK_IMPORTED_MODULE_27__errors_notImplementedError__["a"]
	};
	/* harmony export */ Object.defineProperty(exports, "errors", {configurable: false, enumerable: true, get: function() { return errors; }});




















	var models = {
	  Account: /* harmony import */__WEBPACK_IMPORTED_MODULE_28__models_account__["a"],
	  Award: /* harmony import */__WEBPACK_IMPORTED_MODULE_29__models_award__["a"],
	  Base: /* harmony import */__WEBPACK_IMPORTED_MODULE_30__models_base__["a"],
	  Block: /* harmony import */__WEBPACK_IMPORTED_MODULE_31__models_block__["a"],
	  BlockedUser: /* harmony import */__WEBPACK_IMPORTED_MODULE_32__models_BlockedUser__["a"],
	  Comment: /* harmony import */__WEBPACK_IMPORTED_MODULE_33__models_comment__["a"],
	  Link: /* harmony import */__WEBPACK_IMPORTED_MODULE_34__models_link__["a"],
	  Message: /* harmony import */__WEBPACK_IMPORTED_MODULE_35__models_message__["a"],
	  PromoCampaign: /* harmony import */__WEBPACK_IMPORTED_MODULE_36__models_promocampaign__["a"],
	  Preferences: /* harmony import */__WEBPACK_IMPORTED_MODULE_37__models_preferences__["a"],
	  Subreddit: /* harmony import */__WEBPACK_IMPORTED_MODULE_38__models_subreddit__["a"],
	  Subscription: /* harmony import */__WEBPACK_IMPORTED_MODULE_39__models_subscription__["a"],
	  Vote: /* harmony import */__WEBPACK_IMPORTED_MODULE_40__models_vote__["a"],
	  Report: /* harmony import */__WEBPACK_IMPORTED_MODULE_41__models_report__["a"],
	  WikiPage: /* harmony import */__WEBPACK_IMPORTED_MODULE_42__models_wikiPage__["a"],
	  WikiRevision: /* harmony import */__WEBPACK_IMPORTED_MODULE_43__models_wikiRevision__["a"],
	  WikiPageListing: /* harmony import */__WEBPACK_IMPORTED_MODULE_44__models_wikiPageListing__["a"],
	  WikiPageSettings: /* harmony import */__WEBPACK_IMPORTED_MODULE_45__models_wikiPageSettings__["a"]
	};
	/* harmony export */ Object.defineProperty(exports, "models", {configurable: false, enumerable: true, get: function() { return models; }});

	var DEFAULT_API_ORIGIN = 'https://www.reddit.com';
	var AUTHED_API_ORIGIN = 'https://oauth.reddit.com';

	var SCOPES = 'history,identity,mysubreddits,read,subscribe,vote,submit,' + 'save,edit,account,creddits,flair,livemanage,modconfig,' + 'modcontributors,modflair,modlog,modothers,modposts,modself,' + 'modwiki,privatemessages,report,wikiedit,wikiread';

	var Snoode = function () {
	  function Snoode() {
	    var config = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	    _classCallCheck(this, Snoode);

	    this.config = _extends({
	      origin: DEFAULT_API_ORIGIN,
	      event: new /* harmony import */__WEBPACK_IMPORTED_MODULE_0_events__["EventEmitter"](),
	      userAgent: 'snoodev2',
	      appName: 'snoodev2',
	      env: 'dev'
	    }, config);

	    this.event = this.config.event;

	    for (var a in APIs) {
	      this[a] = new APIs[a](this);
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
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__models_comment__ = __webpack_require__(2);
	/* harmony export */ exports["a"] = treeifyComments;/* harmony export */ exports["b"] = parseCommentList;/* harmony export */ exports["c"] = normalizeCommentReplies;

	// All of these function rely on mutation, either for building the tree,
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

	  return new /* harmony import */__WEBPACK_IMPORTED_MODULE_0__models_comment__["a"](comment).toJSON();
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
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base__ = __webpack_require__(0);
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



	var Rule = function (_Base) {
	  _inherits(Rule, _Base);

	  function Rule() {
	    var _Object$getPrototypeO;

	    var _temp, _this, _ret;

	    _classCallCheck(this, Rule);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Rule)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this._type = 'Rule', _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(Rule, [{
	    key: 'validators',
	    value: function validators() {
	      var kind = this.kindValidator.bind(this);
	      var shortName = this.shortNameValidator.bind(this);
	      var r = this.subredditValidator.bind(this);

	      return {
	        kind: kind,
	        short_name: shortName,
	        r: r
	      };
	    }
	  }, {
	    key: 'subredditValidator',
	    value: function subredditValidator(subreddit) {
	      return /* harmony import */__WEBPACK_IMPORTED_MODULE_0__base__["a"].validators.string(subreddit) && /* harmony import */__WEBPACK_IMPORTED_MODULE_0__base__["a"].validators.minLength(subreddit, 1);
	    }
	  }, {
	    key: 'shortNameValidator',
	    value: function shortNameValidator(shortName) {
	      return /* harmony import */__WEBPACK_IMPORTED_MODULE_0__base__["a"].validators.string(shortName) && /* harmony import */__WEBPACK_IMPORTED_MODULE_0__base__["a"].validators.minLength(shortName, 1);
	    }
	  }, {
	    key: 'kindValidator',
	    value: function kindValidator(kind) {
	      return ['all', 'kind', 'comment'].indexOf(kind) > -1;
	    }
	  }]);

	  return Rule;
	}(/* harmony import */__WEBPACK_IMPORTED_MODULE_0__base__["a"]);

	/* harmony default export */ exports["a"] = Rule;

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base__ = __webpack_require__(0);
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



	// decode websafe_json encoding
	function unsafeJson(text) {
	  return text.replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&amp;/g, '&');
	}

	var Stylesheet = function (_Base) {
	  _inherits(Stylesheet, _Base);

	  function Stylesheet() {
	    var _Object$getPrototypeO;

	    var _temp, _this, _ret;

	    _classCallCheck(this, Stylesheet);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Stylesheet)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this._type = 'Stylesheet', _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(Stylesheet, [{
	    key: 'stylesheet',
	    get: function get() {
	      return unsafeJson(this.get('stylesheet'));
	    }
	  }]);

	  return Stylesheet;
	}(/* harmony import */__WEBPACK_IMPORTED_MODULE_0__base__["a"]);

	/* harmony default export */ exports["a"] = Stylesheet;

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base__ = __webpack_require__(0);
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



	var Trophy = function (_Base) {
	  _inherits(Trophy, _Base);

	  function Trophy(props) {
	    _classCallCheck(this, Trophy);

	    props._type = 'Trophy';
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Trophy).call(this, props));
	  }

	  return Trophy;
	}(/* harmony import */__WEBPACK_IMPORTED_MODULE_0__base__["a"]);

	;

	/* harmony default export */ exports["a"] = Trophy;

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module, global) {var __WEBPACK_AMD_DEFINE_RESULT__;/*! https://mths.be/punycode v1.4.1 by @mathias */
	;(function(root) {

		/** Detect free variables */
		var freeExports = typeof exports == 'object' && exports &&
			!exports.nodeType && exports;
		var freeModule = typeof module == 'object' && module &&
			!module.nodeType && module;
		var freeGlobal = typeof global == 'object' && global;
		if (
			freeGlobal.global === freeGlobal ||
			freeGlobal.window === freeGlobal ||
			freeGlobal.self === freeGlobal
		) {
			root = freeGlobal;
		}

		/**
		 * The `punycode` object.
		 * @name punycode
		 * @type Object
		 */
		var punycode,

		/** Highest positive signed 32-bit float value */
		maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

		/** Bootstring parameters */
		base = 36,
		tMin = 1,
		tMax = 26,
		skew = 38,
		damp = 700,
		initialBias = 72,
		initialN = 128, // 0x80
		delimiter = '-', // '\x2D'

		/** Regular expressions */
		regexPunycode = /^xn--/,
		regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
		regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators

		/** Error messages */
		errors = {
			'overflow': 'Overflow: input needs wider integers to process',
			'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
			'invalid-input': 'Invalid input'
		},

		/** Convenience shortcuts */
		baseMinusTMin = base - tMin,
		floor = Math.floor,
		stringFromCharCode = String.fromCharCode,

		/** Temporary variable */
		key;

		/*--------------------------------------------------------------------------*/

		/**
		 * A generic error utility function.
		 * @private
		 * @param {String} type The error type.
		 * @returns {Error} Throws a `RangeError` with the applicable error message.
		 */
		function error(type) {
			throw new RangeError(errors[type]);
		}

		/**
		 * A generic `Array#map` utility function.
		 * @private
		 * @param {Array} array The array to iterate over.
		 * @param {Function} callback The function that gets called for every array
		 * item.
		 * @returns {Array} A new array of values returned by the callback function.
		 */
		function map(array, fn) {
			var length = array.length;
			var result = [];
			while (length--) {
				result[length] = fn(array[length]);
			}
			return result;
		}

		/**
		 * A simple `Array#map`-like wrapper to work with domain name strings or email
		 * addresses.
		 * @private
		 * @param {String} domain The domain name or email address.
		 * @param {Function} callback The function that gets called for every
		 * character.
		 * @returns {Array} A new string of characters returned by the callback
		 * function.
		 */
		function mapDomain(string, fn) {
			var parts = string.split('@');
			var result = '';
			if (parts.length > 1) {
				// In email addresses, only the domain name should be punycoded. Leave
				// the local part (i.e. everything up to `@`) intact.
				result = parts[0] + '@';
				string = parts[1];
			}
			// Avoid `split(regex)` for IE8 compatibility. See #17.
			string = string.replace(regexSeparators, '\x2E');
			var labels = string.split('.');
			var encoded = map(labels, fn).join('.');
			return result + encoded;
		}

		/**
		 * Creates an array containing the numeric code points of each Unicode
		 * character in the string. While JavaScript uses UCS-2 internally,
		 * this function will convert a pair of surrogate halves (each of which
		 * UCS-2 exposes as separate characters) into a single code point,
		 * matching UTF-16.
		 * @see `punycode.ucs2.encode`
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode.ucs2
		 * @name decode
		 * @param {String} string The Unicode input string (UCS-2).
		 * @returns {Array} The new array of code points.
		 */
		function ucs2decode(string) {
			var output = [],
			    counter = 0,
			    length = string.length,
			    value,
			    extra;
			while (counter < length) {
				value = string.charCodeAt(counter++);
				if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
					// high surrogate, and there is a next character
					extra = string.charCodeAt(counter++);
					if ((extra & 0xFC00) == 0xDC00) { // low surrogate
						output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
					} else {
						// unmatched surrogate; only append this code unit, in case the next
						// code unit is the high surrogate of a surrogate pair
						output.push(value);
						counter--;
					}
				} else {
					output.push(value);
				}
			}
			return output;
		}

		/**
		 * Creates a string based on an array of numeric code points.
		 * @see `punycode.ucs2.decode`
		 * @memberOf punycode.ucs2
		 * @name encode
		 * @param {Array} codePoints The array of numeric code points.
		 * @returns {String} The new Unicode string (UCS-2).
		 */
		function ucs2encode(array) {
			return map(array, function(value) {
				var output = '';
				if (value > 0xFFFF) {
					value -= 0x10000;
					output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
					value = 0xDC00 | value & 0x3FF;
				}
				output += stringFromCharCode(value);
				return output;
			}).join('');
		}

		/**
		 * Converts a basic code point into a digit/integer.
		 * @see `digitToBasic()`
		 * @private
		 * @param {Number} codePoint The basic numeric code point value.
		 * @returns {Number} The numeric value of a basic code point (for use in
		 * representing integers) in the range `0` to `base - 1`, or `base` if
		 * the code point does not represent a value.
		 */
		function basicToDigit(codePoint) {
			if (codePoint - 48 < 10) {
				return codePoint - 22;
			}
			if (codePoint - 65 < 26) {
				return codePoint - 65;
			}
			if (codePoint - 97 < 26) {
				return codePoint - 97;
			}
			return base;
		}

		/**
		 * Converts a digit/integer into a basic code point.
		 * @see `basicToDigit()`
		 * @private
		 * @param {Number} digit The numeric value of a basic code point.
		 * @returns {Number} The basic code point whose value (when used for
		 * representing integers) is `digit`, which needs to be in the range
		 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
		 * used; else, the lowercase form is used. The behavior is undefined
		 * if `flag` is non-zero and `digit` has no uppercase form.
		 */
		function digitToBasic(digit, flag) {
			//  0..25 map to ASCII a..z or A..Z
			// 26..35 map to ASCII 0..9
			return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
		}

		/**
		 * Bias adaptation function as per section 3.4 of RFC 3492.
		 * https://tools.ietf.org/html/rfc3492#section-3.4
		 * @private
		 */
		function adapt(delta, numPoints, firstTime) {
			var k = 0;
			delta = firstTime ? floor(delta / damp) : delta >> 1;
			delta += floor(delta / numPoints);
			for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
				delta = floor(delta / baseMinusTMin);
			}
			return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
		}

		/**
		 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
		 * symbols.
		 * @memberOf punycode
		 * @param {String} input The Punycode string of ASCII-only symbols.
		 * @returns {String} The resulting string of Unicode symbols.
		 */
		function decode(input) {
			// Don't use UCS-2
			var output = [],
			    inputLength = input.length,
			    out,
			    i = 0,
			    n = initialN,
			    bias = initialBias,
			    basic,
			    j,
			    index,
			    oldi,
			    w,
			    k,
			    digit,
			    t,
			    /** Cached calculation results */
			    baseMinusT;

			// Handle the basic code points: let `basic` be the number of input code
			// points before the last delimiter, or `0` if there is none, then copy
			// the first basic code points to the output.

			basic = input.lastIndexOf(delimiter);
			if (basic < 0) {
				basic = 0;
			}

			for (j = 0; j < basic; ++j) {
				// if it's not a basic code point
				if (input.charCodeAt(j) >= 0x80) {
					error('not-basic');
				}
				output.push(input.charCodeAt(j));
			}

			// Main decoding loop: start just after the last delimiter if any basic code
			// points were copied; start at the beginning otherwise.

			for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

				// `index` is the index of the next character to be consumed.
				// Decode a generalized variable-length integer into `delta`,
				// which gets added to `i`. The overflow checking is easier
				// if we increase `i` as we go, then subtract off its starting
				// value at the end to obtain `delta`.
				for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

					if (index >= inputLength) {
						error('invalid-input');
					}

					digit = basicToDigit(input.charCodeAt(index++));

					if (digit >= base || digit > floor((maxInt - i) / w)) {
						error('overflow');
					}

					i += digit * w;
					t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

					if (digit < t) {
						break;
					}

					baseMinusT = base - t;
					if (w > floor(maxInt / baseMinusT)) {
						error('overflow');
					}

					w *= baseMinusT;

				}

				out = output.length + 1;
				bias = adapt(i - oldi, out, oldi == 0);

				// `i` was supposed to wrap around from `out` to `0`,
				// incrementing `n` each time, so we'll fix that now:
				if (floor(i / out) > maxInt - n) {
					error('overflow');
				}

				n += floor(i / out);
				i %= out;

				// Insert `n` at position `i` of the output
				output.splice(i++, 0, n);

			}

			return ucs2encode(output);
		}

		/**
		 * Converts a string of Unicode symbols (e.g. a domain name label) to a
		 * Punycode string of ASCII-only symbols.
		 * @memberOf punycode
		 * @param {String} input The string of Unicode symbols.
		 * @returns {String} The resulting Punycode string of ASCII-only symbols.
		 */
		function encode(input) {
			var n,
			    delta,
			    handledCPCount,
			    basicLength,
			    bias,
			    j,
			    m,
			    q,
			    k,
			    t,
			    currentValue,
			    output = [],
			    /** `inputLength` will hold the number of code points in `input`. */
			    inputLength,
			    /** Cached calculation results */
			    handledCPCountPlusOne,
			    baseMinusT,
			    qMinusT;

			// Convert the input in UCS-2 to Unicode
			input = ucs2decode(input);

			// Cache the length
			inputLength = input.length;

			// Initialize the state
			n = initialN;
			delta = 0;
			bias = initialBias;

			// Handle the basic code points
			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue < 0x80) {
					output.push(stringFromCharCode(currentValue));
				}
			}

			handledCPCount = basicLength = output.length;

			// `handledCPCount` is the number of code points that have been handled;
			// `basicLength` is the number of basic code points.

			// Finish the basic string - if it is not empty - with a delimiter
			if (basicLength) {
				output.push(delimiter);
			}

			// Main encoding loop:
			while (handledCPCount < inputLength) {

				// All non-basic code points < n have been handled already. Find the next
				// larger one:
				for (m = maxInt, j = 0; j < inputLength; ++j) {
					currentValue = input[j];
					if (currentValue >= n && currentValue < m) {
						m = currentValue;
					}
				}

				// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
				// but guard against overflow
				handledCPCountPlusOne = handledCPCount + 1;
				if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
					error('overflow');
				}

				delta += (m - n) * handledCPCountPlusOne;
				n = m;

				for (j = 0; j < inputLength; ++j) {
					currentValue = input[j];

					if (currentValue < n && ++delta > maxInt) {
						error('overflow');
					}

					if (currentValue == n) {
						// Represent delta as a generalized variable-length integer
						for (q = delta, k = base; /* no condition */; k += base) {
							t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
							if (q < t) {
								break;
							}
							qMinusT = q - t;
							baseMinusT = base - t;
							output.push(
								stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
							);
							q = floor(qMinusT / baseMinusT);
						}

						output.push(stringFromCharCode(digitToBasic(q, 0)));
						bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
						delta = 0;
						++handledCPCount;
					}
				}

				++delta;
				++n;

			}
			return output.join('');
		}

		/**
		 * Converts a Punycode string representing a domain name or an email address
		 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
		 * it doesn't matter if you call it on a string that has already been
		 * converted to Unicode.
		 * @memberOf punycode
		 * @param {String} input The Punycoded domain name or email address to
		 * convert to Unicode.
		 * @returns {String} The Unicode representation of the given Punycode
		 * string.
		 */
		function toUnicode(input) {
			return mapDomain(input, function(string) {
				return regexPunycode.test(string)
					? decode(string.slice(4).toLowerCase())
					: string;
			});
		}

		/**
		 * Converts a Unicode string representing a domain name or an email address to
		 * Punycode. Only the non-ASCII parts of the domain name will be converted,
		 * i.e. it doesn't matter if you call it with a domain that's already in
		 * ASCII.
		 * @memberOf punycode
		 * @param {String} input The domain name or email address to convert, as a
		 * Unicode string.
		 * @returns {String} The Punycode representation of the given domain name or
		 * email address.
		 */
		function toASCII(input) {
			return mapDomain(input, function(string) {
				return regexNonASCII.test(string)
					? 'xn--' + encode(string)
					: string;
			});
		}

		/*--------------------------------------------------------------------------*/

		/** Define the public API */
		punycode = {
			/**
			 * A string representing the current Punycode.js version number.
			 * @memberOf punycode
			 * @type String
			 */
			'version': '1.4.1',
			/**
			 * An object of methods to convert from JavaScript's internal character
			 * representation (UCS-2) to Unicode code points, and back.
			 * @see <https://mathiasbynens.be/notes/javascript-encoding>
			 * @memberOf punycode
			 * @type Object
			 */
			'ucs2': {
				'decode': ucs2decode,
				'encode': ucs2encode
			},
			'decode': decode,
			'encode': encode,
			'toASCII': toASCII,
			'toUnicode': toUnicode
		};

		/** Expose `punycode` */
		// Some AMD build optimizers, like r.js, check for specific condition patterns
		// like the following:
		if (
			true
		) {
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
				return punycode;
			}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if (freeExports && freeModule) {
			if (module.exports == freeExports) {
				// in Node.js, io.js, or RingoJS v0.8.0+
				freeModule.exports = punycode;
			} else {
				// in Narwhal or RingoJS v0.7.0-
				for (key in punycode) {
					punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
				}
			}
		} else {
			// in Rhino or a web browser
			root.punycode = punycode;
		}

	}(this));

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(65)(module), (function() { return this; }())))

/***/ },
/* 61 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	'use strict';

	// If obj.hasOwnProperty has been overridden, then calling
	// obj.hasOwnProperty(prop) will break.
	// See: https://github.com/joyent/node/issues/1707
	function hasOwnProperty(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}

	module.exports = function(qs, sep, eq, options) {
	  sep = sep || '&';
	  eq = eq || '=';
	  var obj = {};

	  if (typeof qs !== 'string' || qs.length === 0) {
	    return obj;
	  }

	  var regexp = /\+/g;
	  qs = qs.split(sep);

	  var maxKeys = 1000;
	  if (options && typeof options.maxKeys === 'number') {
	    maxKeys = options.maxKeys;
	  }

	  var len = qs.length;
	  // maxKeys <= 0 means that we should not limit keys count
	  if (maxKeys > 0 && len > maxKeys) {
	    len = maxKeys;
	  }

	  for (var i = 0; i < len; ++i) {
	    var x = qs[i].replace(regexp, '%20'),
	        idx = x.indexOf(eq),
	        kstr, vstr, k, v;

	    if (idx >= 0) {
	      kstr = x.substr(0, idx);
	      vstr = x.substr(idx + 1);
	    } else {
	      kstr = x;
	      vstr = '';
	    }

	    k = decodeURIComponent(kstr);
	    v = decodeURIComponent(vstr);

	    if (!hasOwnProperty(obj, k)) {
	      obj[k] = v;
	    } else if (isArray(obj[k])) {
	      obj[k].push(v);
	    } else {
	      obj[k] = [obj[k], v];
	    }
	  }

	  return obj;
	};

	var isArray = Array.isArray || function (xs) {
	  return Object.prototype.toString.call(xs) === '[object Array]';
	};


/***/ },
/* 62 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	'use strict';

	var stringifyPrimitive = function(v) {
	  switch (typeof v) {
	    case 'string':
	      return v;

	    case 'boolean':
	      return v ? 'true' : 'false';

	    case 'number':
	      return isFinite(v) ? v : '';

	    default:
	      return '';
	  }
	};

	module.exports = function(obj, sep, eq, name) {
	  sep = sep || '&';
	  eq = eq || '=';
	  if (obj === null) {
	    obj = undefined;
	  }

	  if (typeof obj === 'object') {
	    return map(objectKeys(obj), function(k) {
	      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
	      if (isArray(obj[k])) {
	        return map(obj[k], function(v) {
	          return ks + encodeURIComponent(stringifyPrimitive(v));
	        }).join(sep);
	      } else {
	        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
	      }
	    }).join(sep);

	  }

	  if (!name) return '';
	  return encodeURIComponent(stringifyPrimitive(name)) + eq +
	         encodeURIComponent(stringifyPrimitive(obj));
	};

	var isArray = Array.isArray || function (xs) {
	  return Object.prototype.toString.call(xs) === '[object Array]';
	};

	function map (xs, f) {
	  if (xs.map) return xs.map(f);
	  var res = [];
	  for (var i = 0; i < xs.length; i++) {
	    res.push(f(xs[i], i));
	  }
	  return res;
	}

	var objectKeys = Object.keys || function (obj) {
	  var res = [];
	  for (var key in obj) {
	    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
	  }
	  return res;
	};


/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.decode = exports.parse = __webpack_require__(61);
	exports.encode = exports.stringify = __webpack_require__(62);


/***/ },
/* 64 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	  isString: function(arg) {
	    return typeof(arg) === 'string';
	  },
	  isObject: function(arg) {
	    return typeof(arg) === 'object' && arg !== null;
	  },
	  isNull: function(arg) {
	    return arg === null;
	  },
	  isNullOrUndefined: function(arg) {
	    return arg == null;
	  }
	};


/***/ },
/* 65 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			Object.defineProperty(module, "loaded", {
				enumerable: true,
				configurable: false,
				get: function() { return module.l; }
			});
			Object.defineProperty(module, "id", {
				enumerable: true,
				configurable: false,
				get: function() { return module.i; }
			});
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 66 */
/***/ function(module, exports) {

	module.exports = require("lodash/lang");

/***/ }
/******/ ])
});
;