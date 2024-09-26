import { Task } from "../definitions/redux-definitions";

export const assembleTask = (task: any) => {
    const taskAssembled: Task =  {
        title: task.title,
        description: task.description,
        priorityLv: parseInt(task.priorityLv),
        isComplete: task.isComplete,
        taskOrder: task.taskOrder,
        date: task.date
    }

    if (task.id) taskAssembled.id = task.id;

    return taskAssembled;
}
