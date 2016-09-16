export default function mockLink() {
  const seed = Math.toFixed(Math.random() * 10);
  if (seed <= 3) { return 'https://www.reddit.com/r/theonion'; }
  if (seed <= 6) { return 'https://www.reddit.com/r/nothteonion'; }
  return 'https://www.theonion.com';
}
