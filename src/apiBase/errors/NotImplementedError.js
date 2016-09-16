import FakeError from './FakeError';

export default class NotImplementedError extends FakeError {
  constructor (method, endpoint) {
    super(method, endpoint);

    this.name = 'NotImplementedError';
    this.message = `Method ${method} not implemented for api endpoint ${endpoint}`;
    this.status = 405;
  }
}
