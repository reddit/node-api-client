import Base from './base';

class Subreddit extends Base {
  constructor(props) {
    props._type = 'Subreddit';
    super(props);
  }
};

export default Subreddit;
