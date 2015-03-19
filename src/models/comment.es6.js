import Base from './base';
import process from 'reddit-text-js';

class Comment extends Base {
  constructor(props) {
    props._type = 'Comment';

    super(props);

    this.validators = {
      body: function() {
        return Base.validators.minLength(this.get('body'), 1);
      },
      thingId: function() {
        return Base.validators.minLength(this.get('thingId'), 6) &&
               Base.validators.maxLength(this.get('thingId'), 10);
      }
    };
  }

  get bodyHtml () {
    return process(this.get('body'));
  }

  toJSON () {
    var props = this.props;

    props.bodyHtml = this.bodyHtml;

    return props;
  }
};

export default Comment;
