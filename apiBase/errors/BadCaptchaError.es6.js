import FakeError from './FakeError';

const INCORRECT_CAPTCHA = 'Incorrect captcha provided.';
const NO_CAPTCHA = 'No captcha provided.';

export default class BadCaptchaError extends FakeError {
  constructor(captcha, newCaptcha, errors) {
    const message = captcha ? INCORRECT_CAPTCHA : NO_CAPTCHA;
    super(message);
    this.name = 'BadCaptchaError';
    this.captcha = captcha;
    this.newCaptcha = newCaptcha;
    this.errors = errors;
    this.status = 200;
  }
}
