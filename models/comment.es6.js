import Base from './base';
import process from 'reddit-text-js';

class Comment extends Base {
  constructor(props) {
    props._type = 'Comment';

    super(props);

    let comment = this;

    this.validators = {
      body: function() {
        return Base.validators.minLength(this.get('body'), 1);
      }.bind(comment),
      thingId: function() {
        let thingId = this.get('thingId');

        return Base.validators.thingId(thingId);
      }.bind(comment),
    };
  }

  get bodyHtml () {
    return process(this.get('body'));
  }

  toJSON () {
    let props = this.props;

    props.bodyHtml = this.bodyHtml;

    return props;
  }
}

export default Comment;
