import Base from './base';

class User extends Base {
  constructor(props) {
    props._type = 'User';
    super(props);

    var user = this;

    this.validators = {
      thingId: function() {
        var thingId = this.get('thingId');

        return Base.validators.thingId(thingId);
      }.bind(user),
    };
  }
};

export default User;
