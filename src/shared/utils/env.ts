export function isBrowserEnv() {
  return typeof window !== 'undefined' && typeof window.document !== 'undefined';
}

export function isNodeEnv() {
  return typeof process !== 'undefined' && process.release && process.release.name === 'node';
}