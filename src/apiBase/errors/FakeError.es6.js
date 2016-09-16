export default class FakeError {
  constructor (message) {
    Object.defineProperty(this, 'message', { value: message });

    if (Error.hasOwnProperty('captureStackTrace')) {
      Error.captureStackTrace(this, this.constructor);
    } else {
      Object.defineProperty(this, 'stack', { value: (new Error()).stack });
    }
  }
}
