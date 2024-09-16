const db = require("../db/db-interface");
const { createTask } = require("../utils/task");

const sendTaskList = (res) => {
    const tasks = db.getTaskList();
    const data = JSON.stringify(tasks);
    res.send(data);
}

const getTaskList = (req, res) => sendTaskList(res);

const addTask = (req, res) => {
    const task = createTask(req.body);
    db.addTask(task);
    sendTaskList(res);
};

const updateTask = (req, res) => {
    db.updateTask(req.body);
    sendTaskList(res);
};

const deleteTask = (req, res) => {
    db.deleteTask(req.body.id);
    sendTaskList(res);
};

module.exports = {
    deleteTask,
    updateTask,
    addTask,
    getTaskList
}