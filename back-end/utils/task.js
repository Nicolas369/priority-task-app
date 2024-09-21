
const createTask = ({  title, description,  taskOrder, isComplete, priorityLv, date }) => {
    return { 
        title,
        description,
        priorityLv,
        taskOrder,
        isComplete,
        date
    };
}

const isTask = (task) =>  {

    if (
        task.title && 
        task.description && 
        task.priorityLv && 
        task.taskOrder >= 0 && 
        typeof task.isComplete === "boolean" && 
        task.date
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
    createTask,
    validateTask,
    isTask
}