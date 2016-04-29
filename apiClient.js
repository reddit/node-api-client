(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("lodash/object"), require("superagent"), require("lodash/lang"), require("lodash/array"), require("lodash/collection"));
	else if(typeof define === 'function' && define.amd)
		define(["lodash/object", "superagent", "lodash/lang", "lodash/array", "lodash/collection"], factory);
	else if(typeof exports === 'object')
		exports["apiClient.js"] = factory(require("lodash/object"), require("superagent"), require("lodash/lang"), require("lodash/array"), require("lodash/collection"));
	else
		root["apiClient.js"] = factory(root["lodash/object"], root["superagent"], root["lodash/lang"], root["lodash/array"], root["lodash/collection"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_25__, __WEBPACK_EXTERNAL_MODULE_72__, __WEBPACK_EXTERNAL_MODULE_78__, __WEBPACK_EXTERNAL_MODULE_180__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 54);
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
/* 2 */,
/* 3 */
/***/ function(module, exports) {

	module.exports = require("lodash/object");

/***/ },
/* 4 */,
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony export */ exports["g"] = thingType;var COMMENT = 'comment';
	/* harmony export */ Object.defineProperty(exports, "a", {configurable: false, enumerable: true, get: function() { return COMMENT; }});
	var COMMENT_TYPE = 't1';/* unused harmony export COMMENT_TYPE */
	var COMMENT_LOAD_MORE = 'comment_load_more';
	/* harmony export */ Object.defineProperty(exports, "h", {configurable: false, enumerable: true, get: function() { return COMMENT_LOAD_MORE; }});

	var USER = 'user';
	/* harmony export */ Object.defineProperty(exports, "c", {configurable: false, enumerable: true, get: function() { return USER; }});
	var USER_TYPE = 't2';
	/* harmony export */ Object.defineProperty(exports, "j", {configurable: false, enumerable: true, get: function() { return USER_TYPE; }});

	var LINK = 'link';
	/* harmony export */ Object.defineProperty(exports, "b", {configurable: false, enumerable: true, get: function() { return LINK; }});
	var LINK_TYPE = 't3';
	/* harmony export */ Object.defineProperty(exports, "i", {configurable: false, enumerable: true, get: function() { return LINK_TYPE; }});

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
/* 6 */,
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
/* 9 */,
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

	/* harmony export */ exports["a"] = process;function process(text) {
	  if (!text) return text;

	  text = text.replace(/<a/g, '<a target="_blank"');

	  return text;
	}

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__apiBase_BaseEndpoint__ = __webpack_require__(224);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_multi__ = __webpack_require__(26);
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




	var ID_REGEX = /^user\/[^\/]+\/m\/[^\/]+$/;

	var MultisEndpoint = function (_BaseEndpoint) {
	  _inherits(MultisEndpoint, _BaseEndpoint);

	  function MultisEndpoint() {
	    var _Object$getPrototypeO;

	    var _temp, _this, _ret;

	    _classCallCheck(this, MultisEndpoint);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(MultisEndpoint)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.model = /* harmony import */__WEBPACK_IMPORTED_MODULE_1__models_multi__["a"], _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(MultisEndpoint, [{
	    key: 'path',
	    value: function path(method) {
	      var query = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	      var id = MultisEndpoint.buildId(query);

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

	          multi.subreddits = MultisEndpoint.mapSubreddits(multi.subreddits);
	          return new /* harmony import */__WEBPACK_IMPORTED_MODULE_1__models_multi__["a"](multi).toJSON();
	        });
	      } else if (body) {
	        var multi = body.data;
	        multi.subreddits = MultisEndpoint.mapSubreddits(multi.subreddits);
	        return new /* harmony import */__WEBPACK_IMPORTED_MODULE_1__models_multi__["a"](multi);
	      }
	    }
	  }, {
	    key: 'formatData',
	    value: function formatData(data) {
	      return MultisEndpoint.formatData(data);
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
	        return new /* harmony import */__WEBPACK_IMPORTED_MODULE_1__models_multi__["a"](body.data || body).toJSON();
	      }
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

	  return MultisEndpoint;
	}(/* harmony import */__WEBPACK_IMPORTED_MODULE_0__apiBase_BaseEndpoint__["a"]);

	/* harmony default export */ exports["a"] = MultisEndpoint;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__apiBase_BaseEndpoint__ = __webpack_require__(224);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_save__ = __webpack_require__(27);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash_object__ = __webpack_require__(3);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash_object___default = __WEBPACK_IMPORTED_MODULE_2_lodash_object__ && __WEBPACK_IMPORTED_MODULE_2_lodash_object__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_2_lodash_object__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_2_lodash_object__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_2_lodash_object___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_2_lodash_object___default });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models2_Comment__ = __webpack_require__(74);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models2_Link__ = __webpack_require__(61);
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }









	var CONSTRUCTORS = {
	  t1: /* harmony import */__WEBPACK_IMPORTED_MODULE_3__models2_Comment__["a"],
	  t3: /* harmony import */__WEBPACK_IMPORTED_MODULE_4__models2_Link__["a"]
	};

	var SavedEndpoint = function (_BaseEndpoint) {
	  _inherits(SavedEndpoint, _BaseEndpoint);

	  function SavedEndpoint() {
	    var _Object$getPrototypeO;

	    var _temp, _this, _ret;

	    _classCallCheck(this, SavedEndpoint);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(SavedEndpoint)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.model = /* harmony import */__WEBPACK_IMPORTED_MODULE_1__models_save__["a"], _this.move = _this.notImplemented('move'), _this.copy = _this.notImplemented('copy'), _this.put = _this.notImplemented('put'), _this.patch = _this.notImplemented('patch'), _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(SavedEndpoint, [{
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

	      return _get(Object.getPrototypeOf(SavedEndpoint.prototype), 'post', this).call(this, postData);
	    }
	  }, {
	    key: 'del',
	    value: function del(data) {
	      var postData = {
	        id: data.id,
	        category: data.category,
	        _method: 'post'
	      };

	      return _get(Object.getPrototypeOf(SavedEndpoint.prototype), 'del', this).call(this, postData);
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
	        try {
	          apiResponse.addResult(CONSTRUCTORS[t.kind].fromJSON(t.data));
	        } catch (e) {
	          console.log(constructor);
	          console.log(t);
	          console.trace(e);
	        }
	      });
	    }
	  }]);

	  return SavedEndpoint;
	}(/* harmony import */__WEBPACK_IMPORTED_MODULE_0__apiBase_BaseEndpoint__["a"]);

	/* harmony default export */ exports["a"] = SavedEndpoint;

