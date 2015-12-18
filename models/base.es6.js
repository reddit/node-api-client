const THING_ID_REGEX = new RegExp('t\\d_[0-9a-z]+', 'i');

class Base {
  _type = 'Base';

  constructor (props={}) {
    this.props = {};

    for (let p in props) {
      this.props[p] = props[p];
    }
  }

  validators () {
    return;
  }

  get (name) {
    return this.props[name];
  }

  set (name, value) {
    if (typeof name === 'object') {
      Object.assign(this.props, name);
    } else {
      this.props[name] = value;
    }
  }

  validate () {
    const validators = this.validators();

    if (!validators) {
      return true;
    }

    let invalid = [];
    let p;

    for (p in this.props) {
      if (validators[p] && !validators[p](this.props[p])) {
        invalid.push(p);
      }
    }

    if (invalid.length === 0) {
      return true;
    }

    return invalid;
  }

  toJSON (formatter=this.noopFormat) {
    let props = this.props;
    props._type = this._type;

    if (formatter && typeof formatter === 'function') {
      return formatter(props);
    }

    return props;
  }

  static validators = {
    integer: function(i) {
      return i === parseInt(i);
    },

    string: function(s) {
      return s === s.toString();
    },

    min: function (i, min) {
      return i >= min;
    },

    max: function (i, max) {
      return i <= max;
    },

    maxLength: function (s, l) {
      return Base.validators.max(s.length, l);
    },

    minLength: function (s, l) {
      return Base.validators.min(s.length, l);
    },

    regex: function(s, expr) {
      return expr.test(s);
    },

    thingId: function(id) {
      return id == null || Base.validators.regex(id, THING_ID_REGEX);
    },
  };
}

export default Base;
