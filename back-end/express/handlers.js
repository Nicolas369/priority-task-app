const db = require("../db/db-interface");
const { validateTask, buildTaskForSQLInsertion, buildTaskForSQLUpdate } = require("../utils/task");


const sendTaskList = async (res) => {
    const tasks = await db.getTaskList();
    const tasksList = tasks.map( task => buildTaskForSend(task));
    const data = JSON.stringify(tasksList);
    res.send(data);
}

const getTaskList = (_, res) => sendTaskList(res);

const updateTaskListIndexOrder = async (req, res) => {
    const taskList = req.body.list;
    taskList.forEach( task => validateTask(task) );
    console.log(taskList);
    await db.updateListTaskIndex(taskList);
    sendTaskList(res);
}

const addTask = async (req, res) => {
    const newTask = buildTaskForSQLInsertion(req.body.task);
    await db.addNewTask([...newTask]);
    sendTaskList(res);
};

const updateTask = async (req, res) => {
    const taskForUpdate = buildTaskForSQLUpdate(req.body.task);
    await db.updateTask(taskForUpdate);
    sendTaskList(res);
};

const deleteTask = async (req, res) => {
    await db.deleteTask(req.query.id);
    sendTaskList(res);
};

module.exports = {
    deleteTask,
    getTaskList,
    updateTaskListIndexOrder,
    addTask,
    updateTask
}