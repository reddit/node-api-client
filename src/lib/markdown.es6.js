export default function process(text) {
  if (!text) return text;

  text = text.replace(/<a/g, '<a target="_blank"');

  return text;
}
