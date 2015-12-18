import Base from './base';
import process from 'reddit-text-js';

class Link extends Base {
  _type = 'Link';

  constructor(props) {
    delete props.selftext_html;

    if (props.promoted && !props.preview) {
      let resolutions = [];

      if (props.mobile_ad_url) {
        resolutions.push({
          url: props.mobile_ad_url,
          height: 628,
          width: 1200,
        });
        delete props.mobile_ad_url;
      }

      if (props.thumbnail) {
        resolutions.push({
          url: props.thumbnail,
          height: 140,
          width: 140,
        });
        delete props.thumbnail;
      }

      props.preview = {
        images: [{
          resolutions: resolutions,
        }],
      };
    }

    super(props);

    const link = this;

    this.validators = {
      title: function () {
        return Base.validators.maxLength(link.get('title'), 300);
      }.bind(link),
      sendreplies: function() {
        return typeof link.get('sendreplies') === 'boolean';
      }.bind(link),
      thingId: function() {
        const thingId = link.get('thingId');
        return Base.validators.thingId(thingId);
      }.bind(link),
    };
  }

  get expandContent () {
    if (!this.expandable) {
      return;
    }

    let props = this.props;
    let content;

    content = (
      (props.secure_media_embed && props.secure_media_embed.content) ||
      (props.media_embed && props.media_embed.content)
    );

    if (!content && props.selftext) {
      content = process(props.selftext);
    }

    return content;
  }

  get expandable () {
    var props = this.props;

    // If it has secure_media, or media, or selftext, it has expandable.
    return !!(
      (props.secure_media && props.secure_media.content) ||
      (props.media_embed && props.media_embed.content) ||
      (props.selftext)
    );
  }

  get thumbnail () {
    var props = this.props;

    if (props.thumbnail &&
       (props.thumbnail === 'default' ||
        props.thumbnail === 'self' ||
        props.thumbnail === 'nsfw')) {
      return;
    }

    return props.thumbnail;
  }

  unredditify (url) {
    if (!url) { return; }
    return url.replace(/^https?:\/\/(?:www\.)?reddit.com/, '');
  }

  toJSON () {
    var props = this.props;
    props._type = this._type;

    props.thumbnail = this.thumbnail;
    props.expandable = this.expandable;
    props.expandContent = this.expandContent;

    props.cleanPermalink = this.unredditify(props.permalink);
    props.cleanUrl = this.unredditify(props.url);

    return props;
  }
}

export default Link;
