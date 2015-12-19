import Base from './base';

const _subscriptionAllowedActions = {
  'sub': true,
  'unsub': true,
};

class Subscription extends Base {
  _type = 'Subscription';

  validators () {
    const action = this.actionValidator;
    const sr = this.srValidator;

    return {
      action,
      sr,
    };
  }

  actionValidator (val) {
    return _subscriptionAllowedActions[val];
  }

  srValidator (val) {
    return Base.validators.string(val);
  }
}

export default Subscription;
