export const COMMENT = 'comment';
export const COMMENT_TYPE = 't1';
export const COMMENT_LOAD_MORE = 'comment_load_more';

export const ACCOUNT = 'account';
export const ACCOUNT_TYPE = 't2';

export const POST = 'post';
export const POST_TYPE = 't3';

export const MESSAGE = 'message';
export const MESSAGE_TYPE = 't4';

export const SUBREDDIT = 'subreddit';
export const SUBREDDIT_TYPE = 't5';

export const TROPHIE = 'trophie';
export const TROPHIE_TYPE = 't6';

export const PROMOCAMPAIGN = 'promocampaign';
export const PROMOCAMPAIGN_TYPE = 't8';

// Honorary things
export const WIKI = 'wiki';
export const WIKI_TYPE = 'wiki';

export const SUBREDDIT_RULE = 'subreddit_rule';
export const SUBREDDIT_RULE_TYPE = 'subreddit_rule';

const type_pairs = [
  [COMMENT, COMMENT_TYPE],
  [ACCOUNT, ACCOUNT_TYPE],
  [POST, POST_TYPE],
  [MESSAGE, MESSAGE_TYPE],
  [SUBREDDIT, SUBREDDIT_TYPE],
  [TROPHIE, TROPHIE_TYPE],
  [PROMOCAMPAIGN, PROMOCAMPAIGN_TYPE],
  [WIKI, WIKI_TYPE],
  [SUBREDDIT_RULE, SUBREDDIT_RULE_TYPE],
];

export const TYPES = type_pairs.reduce((table, pair) => {
  table[pair[1]] = pair[0];
  return table;
}, {});

export const TYPE_TO_THING_TYPE = type_pairs.reduce((table, pair)=> {
  table[pair[0]] = pair[1];
  return table;
}, {});

export function thingType(id) {
  return TYPES[id.substring(0, 2)];
}
