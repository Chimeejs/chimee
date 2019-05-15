var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { isNumber, isString } from 'lodash';
import { accessor, alwaysBoolean, alwaysNumber, alwaysString, applyDecorators, initString, nonenumerable as nonenumerableDecorator } from 'toxic-decorators';
import { isNumeric } from 'toxic-predicate-functions';
import { videoDomAttributes } from '../const/attribute';
const nonenumerable = nonenumerableDecorator;
function stringOrVoid(value) {
    return isString(value) ? value : undefined;
}
function accessorVideoProperty(property) {
    return accessor({
        get(value) {
            return (this.dispatcher.videoConfigReady && this.inited)
                ? this.dom.videoElement[property]
                : value;
        },
        set(value) {
            if (!this.dispatcher.videoConfigReady) {
                return value;
            }
            this.dom.videoElement[property] = value;
            return value;
        },
    });
}
function accessorVideoAttribute(attribute) {
    const { set, get, isBoolean } = isString(attribute)
        ? {
            get: attribute,
            isBoolean: false,
            set: attribute,
        }
        : attribute;
    return accessor({
        get(value) {
            return (this.dispatcher.videoConfigReady && this.inited)
                ? this.dom.videoElement[get]
                : value;
        },
        set(value) {
            if (!this.dispatcher.videoConfigReady) {
                return value;
            }
            const val = isBoolean
                ? value
                    ? ''
                    : undefined
                : value === null
                    ? undefined
                    : value;
            this.dom.setAttr('videoElement', set, val);
            return value;
        },
    }, {
        preSet: false,
    });
}
function accessorCustomAttribute(attribute, isBoolean) {
    return accessor({
        get(value) {
            const attrValue = this.dom.getAttr('videoElement', attribute);
            return (this.dispatcher.videoConfigReady && this.inited)
                ? isBoolean
                    ? !!attrValue
                    : attrValue
                : value;
        },
        set(value) {
            if (!this.dispatcher.videoConfigReady) {
                return value;
            }
            const val = isBoolean
                ? value || undefined
                : value === null
                    ? undefined
                    : value;
            this.dom.setAttr('videoElement', attribute, val);
            return value;
        },
    });
}
function accessorWidthAndHeight(property) {
    return accessor({
        get(value) {
            if (!this.dispatcher.videoConfigReady || !this.inited) {
                return value;
            }
            const attr = this.dom.getAttr('videoElement', property);
            const prop = this.dom.videoElement[property];
            if (isNumeric(attr) && isNumber(prop)) {
                return prop;
            }
            return attr || undefined;
        },
        set(value) {
            if (!this.dispatcher.videoConfigReady) {
                return value;
            }
            let val;
            if (value === undefined || isNumber(value)) {
                val = value;
            }
            else if (isString(value) && !Number.isNaN(parseFloat(value))) {
                val = value;
            }
            this.dom.setAttr('videoElement', property, val);
            return val;
        },
    });
}
const accessorMap = {
    autoload: alwaysBoolean(),
    autoplay: [
        alwaysBoolean(),
        accessorVideoProperty('autoplay'),
    ],
    controls: [
        alwaysBoolean(),
        accessorVideoProperty('controls'),
    ],
    crossOrigin: [
        accessor({ set: stringOrVoid }),
        accessorVideoAttribute({ set: 'crossorigin', get: 'crossOrigin' }),
    ],
    defaultMuted: [
        alwaysBoolean(),
        accessorVideoAttribute({ get: 'defaultMuted', set: 'muted', isBoolean: true }),
    ],
    defaultPlaybackRate: [
        accessorVideoProperty('defaultPlaybackRate'),
        alwaysNumber(1),
    ],
    disableRemotePlayback: [
        alwaysBoolean(),
        accessorVideoProperty('disableRemotePlayback'),
    ],
    height: [
        accessorWidthAndHeight('height'),
    ],
    loop: [
        alwaysBoolean(),
        accessorVideoProperty('loop'),
    ],
    muted: [
        alwaysBoolean(),
        accessorVideoProperty('muted'),
    ],
    playbackRate: [
        alwaysNumber(1),
        accessorVideoProperty('playbackRate'),
    ],
    playsInline: [
        accessor({
            get(value) {
                const playsInline = this.dom.videoElement.playsInline;
                return (this.dispatcher.videoConfigReady && this.inited)
                    ? playsInline === undefined
                        ? value
                        : playsInline
                    : value;
            },
            set(value) {
                if (!this.dispatcher.videoConfigReady) {
                    return value;
                }
                this.dom.videoElement.playsInline = value;
                const val = value ? '' : undefined;
                this.dom.setAttr('videoElement', 'playsinline', val);
                this.dom.setAttr('videoElement', 'webkit-playsinline', val);
                this.dom.setAttr('videoElement', 'x5-playsinline', val);
                return value;
            },
        }),
        alwaysBoolean(),
    ],
    poster: [
        alwaysString(),
        accessor({
            get(value) {
                return (this.dispatcher.videoConfigReady && this.inited)
                    ? this.dom.videoElement.poster
                    : value;
            },
            set(value) {
                if (!this.dispatcher.videoConfigReady) {
                    return value;
                }
                if (value.length) {
                    this.dom.setAttr('videoElement', 'poster', value);
                }
                return value;
            },
        }),
    ],
    preload: [
        accessor({
            set(value) {
                const options = ['none', 'auto', 'metadata', ''];
                return options.indexOf(value) > -1
                    ? value
                    : 'none';
            },
        }, {
            preSet: true,
        }),
        accessorVideoAttribute('preload'),
    ],
    src: [
        alwaysString(),
        accessor({
            set(val) {
                if (this.dispatcher.readySync && this.autoload && val !== this.src) {
                    this.needToLoadSrc = true;
                }
                return val;
            },
        }),
        accessor({
            set(val) {
                if (this.needToLoadSrc) {
                    this.needToLoadSrc = false;
                    this.dispatcher.binder.emit({
                        id: 'dispatcher',
                        name: 'load',
                        target: 'plugin',
                    }, val);
                }
                return val;
            },
        }, { preSet: false }),
    ],
    volume: [
        alwaysNumber(1),
        accessorVideoProperty('volume'),
    ],
    width: [
        accessorWidthAndHeight('width'),
    ],
    x5VideoOrientation: [
        accessor({ set: stringOrVoid }),
        accessorCustomAttribute('x5-video-orientation'),
    ],
    x5VideoPlayerFullscreen: [
        accessor({ set(value) { return !!value; }, get(value) { return !!value; } }),
        accessorCustomAttribute('x5-video-player-fullscreen', true),
    ],
    x5VideoPlayerType: [
        accessor({
            set(value) {
                if (!this.dispatcher.videoConfigReady) {
                    return value;
                }
                const val = value === 'h5' ? 'h5' : undefined;
                this.dom.setAttr('videoElement', 'x5-video-player-type', val);
                return value;
            },
            get(value) {
                return (this.dispatcher.videoConfigReady && value) ||
                    (this.dom.getAttr('videoElement', 'x5-video-player-type') ? 'h5' : undefined);
            },
        }),
    ],
    xWebkitAirplay: [
        accessor({ set(value) { return !!value; }, get(value) { return !!value; } }),
        accessorCustomAttribute('x-webkit-airplay', true),
    ],
};
export default class VideoConfig {
    constructor(dispatcher, config) {
        this.autoload = true;
        this.autoplay = false;
        this.box = '';
        this.changeWatchable = true;
        this.controls = false;
        this.crossOrigin = undefined;
        this.defaultMuted = false;
        this.defaultPlaybackRate = 1;
        this.disableRemotePlayback = false;
        this.height = '100%';
        this.inited = false;
        this.isLive = false;
        this.loop = false;
        this.muted = false;
        this.needToLoadSrc = false;
        this.playbackRate = 1;
        this.playsInline = false;
        this.poster = undefined;
        this.preload = 'auto';
        this.preset = {};
        this.presetConfig = {};
        this.src = '';
        this.volume = 1;
        this.width = '100%';
        this.x5VideoOrientation = undefined;
        this.x5VideoPlayerFullscreen = false;
        this.x5VideoPlayerType = undefined;
        this.xWebkitAirplay = false;
        applyDecorators(this, accessorMap, { self: true });
        Object.defineProperty(this, 'dispatcher', {
            configurable: false,
            enumerable: false,
            value: dispatcher,
            writable: false,
        });
        Object.defineProperty(this, 'dom', {
            configurable: false,
            enumerable: false,
            value: dispatcher.dom,
            writable: false,
        });
        Object.assign(this, config);
    }
    init() {
        videoDomAttributes.forEach((key) => {
            this[key] = this[key];
        });
        this.inited = true;
    }
}
__decorate([
    initString((str) => str.toLocaleLowerCase())
], VideoConfig.prototype, "box", void 0);
__decorate([
    nonenumerable
], VideoConfig.prototype, "changeWatchable", void 0);
__decorate([
    nonenumerable
], VideoConfig.prototype, "inited", void 0);
__decorate([
    nonenumerable
], VideoConfig.prototype, "needToLoadSrc", void 0);
//# sourceMappingURL=video.js.map