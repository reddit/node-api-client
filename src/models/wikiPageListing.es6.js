import Base from './base';

class WikiPageListing extends Base {
  constructor(props) {
    props.pages = props.data.slice();
    delete props.data;
    delete props.kind;

    super(props);
  }

  toJSON () {
    let props = this.props
    props._type = WikiPageListing._type;

    return props;
  }

  static _type = 'WikipageListing';

};

export default WikiPageListing;
