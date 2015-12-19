import Base from './base';

class Message extends Base {
  _type = 'Message';

  validators () {
    const text = this.textValidator;
    const subject = this.subjectValidator;
    const to = this.toValidator;

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
