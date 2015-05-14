import Base from './base';
import process from 'reddit-text-js';

class Comment extends Base {
  constructor(props) {
    props._type = 'Comment';
    delete props.subreddit;

    super(props);

    var comment = this;

    this.validators = {
      body: function() {
        return Base.validators.minLength(this.get('body'), 1);
      }.bind(comment),
      thingId: function() {
        return Base.validators.minLength(this.get('thingId'), 6) &&
               Base.validators.maxLength(this.get('thingId'), 10);
      }.bind(comment),
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
