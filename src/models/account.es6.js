import Base from './base';

class Account extends Base {
  constructor(props) {
    props._type = 'Account';
    super(props);
  }
};

export default Account;
