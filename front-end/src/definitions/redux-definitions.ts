export type Task = {
    title: string;
    id?: string | number;
    description: string;
    priorityLv: number;
    isComplete: boolean;
    taskOrder: number;
    date: Date;
}

export type InitialState = {
    taskList: Task[];
    useAxios: boolean;
    selectedTask: number | string | null;
}

export type PartialType<T> = {
    [P in keyof T]?: T[P];
};