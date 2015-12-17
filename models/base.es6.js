import { EventEmitter } from 'events';

class Base {
  constructor (props={}, opts={}) {
    this.props = {};
    this.validators = opts.validators || [];
    this.formatters = opts.formatters || [];
    this.emitter = opts.emitter || new EventEmitter();

    for (var p in props) {
      this.props[p] = props[p];
    }
  }

  get (name) {
    return this.format(name, this.props[name]);
  }

  set (name, value, emit = { value: true, base: true}) {
    if (typeof name === 'object') {
      for (var n in name) {
        this.set(n, name[n], { value: true });
      }

      this.emit('set', name);
    } else {
      this.props[name] = value;

      if(emit && emit.base) {
        this.emit('set', name, value);
      }

      if(emit && emit.value) {
        this.emit('set:' + name, value);
      }
    }
  }

  emit (...args) {
    this.emitter.emit.apply(this, args);
  }

  on (...args) {
    this.emitter.on.apply(this, args);
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

    this.emit('validationError', invalid);
    return invalid;
  }

  format (prop, value){
    if (!this.formatters || !this.formatters[prop]) {
      return value;
    }

    return this.formatters[prop](value);
  }

  toJSON (formatter) {
    if (formatter && typeof formatter == 'function') {
      return formatter(this.props);
    }

    return this.props;
  }
}

Base.validators = {
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

export default Base;
