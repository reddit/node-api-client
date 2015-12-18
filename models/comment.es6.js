import Base from './base';
import process from 'reddit-text-js';

class Comment extends Base {
  _type = 'Comment';

  validators () {
    const body = this.bodyValidator.bind(this);
    const thingId = this.thingIdValidator.bind(this);

    return {
      body,
      thingId,
    };
  }

  bodyValidator () {
    return Base.validators.minLength(this.get('body'), 1);
  }

  thingIdValidator () {
    const thingId = this.get('thingId');
    return Base.validators.thingId(thingId);
  }

  get bodyHtml () {
    return process(this.get('body'));
  }

  toJSON () {
    let props = this.props;
    props._type = this._type;
    props.bodyHtml = this.bodyHtml;
    props._type = this._type;
    return props;
  }
}

export default Comment;
