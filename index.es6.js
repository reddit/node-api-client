import { makeOptions, rawSend } from './apiBase/APIRequestUtils';

// import accounts from './apis/accounts';
// import activities from './apis/activities';
// import captcha from './apis/captcha';
// import messages from './apis/messages';
// import modListing from './apis/modListing';
// import multis from './apis/multis';
// import multiSubscriptions from './apis/multiSubscriptions';
// import reports from './apis/reports';
// import rules from './apis/rules';
// import stylesheets from './apis/stylesheets';
// import subredditRelationships from './apis/subredditRelationships';
// import subscriptions from './apis/subscriptions';
// import trophies from './apis/trophies';
// import votes from './apis/votes';
// import wiki from './apis/wiki';
import CommentsEndpoint from './apis/CommentsEndpoint';
import HiddenEndpoint from './apis/HiddenEndpoint';
import PostsEndpoint from './apis/PostsEndpoint';
import SavedEndpoint from './apis/SavedEndpoint';
import SearchEndpoint from './apis/SearchEndpoint';
import SubredditEndpoint from './apis/SubredditEndpoint';

import { APIResponse, MergedApiReponse } from './apiBase/APIResponse';
import Model from './apiBase/Model';
import Record from './apiBase/Record';
import * as ModelTypes from './models2/thingTypes';

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

export const endpoints = {
  // accounts,
  // activities,
  // captcha,
  // messages,
  // modListing,
  // multis,
  // multiSubscriptions,
  // reports,
  // rules,
  // stylesheets,
  // subredditRelationships,
  // subscriptions,
  // trophies,
  // votes,
  // wiki,
  CommentsEndpoint,
  HiddenEndpoint,
  PostsEndpoint,
  SavedEndpoint,
  SearchEndpoint,
  SubredditEndpoint,
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

// import Account from './models/account';
// import Award from './models/award';
// import Base from './models/base';
// import Block from './models/block';
// import BlockedUser from './models/BlockedUser';
// import Message from './models/message';
// import PromoCampaign from './models/promocampaign';
// import Preferences from './models/preferences';
// import Subscription from './models/subscription';
// import Vote from './models/vote';
// import Report from './models/report';
// import WikiPage from './models/wikiPage';
// import WikiRevision from './models/wikiRevision';
// import WikiPageListing from './models/wikiPageListing';
// import WikiPageSettings from './models/wikiPageSettings';

// new models
import CommentModel from './models2/CommentModel';
import PostModel from './models2/PostModel';
import Subreddit from './models2/Subreddit';

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
  // Account,
  // Award,
  // Base,
  // Block,
  // BlockedUser,
  // Message,
  // PromoCampaign,
  // Preferences,
  // Subreddit,
  // Subscription,
  // Vote,
  // Report,
  // WikiPage,
  // WikiRevision,
  // WikiPageListing,
  // WikiPageSettings,
  Model,
  ModelTypes,
  Record,

  CommentModel,
  PostModel,
  Subreddit,
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

export const requestUtils = {
  rawSend,
};

export const optionsWithAuth = token => {
  return {
    ...DefaultOptions,
    token,
    origin: token ? AUTHED_API_ORIGIN : DEFAULT_API_ORIGIN,
  };
};
