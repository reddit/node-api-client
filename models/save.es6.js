import Base from './base';

class Save extends Base {
  constructor(props) {
    props._type = 'Save';
    super(props);

    var save = this;

    this.validators = {
      id: function() {
        var id = this.get('id');
        return Base.validators.id(id);
      }.bind(save),
      category: function() {
        var category = this.get('category');
        return Base.validators.string(category);
      }.bind(save),
    };
  }
};

export default Save;
