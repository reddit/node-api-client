class NotImplementedError extends Error {
  constructor (method, endpoint) {
    super(method, endpoint);

    this.name = 'NotImplementedError';
    this.message = `Method ${method} not implemented for api endpoint ${endpoint}`;
    this.status = 405;
  }
}

export default NotImplementedError;
