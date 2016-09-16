import FakeError from './FakeError';

export default class NoModelError extends FakeError {
  constructor (endpoint) {
    super(endpoint);

    this.name = 'NoModelError';
    this.message = 'No model given for api endpoint ' + endpoint;
    this.status = 400;
  }
}
