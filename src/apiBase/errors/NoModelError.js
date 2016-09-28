import FakeError from './FakeError';

export default class NoModelError extends FakeError {
  constructor (endpoint) {
    super(`No model given for api endpoint ${endpoint}`);

    this.name = 'NoModelError';
    this.status = 400;
  }
}
