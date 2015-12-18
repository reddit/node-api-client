import Base from './base';

const ALLOWED_ACTIONS = {
  'sub': true,
  'unsub': true,
};

class Subscription extends Base {
  constructor(props) {
    props._type = 'Subscription';
    super(props);

    let subscription = this;

    this.validators = {
      'action': function (value) {
        return ALLOWED_ACTIONS[value];
      }.bind(subscription),
      'sr': function (value) {
        return Base.validators.string(value);
      }.bind(subscription),
    };
  }
}

export default Subscription;
