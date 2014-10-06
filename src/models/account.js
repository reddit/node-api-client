var Base = require('./base');

var Account = Base.extend({
  properties: function() {
    return [
      'name',
      'created',
      'gold_creddits',
      'created_utc',
      'link_karma',
      'comment_karma',
      'over_18',
      'is_gold',
      'is_mod',
      'gold_expiration',
      'has_verified_email',
      'id',
    ];
  }

});

module.exports = Account;
