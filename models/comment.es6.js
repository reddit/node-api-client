import Base from './base';

class Comment extends Base {
  _type = 'Comment';

  validators () {
    const body_html = this.bodyHtmlValidator.bind(this);
    const thingId = this.thingIdValidator.bind(this);

    return {
      body_html,
      thingId,
    };
  }

  bodyHtmlValidator () {
    return Base.validators.minLength(this.get('body_html'), 1);
  }

  thingIdValidator () {
    const thingId = this.get('thingId');
    return Base.validators.thingId(thingId);
  }

  toJSON () {
    let props = this.props;
    props._type = this._type;
    props._type = this._type;
    return props;
  }
}

export default Comment;
