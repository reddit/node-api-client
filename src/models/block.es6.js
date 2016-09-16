import Base from './base';

export default class Block extends Base {
  _type = 'Block';

  validators() {
    return {
      thingId: Base.validators.thingId,
    };
  }
}
