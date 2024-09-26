const db = require("../db/db-interface");
const { validateTask } = require("../utils/task")
const { createTask } = require("../utils/task");

// [ ] handle errors 

const sendTaskList = (res) => {
    const tasks = db.getTaskList();
    const data = JSON.stringify(tasks);
    res.send(data);
}

const getTaskList = (req, res) => sendTaskList(res);

const updateTaskList = (req, res) => {
    const taskList = req.body.list;
    taskList.forEach( task => validateTask(task) );
    db.storeTaskList(taskList);
    sendTaskList(res);
}

const addTask = (req, res) => {
    const task = createTask(req.body.task);
    db.addTask(task);
    sendTaskList(res);
};

const updateTask = (req, res) => {
    db.updateTask(req.body.task);
    sendTaskList(res);
};

const deleteTask = (req, res) => {
    db.deleteTask(req.query.id);
    sendTaskList(res);
};

module.exports = {
    deleteTask,
    getTaskList,
    updateTaskList,
    addTask,
    updateTask
}