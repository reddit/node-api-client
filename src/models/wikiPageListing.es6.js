import Base from './base';

class WikiPageListing extends Base {
  _type = 'WikiPageListing';

  constructor(props) {
    props.pages = props.data.slice();
    delete props.data;
    delete props.kind;

    super(props);
  }
}

export default WikiPageListing;
