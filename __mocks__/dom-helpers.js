import originStyle from 'dom-helpers/style';
export function style(...args) {
  const node = args[0];
  if (args.length === 3 && node && node.style) {
    node.style[args[1]] = args[2];
  }
  return originStyle(...args);
}
