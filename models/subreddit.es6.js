import Base from './base';

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
  'content_options',
].sort();

class Subreddit extends Base {
  _type = 'Subreddit';

  static fields = EDIT_FIELDS;

  constructor(props) {
    delete props.submit_text_html;
    delete props.description_html;
    delete props.public_description_html;

    super(props);
  }
}

export default Subreddit;
