import Base from './base';

class Account extends Base {
  _type = 'Account';

  constructor(props) {
    super(props);

    const account = this;

    this.validators = {
      thingId: function() {
        const thingId = this.get('thingId');
        return Base.validators.thingId(thingId);
      }.bind(account),
    };
  }
}

export default Account;
