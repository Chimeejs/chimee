(function(win) {

    'use strict';

    // major events supported:
    // panstart
    // panmove
    // panend
    // swipe
    // longpress

    // extra events supported:
    // dualtouchstart
    // dualtouch
    // dualtouchend
    // verticalpanstart
    // horizontalpanstart
    // verticalpanmove
    // horizontalpanmove
    // tap
    // doubletap
    // verticalswipe
    // horizontalswipe
    // pressend

    var doc = win.document,
        docEl = doc.documentElement,
        slice = Array.prototype.slice,
        gestures = {}, lastTap = null;

    /**
    * 找到两个结点共同的最小根结点
    * 如果跟结点不存在，则返回null
    *
    * @param  {Element} el1 第一个结点
    * @param  {Element} el2 第二个结点
    * @return {Element}     根结点
    */
    function getCommonAncestor(el1, el2) {
        var el = el1;
        while (el) {
            if (el.contains(el2) || el === el2) {
                return el;
            }
            el = el.parentNode;
        }
        return null;
    }

    /**
    * 触发一个事件
    *
    * @param  {Element} element 目标结点
    * @param  {string}  type    事件类型
    * @param  {object}  extra   对事件对象的扩展
    */
    function fireEvent(element, type, extra) {
        var event = doc.createEvent('HTMLEvents');
        event.initEvent(type, true, true);

        if (typeof extra === 'object') {
            for (let p in extra) {
                event[p] = extra[p];
            }
        }

        element.dispatchEvent(event);
    }

    /**
    * 计算变换效果
    * 假设坐标系上有4个点ABCD
    * > 旋转：从AB旋转到CD的角度
    * > 缩放：从AB长度变换到CD长度的比例
    * > 位移：从A点位移到C点的横纵位移
    *
    * @param  {number} x1 上述第1个点的横坐标
    * @param  {number} y1 上述第1个点的纵坐标
    * @param  {number} x2 上述第2个点的横坐标
    * @param  {number} y2 上述第2个点的纵坐标
    * @param  {number} x3 上述第3个点的横坐标
    * @param  {number} y3 上述第3个点的纵坐标
    * @param  {number} x4 上述第4个点的横坐标
    * @param  {number} y4 上述第4个点的纵坐标
    * @return {object}    变换效果，形如{rotate, scale, translate[2], matrix[3][3]}
    */
    function calc(x1, y1, x2, y2, x3, y3, x4, y4) {
        var rotate = Math.atan2(y4 - y3, x4 - x3) - Math.atan2(y2 - y1, x2 - x1),
            scale = Math.sqrt((Math.pow(y4 - y3, 2) + Math.pow(x4 - x3, 2)) / (Math.pow(y2 - y1, 2) + Math.pow(x2 - x1, 2))),
            translate = [x3 - scale * x1 * Math.cos(rotate) + scale * y1 * Math.sin(rotate), y3 - scale * y1 * Math.cos(rotate) - scale * x1 * Math.sin(rotate)];
        return {
            rotate,
            scale,
            translate,
            matrix: [
                [scale * Math.cos(rotate), -scale * Math.sin(rotate), translate[0]],
                [scale * Math.sin(rotate), scale * Math.cos(rotate), translate[1]],
                [0, 0, 1]
            ]
        };
    }

    /**
    * 捕获touchstart事件，将每一个新增的触点添加到gestrues
    * 如果之前尚无被记录的触点，则绑定touchmove, touchend, touchcancel事件
    *
    * 新增触点默认处于tapping状态
    * 500毫秒之后如果还处于tapping状态，则触发press手势
    * 如果触点数为2，则触发dualtouchstart手势，该手势的目标结点为两个触点共同的最小根结点
    *
    * @event
    * @param  {event} event
    */
    function touchstartHandler(event) {

        if (Object.keys(gestures).length === 0) {
            docEl.addEventListener('touchmove', touchmoveHandler, false);
            docEl.addEventListener('touchend', touchendHandler, false);
            docEl.addEventListener('touchcancel', touchcancelHandler, false);
        }

        var gesture, touch, touchRecord, elements;

        function genPressHandler (element, touch) {
            return function () {
                if (gesture.status === 'tapping') {
                    gesture.status = 'pressing';

                    fireEvent(element, 'longpress', {
                        // add touch data for weex
                        touch,
                        touches: event.touches,
                        changedTouches: event.changedTouches,
                        touchEvent: event
                    });
                }

                clearTimeout(gesture.pressingHandler);
                gesture.pressingHandler = null;
            };
        }

        // record every touch
        for (let i = 0 ; i < event.changedTouches.length ; i++ ) {
            touch = event.changedTouches[i];
            touchRecord = {};

            for (let p in touch) {
                touchRecord[p] = touch[p];
            }

            gesture = {
                startTouch: touchRecord,
                startTime: Date.now(),
                status: 'tapping',
                element: event.srcElement || event.target,
                pressingHandler: setTimeout(
                    genPressHandler(event.srcElement || event.target, event.changedTouches[i]),
                    500)
            };
            gestures[touch.identifier] = gesture;
        }

        if (Object.keys(gestures).length === 2) {
            elements = [];

            for (var p in gestures) {
                elements.push(gestures[p].element);
            }

            fireEvent(getCommonAncestor(elements[0], elements[1]), 'dualtouchstart', {
                touches: slice.call(event.touches),
                touchEvent: event
            });
        }
    }

    /**
    * 捕获touchmove事件，处理pan和dual的相关手势
    *
    * 1. 遍历每个触点：
    * > 如果触点之前处于tapping状态，且位移超过10像素，则认定为进入panning状态
    * 先触发panstart手势，然后根据移动的方向选择性触发horizontalpanstart或verticalpanstart手势
    * > 如果触点之前处于panning状态，则根据pan的初始方向触发horizontalpan或verticalpan手势
    *
    * 2. 如果当前触点数为2，则计算出几何变换的各项参数，触发dualtouch手势
    *
    * @event
    * @param  {event} event
    */
    function touchmoveHandler(event) {
        // TODO: 函数太大了，影响可读性，建议分解并加必要的注释

        // 遍历每个触点：
        // 1. 如果触点之前处于tapping状态，且位移超过10像素，则认定为进入panning状态
        // 先触发panstart手势，然后根据移动的方向选择性触发horizontalpanstart或verticalpanstart手势
        // 2. 如果触点之前处于panning状态，则根据pan的初始方向触发horizontalpan或verticalpan手势
        for (let i = 0; i < event.changedTouches.length; i ++ ) {
            let touch = event.changedTouches[i],
                gesture = gestures[touch.identifier];

            if (!gesture) {
                return;
            }

            if (!gesture.lastTouch) {
                gesture.lastTouch = gesture.startTouch;
            }
            if (!gesture.lastTime) {
                gesture.lastTime = gesture.startTime;
            }
            if (!gesture.velocityX) {
                gesture.velocityX = 0;
            }
            if (!gesture.velocityY) {
                gesture.velocityY = 0;
            }
            if (!gesture.duration) {
                gesture.duration = 0;
            }

            let time = Date.now() - gesture.lastTime;
            let vx = (touch.clientX - gesture.lastTouch.clientX) / time,
                vy = (touch.clientY - gesture.lastTouch.clientY) / time;

            let RECORD_DURATION = 70;
            if (time > RECORD_DURATION) {
                time = RECORD_DURATION;
            }
            if (gesture.duration + time > RECORD_DURATION) {
                gesture.duration = RECORD_DURATION - time;
            }

            gesture.velocityX = (gesture.velocityX * gesture.duration + vx * time) / (gesture.duration + time);
            gesture.velocityY = (gesture.velocityY * gesture.duration + vy * time) / (gesture.duration + time);
            gesture.duration += time;

            gesture.lastTouch = {};

            for (let p in touch) {
                gesture.lastTouch[p] = touch[p];
            }
            gesture.lastTime = Date.now();

            let displacementX = touch.clientX - gesture.startTouch.clientX,
                displacementY = touch.clientY - gesture.startTouch.clientY,
                distance = Math.sqrt(Math.pow(displacementX, 2) + Math.pow(displacementY, 2));

            // magic number 10: moving 10px means pan, not tap
            if ((gesture.status === 'tapping' || gesture.status === 'pressing') && distance > 10) {
                gesture.status = 'panning';
                gesture.isVertical = !(Math.abs(displacementX) > Math.abs(displacementY));

                fireEvent(gesture.element, 'panstart', {
                    touch,
                    touches: event.touches,
                    changedTouches: event.changedTouches,
                    touchEvent:event,
                    isVertical: gesture.isVertical
                });

                fireEvent(gesture.element, (gesture.isVertical?'vertical':'horizontal') + 'panstart', {
                    touch,
                    touchEvent: event
                });
            }

            if (gesture.status === 'panning') {
                gesture.panTime = Date.now();

                fireEvent(gesture.element, 'panmove', {
                    displacementX,
                    displacementY,
                    touch,
                    touches: event.touches,
                    changedTouches: event.changedTouches,
                    touchEvent: event,
                    isVertical: gesture.isVertical
                });


                if (gesture.isVertical) {
                    fireEvent(gesture.element, 'verticalpanmove', {
                        displacementY,
                        touch,
                        touchEvent: event
                    });
                } else {
                    fireEvent(gesture.element, 'horizontalpanmove', {
                        displacementX,
                        touch,
                        touchEvent: event
                    });
                }
            }
        }

        // 如果当前触点数为2，则计算出几何变换的各项参数，触发dualtouch手势
        if (Object.keys(gestures).length === 2) {
            let position = [],
                current = [],
                elements = [],
                transform;

            for (let i = 0 ; i < event.touches.length ; i++ ) {
                let touch = event.touches[i];
                let gesture = gestures[touch.identifier];
                position.push([gesture.startTouch.clientX, gesture.startTouch.clientY]);
                current.push([touch.clientX, touch.clientY]);
            }

            for (let p in gestures) {
                elements.push(gestures[p].element);
            }

            transform = calc(position[0][0], position[0][1], position[1][0], position[1][1], current[0][0], current[0][1], current[1][0], current[1][1]);
            fireEvent(getCommonAncestor(elements[0], elements[1]), 'dualtouch', {
                transform,
                touches : event.touches,
                touchEvent: event
            });
        }
    }

    /**
    * 捕获touchend事件
    *
    * 1. 如果当前触点数为2，则触发dualtouchend手势
    *
    * 2. 遍历每个触点：
    * > 如果处于tapping状态，则触发tap手势
    * 如果之前300毫秒出现过tap手势，则升级为doubletap手势
    * > 如果处于panning状态，则根据滑出的速度，触发panend/flick手势
    * flick手势被触发之后，再根据滑出的方向触发verticalflick/horizontalflick手势
    * > 如果处于pressing状态，则触发pressend手势
    *
    * 3. 解绑定所有相关事件
    *
    * @event
    * @param  {event} event
    */
    function touchendHandler(event) {

        if (Object.keys(gestures).length === 2) {
            let elements = [];
            for (let p in gestures) {
                elements.push(gestures[p].element);
            }
            fireEvent(getCommonAncestor(elements[0], elements[1]), 'dualtouchend', {
                touches: slice.call(event.touches),
                touchEvent: event
            });
        }

        for (let i = 0; i < event.changedTouches.length; i++) {
            let touch = event.changedTouches[i],
                id = touch.identifier,
                gesture = gestures[id];

            if (!gesture) {
                continue;
            }

            if (gesture.pressingHandler) {
                clearTimeout(gesture.pressingHandler);
                gesture.pressingHandler = null;
            }

            if (gesture.status === 'tapping') {
                gesture.timestamp = Date.now();
                fireEvent(gesture.element, 'tap', {
                    touch,
                    touchEvent: event
                });

                if (lastTap && gesture.timestamp - lastTap.timestamp < 300) {
                    fireEvent(gesture.element, 'doubletap', {
                        touch,
                        touchEvent: event
                    });
                }

                lastTap = gesture;
            }

            if (gesture.status === 'panning') {
                let now = Date.now();
                let duration = now - gesture.startTime,
                    // velocityX = (touch.clientX - gesture.startTouch.clientX) / duration,
                    // velocityY = (touch.clientY - gesture.startTouch.clientY) / duration,
                    displacementX = touch.clientX - gesture.startTouch.clientX,
                    displacementY = touch.clientY - gesture.startTouch.clientY;

                let velocity = Math.sqrt(gesture.velocityY*gesture.velocityY+gesture.velocityX*gesture.velocityX);
                let isflick = velocity > 0.5 && (now - gesture.lastTime) < 100;
                let extra = {
                    duration,
                    isflick,
                    velocityX: gesture.velocityX,
                    velocityY: gesture.velocityY,
                    displacementX,
                    displacementY,
                    touch,
                    touches: event.touches,
                    changedTouches: event.changedTouches,
                    touchEvent: event,
                    isVertical: gesture.isVertical
                };

                fireEvent(gesture.element, 'panend', extra);
                if (isflick) {
                    fireEvent(gesture.element, 'swipe', extra);

                    if (gesture.isVertical) {
                        fireEvent(gesture.element, 'verticalswipe', extra);
                    } else {
                        fireEvent(gesture.element, 'horizontalswipe', extra);
                    }
                }
            }

            if (gesture.status === 'pressing') {
                fireEvent(gesture.element, 'pressend', {
                    touch,
                    touchEvent: event
                });
            }

            delete gestures[id];
        }

        if (Object.keys(gestures).length === 0) {
            docEl.removeEventListener('touchmove', touchmoveHandler, false);
            docEl.removeEventListener('touchend', touchendHandler, false);
            docEl.removeEventListener('touchcancel', touchcancelHandler, false);
        }
    }

    /**
    * 捕获touchcancel事件
    *
    * 1. 如果当前触点数为2，则触发dualtouchend手势
    *
    * 2. 遍历每个触点：
    * > 如果处于panning状态，则触发panend手势
    * > 如果处于pressing状态，则触发pressend手势
    *
    * 3. 解绑定所有相关事件
    *
    * @event
    * @param  {event} event
    */
    function touchcancelHandler(event) {
        // TODO: 和touchendHandler大量重复，建议DRY

        if (Object.keys(gestures).length === 2) {
            let elements = [];
            for (let p in gestures) {
                elements.push(gestures[p].element);
            }
            fireEvent(getCommonAncestor(elements[0], elements[1]), 'dualtouchend', {
                touches: slice.call(event.touches),
                touchEvent: event
            });
        }

        for (let i = 0; i < event.changedTouches.length; i++) {
            let touch = event.changedTouches[i],
                id = touch.identifier,
                gesture = gestures[id];

            if (!gesture) {
                continue;
            }

            if (gesture.pressingHandler) {
                clearTimeout(gesture.pressingHandler);
                gesture.pressingHandler = null;
            }

            if (gesture.status === 'panning') {
                fireEvent(gesture.element, 'panend', {
                    touch,
                    touches: event.touches,
                    changedTouches: event.changedTouches,
                    touchEvent: event
                });
            }
            if (gesture.status === 'pressing') {
                fireEvent(gesture.element, 'pressend', {
                    touch,
                    touchEvent: event
                });
            }
            delete gestures[id];
        }

        if (Object.keys(gestures).length === 0) {
            docEl.removeEventListener('touchmove', touchmoveHandler, false);
            docEl.removeEventListener('touchend', touchendHandler, false);
            docEl.removeEventListener('touchcancel', touchcancelHandler, false);
        }
    }

    docEl.addEventListener('touchstart', touchstartHandler, false);

})(window);