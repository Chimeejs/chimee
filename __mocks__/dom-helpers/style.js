import originStyle from 'dom-helpers/style';
function style(...args) {
  const node = args[0];
  if (args.length === 3 && node && node.style) {
    node.style[args[1]] = args[2];
  }
  originStyle(...args);
}

module.exports = style;
