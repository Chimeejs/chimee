/// <reference types="node" />

declare class GlobalConfig {
	silent: boolean;
	useStyleFullscreen: boolean;
	errorHandler: (...args: any[]) => any | void;
	log: {
		debug: boolean;
		error: boolean;
		info: boolean;
		verbose: boolean;
		warn: boolean;
	};
	silentValue: boolean;
	constructor();
}
export declare type ChimeeDomElement = 'container' | 'wrapper' | 'video';
export declare type RealChimeeDomElement = 'container' | 'wrapper' | 'videoElement';
declare class Dom {
	mouseInVideo: boolean;
	readonly videoExtendedNodes: Element[];
	container: Element;
	destroyed: boolean;
	dispatcher: Dispatcher;
	fullscreenElement: Element | 'wrapper' | 'container' | 'video' | void;
	isFullscreen: boolean | string;
	mouseInVideoValue: boolean;
	originHTML: string;
	plugins: {
		[x: string]: Element;
	};
	videoElement: HTMLVideoElement;
	videoExtendedNodesArray: Element[];
	videoRequireGuardedAttributes: string[];
	wrapper: Element;
	constructor(config: UserConfig, dispatcher: Dispatcher);
	destroy(): void;
	exitFullscreen(): boolean;
	focus(): void;
	fullscreen(request?: boolean, target?: RealChimeeDomElement): boolean;
	getAttr(target: RealChimeeDomElement, attr: string): string;
	getStyle(target: RealChimeeDomElement, attr: string): string;
	insertPlugin(id: string, el?: string | HTMLElement | {
		className?: string | string[];
		inner?: boolean;
		penetrate?: boolean;
	} | void, option?: {
		className?: string | string[];
		inner?: boolean;
		penetrate?: boolean;
	}): HTMLElement;
	installVideo(videoElement: HTMLVideoElement): HTMLVideoElement;
	isNodeInsideVideo(node: Element): boolean;
	migrateVideoRequiredGuardedAttributes(video: HTMLVideoElement): void;
	removePlugin(id: string): void;
	removeVideo(): HTMLVideoElement;
	requestFullscreen(target: RealChimeeDomElement): boolean;
	setAttr(target: RealChimeeDomElement, attr: string, val: string | void | number | boolean): void;
	setPluginsZIndex(plugins: string[]): void;
	setStyle(target: RealChimeeDomElement, attr: string, val: any): void;
	protected autoFocusToVideo(element: Element, remove?: boolean): void;
	private focusToVideo;
	private fullscreenMonitor;
}
export interface IVideoKernel {
	attachMedia(): void;
	destroy(): void;
	load(src: string): void;
	off(key: string, fn: (...args: any[]) => any): void;
	on(key: string, fn: (...args: any[]) => any): void;
	pause(): void;
	play(): void;
	refresh(): void;
	seek(seconds: number): void;
	startLoad(src: string): void;
	stopLoad(): void;
	unload(): void;
}
export interface IVideoKernelConstructor {
	new (...args: any[]): IVideoKernel;
	isSupport(): boolean;
}
declare class VideoConfig {
	autoload: boolean;
	autoplay: boolean;
	box: 'mp4' | 'hls' | 'flv' | '';
	changeWatchable: boolean;
	controls: boolean;
	crossOrigin: string | void;
	defaultMuted: boolean;
	defaultPlaybackRate: number;
	disableRemotePlayback: boolean;
	dispatcher: Dispatcher;
	dom: Dom;
	height: string | number | void;
	inited: boolean;
	isLive: boolean;
	kernels: UserKernelsConfig;
	loop: boolean;
	muted: boolean;
	needToLoadSrc: boolean;
	playbackRate: number;
	playsInline: boolean;
	poster: string;
	preload: 'none' | 'auto' | 'metadata' | '';
	preset: {
		[key in SupportedKernelType]?: IVideoKernelConstructor;
	};
	presetConfig: any;
	src: string;
	volume: number;
	width: string | number | void;
	x5VideoOrientation: 'landscape' | 'portrait' | undefined;
	x5VideoPlayerFullscreen: boolean;
	x5VideoPlayerType: 'h5' | undefined;
	xWebkitAirplay: boolean;
	constructor(dispatcher: Dispatcher, config: UserConfig);
	init(): void;
}
export declare type ChimeePictureInPictureOnWindow = {
	element?: HTMLVideoElement;
	plugin?: PictureInPicture;
	window?: Element;
};
declare class PictureInPicture extends ChimeePlugin {
	$dom: HTMLCanvasElement;
	ctx: CanvasRenderingContext2D;
	hasStopRender: boolean;
	isShown: boolean;
	myStyle: {
		bottom: string | number;
		height: number;
		left: string | number;
		position: string;
		right: string | number;
		top: string | number;
		width: number;
		[key: string]: string | number;
	};
	constructor(config: PluginConfig, dispatcher: Dispatcher, option: PluginOption);
	closeCurrentPicture(): void;
	create(): void;
	exitPictureInPicture: () => Promise<void>;
	getContext(): void;
	hide(): void;
	inited: () => void;
	poller(fn: () => void): void;
	render(): void;
	requestPictureInPicture: ({ autoplay, }?: {
		autoplay?: boolean;
	}) => Promise<void>;
	setStyle(styles?: {
		[x: string]: string | number;
	}): void;
	show(): void;
}
declare class VideoWrapper {
	readonly $container: Element;
	readonly $pluginOrder: string[];
	readonly $plugins: {
		[id: string]: ChimeePlugin;
	};
	readonly $video: HTMLVideoElement;
	readonly $wrapper: Element;
	container: VesselConfig;
	currentTime: number;
	protected dispatcher: Dispatcher;
	readonly fullscreenElement: Element | string | void;
	protected id: string;
	readonly inPictureInPictureMode: boolean;
	readonly isFullscreen: boolean | string;
	readonly pictureInPictureWindow: void | ChimeePictureInPictureOnWindow;
	readonly videoRequireGuardedAttributes: string[];
	autoload: boolean;
	autoplay: boolean;
	box: 'mp4' | 'hls' | 'flv' | '';
	readonly buffered: TimeRanges;
	readonly canPlayType: () => CanPlayTypeResult;
	readonly captureStream: () => void;
	changeWatchable: boolean;
	controls: boolean;
	readonly controlsList: boolean;
	crossOrigin: string;
	readonly currentSrc: string;
	readonly dataset: DOMStringMap;
	defaultMuted: boolean;
	defaultPlaybackRate: number;
	disableRemotePlayback: boolean;
	readonly duration: number;
	readonly ended: boolean;
	readonly error: MediaError;
	readonly exitFullscreen: Dom['exitFullscreen'];
	readonly focus: Dom['focus'];
	readonly fullscreen: Dom['fullscreen'];
	height: number;
	isLive: boolean;
	kernels: UserKernelsConfig;
	loop: boolean;
	muted: boolean;
	readonly networkState: number;
	readonly offsetHeight: number;
	readonly offsetLeft: number;
	readonly offsetParent: Element;
	readonly offsetTop: number;
	readonly offsetWidth: number;
	readonly pause: () => Promise<void>;
	readonly paused: boolean;
	readonly play: () => Promise<void>;
	playbackRate: number;
	playsInline: boolean;
	poster: string;
	preload: 'none' | 'auto' | 'metadata' | '';
	preset: {
		[key in SupportedKernelType]?: IVideoKernelConstructor;
	};
	presetConfig: {
		[x: string]: object;
	};
	readonly readyState: number;
	readonly requestFullscreen: Dom['requestFullscreen'];
	readonly seek: (n: number) => Promise<void>;
	readonly seekable: TimeRanges;
	readonly setSinkId: () => void;
	readonly sinkId: boolean;
	src: string;
	readonly startLoad: () => Promise<void>;
	readonly stopLoad: () => Promise<void>;
	readonly tabIndex: number;
	volume: number;
	width: number;
	x5VideoOrientation: 'landscape' | 'portrait' | undefined;
	x5VideoPlayerFullscreen: boolean;
	x5VideoPlayerType: 'h5' | undefined;
	xWebkitAirplay: boolean;
	private events;
	private unwatchHandlers;
	constructor({ dispatcher, id }: {
		dispatcher?: Dispatcher;
		id: string;
	});
	$attr(targetOrAttr: ChimeeDomElement | string, attrOrValue?: string, valueOrNothing?: string | void): string | void;
	$css(targetOrAttr: ChimeeDomElement | string, attrOrValue?: string, valueOrNothing?: string | void): string | void;
	$del(obj: any, property: string): void;
	$emit(key: string | {
		name: string;
		target: BinderTarget;
	}, ...args: any): Promise<any>;
	$emitSync(key: string | {
		name: string;
		target: BinderTarget;
	}, ...args: any): boolean;
	$fullscreen(flag?: boolean, element?: ChimeeDomElement): boolean;
	$off(key: string, fn: (...args: any[]) => any, options?: EventOptions): void;
	$on(key: string, fn: (...args: any[]) => any, options?: EventOptions): void;
	$once(key: string, fn: (...args: any[]) => any, options?: EventOptions): void;
	$set(obj: any, property: string | number, value: any): void;
	$silentLoad(src: string, option?: {
		abort?: boolean;
		bias?: number;
		box?: string;
		duration?: number;
		immediate?: boolean;
		increment?: number;
		isLive?: boolean;
		kernels?: UserKernelsConfig;
		preset?: UserConfig['preset'];
		repeatTimes?: number;
	}): Promise<void>;
	$watch(key: string | string[], handler: (...args: any[]) => any, { deep, diff, other, proxy, }?: {
		deep?: boolean;
		diff?: boolean;
		other?: any;
		proxy?: boolean;
	}): () => void;
	exitPictureInPicture(): Promise<any>;
	load(...args: any[]): Promise<void>;
	requestPictureInPicture(): Promise<any>;
	protected destroyVideoWrapper(): void;
	protected wrapAsVideo(videoConfig: VideoConfig): void;
	private addEvents;
	private getRealInfoForStyleAndAttr;
	private removeEvents;
}
export declare type IChimeePluginConstructor = new (...args: any[]) => ChimeePlugin;
declare class ChimeePlugin extends VideoWrapper {
	$autoFocus: boolean;
	$level: number;
	$operable: boolean;
	$config: PluginOption;
	$dom: HTMLElement;
	$inner: boolean;
	$penetrate: boolean;
	$videoConfig: VideoConfig;
	destroyed: boolean;
	ready: Promise<this>;
	readySync: boolean;
	VERSION: string;
	private autoFocusValue;
	private levelValue;
	private operableValue;
	constructor({ id, name, level, operable, beforeCreate, create, init, inited, destroy, events, data, computed, methods, el, penetrate, inner, autoFocus, className, }: PluginConfig, dispatcher: Dispatcher, option?: PluginOption);
	$bumpToTop(): void;
	$destroy(): void;
	$throwError(error: Error | string): void;
	beforeCreate?(obj: {
		computed: ComputedMap;
		data: any;
		events: PluginEvents;
		methods: PluginMethods;
	}, option: PluginOption): void;
	create?(): void;
	destroy?(): void;
	init?(config: VideoConfig): void;
	inited?(): void | Promise<void>;
	runInitedHook(): Promise<this> | this;
	runInitHook(videoConfig: VideoConfig): void;
}
export declare type EventStage = 'before' | 'main' | 'after' | '_';
export declare type BinderTarget = 'kernel' | 'container' | 'wrapper' | 'video' | 'video-dom' | 'plugin' | 'esFullscreen';
export declare type EventOptions = {
	stage?: EventStage;
	target?: BinderTarget;
};
export declare type ComputedMap = {
	[x: string]: (() => any) | {
		get: () => any;
		set: (value: any) => void;
	};
};
export declare type PluginEvents = {
	[evetName: string]: (...args: any[]) => any;
};
export declare type PluginMethods = {
	[x: string]: (...args: any[]) => any;
};
export declare type PluginConfig = {
	autoFocus: boolean;
	beforeCreate: ChimeePlugin['beforeCreate'];
	className: string | string[];
	computed: ComputedMap;
	create: ChimeePlugin['create'];
	data: any;
	destroy: ChimeePlugin['destroy'];
	el: string | Element | void;
	events: PluginEvents;
	id: string;
	init: ChimeePlugin['init'];
	inited: ChimeePlugin['inited'];
	inner: boolean;
	level: number;
	methods: PluginMethods;
	name: string;
	operable: boolean;
	penetrate: boolean;
};
export declare type PluginOption = {
	alias?: string;
	level?: number;
	name: string;
	operable?: boolean;
};
export declare type VesselConfig = {
	height?: number | string;
	width?: number | string;
};
export declare type SingleKernelConfig = {
	[key: string]: any;
	handler?: IVideoKernelConstructor | string;
	name?: SupportedKernelType;
};
export declare type UserKernelsConstructorMap = {
	flv?: IVideoKernelConstructor;
	hls?: IVideoKernelConstructor;
	mp4?: IVideoKernelConstructor;
};
export declare type SupportedKernelType = 'flv' | 'hls' | 'mp4';
export declare type UserKernelsConfig = SupportedKernelType[] | UserKernelsConstructorMap | {
	flv?: SingleKernelConfig;
	hls?: SingleKernelConfig;
	mp4?: SingleKernelConfig;
} | SingleKernelConfig[];
export declare type UserConfig = {
	autoload?: boolean;
	autoplay?: boolean;
	box?: string;
	container?: VesselConfig;
	controls?: boolean;
	crossorigin?: string;
	defaultMuted?: boolean;
	defaultPlaybackRate?: number;
	disableRemotePlayback?: boolean;
	height?: number;
	isLive?: boolean;
	kernels?: UserKernelsConfig;
	loop?: boolean;
	muted?: boolean;
	noDefaultContextMenu?: string | boolean;
	playbackRate?: number;
	playsinline?: boolean;
	plugin?: Array<string | PluginOption>;
	plugins?: Array<string | PluginOption>;
	poster?: string;
	preload?: string;
	preset?: {
		flv?: IVideoKernelConstructor;
		hls?: IVideoKernelConstructor;
	};
	runtimeOrder?: string[];
	src?: string;
	videoRequiredGuardedAttributes?: string[];
	width?: number;
	wrapper: string | Element;
	x5VideoOrientation?: string;
	x5VideoPlayerFullScreen?: boolean;
	xWebkitAirplay?: boolean;
};
export declare type RawEventInfo = {
	fn: (...args: any[]) => any;
	id: string;
	name: string;
	stage?: EventStage;
	target?: BinderTarget | void;
};
declare class Vessel {
	dispatcher: Dispatcher;
	height: string | number;
	target: RealChimeeDomElement;
	width: string | number;
	constructor(dispatcher: Dispatcher, target: RealChimeeDomElement, config: VesselConfig);
}
export interface IChimeeKernelConfig {
	box: string;
	isLive: boolean;
	preset: {
		[key in SupportedKernelType]?: IVideoKernelConstructor;
	};
	presetConfig: {
		[x: string]: object;
	};
	src: string;
}
declare class ChimeeKernel {
	readonly currentTime: number;
	box: string;
	boxConfig: object;
	config: IChimeeKernelConfig;
	videoElement: HTMLVideoElement;
	videoKernel: IVideoKernel;
	constructor(videoElement: HTMLVideoElement, config: IChimeeKernelConfig);
	attachMedia(): void;
	destroy(): void;
	initVideoKernel(): void;
	load(src?: string): void;
	off(key: string, fn: (...args: any[]) => any): void;
	on(key: string, fn: (...args: any[]) => any): void;
	pause(): void;
	play(): void;
	refresh(): void;
	seek(seconds: number): void;
	startLoad(): void;
	stopLoad(): void;
	private chooseVideoKernel;
	private getMp4Kernel;
}
declare class Binder {
	private bindedEventInfo;
	private bindedEventNames;
	private buses;
	private dispatcher;
	private kinds;
	private pendingEventsInfo;
	constructor(dispatcher: Dispatcher);
	addPendingEvent(target: BinderTarget, name: string, id: string): void;
	applyPendingEvents(target: BinderTarget): void;
	bindEventOnPenetrateNode(node: Element, remove?: boolean): void;
	bindEventOnVideo(node: Element, remove?: boolean): void;
	destroy(): void;
	emit({ name, stage, target: rawTarget, }: {
		id: string;
		name: string;
		stage?: EventStage;
		target?: BinderTarget | void;
	}, ...args: any[]): Promise<any>;
	emitSync({ name, stage, target: rawTarget, }: {
		id: string;
		name: string;
		stage?: EventStage;
		target?: BinderTarget | void;
	}, ...args: any[]): boolean;
	listenOnMouseMoveEvent(node: Element): void;
	migrateKernelEvent(oldKernel: ChimeeKernel, newKernel: ChimeeKernel): void;
	off(info: RawEventInfo): void;
	on(info: RawEventInfo): void;
	once(info: RawEventInfo): void;
	trigger({ name, stage, target: rawTarget, }: {
		id: string;
		name: string;
		stage?: EventStage;
		target?: BinderTarget | void;
	}, ...args: any[]): Promise<any>;
	triggerSync({ name, stage, target: rawTarget, }: {
		id: string;
		name: string;
		stage?: EventStage;
		target?: BinderTarget | void;
	}, ...args: any[]): boolean;
	private addEventListenerOnTarget;
	private getTargetDom;
	private isEventNeedToBeHandled;
	private removeEventListenerOnTargetWhenIsUseless;
}
declare class Dispatcher {
	static getPluginConfig(id: string): PluginConfig | void | IChimeePluginConstructor;
	static hasInstalled(id: string): boolean;
	static hasInstalledKernel(key: SupportedKernelType): boolean;
	readonly inPictureInPictureMode: boolean;
	static install(config: PluginConfig | IChimeePluginConstructor): string;
	static installKernel(key: SupportedKernelType | {
		[key in SupportedKernelType]?: IVideoKernelConstructor;
	}, value?: IVideoKernelConstructor): void;
	static uninstall(id: string): void;
	static uninstallKernel(key: SupportedKernelType): void;
	binder: Binder;
	changeWatchable: boolean;
	containerConfig: Vessel;
	destroyed: true;
	dom: Dom;
	kernel: ChimeeKernel;
	kernelEventHandlerList: Array<(...args: any[]) => any>;
	order: string[];
	plugins: {
		[id: string]: ChimeePlugin;
		pictureInPicture?: PictureInPicture;
	};
	ready: Promise<void>;
	readySync: boolean;
	videoConfig: VideoConfig;
	videoConfigReady: boolean;
	vm: Chimee;
	zIndexMap: {
		inner: string[];
		outer: string[];
	};
	private silentLoadTempKernel;
	constructor(config: UserConfig, vm: Chimee);
	destroy(): void;
	exitPictureInPicture(): any;
	getPluginConfig(id: string): PluginConfig | void | IChimeePluginConstructor;
	hasUsed(id: string): boolean;
	load(srcOrOption: string | {
		box?: string;
		isLive?: boolean;
		kernels?: UserKernelsConfig;
		preset?: UserConfig['preset'];
		src: string;
	}, option?: {
		box?: string;
		isLive?: boolean;
		kernels?: UserKernelsConfig;
		preset?: UserConfig['preset'];
	}): void;
	onReady(): void;
	requestPictureInPicture(): Promise<any>;
	silentLoad(src: string, option?: {
		abort?: boolean;
		bias?: number;
		box?: string;
		duration?: number;
		immediate?: boolean;
		increment?: number;
		isLive?: boolean;
		kernels?: UserKernelsConfig;
		preset?: UserConfig['preset'];
		repeatTimes?: number;
	}): Promise<void | {}>;
	switchKernel({ video, kernel, config, notifyChange }: {
		config: {
			box: string;
			isLive: boolean;
			kernels: UserKernelsConfig;
			preset: UserConfig['preset'];
			src: string;
		};
		kernel: ChimeeKernel;
		notifyChange?: boolean;
		video: HTMLVideoElement;
	}): void;
	throwError(error: Error | string): void;
	unuse(id: string): void;
	use(option: string | PluginOption): Promise<ChimeePlugin>;
	private autoloadVideoSrcAtFirst;
	private changeUnwatchable;
	private createKernel;
	private getTopLevel;
	private initUserPlugin;
	private sortZIndex;
}
export default class Chimee extends VideoWrapper {
	static registerEvents({ name, target, }?: {
		name?: string;
		target?: string;
	}): void;
	readonly config: {
		errorHandler: (...args: any[]) => any | void;
	};
	destroyed: boolean;
	ready: Promise<void>;
	readySync: boolean;
	readonly version: string;
	static readonly config: GlobalConfig;
	static readonly getPluginConfig: typeof Dispatcher.getPluginConfig;
	static readonly hasInstalled: typeof Dispatcher.hasInstalled;
	static readonly hasInstalledKernel: typeof Dispatcher.hasInstalledKernel;
	static readonly install: typeof Dispatcher.install;
	static readonly installKernel: typeof Dispatcher.installKernel;
	static readonly plugin: IChimeePluginConstructor;
	static readonly uninstall: typeof Dispatcher.uninstall;
	static readonly uninstallKernel: typeof Dispatcher.uninstallKernel;
	constructor(rawConfig: UserConfig | string | Element);
	customThrowError(error: Error | string): any;
	destroy(): void;
	unuse(name: string): void;
	use(option: string | PluginOption): Promise<ChimeePlugin>;
}

export {};
