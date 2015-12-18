snoode
======

Someday, it will be a reddit API library.

For now, it handles only a few resources. Building in parallel with
[reddit-mobile](https://github.com/reddit/reddit-mobile).

Works both client-side and server-side.

Example
-------

```javascript
// Require snoode.
import { v1 } from 'snoode';
const api = new v1();

// Example call to get links for /r/homebrewing.
api.links.get({
  subredditName: 'homebrewing',
}).then(function(data) {
  console.log(data.body);
});

// Example call to get all comments for this particular listing.
api.comments.get({
  linkId: 't3_ib4bk'
}).then(function(data) {
  console.log(data.body);
});

// Example with auth.
// Pass in an oauth token and new origin to `withConfig`, which returns
// a new instance that inherits the config from the existing api instance
// merged with the new config.

const myOauthToken = 'abcdef1234567890';
const authedAPI = api.withConfig({
  token: myOauthToken,
  origin: 'https://oauth.reddit.com'
});

authedAPI.subscriptions.get().then(function(data) {
  console.log(data.body)
});
```

Development / Testing
---------------------

If you `chmod +x ./repl`, you can start up a repl for testing (and for general
use!) An api instance is created in the global scope (`api`), from which you
can call any of the API methods. Use `help` in the repl to learn more.

Caveats
------

* Uses ES7. At reddit, we use [babel](https://babeljs.io) to run and build ES6+.