/***/ },
/* 15 */
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
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base__ = __webpack_require__(0);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models2_thingTypes__ = __webpack_require__(5);
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

	      return /* harmony import */__WEBPACK_IMPORTED_MODULE_1__models2_thingTypes__["j"] + '_' + props.id;
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
/* 17 */
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
/* 18 */
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
/* 19 */
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
/* 20 */
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
/* 21 */
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
/* 22 */
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
/* 23 */
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
/* 24 */
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
/* 25 */
/***/ function(module, exports) {

	module.exports = require("superagent");

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

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__apiBase_BaseEndpoint__ = __webpack_require__(224);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_account__ = __webpack_require__(16);
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




	var AccountsEndpoint = function (_BaseEndpoint) {
	  _inherits(AccountsEndpoint, _BaseEndpoint);

	  function AccountsEndpoint() {
	    var _Object$getPrototypeO;

	    var _temp, _this, _ret;

	    _classCallCheck(this, AccountsEndpoint);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(AccountsEndpoint)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.move = _this.notImplemented('move'), _this.copy = _this.notImplemented('copy'), _this.put = _this.notImplemented('put'), _this.patch = _this.notImplemented('patch'), _this.post = _this.notImplemented('post'), _this.del = _this.notImplemented('del'), _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(AccountsEndpoint, [{
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
	        apiResponse.addResult(new /* harmony import */__WEBPACK_IMPORTED_MODULE_1__models_account__["a"](body.data || body).toJSON());
	      }
	    }
	  }]);

	  return AccountsEndpoint;
	}(/* harmony import */__WEBPACK_IMPORTED_MODULE_0__apiBase_BaseEndpoint__["a"]);

	/* harmony default export */ exports["a"] = AccountsEndpoint;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__apiBase_BaseEndpoint__ = __webpack_require__(224);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models2_Comment__ = __webpack_require__(74);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models2_Link__ = __webpack_require__(61);
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






	var CONSTRUCTORS = {
	  t1: /* harmony import */__WEBPACK_IMPORTED_MODULE_1__models2_Comment__["a"],
	  t3: /* harmony import */__WEBPACK_IMPORTED_MODULE_2__models2_Link__["a"]
	};

	var ActivitiesEndpoint = function (_BaseEndpoint) {
	  _inherits(ActivitiesEndpoint, _BaseEndpoint);

	  function ActivitiesEndpoint() {
	    var _Object$getPrototypeO;

	    var _temp, _this, _ret;

	    _classCallCheck(this, ActivitiesEndpoint);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(ActivitiesEndpoint)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.move = _this.notImplemented('move'), _this.copy = _this.notImplemented('copy'), _this.put = _this.notImplemented('put'), _this.patch = _this.notImplemented('patch'), _this.post = _this.notImplemented('post'), _this.del = _this.notImplemented('del'), _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(ActivitiesEndpoint, [{
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
	          apiResponse.addResult(constructor.fromJSON(a.data));
	        });
	      }
	    }
	  }]);

	  return ActivitiesEndpoint;
	}(/* harmony import */__WEBPACK_IMPORTED_MODULE_0__apiBase_BaseEndpoint__["a"]);

	/* harmony default export */ exports["a"] = ActivitiesEndpoint;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__apiBase_BaseEndpoint__ = __webpack_require__(224);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash_object__ = __webpack_require__(3);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash_object___default = __WEBPACK_IMPORTED_MODULE_1_lodash_object__ && __WEBPACK_IMPORTED_MODULE_1_lodash_object__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_1_lodash_object__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_1_lodash_object__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_1_lodash_object___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_1_lodash_object___default });
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




	var CaptchaEndpoint = function (_BaseEndpoint) {
	  _inherits(CaptchaEndpoint, _BaseEndpoint);

	  function CaptchaEndpoint() {
	    var _Object$getPrototypeO;

	    var _temp, _this, _ret;

	    _classCallCheck(this, CaptchaEndpoint);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(CaptchaEndpoint)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.move = _this.notImplemented('move'), _this.copy = _this.notImplemented('copy'), _this.put = _this.notImplemented('put'), _this.patch = _this.notImplemented('patch'), _this.del = _this.notImplemented('del'), _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(CaptchaEndpoint, [{
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
	  }]);

	  return CaptchaEndpoint;
	}(/* harmony import */__WEBPACK_IMPORTED_MODULE_0__apiBase_BaseEndpoint__["a"]);

	/* harmony default export */ exports["a"] = CaptchaEndpoint;

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_object__ = __webpack_require__(3);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_object___default = __WEBPACK_IMPORTED_MODULE_0_lodash_object__ && __WEBPACK_IMPORTED_MODULE_0_lodash_object__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0_lodash_object__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0_lodash_object__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_0_lodash_object___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_0_lodash_object___default });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__BaseContentEndpoint__ = __webpack_require__(234);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models2_Comment__ = __webpack_require__(74);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models2_Link__ = __webpack_require__(61);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__lib_commentTreeUtils__ = __webpack_require__(55);
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }









	var CommentsEndpoint = function (_BaseContentEndpoint) {
	  _inherits(CommentsEndpoint, _BaseContentEndpoint);

	  function CommentsEndpoint() {
	    var _Object$getPrototypeO;

	    var _temp, _this, _ret;

	    _classCallCheck(this, CommentsEndpoint);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(CommentsEndpoint)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.model = /* harmony import */__WEBPACK_IMPORTED_MODULE_2__models2_Comment__["a"], _this.move = _this.notImplemented('move'), _this.copy = _this.notImplemented('copy'), _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(CommentsEndpoint, [{
	    key: 'formatQuery',
	    value: function formatQuery(query, method) {
	      query = _get(Object.getPrototypeOf(CommentsEndpoint.prototype), 'formatQuery', this).call(this, query, method);

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
	        return 'comments/' + (query.id || query.linkId).replace(/^t3_/, '') + '.json';
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

	      return _get(Object.getPrototypeOf(CommentsEndpoint.prototype), 'post', this).call(this, postData);
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
	              apiResponse.addModel(/* harmony import */__WEBPACK_IMPORTED_MODULE_3__models2_Link__["a"].fromJSON(link.data));
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

	        /* harmony import */__WEBPACK_IMPORTED_MODULE_4__lib_commentTreeUtils__["c"].bind()(comments, function (commentJSON, isTopLevel) {
	          try {
	            // parsing is done bottom up, comment models are immutable
	            // but they'll rely on the records
	            var comment = /* harmony import */__WEBPACK_IMPORTED_MODULE_2__models2_Comment__["a"].fromJSON(commentJSON);
	            if (isTopLevel) {
	              apiResponse.addResult(comment);
	            } else {
	              apiResponse.addModel(comment);
	            }

	            // this sets replies to be records for consistency
	            return comment.toRecord();
	          } catch (e) {
	            console.log('asdfasdfasdf');
	            console.trace(e);
	          }
	        });
	      } else {
	        if (/* harmony import */__WEBPACK_IMPORTED_MODULE_0_lodash_object__["has"].bind()(body, 'json.data.things.0.data')) {
	          var comment = body.json.data.things[0].data;
	          apiResponse.addResult(/* harmony import */__WEBPACK_IMPORTED_MODULE_2__models2_Comment__["a"].fromJSON(comment));
	        }
	      }
	    }
	  }]);

	  return CommentsEndpoint;
	}(/* harmony import */__WEBPACK_IMPORTED_MODULE_1__BaseContentEndpoint__["a"]);

	/* harmony default export */ exports["a"] = CommentsEndpoint;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__saved__ = __webpack_require__(14);
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



	var HiddenEndpoint = function (_SavedEndpoint) {
	  _inherits(HiddenEndpoint, _SavedEndpoint);

	  function HiddenEndpoint() {
	    _classCallCheck(this, HiddenEndpoint);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(HiddenEndpoint).apply(this, arguments));
	  }

	  _createClass(HiddenEndpoint, [{
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

	  return HiddenEndpoint;
	}(/* harmony import */__WEBPACK_IMPORTED_MODULE_0__saved__["a"]);

	/* harmony default export */ exports["a"] = HiddenEndpoint;

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BaseContentEndpoint__ = __webpack_require__(234);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models2_Link__ = __webpack_require__(61);
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




	var LinksEndpoint = function (_BaseContentEndpoint) {
	  _inherits(LinksEndpoint, _BaseContentEndpoint);

	  function LinksEndpoint() {
	    var _Object$getPrototypeO;

	    var _temp, _this, _ret;

	    _classCallCheck(this, LinksEndpoint);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(LinksEndpoint)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.model = /* harmony import */__WEBPACK_IMPORTED_MODULE_1__models2_Link__["a"], _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(LinksEndpoint, [{
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

	      return _get(Object.getPrototypeOf(LinksEndpoint.prototype), 'post', this).call(this, postData);
	    }
	  }, {
	    key: 'time',
	    value: function time(times, parseTimes) {
	      var _this2 = this;

	      var start = Date.now();
	      return this.get({ subredditName: 'earthporn', limit: 100 }).then(function (res) {
	        var time = Date.now() - start;
	        times.push(time);
	        parseTimes.push(_this2.parseTime);
	        console.log('took ' + time + ' -- parseTime ' + _this2.parseTime);
	        console.log('num results? ' + res.results.length);
	      });
	    }
	  }, {
	    key: 'printTimeStats',
	    value: function printTimeStats(kind, times) {
	      console.log('KIND: ' + kind);
	      var average = times.reduce(function (total, x) {
	        return x + total;
	      }, 0) / times.length;
	      var min = times.reduce(function (x, y) {
	        return Math.min(x, y);
	      }, Infinity);
	      var max = times.reduce(function (x, y) {
	        return Math.max(x, y);
	      }, -Infinity);
	      console.log('\t' + times.length + ' took ' + average + ' averaged');
	      console.log('\tMax: ' + max + ' -- Min: ' + min);
	      times.sort(function (a, b) {
	        return a - b;
	      });
	      console.log('\ttimes ' + times);
	      return;
	    }
	  }, {
	    key: 'timeAverages',
	    value: function () {
	      var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(numTimes) {
	        var _this3 = this;

	        var times = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];
	        var parseTimes = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];
	        return regeneratorRuntime.wrap(function _callee$(_context) {
	          while (1) {
	            switch (_context.prev = _context.next) {
	              case 0:
	                this.printTimeStats('Overall', times);
	                this.printTimeStats('PARSING', parseTimes);

	                if (!(numTimes === 0)) {
	                  _context.next = 6;
	                  break;
	                }

	                return _context.abrupt('return');

	              case 6:
	                console.log('pending requests ' + numTimes);

	              case 7:
	                _context.next = 9;
	                return this.time(times, parseTimes);

	              case 9:
	                setTimeout(function () {
	                  console.log('next');
	                  _this3.timeAverages(numTimes - 1, times, parseTimes);
	                }, 10);

	              case 10:
	              case 'end':
	                return _context.stop();
	            }
	          }
	        }, _callee, this);
	      }));

	      function timeAverages(_x, _x2, _x3) {
	        return ref.apply(this, arguments);
	      }

	      return timeAverages;
	    }()
	  }, {
	    key: 'parseBody',
	    value: function parseBody(res, apiResponse, req, method) {
	      var body = res.body;


	      if (method === 'get') {
	        var data = body.data;


	        if (data && data.children && data.children[0]) {
	          if (data.children.length === 1) {
	            apiResponse.addResult(/* harmony import */__WEBPACK_IMPORTED_MODULE_1__models2_Link__["a"].fromJSON(data.children[0].data));
	            return;
	          } else {
	            data.children.forEach(function (c) {
	              return apiResponse.addResult(/* harmony import */__WEBPACK_IMPORTED_MODULE_1__models2_Link__["a"].fromJSON(c.data));
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

	  return LinksEndpoint;
	}(/* harmony import */__WEBPACK_IMPORTED_MODULE_0__BaseContentEndpoint__["a"]);

	/* harmony default export */ exports["a"] = LinksEndpoint;

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_object__ = __webpack_require__(3);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_object___default = __WEBPACK_IMPORTED_MODULE_0_lodash_object__ && __WEBPACK_IMPORTED_MODULE_0_lodash_object__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0_lodash_object__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0_lodash_object__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_0_lodash_object___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_0_lodash_object___default });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__apiBase_BaseEndpoint__ = __webpack_require__(224);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models2_Comment__ = __webpack_require__(74);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models2_Link__ = __webpack_require__(61);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_message__ = __webpack_require__(17);
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }







	var CONSTRUCTORS = {
	  t1: /* harmony import */__WEBPACK_IMPORTED_MODULE_2__models2_Comment__["a"],
	  t3: /* harmony import */__WEBPACK_IMPORTED_MODULE_3__models2_Link__["a"],
	  t4: /* harmony import */__WEBPACK_IMPORTED_MODULE_4__models_message__["a"]
	};

	var MessagesEndpoint = function (_BaseEndpoint) {
	  _inherits(MessagesEndpoint, _BaseEndpoint);

	  function MessagesEndpoint() {
	    var _Object$getPrototypeO;

	    var _temp, _this, _ret;

	    _classCallCheck(this, MessagesEndpoint);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(MessagesEndpoint)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.move = _this.notImplemented('move'), _this.copy = _this.notImplemented('copy'), _this.put = _this.notImplemented('put'), _this.patch = _this.notImplemented('patch'), _this.del = _this.notImplemented('del'), _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(MessagesEndpoint, [{
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
	          var thing = datum.data;
	          // const thing = new CONSTRUCTORS[datum.kind](datum.data).toJSON();

	          if (datum.kind === 't4' && thing.replies && thing.replies.data && thing.replies.data.children) {

	            thing.replies = thing.replies.data.children.map(function (messageDatum) {
	              var message = new /* harmony import */__WEBPACK_IMPORTED_MODULE_4__models_message__["a"](messageDatum.data).toJSON();
	              apiResponse.addModel(message);
	              return apiResponse.makeRecord(message);
	            });
	          }

	          apiResponse.addResult(CONSTRUCTORS[datum.kind].fromJSON(thing));
	        });
	      } else if (method === 'post') {
	        if (body && body.json) {
	          var message = body.json.things[0].data;
	          apiResponse.addResult(new /* harmony import */__WEBPACK_IMPORTED_MODULE_4__models_message__["a"](message).toJSON());
	        } else if (body && body.json.errors.length) {
	          throw body.json.errors;
	        } else {
	          apiResponse.addResult(res);
	        }
	      }
	    }
	  }]);

	  return MessagesEndpoint;
	}(/* harmony import */__WEBPACK_IMPORTED_MODULE_1__apiBase_BaseEndpoint__["a"]);

	/* harmony default export */ exports["a"] = MessagesEndpoint;

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BaseContentEndpoint__ = __webpack_require__(234);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash_object__ = __webpack_require__(3);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash_object___default = __WEBPACK_IMPORTED_MODULE_1_lodash_object__ && __WEBPACK_IMPORTED_MODULE_1_lodash_object__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_1_lodash_object__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_1_lodash_object__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_1_lodash_object___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_1_lodash_object___default });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models2_Link__ = __webpack_require__(61);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models2_Comment__ = __webpack_require__(74);
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }







	var ModListingEndpoint = function (_BaseContentEndpoint) {
	  _inherits(ModListingEndpoint, _BaseContentEndpoint);

	  function ModListingEndpoint() {
	    var _Object$getPrototypeO;

	    var _temp, _this, _ret;

	    _classCallCheck(this, ModListingEndpoint);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(ModListingEndpoint)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.move = _this.notImplemented('move'), _this.copy = _this.notImplemented('copy'), _this.put = _this.notImplemented('put'), _this.patch = _this.notImplemented('patch'), _this.del = _this.notImplemented('del'), _this.post = _this.notImplemented('post'), _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(ModListingEndpoint, [{
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
	            apiResponse.addResult(/* harmony import */__WEBPACK_IMPORTED_MODULE_2__models2_Link__["a"].fromJSON(c.data));
	          } else if (c.kind === 't1') {
	            apiResponse.addResult(/* harmony import */__WEBPACK_IMPORTED_MODULE_3__models2_Comment__["a"].fromJSON(c.data));
	          }
	        });
	      }
	    }
	  }]);

	  return ModListingEndpoint;
	}(/* harmony import */__WEBPACK_IMPORTED_MODULE_0__BaseContentEndpoint__["a"]);

	/* harmony default export */ exports["a"] = ModListingEndpoint;

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__apiBase_BaseEndpoint__ = __webpack_require__(224);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_multi__ = __webpack_require__(26);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__multis__ = __webpack_require__(13);
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






	var MultiSubscriptionsEndpoint = function (_BaseEndpoint) {
	  _inherits(MultiSubscriptionsEndpoint, _BaseEndpoint);

	  function MultiSubscriptionsEndpoint() {
	    var _Object$getPrototypeO;

	    var _temp, _this, _ret;

	    _classCallCheck(this, MultiSubscriptionsEndpoint);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(MultiSubscriptionsEndpoint)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.model = /* harmony import */__WEBPACK_IMPORTED_MODULE_1__models_multi__["a"], _this.move = _this.notImplemented('move'), _this.copy = _this.notImplemented('copy'), _this.get = _this.notImplemented('get'), _this.post = _this.notImplemented('post'), _this.patch = _this.notImplemented('patch'), _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(MultiSubscriptionsEndpoint, [{
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
	  }]);

	  return MultiSubscriptionsEndpoint;
	}(/* harmony import */__WEBPACK_IMPORTED_MODULE_0__apiBase_BaseEndpoint__["a"]);

	/* harmony default export */ exports["a"] = MultiSubscriptionsEndpoint;

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__apiBase_BaseEndpoint__ = __webpack_require__(224);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_report__ = __webpack_require__(18);
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




	var ReportsEndpoint = function (_BaseEndpoint) {
	  _inherits(ReportsEndpoint, _BaseEndpoint);

	  function ReportsEndpoint() {
	    var _Object$getPrototypeO;

	    var _temp, _this, _ret;

	    _classCallCheck(this, ReportsEndpoint);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(ReportsEndpoint)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.model = /* harmony import */__WEBPACK_IMPORTED_MODULE_1__models_report__["a"], _this.move = _this.notImplemented('move'), _this.copy = _this.notImplemented('copy'), _this.get = _this.notImplemented('get'), _this.put = _this.notImplemented('put'), _this.patch = _this.notImplemented('patch'), _this.del = _this.notImplemented('del'), _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(ReportsEndpoint, [{
	    key: 'path',
	    value: function path() {
	      return 'api/report';
	    }
	  }, {
	    key: 'post',
	    value: function post(data) {
	      return _get(Object.getPrototypeOf(ReportsEndpoint.prototype), 'post', this).call(this, _extends({}, data, {
	        reason: 'other',
	        api_type: 'json'
	      }));
	    }
	  }]);

	  return ReportsEndpoint;
	}(/* harmony import */__WEBPACK_IMPORTED_MODULE_0__apiBase_BaseEndpoint__["a"]);

	/* harmony default export */ exports["a"] = ReportsEndpoint;

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BaseContentEndpoint__ = __webpack_require__(234);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_rule__ = __webpack_require__(58);
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

	var RulesEndpoint = function (_BaseContentEndpoint) {
	  _inherits(RulesEndpoint, _BaseContentEndpoint);

	  function RulesEndpoint() {
	    var _Object$getPrototypeO;

	    var _temp, _this, _ret;

	    _classCallCheck(this, RulesEndpoint);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(RulesEndpoint)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.model = /* harmony import */__WEBPACK_IMPORTED_MODULE_1__models_rule__["a"], _this.move = _this.notImplemented('move'), _this.copy = _this.notImplemented('copy'), _this.put = _this.notImplemented('put'), _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(RulesEndpoint, [{
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

	      return _get(Object.getPrototypeOf(RulesEndpoint.prototype), 'post', this).call(this, postData);
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

	      return _get(Object.getPrototypeOf(RulesEndpoint.prototype), 'patch', this).call(this, _extends({}, patchData, changes));
	    }
	  }, {
	    key: 'del',
	    value: function del(data) {
	      return _get(Object.getPrototypeOf(RulesEndpoint.prototype), 'del', this).call(this, {
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
	          return new /* harmony import */__WEBPACK_IMPORTED_MODULE_1__models_rule__["a"](_extends({}, ruleData, { r: r })).toJSON();
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

	        return new /* harmony import */__WEBPACK_IMPORTED_MODULE_1__models_rule__["a"](ruleData).toJSON();
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
	  }]);

	  return RulesEndpoint;
	}(/* harmony import */__WEBPACK_IMPORTED_MODULE_0__BaseContentEndpoint__["a"]);

	/* harmony default export */ exports["a"] = RulesEndpoint;

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__apiBase_BaseEndpoint__ = __webpack_require__(224);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_save__ = __webpack_require__(27);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models2_Link__ = __webpack_require__(61);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models2_Subreddit__ = __webpack_require__(76);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models2_thingTypes__ = __webpack_require__(5);
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }








	var SearchEndpoint = function (_BaseEndpoint) {
	  _inherits(SearchEndpoint, _BaseEndpoint);

	  function SearchEndpoint() {
	    var _Object$getPrototypeO;

	    var _temp, _this, _ret;

	    _classCallCheck(this, SearchEndpoint);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(SearchEndpoint)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.model = /* harmony import */__WEBPACK_IMPORTED_MODULE_1__models_save__["a"], _this.move = _this.notImplemented('move'), _this.copy = _this.notImplemented('copy'), _this.put = _this.notImplemented('put'), _this.patch = _this.notImplemented('patch'), _this.post = _this.notImplemented('post'), _this.del = _this.notImplemented('del'), _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(SearchEndpoint, [{
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
	          if (listing.data.children[0].kind === /* harmony import */__WEBPACK_IMPORTED_MODULE_4__models2_thingTypes__["i"]) {
	            listing.data.children.forEach(function (link) {
	              apiResponse.addResult(/* harmony import */__WEBPACK_IMPORTED_MODULE_2__models2_Link__["a"].fromJSON(link.data));
	            });

	            apiResponse.meta.after = listing.data.after;
	            apiResponse.meta.before = listing.data.before;
	          } else {
	            listing.data.children.forEach(function (subreddit) {
	              apiResponse.addResult(new /* harmony import */__WEBPACK_IMPORTED_MODULE_3__models2_Subreddit__["a"](subreddit.data).toJSON());
	            });
	          }
	        }
	      });
	    }
	  }]);

	  return SearchEndpoint;
	}(/* harmony import */__WEBPACK_IMPORTED_MODULE_0__apiBase_BaseEndpoint__["a"]);

	/* harmony default export */ exports["a"] = SearchEndpoint;

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__apiBase_BaseEndpoint__ = __webpack_require__(224);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_stylesheet__ = __webpack_require__(59);
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




	var StylesheetsEndpoint = function (_BaseEndpoint) {
	  _inherits(StylesheetsEndpoint, _BaseEndpoint);

	  function StylesheetsEndpoint() {
	    var _Object$getPrototypeO;

	    var _temp, _this, _ret;

	    _classCallCheck(this, StylesheetsEndpoint);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(StylesheetsEndpoint)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.move = _this.notImplemented('move'), _this.copy = _this.notImplemented('copy'), _this.put = _this.notImplemented('put'), _this.patch = _this.notImplemented('patch'), _this.post = _this.notImplemented('post'), _this.del = _this.notImplemented('del'), _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(StylesheetsEndpoint, [{
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
	  }]);

	  return StylesheetsEndpoint;
	}(/* harmony import */__WEBPACK_IMPORTED_MODULE_0__apiBase_BaseEndpoint__["a"]);

	/* harmony default export */ exports["a"] = StylesheetsEndpoint;

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BaseContentEndpoint__ = __webpack_require__(234);
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

	var SubredditRelationshipsEndpoint = function (_BaseContentEndpoint) {
	  _inherits(SubredditRelationshipsEndpoint, _BaseContentEndpoint);

	  function SubredditRelationshipsEndpoint() {
	    var _Object$getPrototypeO;

	    var _temp, _this, _ret;

	    _classCallCheck(this, SubredditRelationshipsEndpoint);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(SubredditRelationshipsEndpoint)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.move = _this.notImplemented('move'), _this.copy = _this.notImplemented('copy'), _this.put = _this.notImplemented('put'), _this.patch = _this.notImplemented('patch'), _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(SubredditRelationshipsEndpoint, [{
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
	      return _get(Object.getPrototypeOf(SubredditRelationshipsEndpoint.prototype), 'get', this).call(this, data);
	    }
	  }, {
	    key: 'post',
	    value: function post(data) {
	      data.api_type = 'json';
	      return _get(Object.getPrototypeOf(SubredditRelationshipsEndpoint.prototype), 'post', this).call(this, data);
	    }
	  }, {
	    key: 'del',
	    value: function del(data) {
	      data._method = 'post';
	      return _get(Object.getPrototypeOf(SubredditRelationshipsEndpoint.prototype), 'del', this).call(this, data);
	    }
	  }]);

	  return SubredditRelationshipsEndpoint;
	}(/* harmony import */__WEBPACK_IMPORTED_MODULE_0__BaseContentEndpoint__["a"]);

	/* harmony default export */ exports["a"] = SubredditRelationshipsEndpoint;

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_object__ = __webpack_require__(3);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_object___default = __WEBPACK_IMPORTED_MODULE_0_lodash_object__ && __WEBPACK_IMPORTED_MODULE_0_lodash_object__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0_lodash_object__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0_lodash_object__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_0_lodash_object___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_0_lodash_object___default });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash_lang__ = __webpack_require__(72);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash_lang___default = __WEBPACK_IMPORTED_MODULE_1_lodash_lang__ && __WEBPACK_IMPORTED_MODULE_1_lodash_lang__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_1_lodash_lang__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_1_lodash_lang__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_1_lodash_lang___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_1_lodash_lang___default });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__apiBase_BaseEndpoint__ = __webpack_require__(224);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models2_Subreddit__ = __webpack_require__(76);
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

	var SubredditsEndpoint = function (_BaseEndpoint) {
	  _inherits(SubredditsEndpoint, _BaseEndpoint);

	  function SubredditsEndpoint() {
	    var _Object$getPrototypeO;

	    var _temp, _this, _ret;

	    _classCallCheck(this, SubredditsEndpoint);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(SubredditsEndpoint)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.model = /* harmony import */__WEBPACK_IMPORTED_MODULE_3__models2_Subreddit__["a"], _this.move = _this.notImplemented('move'), _this.copy = _this.notImplemented('copy'), _this.del = _this.notImplemented('del'), _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(SubredditsEndpoint, [{
	    key: 'patch',
	    value: function patch(data) {
	      var post = this.post.bind(this);
	      var get = this.get.bind(this);
	      // If the data doesn't have all of the keys, get the full subreddit data
	      // and then merge in the changes and submit _that_. The API requires the
	      // full object be sent.
	      if (Object.keys(data).sort() !== /* harmony import */__WEBPACK_IMPORTED_MODULE_3__models2_Subreddit__["a"].fields) {
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

	      return _get(Object.getPrototypeOf(SubredditsEndpoint.prototype), 'post', this).call(this, data);
	    }
	  }, {
	    key: 'post',
	    value: function post(data) {
	      var postData = /* harmony import */__WEBPACK_IMPORTED_MODULE_0_lodash_object__["pick"].bind()(_extends({}, DEFAULT_SUBREDDIT_OPTIONS, data), Object.keys(DEFAULT_SUBREDDIT_OPTIONS));

	      return _get(Object.getPrototypeOf(SubredditsEndpoint.prototype), 'post', this).call(this, postData);
	    }
	  }, {
	    key: 'put',
	    value: function put(data) {
	      var postData = /* harmony import */__WEBPACK_IMPORTED_MODULE_0_lodash_object__["pick"].bind()(_extends({}, DEFAULT_SUBREDDIT_OPTIONS, data, {
	        name: data.id
	      }), Object.keys(DEFAULT_SUBREDDIT_OPTIONS));

	      return _get(Object.getPrototypeOf(SubredditsEndpoint.prototype), 'post', this).call(this, postData);
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
	          return apiResponse.addResult(/* harmony import */__WEBPACK_IMPORTED_MODULE_3__models2_Subreddit__["a"].fromJSON(c.data));
	        });
	        // sometimes, we get back empty object and 200 for invalid sorts like
	        // `mine` when logged out
	      } else if (!/* harmony import */__WEBPACK_IMPORTED_MODULE_1_lodash_lang__["isEmpty"].bind()(body)) {
	          apiResponse.addResult(/* harmony import */__WEBPACK_IMPORTED_MODULE_3__models2_Subreddit__["a"].fromJSON(body.data || body));
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

	  return SubredditsEndpoint;
	}(/* harmony import */__WEBPACK_IMPORTED_MODULE_2__apiBase_BaseEndpoint__["a"]);

	/* harmony default export */ exports["a"] = SubredditsEndpoint;

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__apiBase_BaseEndpoint__ = __webpack_require__(224);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_subscription__ = __webpack_require__(19);
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




	var SubscriptionsEndpoint = function (_BaseEndpoint) {
	  _inherits(SubscriptionsEndpoint, _BaseEndpoint);

	  function SubscriptionsEndpoint() {
	    var _Object$getPrototypeO;

	    var _temp, _this, _ret;

	    _classCallCheck(this, SubscriptionsEndpoint);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(SubscriptionsEndpoint)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.model = /* harmony import */__WEBPACK_IMPORTED_MODULE_1__models_subscription__["a"], _this.move = _this.notImplemented('move'), _this.copy = _this.notImplemented('copy'), _this.put = _this.notImplemented('put'), _this.patch = _this.notImplemented('patch'), _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(SubscriptionsEndpoint, [{
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

	      return _get(Object.getPrototypeOf(SubscriptionsEndpoint.prototype), 'post', this).call(this, postData);
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

	      return _get(Object.getPrototypeOf(SubscriptionsEndpoint.prototype), 'del', this).call(this, postData);
	    }
	  }]);

	  return SubscriptionsEndpoint;
	}(/* harmony import */__WEBPACK_IMPORTED_MODULE_0__apiBase_BaseEndpoint__["a"]);

	/* harmony default export */ exports["a"] = SubscriptionsEndpoint;

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__apiBase_BaseEndpoint__ = __webpack_require__(224);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_trophy__ = __webpack_require__(60);
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





	var TrophiesEndpoint = function (_BaseEndpoint) {
	  _inherits(TrophiesEndpoint, _BaseEndpoint);

	  function TrophiesEndpoint() {
	    var _Object$getPrototypeO;

	    var _temp, _this, _ret;

	    _classCallCheck(this, TrophiesEndpoint);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(TrophiesEndpoint)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.move = _this.notImplemented('move'), _this.copy = _this.notImplemented('copy'), _this.put = _this.notImplemented('put'), _this.patch = _this.notImplemented('patch'), _this.post = _this.notImplemented('post'), _this.del = _this.notImplemented('del'), _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(TrophiesEndpoint, [{
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
	        return new /* harmony import */__WEBPACK_IMPORTED_MODULE_1__models_trophy__["a"](body.data).toJSON();
	      }
	    }
	  }]);

	  return TrophiesEndpoint;
	}(/* harmony import */__WEBPACK_IMPORTED_MODULE_0__apiBase_BaseEndpoint__["a"]);

	/* harmony default export */ exports["a"] = TrophiesEndpoint;

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__apiBase_BaseEndpoint__ = __webpack_require__(224);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_vote__ = __webpack_require__(20);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__errors_validationError__ = __webpack_require__(8);
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






	var VotesEndpoint = function (_BaseEndpoint) {
	  _inherits(VotesEndpoint, _BaseEndpoint);

	  function VotesEndpoint() {
	    var _Object$getPrototypeO;

	    var _temp, _this, _ret;

	    _classCallCheck(this, VotesEndpoint);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(VotesEndpoint)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.model = /* harmony import */__WEBPACK_IMPORTED_MODULE_1__models_vote__["a"], _this.move = _this.notImplemented('move'), _this.copy = _this.notImplemented('copy'), _this.get = _this.notImplemented('get'), _this.put = _this.notImplemented('put'), _this.patch = _this.notImplemented('patch'), _this.del = _this.notImplemented('del'), _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(VotesEndpoint, [{
	    key: 'path',
	    value: function path() {
	      return 'api/vote';
	    }
	  }, {
	    key: 'post',
	    value: function post(data) {
	      var vote = new /* harmony import */__WEBPACK_IMPORTED_MODULE_1__models_vote__["a"](data);
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

	      return _get(Object.getPrototypeOf(VotesEndpoint.prototype), 'post', this).call(this, {
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

	  return VotesEndpoint;
	}(/* harmony import */__WEBPACK_IMPORTED_MODULE_0__apiBase_BaseEndpoint__["a"]);

	VotesEndpoint.defaultCacheConfig = null;
	/* harmony default export */ exports["a"] = VotesEndpoint;

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__apiBase_BaseEndpoint__ = __webpack_require__(224);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models2_Link__ = __webpack_require__(61);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_wikiPage__ = __webpack_require__(21);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_wikiRevision__ = __webpack_require__(24);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_wikiPageListing__ = __webpack_require__(22);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_wikiPageSettings__ = __webpack_require__(23);
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }









	var VotesEndpoint = function (_BaseEndpoint) {
	  _inherits(VotesEndpoint, _BaseEndpoint);

	  function VotesEndpoint() {
	    var _Object$getPrototypeO;

	    var _temp, _this, _ret;

	    _classCallCheck(this, VotesEndpoint);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(VotesEndpoint)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.move = _this.notImplemented('move'), _this.copy = _this.notImplemented('copy'), _this.put = _this.notImplemented('put'), _this.del = _this.notImplemented('del'), _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(VotesEndpoint, [{
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
	      return _get(Object.getPrototypeOf(VotesEndpoint.prototype), 'patch', this).call(this, data);
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
	                    return /* harmony import */__WEBPACK_IMPORTED_MODULE_1__models2_Link__["a"].fromJSON(c.data);
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

	  return VotesEndpoint;
	}(/* harmony import */__WEBPACK_IMPORTED_MODULE_0__apiBase_BaseEndpoint__["a"]);

	VotesEndpoint.defaultCacheConfig = null;
	/* harmony default export */ exports["a"] = VotesEndpoint;

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
/* 52 */,
/* 53 */,
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__apis_activities__ = __webpack_require__(29);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__apis_hidden__ = __webpack_require__(32);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__apis_saved__ = __webpack_require__(14);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__apis_search__ = __webpack_require__(39);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__apis_stylesheets__ = __webpack_require__(40);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__apis_subreddits__ = __webpack_require__(42);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__apis_subscriptions__ = __webpack_require__(43);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__apis_trophies__ = __webpack_require__(44);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__apis_accounts__ = __webpack_require__(28);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__apis_votes__ = __webpack_require__(45);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__apis_links__ = __webpack_require__(33);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__apis_comments__ = __webpack_require__(31);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__apis_captcha__ = __webpack_require__(30);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__apis_reports__ = __webpack_require__(37);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__apis_messages__ = __webpack_require__(34);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__apis_modListing__ = __webpack_require__(35);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__apis_subredditRelationships__ = __webpack_require__(41);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__apis_rules__ = __webpack_require__(38);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__apis_wiki__ = __webpack_require__(46);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__apis_multis__ = __webpack_require__(13);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__apis_multiSubscriptions__ = __webpack_require__(36);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__apiBase_APIResponse__ = __webpack_require__(226);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__apiBase_APIResponsePaging__ = __webpack_require__(225);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__errors_noModelError__ = __webpack_require__(7);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__errors_responseError__ = __webpack_require__(10);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__errors_validationError__ = __webpack_require__(8);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__errors_notImplementedError__ = __webpack_require__(15);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__models_account__ = __webpack_require__(16);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__models_award__ = __webpack_require__(48);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__models_base__ = __webpack_require__(0);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__models_block__ = __webpack_require__(49);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__models_BlockedUser__ = __webpack_require__(47);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__models2_Comment__ = __webpack_require__(74);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__models2_Link__ = __webpack_require__(61);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__models_message__ = __webpack_require__(17);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__models_promocampaign__ = __webpack_require__(51);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__models_preferences__ = __webpack_require__(50);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__models2_Subreddit__ = __webpack_require__(76);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__models_subscription__ = __webpack_require__(19);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__models_vote__ = __webpack_require__(20);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__models_report__ = __webpack_require__(18);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__models_wikiPage__ = __webpack_require__(21);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__models_wikiRevision__ = __webpack_require__(24);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43__models_wikiPageListing__ = __webpack_require__(22);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44__models_wikiPageSettings__ = __webpack_require__(23);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_45__collections_SubredditLists__ = __webpack_require__(223);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_46__collections_CommentsPage__ = __webpack_require__(219);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_47__collections_HiddenPostsAndComments__ = __webpack_require__(220);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_48__collections_PostsFromSubreddit__ = __webpack_require__(221);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_49__collections_SavedPostsAndComments__ = __webpack_require__(218);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_50__collections_SearchQuery__ = __webpack_require__(222);
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }


























	var APIResponses = {
	  APIResponse: /* harmony import */__WEBPACK_IMPORTED_MODULE_21__apiBase_APIResponse__["APIResponse"],
	  MergedApiReponse: /* harmony import */__WEBPACK_IMPORTED_MODULE_21__apiBase_APIResponse__["b"]
	};
	/* harmony export */ Object.defineProperty(exports, "APIResponses", {configurable: false, enumerable: true, get: function() { return APIResponses; }});

	var APIResponsePaging = {
	  withQueryAndResult: /* harmony import */__WEBPACK_IMPORTED_MODULE_22__apiBase_APIResponsePaging__["a"],
	  afterResponse: /* harmony import */__WEBPACK_IMPORTED_MODULE_22__apiBase_APIResponsePaging__["b"],
	  beforeResponse: /* harmony import */__WEBPACK_IMPORTED_MODULE_22__apiBase_APIResponsePaging__["c"],
	  fetchAll: /* harmony import */__WEBPACK_IMPORTED_MODULE_22__apiBase_APIResponsePaging__["d"]
	};
	/* harmony export */ Object.defineProperty(exports, "APIResponsePaging", {configurable: false, enumerable: true, get: function() { return APIResponsePaging; }});

	var APIs = {
	  activities: /* harmony import */__WEBPACK_IMPORTED_MODULE_0__apis_activities__["a"],
	  captcha: /* harmony import */__WEBPACK_IMPORTED_MODULE_12__apis_captcha__["a"],
	  hidden: /* harmony import */__WEBPACK_IMPORTED_MODULE_1__apis_hidden__["a"],
	  saved: /* harmony import */__WEBPACK_IMPORTED_MODULE_2__apis_saved__["a"],
	  search: /* harmony import */__WEBPACK_IMPORTED_MODULE_3__apis_search__["a"],
	  stylesheets: /* harmony import */__WEBPACK_IMPORTED_MODULE_4__apis_stylesheets__["a"],
	  subreddits: /* harmony import */__WEBPACK_IMPORTED_MODULE_5__apis_subreddits__["a"],
	  subscriptions: /* harmony import */__WEBPACK_IMPORTED_MODULE_6__apis_subscriptions__["a"],
	  trophies: /* harmony import */__WEBPACK_IMPORTED_MODULE_7__apis_trophies__["a"],
	  accounts: /* harmony import */__WEBPACK_IMPORTED_MODULE_8__apis_accounts__["a"],
	  votes: /* harmony import */__WEBPACK_IMPORTED_MODULE_9__apis_votes__["a"],
	  links: /* harmony import */__WEBPACK_IMPORTED_MODULE_10__apis_links__["a"],
	  comments: /* harmony import */__WEBPACK_IMPORTED_MODULE_11__apis_comments__["a"],
	  reports: /* harmony import */__WEBPACK_IMPORTED_MODULE_13__apis_reports__["a"],
	  messages: /* harmony import */__WEBPACK_IMPORTED_MODULE_14__apis_messages__["a"],
	  modListing: /* harmony import */__WEBPACK_IMPORTED_MODULE_15__apis_modListing__["a"],
	  subredditRelationships: /* harmony import */__WEBPACK_IMPORTED_MODULE_16__apis_subredditRelationships__["a"],
	  rules: /* harmony import */__WEBPACK_IMPORTED_MODULE_17__apis_rules__["a"],
	  wiki: /* harmony import */__WEBPACK_IMPORTED_MODULE_18__apis_wiki__["a"],
	  multis: /* harmony import */__WEBPACK_IMPORTED_MODULE_19__apis_multis__["a"],
	  multiSubscriptions: /* harmony import */__WEBPACK_IMPORTED_MODULE_20__apis_multiSubscriptions__["a"]
	};
	/* harmony export */ Object.defineProperty(exports, "APIs", {configurable: false, enumerable: true, get: function() { return APIs; }});







	var errors = {
	  NoModelError: /* harmony import */__WEBPACK_IMPORTED_MODULE_23__errors_noModelError__["a"],
	  ValidationError: /* harmony import */__WEBPACK_IMPORTED_MODULE_25__errors_validationError__["a"],
	  ResponseError: /* harmony import */__WEBPACK_IMPORTED_MODULE_24__errors_responseError__["a"],
	  DisconnectedError: /* harmony import */__WEBPACK_IMPORTED_MODULE_24__errors_responseError__["b"],
	  NotImplementedError: /* harmony import */__WEBPACK_IMPORTED_MODULE_26__errors_notImplementedError__["a"]
	};
	/* harmony export */ Object.defineProperty(exports, "errors", {configurable: false, enumerable: true, get: function() { return errors; }});





























	var models = {
	  Account: /* harmony import */__WEBPACK_IMPORTED_MODULE_27__models_account__["a"],
	  Award: /* harmony import */__WEBPACK_IMPORTED_MODULE_28__models_award__["a"],
	  Base: /* harmony import */__WEBPACK_IMPORTED_MODULE_29__models_base__["a"],
	  Block: /* harmony import */__WEBPACK_IMPORTED_MODULE_30__models_block__["a"],
	  BlockedUser: /* harmony import */__WEBPACK_IMPORTED_MODULE_31__models_BlockedUser__["a"],
	  Comment: /* harmony import */__WEBPACK_IMPORTED_MODULE_32__models2_Comment__["a"],
	  Link: /* harmony import */__WEBPACK_IMPORTED_MODULE_33__models2_Link__["a"],
	  Message: /* harmony import */__WEBPACK_IMPORTED_MODULE_34__models_message__["a"],
	  PromoCampaign: /* harmony import */__WEBPACK_IMPORTED_MODULE_35__models_promocampaign__["a"],
	  Preferences: /* harmony import */__WEBPACK_IMPORTED_MODULE_36__models_preferences__["a"],
	  Subreddit: /* harmony import */__WEBPACK_IMPORTED_MODULE_37__models2_Subreddit__["a"],
	  Subscription: /* harmony import */__WEBPACK_IMPORTED_MODULE_38__models_subscription__["a"],
	  Vote: /* harmony import */__WEBPACK_IMPORTED_MODULE_39__models_vote__["a"],
	  Report: /* harmony import */__WEBPACK_IMPORTED_MODULE_40__models_report__["a"],
	  WikiPage: /* harmony import */__WEBPACK_IMPORTED_MODULE_41__models_wikiPage__["a"],
	  WikiRevision: /* harmony import */__WEBPACK_IMPORTED_MODULE_42__models_wikiRevision__["a"],
	  WikiPageListing: /* harmony import */__WEBPACK_IMPORTED_MODULE_43__models_wikiPageListing__["a"],
	  WikiPageSettings: /* harmony import */__WEBPACK_IMPORTED_MODULE_44__models_wikiPageSettings__["a"]
	};
	/* harmony export */ Object.defineProperty(exports, "models", {configurable: false, enumerable: true, get: function() { return models; }});

	var collections = {
	  CommentsPage: /* harmony import */__WEBPACK_IMPORTED_MODULE_46__collections_CommentsPage__["a"],
	  ContributingSubreddits: /* harmony import */__WEBPACK_IMPORTED_MODULE_45__collections_SubredditLists__["a"],
	  HiddenPostsAndComments: /* harmony import */__WEBPACK_IMPORTED_MODULE_47__collections_HiddenPostsAndComments__["default"],
	  ModeratingSubreddits: /* harmony import */__WEBPACK_IMPORTED_MODULE_45__collections_SubredditLists__["b"],
	  PostsFromSubreddit: /* harmony import */__WEBPACK_IMPORTED_MODULE_48__collections_PostsFromSubreddit__["a"],
	  SavedPostsAndComments: /* harmony import */__WEBPACK_IMPORTED_MODULE_49__collections_SavedPostsAndComments__["a"],
	  SearchQuery: /* harmony import */__WEBPACK_IMPORTED_MODULE_50__collections_SearchQuery__["a"],
	  SubscribedSubreddits: /* harmony import */__WEBPACK_IMPORTED_MODULE_45__collections_SubredditLists__["c"]
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
/* 55 */
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
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony export */ exports["a"] = isThingID;var THING_ID_REGEX = new RegExp('^t\\d_[0-9a-z]+', 'i');

	function isThingID(val) {
	  return THING_ID_REGEX.test(val);
	}

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony export */ exports["a"] = unredditifyLink;function unredditifyLink(url) {
	  if (!url) {
	    return;
	  }
	  return url.replace(/^https?:\/\/(?:www\.)?reddit.com/, '');
	}

/***/ },
/* 58 */
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
/* 59 */
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
/* 60 */
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
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__RedditModel__ = __webpack_require__(227);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__thingTypes__ = __webpack_require__(5);
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

	Link.type = /* harmony import */__WEBPACK_IMPORTED_MODULE_1__thingTypes__["b"];
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
/* 62 */,
/* 63 */,
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony export */ exports["a"] = mockHTML;function mockHTML() {
	  // more randomization here at somepoint
	  /* eslint-disable max-len */
	  return '<h1>This is a header or something</h1><sup><sup>TM</sup></sup><a href="https://www.reddit.com/r/reactjs">reactjs subreddit</a>';
	  /* eslint-enable */
	}

/***/ },
/* 65 */
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
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */
/***/ function(module, exports) {

	module.exports = require("lodash/lang");

/***/ },
/* 73 */,
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__RedditModel__ = __webpack_require__(227);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__apiBase_Record__ = __webpack_require__(228);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__thingTypes__ = __webpack_require__(5);
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
	      return new /* harmony import */__WEBPACK_IMPORTED_MODULE_1__apiBase_Record__["a"](/* harmony import */__WEBPACK_IMPORTED_MODULE_2__thingTypes__["h"], this.parentId);
	    }
	  }]);

	  return Comment;
	}(/* harmony import */__WEBPACK_IMPORTED_MODULE_0__RedditModel__["a"]);

	Comment.type = /* harmony import */__WEBPACK_IMPORTED_MODULE_2__thingTypes__["a"];
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
/* 75 */,
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__RedditModel__ = __webpack_require__(227);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__thingTypes__ = __webpack_require__(5);
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
/* 77 */,
/* 78 */
/***/ function(module, exports) {

	module.exports = require("lodash/array");

/***/ },
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */,
/* 128 */,
/* 129 */,
/* 130 */,
/* 131 */,
/* 132 */,
/* 133 */,
/* 134 */,
/* 135 */,
/* 136 */,
/* 137 */,
/* 138 */,
/* 139 */,
/* 140 */,
/* 141 */,
/* 142 */,
/* 143 */,
/* 144 */,
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */,
/* 150 */,
/* 151 */,
/* 152 */,
/* 153 */,
/* 154 */,
/* 155 */,
/* 156 */,
/* 157 */,
/* 158 */,
/* 159 */,
/* 160 */,
/* 161 */,
/* 162 */,
/* 163 */,
/* 164 */,
/* 165 */,
/* 166 */,
/* 167 */,
/* 168 */,
/* 169 */,
/* 170 */,
/* 171 */,
/* 172 */,
/* 173 */,
/* 174 */,
/* 175 */,
/* 176 */,
/* 177 */,
/* 178 */,
/* 179 */,
/* 180 */
/***/ function(module, exports) {

	module.exports = require("lodash/collection");

/***/ },
/* 181 */,
/* 182 */,
/* 183 */,
/* 184 */,
/* 185 */,
/* 186 */,
/* 187 */,
/* 188 */,
/* 189 */,
/* 190 */,
/* 191 */,
/* 192 */,
/* 193 */,
/* 194 */,
/* 195 */,
/* 196 */,
/* 197 */,
/* 198 */,
/* 199 */,
/* 200 */,
/* 201 */,
/* 202 */,
/* 203 */,
/* 204 */,
/* 205 */,
/* 206 */,
/* 207 */,
/* 208 */,
/* 209 */,
/* 210 */,
/* 211 */,
/* 212 */,
/* 213 */,
/* 214 */,
/* 215 */,
/* 216 */,
/* 217 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__apiBase_APIResponsePaging__ = __webpack_require__(225);
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
/* 218 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Listing__ = __webpack_require__(217);
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
/* 219 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Listing__ = __webpack_require__(217);
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
/* 220 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__SavedPostsAndComments__ = __webpack_require__(218);
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
/* 221 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Listing__ = __webpack_require__(217);
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
/* 222 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Listing__ = __webpack_require__(217);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash_array__ = __webpack_require__(78);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash_array___default = __WEBPACK_IMPORTED_MODULE_1_lodash_array__ && __WEBPACK_IMPORTED_MODULE_1_lodash_array__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_1_lodash_array__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_1_lodash_array__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_1_lodash_array___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_1_lodash_array___default });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__apiBase_APIResponsePaging__ = __webpack_require__(225);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models2_thingTypes__ = __webpack_require__(5);
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
	          return record.type === /* harmony import */__WEBPACK_IMPORTED_MODULE_3__models2_thingTypes__["b"];
	        });
	        return posts.length >= limit ? /* harmony import */__WEBPACK_IMPORTED_MODULE_1_lodash_array__["last"].bind()(posts).uuid : null;
	      });
	    }
	  }, {
	    key: 'posts',
	    get: function get() {
	      return this.apiResponse.results.filter(function (record) {
	        return record.type === /* harmony import */__WEBPACK_IMPORTED_MODULE_3__models2_thingTypes__["b"];
	      }).map(this.apiResponse.getModelFromRecord);
	    }
	  }, {
	    key: 'subreddits',
	    get: function get() {
	      return this.apiResponse.results.filter(function (record) {
	        return record.type === /* harmony import */__WEBPACK_IMPORTED_MODULE_3__models2_thingTypes__["e"];
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
/* 223 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__apiBase_APIResponsePaging__ = __webpack_require__(225);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Listing__ = __webpack_require__(217);
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
/* 224 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_superagent__ = __webpack_require__(25);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_superagent___default = __WEBPACK_IMPORTED_MODULE_0_superagent__ && __WEBPACK_IMPORTED_MODULE_0_superagent__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0_superagent__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0_superagent__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_0_superagent___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_0_superagent___default });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__errors_validationError__ = __webpack_require__(233);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__errors_noModelError__ = __webpack_require__(231);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__errors_notImplementedError__ = __webpack_require__(232);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__APIResponse__ = __webpack_require__(226);
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }







	var EVENTS = {
	  request: 'request',
	  response: 'response',
	  error: 'error',
	  result: 'result'
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

	          handle(resolve, reject)(err, res, req, rawQuery, originalMethod);
	        });
	      });
	    };

	    this.handle = function (resolve, reject) {
	      return function (err, res, req, query, method) {
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
	          var start = Date.now();
	          apiResponse = new /* harmony import */__WEBPACK_IMPORTED_MODULE_4__APIResponse__["a"](meta, query);
	          try {
	            _this.parseBody(res, apiResponse, req, method);
	            _this.parseTime = Date.now() - start;
	          } catch (e) {
	            _this.event.emit(EVENTS.error, e, req);
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

	        _this.event.emit(EVENTS.result, body || apiResponse);

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

	    ['path', 'head', 'get', 'post', 'patch', 'put', 'del', 'move', 'copy'].forEach(function (method) {
	      _this[method] = _this[method].bind(_this);
	    });
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
	          return reject(new /* harmony import */__WEBPACK_IMPORTED_MODULE_2__errors_noModelError__["a"](_this2.api));
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
	            return reject(new /* harmony import */__WEBPACK_IMPORTED_MODULE_1__errors_validationError__["a"](_this2.api, model));
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
	          _this2.handle(resolve, reject)(err, res, req, data, method);
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
	        throw new /* harmony import */__WEBPACK_IMPORTED_MODULE_3__errors_notImplementedError__["a"](method, this.api);
	      };
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
	  }]);

	  return BaseAPI;
	}();

	BaseAPI.EVENTS = EVENTS;
	/* harmony default export */ exports["a"] = BaseAPI;

