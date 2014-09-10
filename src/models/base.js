var Emitter = require('events').EventEmitter;

var basePrototype = {
  init: function(props) {
    props = props || {};
    var value;

    for (var p in props) {
      this.defineProperty(p);
      this[p] = props[p];
    }
  },

  defineProperty: function(p) {
    Object.defineProperty(this, p, {
      get: function(){
        return this.props[p];
      },
      set: function(newValue){
        if (this.validate(p, newValue)) {
          this.props[p] = this.format(newValue);

          this.emitter.emit('set:' + p, newValue);
          this.emitter.emit('set', p, newValue);
        }
      },
      configurable: true
    });
  },

  validate: function(prop, value) {
    return (!this.validators || !this.validators[prop] || this.validators[prop](value));
  },

  format: function(value){
    if (!this.formatters || !this.formatters[prop]) {
      return value;
    }

    return this.formatters[prop](value);;
  }
}

function extend(proto) {
  function Child(props) {
    this.type = Child;
    this.base = Base;
    this.props = {};
    this.emitter = new Emitter();
    this.init(props);
  }

  for (m in basePrototype) {
    if (!proto[m]) {
      proto[m] = basePrototype[m];
      proto.base = Base;
    }
  }

  Child.prototype = proto;
  return Child;
};

Base = extend(basePrototype);
Base.extend = extend;

module.exports = Base;
