import dayjs, { Dayjs } from "dayjs";
import { Task } from "../definitions/redux-definitions";
import { TaskDayColumn, WEEK, WeekDaysNumbers } from "../definitions/ordering-definition";

export const assembleTask = (task: any) => {
    const taskAssembled: Task =  {
        title: task.title,
        description: task.description,
        priorityLv: parseInt(task.priorityLv),
        isComplete: task.isComplete,
        startDate: task.startDate,
        finishDate: task.finishDate,
        date: task.date,
        index: task.index,
        id: task.id,
    }

    if (task.id) taskAssembled.id = task.id;

    return taskAssembled;
}

export const isTaskToAdd = (task:any) => {
    const taskDefinition: any = {
        title: "string",
        description: "string",
        isComplete: "boolean",
        priorityLv: "number",
    }

    let countProperty = 0;
    Object.keys(task).forEach(key => {
        if (typeof task[key] === taskDefinition[key]){
            countProperty++
        }

        if (key === "date" && task[key] instanceof Date) {
            countProperty++
        }
    });

    return Object.keys(taskDefinition).length === countProperty;
}

export const makeNewWeek = () => {
    return WEEK.map(
        (day:TaskDayColumn) =>( {name: day.name, id:day.id, tasks: [...day.tasks.map(t => ({...t}))]})
    )
}

export  const checkWeek = (day: Dayjs | null) => {
    if (!day) return false;
    
    const today = dayjs();

    if (
        day.get("date") >= today.get("date") &&
        day.get("date") <= (today.get("date") + 6) &&
        day.get("month") === today.get("month")
    ) {
        return true;
    }

    if (
        day.get("month") === (today.get("month") +1) &&
        (30 - today.get("date") + day.get("date")) <= 7
    ) {
        return true;
    }

    return false;
}

export const orderWeek = (allTasks: Task[]) => {        
    const week = makeNewWeek();

    allTasks.forEach((task: Task) => {
        // order the task by next 7 days
        const taskStartDay = task.startDate ? dayjs(task.startDate) : null;
                    
        if (checkWeek(taskStartDay)) {
            week[taskStartDay!.day()].tasks.push(task);
        } else {
            week[WeekDaysNumbers.BACKLOG].tasks.push(task);
        }
    });
    
    return week;
}

export const orderBacklog = (allTasks: Task[]) => {        
    const backlog: Task[] = [];

    allTasks.forEach((task: Task) => {
        const taskStartDay = task.startDate ? dayjs(task.startDate) : null;
                    
        if (!checkWeek(taskStartDay)) {
            backlog.push(task);
        }
    });
    
    return backlog;
}