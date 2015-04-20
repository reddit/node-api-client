import Base from './base';

// decode websafe_json encoding
function unsafeJson(text) {
    return text.replace(/&gt;/g, '>')
        .replace(/&lt;/g, '<')
        .replace(/&amp;/g, '&');
}

class Stylesheet extends Base {
    constructor(props) {
        props._type = 'Stylesheet';
        super(props);
    }

    get stylesheet () {
        return unsafeJson(this.get('stylesheet'));
    }
};

export default Stylesheet;