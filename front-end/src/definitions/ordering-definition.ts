import { Task } from "./redux-definitions";

export interface DayColumn {
    id: string;
    name: string;
    isToday?: boolean;
}

export interface TaskDayColumn extends DayColumn {
    tasks: Task[];
}

export const WEEK: TaskDayColumn[] = [
    {name: "Sunday", id: "0", tasks: []},
    {name: "Monday", id: "1", tasks: []},
    {name: "Tuesday", id: "2", tasks: []},
    {name: "Wednesday", id: "3", tasks: []},
    {name: "Thursday", id: "4", tasks: []},
    {name: "Friday", id: "5", tasks: []},
    {name: "Saturday", id: "6", tasks: []},
    {name: "backlog", id: "7", tasks: [] }
];

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
}

export type UseTaskOrderHook = () => UseTaskOrderReturn;
