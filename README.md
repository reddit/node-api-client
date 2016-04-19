snoode
======

[![Build Status](https://travis-ci.org/reddit/snoode.svg?branch=master)](https://travis-ci.org/reddit/snoode)

A reddit API library for node and browsers.

Example
-------

```javascript
// Require snoode.
import Snoode from 'snoode';
const api = new Snoode();

// Example call to get links for /r/homebrewing.
api.links.get({
  subreddit: 'homebrewing',
}).then(data => {
  console.log(data.body);
});

// Example call to get all comments for this particular listing.
api.comments.get({
  linkId: 't3_ib4bk'
}).then(data => {
  console.log(data.body);
});

// Example with auth.
// Pass in an oauth token and new origin to `withConfig`, which returns
// a new instance that inherits the config from the existing api instance
// merged with the new config.

const myOauthToken = 'abcdef1234567890';
const authedAPI = api.withAuth(myOauthToken);

authedAPI.subscriptions.post({ subreddit: 'homebrewing' }).then(console.log);
```

Development / Testing
---------------------

If you `chmod +x ./repl`, you can start up a repl for testing (and for general
use!) An api instance is created in the global scope (`api`), from which you
can call any of the API methods. Use `help` in the repl to learn more.

Mancy
-----

If you install [Mancy](https://github.com/princejwesley/Mancy) you can have a nicer version of using the repl. To set it up, open mancy, and go to `Preferences`. Under `Add node modules path` add your local install of Snoode. Then under `Startup script` add `mancyStart.js`. You can edit `mancyStart.js` to include your token and you can then either use `api` or `authed` as you'd expect. Mancy supports lots of inspecting and autocomplete tools out of the box.

Example `mancyStart.js`:
```
var api = require('mancyLoader.js')
var authed = api.withConfig({
    token: "<YOUR_TOKEN_HERE>",
    origin: "https://oauth.reddit.com"})
```


Caveats
------

* Uses ES7. At reddit, we use [babel](https://babeljs.io) to run and build ES6+.
