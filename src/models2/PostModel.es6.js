import RedditModel from './RedditModel';
import { POST } from './thingTypes';
import votable from './mixins/votable';
import replyable from './mixins/replyable';

const T = RedditModel.Types;

const IGNORED_THUMBNAILS = new Set(['default', 'image', 'self', 'nsfw']);
const cleanThumbnail = thumbnail => {
  return IGNORED_THUMBNAILS.has(thumbnail) ? '' : thumbnail;
};

export default class PostModel extends RedditModel {
  static type = POST;

  static PROPERTIES = {
    adserverImpPixel: T.string,
    archived: T.bool,
    author: T.string,
    cleanPermalink: T.link,
    cleanUrl: T.link,
    distinguished: T.string,
    domain: T.string,
    downs: T.number,
    gilded: T.number,
    hidden: T.bool,
    id: T.string,
    impPixel: T.string,
    likes: T.likes,
    locked: T.bool,
    malink: T.link,
    media: T.nop,
    name: T.string,
    over18: T.bool,
    postHint: T.string,
    promoted: T.bool,
    quarantine: T.bool,
    saved: T.bool,
    score: T.number,
    stickied: T.bool,
    subreddit: T.string,
    subredditDetail: T.nop,
    subredditId: T.string,
    thumbnail: T.string,
    title: T.string,
    ups: T.number,

    // aliases
    authorFlairCSSClass: T.string,
    authorFlairText: T.string,
    createdUTC: T.number,
    disableComments: T.bool,
    hideScore: T.bool,
    isSelf: T.bool,
    isBlankAd: T.bool,
    linkFlairCSSClass: T.string,
    linkFlairText: T.string,
    mediaOembed: T.nop,
    modReports: T.array,
    numComments: T.number,
    originalLink: T.string,
    outboundLink: T.nop,
    promotedBy: T.string,
    promotedDisplayName: T.string,
    promotedUrl: T.string,
    secureMedia: T.nop,
    selfTextHTML: T.string, // html version for display
    selfTextMD: T.string, // markdown version for editing
    sendReplies: T.bool,
    suggestedSort: T.string,
    thirdPartyTracking: T.string,
    thirdPartyTracking2: T.string,
    userReports: T.array,

    // derived
    expandable: T.bool,
    expandedContent: T.html,
    preview: T.nop, // it's in data as well but we want to transform it
  };

  static API_ALIASES = {
    adserver_imp_pixel: 'adserverImpPixel',
    author_flair_css_class: 'authorFlairCSSClass',
    author_flair_text: 'authorFlairText',
    created_utc: 'createdUTC',
    disable_comments: 'disableComments',
    hide_score: 'hideScore',
    imp_pixel: 'impPixel',
    is_self: 'isSelf',
    is_blank_ad: 'isBlankAd',
    link_flair_css_class: 'linkFlairCSSClass',
    link_flair_text: 'linkFlairText',
    media_oembed: 'mediaOembed',
    mod_reports: 'modReports',
    num_comments: 'numComments',
    original_link: 'originalLink',
    over_18: 'over18',
    outbound_link: 'outboundLink',
    permalink: 'cleanPermalink',
    promoted_by: 'promotedBy',
    promoted_display_name: 'promotedDisplayName',
    promoted_url: 'promotedUrl',
    post_hint: 'postHint',
    secure_media: 'secureMedia',
    selftext: 'selfTextMD',
    selftext_html: 'selfTextHTML',
    suggested_sort: 'suggestedSort',
    sr_detail: 'subredditDetail',
    subreddit_id: 'subredditId',
    sendreplies: 'sendReplies',
    third_party_tracking: 'thirdPartyTracking',
    third_party_tracking_2: 'thirdPartyTracking2',
    url: 'cleanUrl',
    user_reports: 'userReports',
  };

  // Note: derived properties operate on the json passed to
  // Post.fromJson(). If the model is being updated with `.set` (voting uses this)
  // or it's being re-instanced after serializing on the server, we
  // will have the derived property, but we might not have all of the original
  // json the api returns. To handle this, we re-use the computed props when necessary.
  static DERIVED_PROPERTIES = {
    expandable(data) {
      if (data.expandable) {
        return data.expandable;
      }

      // If it has secure_media, or media, or selftext, it has expandable.
      return !!(
        (data.secure_media && data.secure_media.content) ||
        (data.media_embed && data.media_embed.content) ||
        (data.selftext_html)
      );
    },

    expandedContent(data) {
      if (data.expandedContent) {
        return data.expandedContent;
      }

      let content;

      content = (
        (data.secure_media_embed && data.secure_media_embed.content) ||
        (data.media_embed && data.media_embed.content)
      );

      if (!content && data.selftext_html) {
        content = data.selftext_html;
      }

      return content;
    },

    preview(data) {
      if (!data.promoted || data.preview) {
        return data.preview;
      }

      // we build fake preview data for ads and normal thumbnails
      const resolutions = [];

      if (data.mobile_ad_url) {
        resolutions.push({
          url: data.mobile_ad_url,
          height: 628,
          width: 1200,
        });
      }

      const thumbnail = cleanThumbnail(data.thumbnail);
      if (thumbnail) {
        resolutions.push({
          url: thumbnail,
          height: 140,
          width: 140,
        });
      }

      return {
        images: [{
          resolutions,
        }],
      };
    },

    thumbnail(data) {
      return cleanThumbnail(data.thumbnail);
    },
  };
}

votable(PostModel);
replyable(PostModel);
