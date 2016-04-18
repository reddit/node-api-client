const snuownd = require('snuownd');
const sanitize = require('sanitize-html');

const processor = snuownd.getParser();

const allowedTags = sanitize.defaults.allowedTags.concat(
  [
    'h1',
    'h2',
    'sup',
  ]
);

const sanitizeOptions = {
  allowedTags,
};

export default function process(text) {
  if (!text) return text;

  text = processor.render(text);
  text = text.replace(/<a/g, '<a target="_blank"');

  text = sanitize(text, sanitizeOptions);

  return text;
}
