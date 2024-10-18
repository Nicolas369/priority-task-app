
export type Task = {
    title: string;
    id?: string | number;
    description: string;
    priorityLv: number;
    isComplete: boolean;
    taskOrder?: number; // [ ] remove this 
    index?: number | null;
    date: Date | string;
    startDate?:  string | null;
    finishDate?: string | null;
}

export type InitialTaskState = {
    taskList: Task[];
    useAxios: boolean;
    selectedTask: number | string | null;
}

export type InitialThemeState = {
    colors: {
        USER: any;
        ACTION: any;
        HIGHLIGHT: any;
        DEFAULT: any;
        BACKGROUND: any;
    }
}

export type PartialType<T> = {
    [P in keyof T]?: T[P];
};