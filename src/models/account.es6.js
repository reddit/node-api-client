import Base from './base';

class Account extends Base {
  _type = 'Account';

  constructor(props) {
    super(props);

    var account = this;

    this.validators = {
      thingId: function() {
        var thingId = this.get('thingId');

        return Base.validators.thingId(thingId);
      }.bind(account),
    };
  }
};

export default Account;
