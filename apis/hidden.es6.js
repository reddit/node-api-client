import BaseAPI from './base.es6.js';
import Save from '../models/save.es6.js';
import Saves from './saves.es6.js';

class Hidden extends Saves {
  path (method, query={}) {
    switch (method) {
      case 'get':
        return `user/${query.user}/hidden.json`;
      case 'post' :
        return 'api/hide';
      case 'delete':
        return 'api/unhide';
    }
  }
}

export default Hidden;
