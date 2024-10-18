import { Task } from "./redux-definitions";

export interface DayColumn { // move to definition file 
    id: string;
    name: string;
    today?: boolean; // [ ] add color responsibility 
    
    /**
     * make more complex this type 
     * this is the day list schema that is going to be display in each column   
     */
}

export interface DayColumnTask extends DayColumn {
    tasks: Task[];
}

export enum WeekDaysNumbers {
    Sunday = 0,
    Monday = 1,
    Tuesday = 2,
    Wednesday = 3,
    Thursday = 4,
    Friday = 5,
    Saturday = 6,
    BACKLOG = 7
}

export interface  UseTaskOrderReturn {
    orderTaskInTimeLine: (reorderAction: any) => void;
    daysWeekOrder: DayColumn[];
    currentWeekDay: DayColumnTask[];
}

export type UseTaskOrder = () => UseTaskOrderReturn;
