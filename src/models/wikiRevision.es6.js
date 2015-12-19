import Base from './base';

class WikiRevision extends Base {
  _type = 'WikiRevision';

  constructor(props) {
    props.author = props.author.data;

    super(props);
  } 
}

export default WikiRevision;
