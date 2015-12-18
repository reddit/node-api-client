import Base from './base';

class Save extends Base {
  constructor(props) {
    props._type = 'Save';
    super(props);

    let save = this;

    this.validators = {
      id: function() {
        let id = this.get('id');
        return Base.validators.id(id);
      }.bind(save),
      category: function() {
        let category = this.get('category');
        return Base.validators.string(category);
      }.bind(save),
    };
  }
};

export default Save;
