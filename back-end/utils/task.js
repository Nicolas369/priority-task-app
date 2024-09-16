
const createTask = ({ isComplete, priorityLv, title, description, date }) => {
    return { 
        isComplete,
        priorityLv,
        title,
        description,
        date
    };
}

const isTask = (task) =>  { 
    if (
        task.title && 
        task.description && 
        task.priorityLv && 
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