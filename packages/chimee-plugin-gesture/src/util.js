export function getDistance(x, y, x1, y1) {

  return Math.sqrt(Math.pow((x1 - x), 2) + Math.pow((y1 - y), 2));
}

export function getSpeed(s, t) {
  return s / t;
}

export function isArray(arr) {
  return Array.isArray(arr);
}