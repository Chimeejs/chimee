/**
 * 判断某个事件的落点在元素的什么位置
 * @param {Object} evt 事件对象
 * @param {*} elem dom 元素
 * @return 'left' or 'right'
 */
export function getEventPosition (evt, elem) {
  const {left: x1, right: x2} = elem.getBoundingClientRect();
  const {screenX: pointX} = evt;
  const centerX = (x1 + x2) / 2;
  return pointX >= centerX ? 'right' : 'left';
}

/**
 * 判断点是否在某矩形区域内
 * @param {Object} point 点{x, y}
 * @param {Object} rect 矩形{x1, y1, x2, y2}
 */
export function isPointInRect (point, rect) {
  return point.x >= rect.x1 && point.x <= rect.x2 && point.y >= rect.y1 && point.x <= rect.y2;
}
