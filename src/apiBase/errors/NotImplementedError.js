import FakeError from './FakeError';

export default class NotImplementedError extends FakeError {
  constructor (method, endpoint) {
    super(`Method ${method} not implemented for api endpoint ${endpoint}`);

    this.name = 'NotImplementedError';
    this.status = 405;
  }
}
