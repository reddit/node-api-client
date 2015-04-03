class NoModelError extends Error {
  constructor (endpoint) {
    super(endpoint);

    this.name = 'NoModelError';
    this.message = 'No model given for api endpoint ' + endpoint;
    this.status = 400;
  }
}

export default NoModelError;
