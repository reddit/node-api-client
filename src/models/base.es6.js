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

  set (name, value) {
    if (this.validate(name, value)) {
      this.props[name] = value;
      this.emit('set', name, value);
      this.emit('set:' + name, value);
    } else {
      this.emit('validationError', 'set', name, value);
    }
  }

  emit (...args) {
    this.emitter.emit(...args);
  }

  on (...args) {
    this.emitter.on(...args);
  }

  validate (prop, value) {
    return (
      !this.validators ||
      !this.validators[prop] ||
      this.validators[prop] (value));
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

export default Base;
