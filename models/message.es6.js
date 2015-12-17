import Base from './base';

class Message extends Base {
  constructor(props) {
    props._type = 'Message';
    super(props);

    var message = this;

    this.validators = {
      text: function() {
        return Base.validators.minLength(this.get('text'), 1) &&
               Base.validators.maxLength(this.get('text'), 10000);
      }.bind(message),
      subject: function() {
        return Base.validators.minLength(this.get('subject'), 1) &&
               Base.validators.maxLength(this.get('subject'), 100);
      }.bind(message),
      to: function() {
        return Base.validators.minLength(this.get('to'), 1);
      }.bind(message),
    };
  }
}

export default Message;
