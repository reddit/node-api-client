snoode
======

Someday, it will be a reddit API library.

For now, it handles only a few resources. Building in parallel with
[switcharoo](https://github.com/reddit/switcharoo).

```javascript
// Convert snoode's es6 to es5. To use in browser, use babelify and
// compile in.

require('babel/register')({
  ignore: false,
  only: /.+(?:(?:\.es6\.js)|(?:.jsx))$/,
  extensions: ['.js', '.es6.js'],
  sourceMap: true,
});

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

* Requires iojs, or node with `--harmony` flag.
