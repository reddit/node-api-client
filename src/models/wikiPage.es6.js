import Base from './base';

class WikiPage extends Base {
  _type = 'WikiPage';

  constructor(props) {
    delete props.content_html;

    if (props.revision_by) {
      props.revision_by = props.revision_by.data;  
    }

    super(props);
  }
}

export default WikiPage;
