@r/api-client
======

[![Build Status](https://travis-ci.org/reddit/node-api-client.svg?branch=3X)](https://travis-ci.org/reddit/node-api-client)

A reddit API library for node and browsers.

```javascript
// Require snoode.
import Snoode from '@r/api-client';
const api = new Snoode({});

import { collections } from '@r/api-client';
const { PostsFromSubreddit } = collections;

import { each } from 'lodash/collection';

let frontpage = await PostsFromSubreddit.fetch(api, 'highqualitygifs')
each(Array(10), async () => {
  frontpage = await frontpage.withNextPage(api);
});

frontpage.posts; // ~275 glorious gifs

// Example with auth.
// Pass in an oauth token and new origin to `withConfig`, which returns
// a new instance that inherits the config from the existing api instance
// merged with the new config.

const myOauthToken = 'abcdef1234567890';
const authedAPI = api.withAuth(myOauthToken);

const { SavedPostsAndComments } = models;
const dankestMemes = await SavedPostsAndComments.fetch(authedApi, 'my-user-name');
console.log(dankestMems.postsAndComments);
```

### API endpoints
At its core, the api is made up of ApiEndpoints, APIResponses, Models, and Records. ApiEndpoints all subclass [BaseApi](/apis/base.es6.js). It provides an easy way to build out a idealized restful wrapper for the api. Currently instances of the api endpoints are bound to API class (exported default when you import from the api client module). Using it looks like

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
```

##### Please note creating an api instance and then accessing enpoints is going to be depcreated in an upcoming minor version. Instead of passing the api options like origin and token to the `API()` constructor, you'll pass them directly to the endpoint. Endpoints current `.get` and `.post`, etc, methods will move to static methods, and will accept the options directly. This will make the storeage of api options fit better in a world with a redux store. Even more importantly, it will allow us experiment with compiling the api endpoints, models, and collections into individual files. This could lead to a benefical decrease in payload size as we add endpoints and models that aren't used by all products using `@r/api-client`


### Models and Records
A [Record](/models2/Record.es6.js) is essentially a tuple of `(<ModelType>, <ModelId)`.
```javascript
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
[APIResponse.es6.js](/apis/APIResponse.es6.js) defines the primary classes used to interact with responses from the api. (NOTE: we're still transitioning all the endpoints, but lots of them work). APIResponse embodies our opinionated view on managing your API data. Responses are normalized, and accessed in terms of records.

```javascript
const postsResponse = await api.links.get({ subredditName: 'reactjs'});
postsResponse.results; // an array of <Record>
postsResponse.links; // a dictionary of <LinkId> : <LinkModel>
```

For cases where you want pagination, there are helpers provided by
#### [APIResponsePaging.es6.js](/apis/APIResponsePaging.es6.js);
```javascript
import { APIResponsePaging } from '@r/api-client';
const { afterResponse } = APIResponsePaging;

// get the id of the last link in an api reponse, only if there's more data
// to fetch
afterResponse(api.links.get({ subredditName: 'reactjs' }))
```

#### [MergedResponses](/apis/APIResponse.es6.js) handle casses where you have paginated data. Once you've fetched the next page, you can merge it with the first page to have one response represent your entire list of data.

```javascript
const options = { subredditName: 'reactjs' };
const firstPage = await api.links.get(options);


const after = afterResponse(firstPage);

const withNextPage = firstPage.appendResponse(await api.links.get({ ...options, after });
```

Note: instances of `MergedResponses` Dont' have `.query` and `.meta` instance variables, instead they have `.querys` and `.metas` that are lists of those from their merged responses. Merging is simple loop that when given a list of responses, takes all of the top level results (with duplicates removed) and updates the tables (e.g. `apiResponse.links`) to use the latest version of the response object. This is useful for cases like paging through subreddits and the posts near page boundaries get listed twice, but you want the most up to date score, number of comments, etc`

### Smart Models
This directory contains models that are built to easy interacting with the api. Models will have methods like `subreddit.subscribe()` or `comment.upvote()`. Implementation wise they'll extend models and add various static and instance methods.

### Collections
Collections are used to simplyify fetching groups of things. For now all collections subclass [Listing](/collections/Listing.es6.js) has numersous helper methods for pagingation (`.withNextPage()`, `.withPreviousPage()`). Here's some documentation on the various subclasses

#### [SubredditLists](/collections/SubredditLists)

```javascript
import API from '@r/api-client';
import { collections } from '@r/api-client';
const { SubscribedSubreddits, ModeratingSubreddits } = collections;
const api = new API({});
const subscribedSubreddits = await SubscribedSubreddits.fetch(api);
console.log(subscribedSubreddits.subreddits.map(subreddit => subreddit.url));

const moderatedSubreddits = await ModeratingSubreddits.fetch(api);
console.log(moderatedSubreddits.subreddits.map(subreddit => subreddit.url));
```

In these examples `.fetch(api)` handles fetching all the pages by default. This is pending feedback.

#### [PostsFromSubreddit](/collections/PostsFromSubreddit.es6.js)

For example, you can fetch all the posts in a subreddit like so:
```javascript
const frontpagePopular = await PostsFromSubreddit.fetch(api, 'all')
console.log(frontpagePopular.posts.map(post => post.title);
const nextPage = await frontpagePopular.nextPage(api)
```

These endpoints are designed to take options like paging. This makes it easy to do things like continue a infinite scroll after page reloads.
```javascript
import { last } from 'lodash/array';
import { each } from 'lodash/collection';

let frontpage = await PostsFromSubreddit.fetch(api, 'all') // blank fetches frontpage;
each(Array(10), async () => {
  frontpage = await frontpage.withNextPage(api);
});

const after = last(frontpage.apiResponse.results).uuid;
const pageAfter = await PostsFromSubreddit.fetch(api, 'all', { after })
```

There are lots of other endpoints you can use too. Just note in the future you'll most likely pass an object with your api options instead of an api instance. This makes more sense in a redux world, and will allow us to build the api into modules which can be imported piecemeal, which could drastically reduce payload size.

#### [SavedPostsAndComments](/collections/SavedPostsAndComments.es6.js)
```javascript
const savedThings = await SavedPostsAndComments.fetch(api, 'my-user-name');
savedThings.postsAndComments;
const savedWithNextPage = await savedThings.withNextPage(api);
```

#### [HiddenPostsAndComments](/collections/HiddenPostsAndComments.es6.js)
```javascript
const lessThanDankMemes = await HiddenPostsAndComments.fetch(api, 'my-user-name');
lessThanDankMemes.postsAndComments;
```

#### [CommentsPage](/collections/CommentsPage.es6.js)
```javascript
const askRedditPosts = await PostsFromSubreddit.fetch(api, 'askreddit');
const post = askRedditPosts.apiResponse.uuid;
const commentsPage = await CommentsPage.fetch(api, post);
```

#### [SearchQuery](/collections/SearchQuery.es6.js)
```javascript
const searchResults = await SearchQuery.fetch(api, 'high quality gifs');
searchResults.posts;
searchResults.subreddits;
```

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

We write ES6/7 and compile via Reddit's build system [@r/build](https://www.github.com/reddit/node-build). We output a built file that expects a polyfilled es6/7 environment, with a lodash and superagent as peer depedencies. In your project you'll have to include those as depedencies and `import 'babel-polyfill'` or `require('babel-polyfill')` before using the api.
