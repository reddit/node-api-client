var Base = require('./base');

var Vote = Base.extend({
  properties: function() {
    return [
      'direction',
      'id',
    ];
  },

  validators: {
    direction: function(v) {
      return ([-1,0,1].indexOf(v) > -1);
    }
  }

});

module.exports = Vote;
