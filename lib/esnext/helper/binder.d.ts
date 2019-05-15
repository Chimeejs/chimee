import { AdditionalEventInfo, BinderTarget, EventStage, RawEventInfo, WholeEventInfo } from '../typings/base';
export declare function getEventTargetByOldLogic(oldName: string): {
    name: string;
    target: BinderTarget;
} | false;
export declare function getEventStage(name?: string): {
    name: string;
    stage: EventStage;
};
export declare function getEventTargetByEventName(name: string): BinderTarget;
export declare function getEventInfo({ name, target, stage }: {
    name: string;
    stage?: EventStage;
    target?: BinderTarget | void;
}): AdditionalEventInfo;
export declare function prettifyEventParameter(info: RawEventInfo): WholeEventInfo;
export declare function isEventEmitalbe({ id, name, }: {
    id?: string;
    name?: string;
}): boolean;
