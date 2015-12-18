import Base from './base';

class Report extends Base {
  _type = 'Report';

  constructor(props) {
    super(props);

    const report = this;

    this.validators = {
      reason: function() {
        if (report.get('other_reason') && !(report.get('reason') === 'other')) {
          return false;
        }

        const reasonValid = Base.validators.minLength(report.get('reason'), 1) &&
                          Base.validators.maxLength(report.get('reason'), 100);

        const otherReasonValid = !report.get('other_reason') ||
                               (
                                 Base.validators.minLength(report.get('other_reason'), 1) &&
                                 Base.validators.maxLength(report.get('other_reason'), 100)
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
}

export default Report;
