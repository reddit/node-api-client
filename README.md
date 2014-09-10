snoode
======

Someday, it will be a reddit API library.

For now, it handles only a few resources. Building in parallel with
[switcharoo](https://github.com/reddit/switcharoo).

```javascript
api.links.get({
  version: 1,
  subredditName: 'homebrewing',
  view: 'hot'
}).then(function(listings) {
  // do stuff with the array of listings
});

api.comments.get({
  version: 1,
  linkId: 't3_ib4bk'
}).then(function(commentS) {
  // do stuff with the array of comments
});
```

