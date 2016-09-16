import RedditModel from './RedditModel';
const T = RedditModel.Types;

export default class PreferencesModel extends RedditModel {
  static type = 'preferences';

  static PROPERTIES = {
    affiliateLinks: T.bool,
    allowClicktracking: T.bool,
    beta: T.bool,
    clickgadget: T.bool,
    collapseReadMessages: T.bool,
    compress: T.bool,
    credditAutorenew: T.bool,
    defaultCommentSort: T.string, // It would be nice to have T.oneOf like react here
    // as it's one of 'confidence', 'old', 'top', 'qa', 'controversial', 'new',
    defaultThemeSr: T.string,
    domainDetails: T.bool,
    emailMessages: T.bool,
    enableDefaultThemes: T.bool,
    hideAds: T.bool,
    hideDowns: T.bool,
    hideFromRobots: T.bool,
    hideLocationbar: T.bool,
    hideUps: T.bool,
    highlightControversial: T.bool,
    highlightNewComments: T.bool,
    ignoreSuggestedSort: T.bool,
    labelNsfw: T.bool,
    lang: T.string,
    legacySearch: T.bool,
    markMessagesRead: T.bool,
    media: T.string, // Another case for T.oneOf,
    // 'on', 'off', 'subreddit'
    minCommentScore: T.number, // T.number should maybe have a T.range version
    // -- this can only be between -100 and 100
    minLinkScore: T.number, // same as above
    monitorMentions: T.bool,
    newWindow: T.bool,
    noProfanity: T.bool,
    numComments: T.number, // in range 1 and 500
    numsites: T.number, // in range 1 and 500
    organic: T.bool,
    otherTheme: T.string, // subreddit name
    over18: T.bool,
    privateFeeds: T.bool,
    publicVotes: T.bool,
    research: T.bool,
    showFlair: T.bool,
    showGoldExpiration: T.bool,
    showLinkFlair: T.bool,
    showPromote: T.bool,
    showStylesheets: T.bool,
    showTrending: T.bool,
    storeVisits: T.bool,
    themeSelector: T.string, // subreddit name
    threadedMessages: T.bool,
    threadedModmail: T.bool,
    useGlobalDefaults: T.bool,
  };

  static API_ALIASES = {
    affiliate_links: 'affiliateLinks',
    allow_clicktracking: 'allowClicktracking',
    beta: 'beta',
    clickgadget: 'clickgadget',
    collapse_read_messages: 'collapseReadMessages',
    compress: 'compress',
    creddit_autorenew: 'credditAutorenew',
    default_comment_sort: 'defaultCommentSort',
    default_theme_sr: 'defaultThemeSr',
    domain_details: 'domainDetails',
    email_messages: 'emailMessages',
    enable_default_themes: 'enableDefaultThemes',
    hide_ads: 'hideAds',
    hide_downs: 'hideDowns',
    hide_from_robots: 'hideFromRobots',
    hide_locationbar: 'hideLocationbar',
    hide_ups: 'hideUps',
    highlight_controversial: 'highlightControversial',
    highlight_new_comments: 'highlightNewComments',
    ignore_suggested_sort: 'ignoreSuggestedSort',
    label_nsfw: 'labelNsfw',
    lang: 'lang',
    legacy_search: 'legacySearch',
    mark_messages_read: 'markMessagesRead',
    media: 'media',
    min_comment_score: 'minCommentScore',
    min_link_score: 'minLinkScore',
    monitor_mentions: 'monitorMentions',
    newwindow: 'newWindow',
    no_profanity: 'noProfanity',
    num_comments: 'numComments',
    numsites: 'numsites',
    organic: 'organic',
    other_theme: 'otherTheme',
    over_18: 'over18',
    private_feeds: 'privateFeeds',
    public_votes: 'publicVotes',
    research: 'research',
    show_flair: 'showFlair',
    show_gold_expiration: 'showGoldExpiration',
    show_link_flair: 'showLinkFlair',
    show_promote: 'showPromote',
    show_stylesheets: 'showStylesheets',
    show_trending: 'showTrending',
    store_visits: 'storeVisits',
    themeSelector: 'themeSelector',
    threaded_messages: 'threadedMessages',
    threaded_modmail: 'threadedModmail',
    use_global_defaults: 'useGlobalDefaults',
  };

  makeUUID(data) {
    return 'preferences'; // there's only one preferences object for a user
    // so the id is constant. Probably shouldn't use this.
  }
}
