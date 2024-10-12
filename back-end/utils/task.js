// [ ] check which i use and which i no longer use;

const createTask = ({  title, description,  taskOrder, isComplete, priorityLv, startDate, finishDate, date }) => {
    return { 
        title,
        description,
        priorityLv,
        taskOrder,
        isComplete,
        startDate,
        finishDate,
        date
    };
}

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
    createTask,
    validateTask,
    isTask
}