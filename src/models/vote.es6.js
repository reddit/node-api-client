import Base from './base.es6';

class Vote extends Base {
  constructor(props) {
    return super(props);
  }
};

Vote.validators = {
  direction: function(v) {
    return ([-1,0,1].indexOf(v) > -1);
  }
}

export default Vote;
