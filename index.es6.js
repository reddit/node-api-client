import { makeOptions } from './apiBase/APIRequestUtils';

// import activities from './apis/activities';
import hidden from './apis/hidden';
import saved from './apis/saved';
// import search from './apis/search';
// import stylesheets from './apis/stylesheets';
// import subreddits from './apis/subreddits';
// import subscriptions from './apis/subscriptions';
// import trophies from './apis/trophies';
// import accounts from './apis/accounts';
// import votes from './apis/votes';
import PostEndpoint from './apis/PostEndpoint';
// import comments from './apis/comments';
// import captcha from './apis/captcha';
// import reports from './apis/reports';
// import messages from './apis/messages';
// import modListing from './apis/modListing';
// import subredditRelationships from './apis/subredditRelationships';
// import rules from './apis/rules';
// import wiki from './apis/wiki';
// import multis from './apis/multis';
// import multiSubscriptions from './apis/multiSubscriptions';

import { APIResponse, MergedApiReponse } from './apiBase/APIResponse';

import {
  withQueryAndResult,
  afterResponse,
  beforeResponse,
  fetchAll,
} from './apiBase/APIResponsePaging';

export const APIResponses = {
  APIResponse,
  MergedApiReponse,
};

export const APIResponsePaging = {
  withQueryAndResult,
  afterResponse,
  beforeResponse,
  fetchAll,
};

export const APIs = {
  // activities,
  // captcha,
  hidden,
  saved,
  // search,
  // stylesheets,
  // subreddits,
  // subscriptions,
  // trophies,
  // accounts,
  // votes,
  PostEndpoint,
  // comments,
  // reports,
  // messages,
  // modListing,
  // subredditRelationships,
  // rules,
  // wiki,
  // multis,
  // multiSubscriptions,
};

import NoModelError from './apiBase/errors/NoModelError';
import ResponseError from './apiBase/errors/ResponseError';
import { DisconnectedError } from './apiBase/errors/ResponseError';
import ValidationError from './apiBase/errors/ValidationError';
import NotImplementedError from './apiBase/errors/NotImplementedError';

export const errors = {
  NoModelError,
  ValidationError,
  ResponseError,
  DisconnectedError,
  NotImplementedError,
};

import Account from './models/account';
import Award from './models/award';
import Base from './models/base';
import Block from './models/block';
import BlockedUser from './models/BlockedUser';
import Comment from './models2/Comment';
import PostModel from './models2/PostModel';
import Message from './models/message';
import PromoCampaign from './models/promocampaign';
import Preferences from './models/preferences';
import Subreddit from './models2/Subreddit';
import Subscription from './models/subscription';
import Vote from './models/vote';
import Report from './models/report';
import WikiPage from './models/wikiPage';
import WikiRevision from './models/wikiRevision';
import WikiPageListing from './models/wikiPageListing';
import WikiPageSettings from './models/wikiPageSettings';

import {
  SubscribedSubreddits,
  ModeratingSubreddits,
  ContributingSubreddits,
} from './collections/SubredditLists';

import CommentsPage from './collections/CommentsPage';
import HiddenPostsAndComments from './collections/HiddenPostsAndComments';
import PostsFromSubreddit from './collections/PostsFromSubreddit';
import SavedPostsAndComments from './collections/SavedPostsAndComments';
import SearchQuery from './collections/SearchQuery';

export const models = {
  Account,
  Award,
  Base,
  Block,
  BlockedUser,
  Comment,
  PostModel,
  Message,
  PromoCampaign,
  Preferences,
  Subreddit,
  Subscription,
  Vote,
  Report,
  WikiPage,
  WikiRevision,
  WikiPageListing,
  WikiPageSettings,
};

export const collections = {
  CommentsPage,
  ContributingSubreddits,
  HiddenPostsAndComments,
  ModeratingSubreddits,
  PostsFromSubreddit,
  SavedPostsAndComments,
  SearchQuery,
  SubscribedSubreddits,
};

const DEFAULT_API_ORIGIN = 'https://www.reddit.com';
const AUTHED_API_ORIGIN = 'https://oauth.reddit.com';

// Webpack 2 has an export bug where a library's export object does not state
// that it is an es6 module. Without this tag defined on the exports object,
// Webpack does not import the library correctly.
export const __esModule = true;

const DefaultOptions = {
  origin: DEFAULT_API_ORIGIN,
  userAgent: 'snoodev3',
  appName: 'snoodev3',
  env: process.env.NODE_ENV || 'dev',
};

export default makeOptions(DefaultOptions);

export const optionsWithAuth = token => {
  return {
    ...DefaultOptions,
    token,
    origin: token ? DEFAULT_API_ORIGIN : AUTHED_API_ORIGIN,
  };
};
