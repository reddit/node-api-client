import Base from './base';
import * as process from 'reddit-text-js';

class Comment extends Base {
  constructor(props) {
    return super(props);
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
