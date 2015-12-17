import Base from './base';

class Report extends Base {
  constructor(props) {
    props._type = 'Report';
    super(props);

    var report = this;

    this.validators = {
      reason: function() {
        if (this.get('other_reason') && !(this.get('reason') === 'other')) {
          return false;
        }

        var reasonValid = Base.validators.minLength(this.get('reason'), 1) &&
                          Base.validators.maxLength(this.get('reason'), 100);

        var otherReasonValid = !this.get('other_reason') ||
                               (
                                 Base.validators.minLength(this.get('other_reason'), 1) &&
                                 Base.validators.maxLength(this.get('other_reason'), 100)
                               );

        return reasonValid && otherReasonValid;
      }.bind(report),

      other_reason: function() {
        if (this.get('reason') !== 'other') {
          if (this.get('other_reason')) {
            return false;
          }
        } else if (!this.get('reason')) {
          return false;
        }

        return Base.validators.maxLength(this.get('thing_id'), 100);
      }.bind(report),

      thing_id: function() {
        return Base.validators.minLength(this.get('thing_id'), 6) &&
               Base.validators.maxLength(this.get('thing_id'), 10);
      }.bind(report),
    };
  }
};

export default Report;
