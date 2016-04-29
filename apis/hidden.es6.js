import SavedEndpoint from './saved';

export default class HiddenEndpoint extends SavedEndpoint {
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
