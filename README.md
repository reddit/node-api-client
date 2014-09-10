snoode
======

Someday, it will be a reddit API library.

For now, it handles only a few resources. Building in parallel with
[switcharoo](https://github.com/reddit/switcharoo).

```javascript
var api = require('snoode').v1;

api.links.get({
  subredditName: 'homebrewing',
  view: 'hot'
}).then(function(listings) {
  // do stuff with the array of listings
});

api.comments.get({
  linkId: 't3_ib4bk'
}).then(function(comments, listing) {
  // do stuff with the array of comments
});
```

