import { Task } from "../definitions/redux-definitions";

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

export const thisIsTask = (task:any) => {
    const taskDefinition: any = {
        title: "string",
        description: "string",
        isComplete: "boolean",
        priorityLv: "number",
        // taskOrder: "number",
        // startDate: "Date",
        // finishDate: "Date",
        date: "Date", // [ ] check with back for typing (maybe is Dayjs) 
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