export type Task = {
    title: string;
    id?: string | number;
    description: string;
    priorityLv: number;
    isComplete: boolean;
    taskOrder: number;
    date: Date;
}

export type TaskList = {
    list: Task[];
}