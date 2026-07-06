const MINUTE = 60;
const HOUR   = 3600;
const DAY    = 86400;

export function timeAgo(dateString) {
  const now = new Date();
  const date = new Date(dateString);
  const seconds = Math.floor((now - date) / 1000);

  if (seconds < 0)  return 'Just now';
  if (seconds < 60) return 'Just now';
  if (seconds < 120) return '1 minute ago';
  if (seconds < HOUR) return `${Math.floor(seconds / MINUTE)} minutes ago`;
  if (seconds < 2 * HOUR) return '1 hour ago';
  if (seconds < DAY) return `${Math.floor(seconds / HOUR)} hours ago`;
  if (seconds < 2 * DAY) return 'Yesterday';
  return `${Math.floor(seconds / DAY)} days ago`;
}