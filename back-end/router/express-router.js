const express = require('express');
const router = express.Router();
const db = require("../db/db-management");

const sendTaskList = (res) => {
    const tasks = db.getTaskList();
    const data = JSON.stringify(tasks)
    res.send(data);
}

router.get("/task-list", async (req, res) => {
    sendTaskList(res);
});

router.post("/add-task", (req, res) => {
    
    const task = { // [ ] move to utils file
        isComplete: req.body.isComplete,
        priorityLv: req.body.priorityLv,
        title: req.body.title,
        description: req.body.description,
        date: req.body.date 
    };

    db.addTask(task);
    sendTaskList(res);
});

router.put("/update-task", (req, res) => {
    db.updateTask(req.body);
    sendTaskList(res);
});

router.delete("/delete-task", (req, res) => {
    db.deleteTask(req.body.id);
    sendTaskList(res);
});


module.exports = router;