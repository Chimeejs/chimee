import {query, findParents, isArray, addEventCache, removeEventCache} from 'chimee-helper';

/**
 * 为HTML元素添加事件代理
 * @param {HTMLElement} host 目标对象
 * @param {String} selector 要被代理的元素
 * @param {String} type 事件名称
 * @param {Function} handler 处理函数
 * @param {Boolean} capture 是否在捕获阶段监听
 */
export function addDelegate (host, selector, type, handler, capture = false) {
  const el = host.$dom;
  const handlerWrap = function (e) {
    const targetElsArr = findParents(e.target || e.srcElement, el, true);
    const targetElArr = query(selector, el, true);
    let retEl;
    if(targetElArr.find) {
      retEl = targetElArr.find(seEl => targetElsArr.find(tgEl => (seEl === tgEl)));
    }else{
      // Fixed IE11 Array.find not defined bug
      targetElArr.forEach(seEl => !retEl && targetElsArr.forEach(tgEl => {
        if(!retEl && seEl === tgEl) {
          retEl = tgEl;
        }
      }));
    }
    retEl && handler.apply(retEl, arguments);

  };
  /* 将包装后的方法记录到缓存中 */
  addEventCache(el, type + '_delegate_' + selector, handler, handlerWrap);
  host.events[type] = isArray(host.events[type]) ? host.events[type] : [];
  host.events[type].push(handlerWrap);
}

/**
 * 为HTML元素移除事件代理
 * @param {HTMLElement} host 目标对象
 * @param {String} selector 要被代理的元素
 * @param {String} type 事件名称
 * @param {Function} handler 处理函数
 * @param {Boolean} capture 是否在捕获阶段监听
 */
export function removeDelegate (host, selector, type, handler, capture = false) {
  const el = host.$dom;
  /* 尝试从缓存中读取包装后的方法 */
  const handlerWrap = removeEventCache(el, type + '_delegate_' + selector, handler);
  if(handlerWrap) {
    const index = host.events[type].indexOf(handlerWrap);
    host.events[type].splice(index, 1);
  }
}

export function fireEvent (host, type, evt) {
  isArray(host.events[type]) && host.events[type].forEach(item => {
    item(evt);
  })
}