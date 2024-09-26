const express = require('express');
const router = express.Router();
const expressHandler = require("./handlers");

router.get("/get-tasks-list", expressHandler.getTaskList);
router.post("/update-tasks-list-order", expressHandler.updateTaskList);
router.post("/add-task", expressHandler.addTask);
router.put("/update-task", expressHandler.updateTask);
router.delete("/delete-task", expressHandler.deleteTask);
// [ ] add update task order 

module.exports = router;