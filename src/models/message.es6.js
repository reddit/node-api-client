import Base from './base';

class Message extends Base {
  constructor(props) {
    props._type = 'Message';
    super(props);
  }
};

export default Message;
