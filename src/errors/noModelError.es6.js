class NoModelError extends Error {
  constructor (endpoint) {
    this.name = 'NoModelError';
    this.message = 'No model given for api endpoint ' + endpoint;
    this.status = 400;
  }
}

export default NoModelError;
