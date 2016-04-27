@r/api-client
======

[![Build Status](https://travis-ci.org/reddit/snoode.svg?branch=rframework)](https://travis-ci.org/reddit/snoode)

A reddit API library for node and browsers.

Example
-------

```javascript
// Require snoode.
import Snoode from '@r/api-client';
const api = new Snoode({});

// Example call to get links for /r/homebrewing.
api.links.get({
  subreddit: 'homebrewing',
}).then(res => {
  console.log(res.results);
  console.log(res.getModelFromRecord(res.results[0]));
});

// Example call to get all comments for this particular listing.
api.comments.get({
  linkId: 't3_ib4bk'
}).then(res => {
  console.log(res.results);
  console.log(res.getModelFromRecord(res.results[0]));
  console.log(res.comments);
  console.log(res.links);
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

If you want to use your account to see thigns like your subscriptions, saved,
etc: ./repl will use the environment variable 'TOKEN' if supplied.

```bash
export TOKEN='my-super-secret-secure-oauth-token'
./repl
```
```javascript
api.saved.get({ user: 'my-user-name' }).then(console.log)
```


Mancy [Not recommended, this is outdated and won't be updated for now]
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
