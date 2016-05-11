import RedditModel from './RedditModel';
import { SUBREDDIT } from './thingTypes';

const T = RedditModel.Types;

// If the data doesn't have all of the keys, get the full subreddit data
// and then merge in the changes and submit _that_. The API requires the
// full object be sent.
// Whoever uses this new model for posting should confirm that
// this is the full list of edit fields, you may just be able to
// say something like
const EDIT_FIELDS = [
  'default_set',
  'subreddit_id',
  'domain',
  'show_media',
  'wiki_edit_age',
  'submit_text',
  'spam_links',
  'title',
  'collapse_deleted_comments',
  'wikimode',
  'over_18',
  'related_subreddits',
  'suggested_comment_sort',
  'description',
  'submit_link_label',
  'spam_comments',
  'spam_selfposts',
  'submit_text_label',
  'key_color',
  'language',
  'wiki_edit_karma',
  'hide_ads',
  'header_hover_text',
  'public_traffic',
  'public_description',
  'comment_score_hide_mins',
  'subreddit_type',
  'exclude_banned_modqueue',
  'submission_type',
].sort();

export default class Subreddit extends RedditModel {
  static type = SUBREDDIT;

  static fields = EDIT_FIELDS;

  static PROPERTIES = {
    accountsActive: T.number,
    bannerImage: T.string,
    bannerSize: T.arrayOf(T.number),
    collapseDeletedComments: T.bool,
    commentScoreHideMins: T.number,
    createdUTC: T.number,
    description: T.string,
    displayName: T.string,
    headerImage: T.string,
    headerSize: T.arrayOf(T.number),
    headerTitle: T.string,
    hideAds: T.bool,
    iconImage: T.string,
    iconSize: T.arrayOf(T.number),
    id: T.string,
    keyColor: T.string,
    lang: T.string,
    name: T.string,
    over18: T.bool,
    publicDescription: T.string,
    publicTraffic: T.nop,
    quarantine: T.bool,
    relatedSubreddits: T.array,
    submissionType: T.string,
    submitLinkLabel: T.string,
    submitText: T.string,
    submitTextLabel: T.string,
    subredditType: T.string,
    subscribers: T.number,
    suggestedCommentSort: T.string,
    title: T.string,
    url: T.string,
    userIsBanned: T.bool,
    userIsContributor: T.bool,
    userIsModerator: T.bool,
    userIsMuted: T.bool,
    userSrThemeEnabled: T.bool,
    wikiEnabled: T.bool,
    wikiEditAge: T.number,
    wikiEditKarma: T.number,
    wikiMode: T.string,
  };

  static API_ALIASES = {
    accounts_active: 'accountsActive',
    banner_img: 'bannerImage',
    banner_size: 'bannerSize',
    collapse_deleted_comments: 'collapseDeletedComments',
    comment_score_hide_mins: 'commentScoreHideMins',
    created_utc: 'createdUTC',
    display_name: 'displayName',
    header_img: 'headerImage',
    header_size: 'headerSize',
    header_title: 'headerTitle',
    hide_ads: 'hideAds',
    icon_img: 'iconImage',
    icon_size: 'iconSize',
    public_description: 'publicDescription',
    public_traffic: 'publicTraffic',
    related_subreddits: 'relatedSubreddits',
    submission_type: 'submissionType',
    submit_link_label: 'submitLinkLabel',
    submit_text_label: 'submitTextLabel',
    submit_text: 'submitText',
    subreddit_type: 'subredditType',
    user_is_banned: 'userIsBanned',
    user_is_contributor: 'userIsContributor',
    user_is_moderator: 'userIsModerator',
    user_is_muted: 'userIsMuted',
    user_sr_theme_enabled: 'userSrThemeEnabled',
    wiki_enabled: 'wikiEnabled',
    wiki_edit_age: 'wikiEditAge',
    wiki_edit_karma: 'wikiEditKarma',
    wikimode: 'wikiMode',
  };
}
