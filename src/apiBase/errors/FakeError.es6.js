import omit from 'lodash/omit';

export default class FakeError {
  constructor (message) {
    Object.defineProperty(this, 'message', { value: message });

    if (Error.hasOwnProperty('captureStackTrace')) {
      Error.captureStackTrace(this, this.constructor);
    } else {
      Object.defineProperty(this, 'stack', { value: (new Error()).stack });
    }
  }

  /**
  * Use this when you want to merge properties from an object onto
  * an instance of FakeError. In other FakeError subclasses we used to
  * write things like `Object.assign(fakeErrorInstance, errorObject)`.
  * This code breaks because `errorObject`, an instnace of the Error class,
  * can have a property called `message` or `stack` that we assign
  * as read-only properties in the FakeError constructor.
  *
  * @param {Object} - the object we want to copy properties from
  * @returns {undefined} - used for the side-effect of copying key/values from input
  */
  safeAssignProps(obj) {
    Object.assign(this, omit(obj, ['message', 'stack']));
  }
}
