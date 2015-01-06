class ValidationError extends Error {
  constructor (name, model, errors) {
    this.name = 'NoModelError';

    this.message = name + ' had errors in: ' + errors.join(',') +
                    ' with properties ' + JSON.stringify(model.toJSON());

    this.status = 422;
  }
}

export default ValidationError;
