import FakeError from './FakeError';

const msgText = (apiName, errors, model) =>
  `${ apiName } had errors in ${ errors.join(',') } with properties ${ JSON.stringify(model.toJSON()) }`;

export default class ValidationError extends FakeError {
  constructor (apiName, model, errors) {
    super(apiName);

    this.name = 'ValidationError';

    if (errors && errors.length && model) {
      this.message = msgText(apiName, errors, model);
    } else {
      this.message = `Validation error in '${ apiName }'`;
    }

    this.status = 422;
  }
}
