import Base from './base';

export default class BlockedUser extends Base {
  _type = 'BlockedUser';


  validators() {
    const date = Base.validators.integer;
    const id = Base.validators.thingId;
    const name =Base.validators.string;

    return {
      date,
      id,
      name
    };
  }
}
