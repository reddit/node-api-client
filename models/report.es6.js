import Base from './base';

class Report extends Base {
  _type = 'Report';

  validators () {
    const reason = this.reasonValidator.bind(this);
    const otherReason = this.otherReasonValidator.bind(this);
    const thingId = this.thingIdValidator.bind(this);

    this.validators = {
      reason,
      otherReason,
      thingId,
    };
  }

  reasonValidator () {
    if (this.get('other_reason') && !(this.get('reason') === 'other')) {
      return false;
    }

    const reasonValid = Base.validators.minLength(this.get('reason'), 1) &&
      Base.validators.maxLength(this.get('reason'), 100);

    const otherReasonValid = !this.get('other_reason') || (
      Base.validators.minLength(this.get('other_reason'), 1) &&
      Base.validators.maxLength(this.get('other_reason'), 100)
    );

    return reasonValid && otherReasonValid;
  }

  otherReasonValidator () {
    if (this.get('reason') !== 'other') {
      if (this.get('other_reason')) {
        return false;
      }
    } else if (!this.get('reason')) {
      return false;
    }

    return Base.validators.maxLength(this.get('thing_id'), 100);
  }

  thingIdValidator () {
    return Base.validators.minLength(this.get('thing_id'), 6) &&
      Base.validators.maxLength(this.get('thing_id'), 10);
  }
}

export default Report;
