var Base = require('./base');

var Link = Base.extend({
  properties: function() {
    return [
      'domain',
      'banned_by',
      'media_embed',
      'subreddit',
      'selftext_html',
      'selftext',
      'likes',
      'secure_media',
      'link_flair_text',
      'id',
      'gilded',
      'secure_media_embed',
      'clicked',
      'report_reasons',
      'author',
      'media',
      'score',
      'approved_by',
      'over_18',
      'hidden',
      'thumbnail',
      'subreddit_id',
      'edited',
      'link_flair_css_class',
      'author_flair_css_class',
      'downs',
      'saved',
      'is_self',
      'name',
      'permalink',
      'stickied',
      'created',
      'url',
      'author_flair_text',
      'title',
      'created_utc',
      'ups',
      'num_comments',
      'visited',
      'num_reports',
      'distinguished',
    ];
  }
});

module.exports = Link;
