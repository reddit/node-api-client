import Base from './base';
import { USER_TYPE } from '../apis/thingTypes';

export default class Account extends Base {
  _type = 'Account';

  validators () {
    const thingId = this.thingIdValidator.bind(this);

    return {
      thingId,
    };
  }

  uuid(props) {
    if (Base.validators.thingId(props.id)) {
      return props.id;
    }

    return `${USER_TYPE}_${props.id}`;
  }

  thingIdValidator () {
    const thingId = this.get('thingId');
    return Base.validators.thingId(thingId);
  }
}
