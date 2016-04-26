export const COMMENT = 'comment';
export const USER = 'user';
export const LINK = 'link';
export const MESSAGE = 'message';
export const SUBREDDIT = 'subreddit';
export const TROPHIE = 'trophie';
export const PROMOCAMPAIGN = 'promocampaign';

export const TYPES = {
  t1: COMMENT,
  t2: USER,
  t3: LINK,
  t4: MESSAGE,
  t5: SUBREDDIT,
  t6: TROPHIE,
  t8: PROMOCAMPAIGN,
};

export function thingType(id) {
  return TYPES[id.substring(0, 2)];
}
