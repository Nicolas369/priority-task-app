const db = require("../db/db-interface");
const { validateTask, buildTaskForSQLInsertion, buildTaskForSQLUpdate, buildTaskForSend } = require("../utils/task");


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
            taskList.list.forEach( task => validateTask(task) );
            await db.updateListTaskIndex(taskList.list);
            return await sendTaskList();
        },
        addTask: async (_, { task }) => {
            const newTask = buildTaskForSQLInsertion(task);
            await db.addNewTask([...newTask]);
            return await sendTaskList();
        },
        updateTask: async (_, { task }) => { 
            task.id = parseInt(task.id);
            const taskForUpdate = buildTaskForSQLUpdate(task);
            await db.updateTask(taskForUpdate);
            return await sendTaskList();
        },
        deleteTask: async (_, { taskId }) => {
            taskId = parseInt(taskId);
            console.log(taskId);
            await db.deleteTask(taskId);
            return await sendTaskList();
        }
    }
}

module.exports = { resolvers };