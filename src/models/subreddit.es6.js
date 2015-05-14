import Base from './base';

class Subreddit extends Base {
  constructor(props) {
    delete props.submit_text_html;
    delete props.description_html;
    delete props.public_description_html;


    props._type = 'Subreddit';
    super(props);
  }
};

export default Subreddit;
