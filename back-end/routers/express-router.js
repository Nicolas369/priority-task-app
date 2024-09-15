const express = require('express');
const router = express.Router();
const expressHandler = require("../handle-queries/express-queries");

router.get("/get-task-list", expressHandler.getTaskList);
router.post("/add-task", expressHandler.addTask);
router.put("/update-task", expressHandler.updateTask);
router.delete("/delete-task", expressHandler.deleteTask);

module.exports = router;