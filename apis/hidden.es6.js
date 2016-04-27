import Saved from './saved';

export default class Hidden extends Saved {
  path (method, query={}) {
    switch (method) {
      case 'get':
        return `user/${query.user}/hidden.json`;
      case 'post' :
        return 'api/hide';
      case 'del':
        return 'api/unhide';
    }
  }
}
