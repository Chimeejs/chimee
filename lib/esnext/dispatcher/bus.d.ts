import Dispatcher from '../dispatcher/index';
import { BinderTarget, EventStage } from '../typings/base';
export default class Bus {
    dispatcher: Dispatcher;
    private events;
    private kind;
    private onceMap;
    constructor(dispatcher: Dispatcher, kind: BinderTarget);
    destroy(): void;
    emit(key: string, ...args: any): Promise<any>;
    emitSync(key: string, ...args: any): boolean;
    hasEvents(): boolean;
    off(pluginId: string, eventName: string, fn: (...args: any[]) => any, stage: EventStage): void;
    on(pluginId: string, eventName: string, fn: (...args: any[]) => any, stage: EventStage): void;
    once(pluginId: string, eventName: string, fn: (...args: any[]) => any, stage: EventStage): void;
    trigger(key: string, ...args: any): Promise<any>;
    triggerSync(key: string, ...args: any): boolean;
    private addEvent;
    private addToOnceMap;
    private eventProcessor;
    private getEventQueue;
    private getFirstHandlerFromOnceMap;
    private removeEvent;
    private removeFromOnceMap;
    private runSideEffectEvent;
}
