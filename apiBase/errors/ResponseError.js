import FakeError from './FakeError';

export class DisconnectedError extends FakeError {
  constructor(error, url) {
    super(`URL ${url} not reachable. You are probably disconnected from the internet.`);
    Object.assign(this, error);
  }
}

const codeMap = {
  ECONNREFUSED: DisconnectedError,
  ENOTFOUND: DisconnectedError,
};

export default class ResponseError extends FakeError {
  constructor (error, url) {
    // Make sure an error and url were actually passed in
    if (!error) { throw new Error('No error passed to ResponseError'); }
    if (!url) { throw new Error('No url passed to ResponseError'); }

    // Check if it's a disconnection error or something else weird
    if (error.code && error.syscall) {
      return ResponseError.getSystemLevelError(error, url);
    }

    super(`Status ${error.status} returned from API request to ${url}`);
    Object.assign(this, error);

    this.name = 'ResponseError';
  }

  static getSystemLevelError (error, url) {
    const E = codeMap[error.code] || Error;
    return new E(error, url);
  }
}
