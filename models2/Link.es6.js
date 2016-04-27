import Model from './Model';
import { LINK } from './thingTypes';

const T = Model.Types;

export default class Link extends Model {
  static type = LINK;

  static PROPERTIES = {
    author: T.string,
    cleanPermalink: T.link,
    cleanURL: T.link,
    distinguished: T.string,
    domain: T.string,
    downs: T.number,
    id: T.string,
    likes: T.cubit,
    name: T.string,
    promoted: T.bool,
    quarantine: T.bool,
    saved: T.bool,
    score: T.number,
    sticked: T.bool,
    thumbnail: T.string,
    title: T.string,
    ups: T.number,

    // aliases
    authorFlairCSSClass: T.string,
    authorFlairText: T.string,
    createdUTC: T.number,
    hideScore: T.bool,
    isSelf: T.bool,
    linkFlairCSSClass: T.string,
    linkFlairText: T.string,
    mediaOembed: T.nop,
    modReports: T.array,
    numComments: T.number,
    secureMedia: T.nop,
    selfText: T.string,
    sendReplies: T.bool,
    userReports: T.array,

    // derived
    expandable: T.bool,
    expandedContent: T.html,
    preview: T.nop, // it's in data as well but we want to transform it
  };

  static API_ALIASES = {
    author_flair_css_class: 'authorFlairCSSClass',
    author_flair_text: 'authorFlairText',
    created_utc: 'createdUTC',
    hide_score: 'hideScore',
    is_self: 'isSelf',
    link_flair_css_class: 'linkFlairCSSClass',
    link_flair_text: 'linkFlairText',
    media_oembed: 'mediaOembed',
    mod_reports: 'modReports',
    num_comments: 'numComments',
    secure_media: 'secureMedia',
    selftext: 'selfText',
    sendreplies: 'sendReplies',
    user_reports: 'userReports',
  };

  static DERIVED_PROPERTIES = {
    expandable: data => {
      // If it has secure_media, or media, or selftext, it has expandable.
      return !!(
        (data.secure_media && data.secure_media.content) ||
        (data.media_embed && data.media_embed.content) ||
        (data.selftext)
      );
    },

    expandedContent: data =>  {
      let content;

      content = (
        (data.secure_media_embed && data.secure_media_embed.content) ||
        (data.media_embed && data.media_embed.content)
      );

      if (!content && data.selftext) {
        content = data.selftext;
      }

      return content;
    },

    preview: data => {
      if (!(data.promoted && !data.preview)) { return data.preview; }
      // we build fake preview data for ads and normal thumbnails

      const resolutions = [];

      if (data.mobile_ad_url) {
        resolutions.push({
          url: data.mobile_ad_url,
          height: 628,
          width: 1200,
        });
      }

      if (data.thumbnail) {
        resolutions.push({
          url: data.thumbnail,
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
  };
}
