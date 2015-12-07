import Base from './base';

class WikiPage extends Base {
  constructor(props) {
    delete props.content_html;

    if (props.revision_by) {
      props.revision_by = props.revision_by.data;  
    }
    
    super(props);
  }

  toJSON () {
    let props = this.props;
    props._type = this.constructor._type;

    return props;
  }

  static _type = 'Wikipage';
};

export default WikiPage;
