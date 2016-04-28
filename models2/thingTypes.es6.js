export const COMMENT = 'comment';
export const COMMENT_TYPE = 't1';
export const COMMENT_LOAD_MORE = 'comment_load_more';

export const USER = 'user';
export const USER_TYPE = 't2';

export const LINK = 'link';
export const LINK_TYPE = 't3';

export const MESSAGE = 'message';
export const MESSAGE_TYPE = 't4';

export const SUBREDDIT = 'subreddit';
export const SUBREDDIT_TYPE = 't5';

export const TROPHIE = 'trophie';
export const TROPHIE_TYPE = 't6';

export const PROMOCAMPAIGN = 'promocampaign';
export const PROMOCAMPAIGN_TYPE = 't8';

const type_pairs = [
  [COMMENT, COMMENT_TYPE],
  [USER, USER_TYPE],
  [LINK, LINK_TYPE],
  [MESSAGE, MESSAGE_TYPE],
  [SUBREDDIT, SUBREDDIT_TYPE],
  [TROPHIE, TROPHIE_TYPE],
  [PROMOCAMPAIGN, PROMOCAMPAIGN_TYPE],
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
