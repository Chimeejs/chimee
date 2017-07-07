declare module 'chimee-helper-log' {
  declare class Log {
    static GLOBAL_TAG: string;
    static FORCE_GLOBAL_TAG: boolean;
    static ENABLE_ERROR: boolean;
    static ENABLE_INFO: boolean;
    static ENABLE_WARN: boolean;
    static ENABLE_DEBUG: boolean;
    static ENABLE_VERBOSE: boolean;
    static error (tag: string, msg?: string): void;
    static warn (tag: string, msg?: string): void;
    static info (tag: string, msg?: string): void;
    static debug (tag: string, msg?: string): void;
    static verbose (tag: string, msg?: string): void;
  }
  declare export default typeof Log;
}