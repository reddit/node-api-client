import Base from './base';

export default class Save extends Base {
  _type = 'Save';

  validators() {
    const id = Base.validators.id;
    const category = this.categoryValidator;

    return {
      id,
      category,
    };
  }

  categoryValidator(category) {
    if (!category) {
      return true;
    }

    return Base.validators.string(category);
  }
}
