import { SupportedKernelType } from '../typings/base';
export declare function deletePropertyIfItIsEmpty(obj: any, key: string): void;
export declare function runRejectableQueue(queue: Array<(...args: any[]) => any>, ...args: any[]): Promise<any>;
export declare function runStoppableQueue(queue: Array<(...args: any[]) => any>, ...args: any[]): boolean;
export declare function transObjectAttrIntoArray(obj: {
    [x: string]: any;
}, fn?: (a: string, b: string) => number): string[];
export declare function isSupportedKernelType(type: string): type is SupportedKernelType;