/***/ },
/* 225 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_array__ = __webpack_require__(78);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_array___default = __WEBPACK_IMPORTED_MODULE_0_lodash_array__ && __WEBPACK_IMPORTED_MODULE_0_lodash_array__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0_lodash_array__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0_lodash_array__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_0_lodash_array___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_0_lodash_array___default });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__APIResponse__ = __webpack_require__(226);
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
/* 226 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_collection__ = __webpack_require__(180);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_collection___default = __WEBPACK_IMPORTED_MODULE_0_lodash_collection__ && __WEBPACK_IMPORTED_MODULE_0_lodash_collection__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0_lodash_collection__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0_lodash_collection__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_0_lodash_collection___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_0_lodash_collection___default });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash_array__ = __webpack_require__(78);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash_array___default = __WEBPACK_IMPORTED_MODULE_1_lodash_array__ && __WEBPACK_IMPORTED_MODULE_1_lodash_array__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_1_lodash_array__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_1_lodash_array__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_1_lodash_array___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_1_lodash_array___default });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models2_thingTypes__ = __webpack_require__(5);
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

	    this.typeToTable = (_typeToTable = {}, _defineProperty(_typeToTable, /* harmony import */__WEBPACK_IMPORTED_MODULE_2__models2_thingTypes__["a"], this.comments), _defineProperty(_typeToTable, /* harmony import */__WEBPACK_IMPORTED_MODULE_2__models2_thingTypes__["b"], this.links), _defineProperty(_typeToTable, /* harmony import */__WEBPACK_IMPORTED_MODULE_2__models2_thingTypes__["c"], this.users), _defineProperty(_typeToTable, /* harmony import */__WEBPACK_IMPORTED_MODULE_2__models2_thingTypes__["d"], this.messages), _defineProperty(_typeToTable, /* harmony import */__WEBPACK_IMPORTED_MODULE_2__models2_thingTypes__["e"], this.subreddits), _typeToTable);

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
/* 227 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__apiBase_Model__ = __webpack_require__(230);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__thingTypes__ = __webpack_require__(5);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_isThingID__ = __webpack_require__(56);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_markdown__ = __webpack_require__(12);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__lib_unredditifyLink__ = __webpack_require__(57);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__mockgenerators_mockHTML__ = __webpack_require__(64);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__mockgenerators_mockLink__ = __webpack_require__(65);
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
/* 228 */
/***/ function(module, exports, __webpack_require__) {

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Record = function Record(type, uuid) {
	  _classCallCheck(this, Record);

	  this.type = type;
	  this.uuid = uuid;
	};

	/* harmony default export */ exports["a"] = Record;

/***/ },
/* 229 */
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
/* 230 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Record__ = __webpack_require__(228);
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
/* 231 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__error__ = __webpack_require__(229);
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
/* 232 */
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
/* 233 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__error__ = __webpack_require__(229);
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
/* 234 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_object__ = __webpack_require__(3);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_object___default = __WEBPACK_IMPORTED_MODULE_0_lodash_object__ && __WEBPACK_IMPORTED_MODULE_0_lodash_object__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0_lodash_object__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0_lodash_object__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_0_lodash_object___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_0_lodash_object___default });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__apiBase_BaseEndpoint__ = __webpack_require__(224);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__apiBase_errors_noModelError__ = __webpack_require__(231);
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

	var BaseContentEndpoint = function (_BaseEndpoint) {
	  _inherits(BaseContentEndpoint, _BaseEndpoint);

	  function BaseContentEndpoint() {
	    var _Object$getPrototypeO;

	    var _temp, _this, _ret;

	    _classCallCheck(this, BaseContentEndpoint);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(BaseContentEndpoint)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.move = _this.notImplemented('move'), _this.copy = _this.notImplemented('copy'), _this.put = _this.notImplemented('put'), _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(BaseContentEndpoint, [{
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
	        throw new /* harmony import */__WEBPACK_IMPORTED_MODULE_2__apiBase_errors_noModelError__["a"]('/api/editusertext');
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

	  return BaseContentEndpoint;
	}(/* harmony import */__WEBPACK_IMPORTED_MODULE_1__apiBase_BaseEndpoint__["a"]);

	/* harmony default export */ exports["a"] = BaseContentEndpoint;

/***/ }
/******/ ])
});
;