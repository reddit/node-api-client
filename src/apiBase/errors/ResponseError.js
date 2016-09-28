import FakeError from './FakeError';

export class DisconnectedError extends FakeError {
  constructor(error, url) {
    super(`URL ${url} not reachable. You are probably disconnected from the internet.`);
    this.safeAssignProps(error);
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

    // HACK: technically, we should be able to skip right to the check for
    // `if (error.code && error.syscall) { ... }`, but there's a bug in babel
    // preventing us from doing so. Babel wants to make sure `super` is called
    // before we exit this constructor. This check is technically unneeded, because
    // we're returning a new instance of a separate class -- and aborting init
    // of this class. To workaround this, call super ahead of time
    // so babel's check passes.
    //
    // NOTE: If you're looking through compiled code, this fixes a bug where
    // babel added a call to `_possibleConstructorReturn` that was passed a var
    // named `_this2` which was declared but isn't initialized until `super` runs
    super(`Status ${error.status} returned from API request to ${url}`);
    this.safeAssignProps(error);
    this.name = 'ResponseError';

    // Check if it's a disconnection error or something else weird
    if (error.code && error.syscall) {
      return ResponseError.getSystemLevelError(error, url);
    }
  }

  static getSystemLevelError (error, url) {
    const E = codeMap[error.code] || Error;
    return new E(error, url);
  }
}
