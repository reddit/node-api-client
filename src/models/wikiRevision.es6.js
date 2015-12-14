import Base from './base';

class WikiRevision extends Base {
  constructor(props) {
    props.author = props.author.data;

    super(props);
  } 
};

export default WikiRevision;
