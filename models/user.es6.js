import Base from './base';

class User extends Base {
  constructor(props) {
    props._type = 'User';
    super(props);

    let user = this;

    this.validators = {
      thingId: function() {
        const thingId = this.get('thingId');

        return Base.validators.thingId(thingId);
      }.bind(user),
    };
  }
}

export default User;
