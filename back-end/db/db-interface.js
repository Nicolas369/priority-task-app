const fs = require('fs');
const { validateTask } = require("../utils/task");

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

function getTaskList() {
    const rawData = fs.readFileSync(__dirname + '/db.json');
    const data = JSON.parse(rawData);
    return data.taskList;
}

function storeTaskList(list) {
    list = list.sort((a, b) => a.id - b.id);
    const taskList = { taskList: list }
    console.log(taskList)
    fs.writeFileSync(__dirname + '/db.json', JSON.stringify(taskList));   
}

function getIndividualTask(taskId) {
    const taskList = getTaskList();
    const individualTask = taskList.find(task => task.id === taskId);
    console.log(individualTask);
    return individualTask;
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
    const taskToRemove = taskList.find(task => task.id === taskId);
    validateTask(taskToRemove);
    console.log(taskToRemove, taskList.indexOf(taskToRemove));
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
    console.log(taskList)
    return true;
}


module.exports = {
    getTaskList,
    getIndividualTask,
    storeTaskList,
    addTask,
    deleteTask,
    updateTask
}