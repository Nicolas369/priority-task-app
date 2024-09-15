const db = require("../db/db-interface");

const sendTaskList = (res) => {
    const tasks = db.getTaskList();
    const data = JSON.stringify(tasks)
    res.send(data);
}

const getTaskList = (req, res) => sendTaskList(res);

const addTask = (req, res) => {
    
    const task = { // [ ] move to utils file
        isComplete: req.body.isComplete,
        priorityLv: req.body.priorityLv,
        title: req.body.title,
        description: req.body.description,
        date: req.body.date 
    };

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