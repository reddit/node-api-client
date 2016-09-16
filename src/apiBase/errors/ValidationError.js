import FakeError from './FakeError';

const msgText = (api, errors) => `${api} had errors in ${errors.join(',')}`;

export default class ValidationError extends FakeError {
  constructor (apiName, errors, status) {
    const message = errors && errors.length ?
      msgText(apiName, errors) : `Validation error in '${apiName}'`;
    super(message);
    this.name = 'ValidationError';
    this.errors = errors;
    this.status = status;
  }
}
