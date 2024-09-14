const fs = require('fs');

function isTask(task) {
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

function validateTask(task) { // private...
    if (!isTask(task)) {
        throw Error("BadEntryError: no task... ");
    }
}

function getTaskList() {
    const rawData = fs.readFileSync('./db.json');
    const data = JSON.parse(rawData);
    return data.taskList;
}

function getIndividualTask(taskId) {
    const taskList = getTaskList();
    const individualTask = taskList.find(task => task.id === taskId);
    return individualTask
}

function storeTaskList(list) { // private...
    list = list.sort((a, b) => a.id - b.id);
    const taskList = { taskList: list }
    fs.writeFileSync('./db.json', JSON.stringify(taskList));   
}

function addTask(task) {
    validateTask(task);
    const taskList = getTaskList();
    const lastTaskId = taskList.length ? taskList[taskList.length - 1].id : 0;
    task.id = lastTaskId + 1;
    const taskListUpdate = [...taskList, task];
    storeTaskList(taskListUpdate);
    return true;
}

function deleteTask(taskId) {
    const taskList = getTaskList();
    const taskToRemove = getIndividualTask(taskId);
    validateTask(taskToRemove);
    taskList.splice(taskList.indexOf(taskToRemove), 1);
    storeTaskList(taskList);
    return true;
}

function updateTask(task) {
    validateTask(task);
    const taskList = getTaskList();
    const taskForUpdate = taskList.find(t => t.id === task.id);
    taskList[taskList.indexOf(taskForUpdate)] = task;
    storeTaskList(taskList);
    return true;
}


module.exports = {
    getTaskList,
    getIndividualTask,
    storeTaskList,
    addTask,
    deleteTask,
    updateTask,
    isTask
}

/**
 *   task schema
 *   +--------------+------------+
 *   |   col_name   | data_type  | 
 *   +--------------+------------+
 *   | tile         | string     |
 *   | description  | string     |
 *   | priorityLv   | number     |
 *   | isComplete   | boolean    |
 *   | date         | Date       |
 *   | id (key)     | number     |
 *   +--------------+------------+
 */



// updateTask({ isComplete: true, priorityLv: 3 ,tile: "task-title 333", description: "task-description", date: new Date()});
addTask({ isComplete: false, priorityLv: 3, title: "task-title", description: "task-description", date: new Date() });
// deleteTask(5)
// console.log(getTaskList());