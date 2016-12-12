import { makeOptions, rawSend } from './apiBase/APIRequestUtils';

// import captcha from './apis/captcha';
// import modListing from './apis/modListing';
// import multis from './apis/multis';
// import multiSubscriptions from './apis/multiSubscriptions';
// import reports from './apis/reports';
// import rules from './apis/rules';
// import stylesheets from './apis/stylesheets';
// import subredditRelationships from './apis/subredditRelationships';
// import trophies from './apis/trophies';
// import votes from './apis/votes';
// import wiki from './apis/wiki';

// CommentsEndpoint must be imported first followed by PostsEndpoint.
// This is because the PostsEndpoint requires the PostModel which uses the replyable
// mixin which requires the CommentsEndpoint. If they're imported out of order
// endpoints that rely on both Comments and Posts will break in suspicous ways :(
import CommentsEndpoint from './apis/CommentsEndpoint';
import PostsEndpoint from './apis/PostsEndpoint';

import AccountsEndpoint from './apis/accounts';
import ActivitiesEndpoint from './apis/activities';
import EditUserTextEndpoint from './apis/EditUserTextEndpoint';
import HiddenEndpoint from './apis/HiddenEndpoint';
import Modtools from './apis/modTools';
import PreferencesEndpoint from './apis/PreferencesEndpoint';
import RecommendedSubreddits from './apis/RecommendedSubreddits';
import SavedEndpoint from './apis/SavedEndpoint';
import SearchEndpoint from './apis/SearchEndpoint';
import SimilarPosts from './apis/SimilarPosts';
import SubredditAutocomplete from './apis/SubredditAutocomplete';
import subscriptions from './apis/subscriptions';
import SubredditEndpoint from './apis/SubredditEndpoint';
import SubredditsByPost from './apis/SubredditsByPost';
import SubredditsToPostsByPost from './apis/SubredditsToPostsByPost';
import WikisEndpoint from './apis/wikis';
import MessagesEndpoint from './apis/MessagesEndpoint';

import { APIResponse, MergedApiReponse } from './apiBase/APIResponse';
import Model from './apiBase/Model';
import Record from './apiBase/Record';
import * as ModelTypes from './models2/thingTypes';
import apiRequest from './apiBase/apiRequest';

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
  // captcha,
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
  AccountsEndpoint,
  ActivitiesEndpoint,
  EditUserTextEndpoint,
  CommentsEndpoint,
  HiddenEndpoint,
  Modtools,
  PostsEndpoint,
  PreferencesEndpoint,
  RecommendedSubreddits,
  SavedEndpoint,
  SearchEndpoint,
  SimilarPosts,
  subscriptions,
  SubredditAutocomplete,
  SubredditsByPost,
  SubredditsToPostsByPost,
  SubredditEndpoint,
  WikisEndpoint,
  MessagesEndpoint,
};

import NoModelError from './apiBase/errors/NoModelError';
import ResponseError from './apiBase/errors/ResponseError';
import { DisconnectedError } from './apiBase/errors/ResponseError';
import ValidationError from './apiBase/errors/ValidationError';
import BadCaptchaError from './apiBase/errors/BadCaptchaError';
import NotImplementedError from './apiBase/errors/NotImplementedError';

export const errors = {
  NoModelError,
  ValidationError,
  ResponseError,
  DisconnectedError,
  NotImplementedError,
  BadCaptchaError,
};

// import Award from './models/award';
// import Base from './models/base';
// import Block from './models/block';
// import BlockedUser from './models/BlockedUser';
// import Message from './models/message';
// import PromoCampaign from './models/promocampaign';
// import Subscription from './models/subscription';
// import Vote from './models/vote';
// import Report from './models/report';
// import WikiPage from './models/wikiPage';
// import WikiRevision from './models/wikiRevision';
// import WikiPageListing from './models/wikiPageListing';
// import WikiPageSettings from './models/wikiPageSettings';

// new models
import Account from './models2/Account';
import CommentModel from './models2/CommentModel';
import PostModel from './models2/PostModel';
import Preferences from './models2/Preferences';
import Subreddit from './models2/Subreddit';
import Wiki from './models2/Wiki';

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
  // Award,
  // Base,
  // Block,
  // BlockedUser,
  // Message,
  // PromoCampaign,
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

  Account,
  CommentModel,
  PostModel,
  Preferences,
  Subreddit,

  Wiki,
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
  apiRequest,
};

export const optionsWithAuth = token => {
  return {
    ...DefaultOptions,
    token,
    origin: token ? AUTHED_API_ORIGIN : DEFAULT_API_ORIGIN,
  };
};
