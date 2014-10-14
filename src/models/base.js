import { EventEmitter } from 'events';
import * as Reflect from 'harmony-reflect';

class Base {
  constructor (props={}, opts={}) {
    this.props = {};
    this.validators = opts.validators || [];
    this.formatters = opts.formatters || [];
    this.emitter = opts.emitter || new EventEmitter();

    for (var p in props) {
      this.props[p] = props[p];
    }

    return new Proxy(this, {
      set: function (receiver, name, value) {

        if (receiver[name]) {
          return receiver[name] = value;
        }

        if (receiver.validate(name, value)) {
          receiver.props[name] = value;
          receiver.emit('set', name, value);
          receiver.emit('set:' + name, value);
        } else {
          receiver.emit('validationError', 'set', name, value);
        }
      },

      get: function (receiver, name) {
        return receiver[name] || receiver.props[name];
      }
    });
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

  format (value){
    if (!this.formatters || !this.formatters[prop]) {
      return value;
    }

    return this.formatters[prop] (value);;
  }

  toJSON (formatter) {
    if (formatter) {
      return formatter (this.props);
    }

    return this.props;
  }
}

export default Base;
