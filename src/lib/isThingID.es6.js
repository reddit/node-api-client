const THING_ID_REGEX = new RegExp('^t\\d_[0-9a-z]+', 'i');

export default function isThingID(val) {
  return THING_ID_REGEX.test(val);
}
