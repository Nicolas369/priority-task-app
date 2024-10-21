import { TaskObservable } from "../utils/observable";
import { TaskDayColumn } from "./ordering-definition";
import { ResponsibilityColorType, Task } from "./redux-definitions";


/**
 * Add Task Panel Section Definitions
 */
export interface EntryTaskDescriptionTitleInterface {
    responsibility: ResponsibilityColorType;
    onChangeTitle: (value: string) => void;
    onChangeDescription: (value: string) => void;
    clearInputObservable: TaskObservable
}

export interface PrioritySelectorInterface {
    responsibility: ResponsibilityColorType;
    onChange: (value: string) => void;
    clearInputObservable?: TaskObservable,
}

export const PRIORITIES = ["Non-Priority", "HIGH", "MEDIUM", "COMMON"];

export interface SetTimeLineInterface{
    clearInputObservable: TaskObservable;
    emitTimeLine: (timeLine: any) => void;
    colorResponsibility: ResponsibilityColorType;
}


/**
 * Week List Section Definitions
 */
export interface DayListInterface { day: TaskDayColumn } 

export interface TaskItemInterface {
    index: number;
    task: Partial<Task>;
    responsibility: ResponsibilityColorType;
}