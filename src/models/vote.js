var Base = require('./base');

var Vote = Base.extend({
  properties: function() {
    return [
      'direction'
    ];
  },
  validators: {
    direction: function(v) {
      return ([-1,0,1].indexOf(v) > -1)
    }
  }

});

module.exports = Vote;
