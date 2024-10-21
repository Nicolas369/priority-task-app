
export type Task = {
    title: string;
    id?: string | number;
    description: string;
    priorityLv: number;
    isComplete: boolean;
    // taskOrder?: number; // [ ] remove this 
    index?: number | null;
    date: Date | string;
    startDate?:  string | null;
    finishDate?: string | null;
}

export type InitialTaskState = {
    taskList: Task[];
    selectedTask: number | string | null;
}

export type InitialThemeState = {
    colors: {
        USER: ResponsibilityColorType;
        ACTION: ResponsibilityColorType;
        HIGHLIGHT: ResponsibilityColorType;
        DEFAULT: ResponsibilityColorType;
        BACKGROUND: BackgroundType;
    }
}

export type ResponsibilityColorType = {
    main: string;
    dark: string;
    border: string;
    background: string;
}

export type BackgroundType = {
    main: string;
    secondary: string;
    light: string;
    default: string;
}

export type PartialType<T> = {
    [P in keyof T]?: T[P];
};

