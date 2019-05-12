import Dispatcher from '../dispatcher/index';
import ChimeeKernel from '../dispatcher/kernel';
import { BinderTarget, EventStage, RawEventInfo } from '../typings/base';
export default class Binder {
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
