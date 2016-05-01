import FakeError from './FakeError';

export default class ValidationError extends FakeError {
  constructor (name, model, errors) {
    super(name);

    this.name = 'NoModelError';

    this.message = name + ' had errors in: ' + errors.join(',') +
                    ' with properties ' + JSON.stringify(model.toJSON());

    this.status = 422;
  }
}
