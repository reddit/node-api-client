class Base {
  _type = 'Base';

  constructor (props={}, opts={}) {
    this.props = {};
    this.validators = opts.validators || [];
    this.formatters = opts.formatters || [];

    for (var p in props) {
      this.props[p] = props[p];
    }
  }

  get (name) {
    return this.format(name, this.props[name]);
  }

  set (name, value) {
    if (typeof name === 'object') {
      this.props = {
        ...this.props,
        ...value,
      };
    } else {
      this.props[name] = value;
    }
  }

  validate () {
    if (!this.validators) {
      return true;
    }

    var invalid = [];
    var p;

    for (p in this.props) {
      if (this.validators[p] && !this.validators[p](this.props[p])) {
        invalid.push(p);
      }
    }

    if (invalid.length === 0) {
      return true;
    }

    return invalid;
  }

  format (prop, value) {
    if (!this.formatters || !this.formatters[prop]) {
      return value;
    }

    return this.formatters[prop](value);
  }

  toJSON (formatter) {
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
      return Base.validators.string(s) && Base.validators.max(s.length, l);
    },

    minLength: function (s, l) {
      return Base.validators.string(s) && Base.validators.min(s.length, l);
    },

    regex: function(s, expr) {
      return expr.test(s);
    },

    thingId: function(id) {
      var expr = new RegExp('t\\d_[0-9a-z]+', 'i');

      return id == null || Base.validators.regex(id, expr);
    },
  }
}

export default Base;
