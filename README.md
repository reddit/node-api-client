@r/api-client
======

[![Build Status](https://travis-ci.org/reddit/snoode.svg?branch=rframework)](https://travis-ci.org/reddit/snoode)

A reddit API library for node and browsers.

### Example

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

### Models and Records
A [Record](/models2/Record.es6.js) is essentially a tuple of `(<ModelType>, <ModelId)`.
```javasript
const LinkRecord = new Record(LINK_TYPE, 't3_4gonrl');
```

They are produced by [Models](/models2/Model.es6.js).
The Model class provides type checking and immutability for your api data.
You define models in terms of Properties and types.

```javascript
const T = Model.TYPES;
class Post extends Model {
  static type = 'post';

  static PROPERTIES = {
    id: T.string,
    author: T.string,
    clean_url: T.link,
    score: T.number,
    sr_detail: T.nop, // just use the api object, nested parsing coming soon(tm)
  };
}
```

You can also alias names from the api that aren't javascript'y to a different name. You'll still have to provide a type alias.
```javascript
const T = Model.TYPES;
class Post extends Model {
  static type = 'link';

  static PROPERTIES = {
    linkFlairCSSClass: T.string,
    linkFlairText: T.string,
  };

  static API_ALIASES = {
    link_flair_css_class: T.string,
    link_flair_text: T.string,
  };
}
```

Types are defined in terms of functions, that given any input, should return an output that is considered valid for that 'type'. e.g. T.array is a function than when given `undefined` or `2`, returns an empty array. But when passes a normal array, it passes it back. You can use this to do encode things like `T.link`, which take an input, validate that its a string, and then if its a reddit link, turn it into a relative url.

```javascript
const T = Model.TYPES;
class Post extends Model {
  static PROPERTIES = {
    cleanURL: T.link,
  };

  static API_ALIASES = {
    clean_url: 'cleanURL',
  };
}
```


You can also make properties that are derived from the raw json object from the api
```javascript
const T = MODEL.TYPES;
class Post extends Model {
  static PROPERTIES = {
    preview: T.nop,
  };

  static DERIVED_PROPERTIES = {
    preview: (data) => {
      if (!data.preview) {
        // build a preview image based on media_oembed or the thumbanil
        return ...
      }

      return data.preview;
    },
  };
}
```

### APIResponses
[APIResponse.es6.js](/apis/APIResponse.es6.js) defines the primary classes used to interact with responses from the api. (NOTE: we're still transitioning all the endpoints, but lots of them work). APIResponse embodies our opinionated viewpoint on managing your API data. Responses are normalized, and accessed in terms of records.

```javascript
const postsResponse = await api.links.get({ subredditName: 'reactjs'});
postsResponse.results; // an array of <Record>
postsResponse.links; // a dictionary of <LinkId> : <LinkModel>
```

For cases where you want pagination, there are helpers provided by [APIResponsePaging.es6.js](/apis/APIResponsePaging.es6.js);
```javascript
import { APIResponsePaging } from '@r/api-client';
const { afterResponse } = APIResponsePaging;

// get the id of the last link in an api reponse, only if there's more data
// to fetch
afterResponse(api.links.get({ subredditName: 'reactjs' }))
```

Once you've fetched the next page, you can merge it with the first page to have one response represent your entire list of data.

```javascript
const options = { subredditName: 'reactjs' };
const firstPage = await api.links.get(options);


const after = afterResponse(firstPage);

const withNextPage = firstPage.appendResponse(await api.links.get({ ...options, after });
```

### Collections
We're still working on some collections, but an example of how they'll look is [SubredditLists](/smartmodels/SubredditLists);

```javascript
import API from '@r/api-client';
import { SubscribedSubreddits, ModeratingSubreddits  } from '@r/api-client';
const api = new API({});
const subscribedSubreddits = await SubscribedSubreddits.fetch(api);
console.log(subscribedSubreddits.subreddits.map(subreddit => subreddit.url));

const moderatedSubreddits = await ModeratingSubreddits.fetch(api);
console.log(moderatedSubreddits.subreddits.map(subreddit => subreddit.url));
```

In these examples `.fetch(api)` handles fetching all the pages by default. This is pening feedback. Its baseclass, [Listings](/smartmodels/Listings.es6.js) has numersous helper methods for pagingation (`.withNextPage()`, `.withPreviousPage()`).



### Development / Testing

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
