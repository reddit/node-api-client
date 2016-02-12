class ResponseError extends Error {
  constructor (error, url) {
    super(error);
    Object.assign(this, error);

    this.name = 'ResponseError';
    this.message = `Status ${error.status} returned from API request to ${url}`;
  }
}

export default ResponseError;
