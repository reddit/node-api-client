import Base from './base';
import * as process from 'reddit-text-js';

class Link extends Base {
  constructor(props) {
    return super(props);
  }

  get expandContent () {
    if (!this.expandable) {
      return;
    }

    var props = this.props;
    var content;

    content = (
      (props.secure_media_embed && props.secure_media_embed.content) ||
      (props.media_embed && props.media_embed.content)
    );

    if (content) {
      content = content.replace(/&gt;/g, '>').replace(/&lt;/g, '<');
    } else if (props.selftext) {
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
    var thumbnailSrc = '/img/default.gif';

    if (props.thumbnail) {
      if (props.thumbnail === 'default' || props.thumbnail === 'self' || props.thumbnail === 'nsfw') {
        thumbnailSrc = '/img/' + props.thumbnail + '.gif';
      } else {
        thumbnailSrc = props.thumbnail;
      }
    } else if (props.selftext) {
      thumbnailSrc = '/img/self.gif';
    }

    return thumbnailSrc;
  }

  unredditify (url) {
    return url.replace(/^https?:\/\/(?:www\.)?reddit.com/, '');
  }

  toJSON () {
    var props = this.props;

    props.thumbnail = this.thumbnail;
    props.expandable = this.expandable;
    props.expandContent = this.expandContent;

    props.cleanPermalink = this.unredditify(props.permalink);
    props.cleanUrl = this.unredditify(props.url);

    return props;
  }
};

export default Link;
