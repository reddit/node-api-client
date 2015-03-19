import Base from './base';

class Report extends Base {
  constructor(props) {
    props._type = 'Report';
    super(props);

    this.validators = {
      reason: function() {
        if (this.get('other_reason') && !this.get('reason' === 'other')) {
          return false;
        }

        return Base.validators.minLength(this.get('body'), 1) &&
               Base.validators.maxLength(this.get('body'), 100);
      },

      other_reason: function() {
        if (this.get('reason') !== 'other') {
          if (this.get('other_reason')) {
            return false;
          }
        } else if (!this.get('reason')) {
          return false;
        }

        return Base.validators.maxLength(this.get('thing_id'), 100);
      },

      thing_id: function() {
        return Base.validators.minLength(this.get('thing_id'), 6) &&
               Base.validators.maxLength(this.get('thing_id'), 10);
      },
    };
  }
};

export default Comment;
