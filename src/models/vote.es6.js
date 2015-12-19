import Base from './base';

class Vote extends Base {
  _type = 'Vote';

  validators () {
    const direction = this.directionValidator;

    return {
      direction,
    };
  }

  directionValidator (v) {
    return ([-1,0,1].indexOf(v) > -1);
  }
}

export default Vote;
