import Base from './base';

class Vote extends Base {
  _type = 'Vote';

  constructor(props) {
    super(props);
  }
};

Vote.validators = {
  direction: function(v) {
    return ([-1,0,1].indexOf(v) > -1);
  }
}

export default Vote;
