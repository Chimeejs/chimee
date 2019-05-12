export default class GlobalConfig {
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
