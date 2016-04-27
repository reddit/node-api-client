export default function unredditifyLink(url) {
  if (!url) { return; }
  return url.replace(/^https?:\/\/(?:www\.)?reddit.com/, '');
}
