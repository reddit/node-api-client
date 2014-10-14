snoode
======

Someday, it will be a reddit API library.

For now, it handles only a few resources. Building in parallel with
[switcharoo](https://github.com/reddit/switcharoo).

```javascript
// Convert snoode's es6 to es5. To use in browser, use 6to5-browserify and
// compile in.
require('6to5/register')(/^(?!.*es6\.js$).*\.js$/i);

// Require snoode.
var api = require('snoode').v1;

// Example call to get links for /r/homebrewing.
api.links.get({
  subredditName: 'homebrewing',
  view: 'hot'
}).then(function(listings) {
  // do stuff with the array of listings
});

// Example call to get all comments for this particular listing.
api.comments.get({
  linkId: 't3_ib4bk'
}).then(function(comments, listing) {
  // do stuff with the array of comments
});
```

Caveats
------

* Requires --harmony flag to run with node.
* 
