import Base from './base';

class WikiRevision extends Base {
  constructor(props) {
    props.author = props.author.data;

    super(props);
  }

  toJSON () {
    let props = this.props
    props._type = WikiRevision._type;

    return props;
  }

  static _type = 'WikiRevision';
  
};

export default WikiRevision;
