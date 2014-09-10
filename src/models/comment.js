var Base = require('./base');

var Comment = Base.extend({
  properties: function() {
    return [
      'subreddit_id',
      'banned_by',
      'subreddit',
      'likes',
      'replies',
      'saved',
      'id',
      'gilded',
      'report_reasons',
      'author',
      'parent_id',
      'score',
      'approved_by',
      'controversiality',
      'body',
      'edited',
      'author_flair_css_class',
      'downs',
      'body_html',
      'link_id',
      'score_hidden',
      'name',
      'created',
      'author_flair_text',
      'created_utc',
      'distinguished',
      'num_reports',
      'ups',
    ];
  }
});

module.exports = Comment;
