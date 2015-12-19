import Base from './base';

class Account extends Base {
  _type = 'Account';

  validators () {
    const thingId = this.thingIdValidator;

    return {
      thingId,
    };
  }

  thingIdValidator () {
    const thingId = this.get('thingId');
    return Base.validators.thingId(thingId);
  }
}

export default Account;
