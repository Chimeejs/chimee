export declare class ChimeeHelperLog {
    GLOBAL_TAG: string;
    FORCE_GLOBAL_TAG: boolean;
    ENABLE_ERROR: boolean;
    ENABLE_INFO: boolean;
    ENABLE_WARN: boolean;
    ENABLE_DEBUG: boolean;
    ENABLE_VERBOSE: boolean;
    error(tag: string, msg?: string): void;
    info(tag: string, msg?: string): void;
    warn(tag: string, msg?: string): void;
    debug(tag: string, msg?: string): void;
    verbose(tag: string, msg?: string): void;
    formatter(tag: string, msg?: string): string;
}
export declare const chimeeLog: ChimeeHelperLog;
