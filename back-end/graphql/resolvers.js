const db = require("../db/db-interface");
const { buildTaskForSend } = require("../utils/task");

const sendTaskList = async () => {
    const tasks = await db.getTaskList();
    return tasks.map( task => buildTaskForSend(task));
}

const resolvers = {

    Query: {
        getTasksList: async () => {
            return await sendTaskList();
        }
    },

    Mutation: {
        updateTaskList: async (_, { taskList }) => {
            await db.updateListTasksIndex(taskList.list);
            return await sendTaskList();
        },
        addTask: async (_, { task }) => {
            await db.addNewTask(task);
            return await sendTaskList();
        },
        // updateTask: async (_, { task }) => { 
        //     task.id = parseInt(task.id); // [ ] change this to string GL
        //     const taskForUpdate = buildTaskForSQLUpdate(task);
        //     await db.updateTask(taskForUpdate);
        //     return await sendTaskList();
        // },
        // deleteTask: async (_, { taskId }) => {
        //     taskId = parseInt(taskId);
        //     await db.deleteTask(taskId);
        //     return await sendTaskList();
        // }
    }
}

module.exports = { resolvers };