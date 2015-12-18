import Base from './base';

class Message extends Base {
  _type = 'Message';

  validators () {
    const text = this.textValidator.bind(this);
    const subject = this.subjectValidator.bind(this);
    const to = this.toValidator.bind(this);

    return {
      text,
      subject,
      to,
    };
  }

  textValidator () {
    return Base.validators.minLength(this.get('text'), 1) &&
           Base.validators.maxLength(this.get('text'), 10000);
  }

  subjectValidator () {
    return Base.validators.minLength(this.get('subject'), 1) &&
           Base.validators.maxLength(this.get('subject'), 100);
  }

  toValidator () {
    return Base.validators.minLength(this.get('to'), 1);
  }
}

export default Message;
