const buildTaskForSQLInsertion = (task) => {
    return [
        task.title,
        task.description,
        task.priorityLv,
        task.startDate,
        task.finishDate
    ]
}

const buildTaskForSQLUpdate = (task) => {
    return [
        task.title,
        task.description,
        task.priorityLv,
        task.isComplete,
        task.index,
        task.startDate,
        task.finishDate,
        task.id
    ]
}

const buildTaskForSend = (task) => {
    return {
        title: task.task_title,
        description: task.task_description,
        priorityLv: task.task_priority_lv,
        isComplete: task.task_is_complete,
        index: task.task_index,
        startDate: task.task_start_date,
        finishDate: task.task_finish_date,
        date: task.task_date,
        id: task.task_id
    }
}

const isTask = (task) =>  {

    if (
        task.title && 
        task.description && 
        task.priorityLv && 
        typeof task.isComplete === "boolean" && 
        task.date && 
        task.id
    ) {

        return true;
    
    } else {

        return false;
    
    }
}

const validateTask = (task) => {
    if (!isTask(task)) {
        throw Error("BadEntryError: no task... ");
    }
}

module.exports = {
    buildTaskForSQLUpdate,
    buildTaskForSQLInsertion,
    buildTaskForSend,
    validateTask,
    isTask
}