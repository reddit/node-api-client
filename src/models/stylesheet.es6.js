import Base from './base';

// decode websafe_json encoding
function unsafeJson(text) {
  return text.replace(/&gt;/g, '>')
      .replace(/&lt;/g, '<')
      .replace(/&amp;/g, '&');
}

class Stylesheet extends Base {
  _type = 'Stylesheet';

  get stylesheet () {
    return unsafeJson(this.get('stylesheet'));
  }
}

export default Stylesheet;
