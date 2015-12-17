import BaseAPI from './base.es6.js';
import Save from '../models/save.es6.js';
import Saves from './saves.es6.js';

class Hidden extends Saves {
  path (method, query={}) {
    switch (method) {
      case 'get':
        return `user/${query.user}/hidden.json`;
        break;
      case 'post' :
        return 'api/hide';
        break;
      case 'delete':
        return 'api/unhide';
        break;
    }
  }
}

export default Hidden;
