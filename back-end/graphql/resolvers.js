const db = require("../db/db-interface");
const { validateTask } = require("../utils/task")

const resolvers = {

    Query: {
        getTasksList: () => {
            return db.getTaskList();
        },
        getTask: (_, { taskId }) => {
            taskId = parseInt(taskId); 
            return db.getIndividualTask(taskId);
        },
    },

    Mutation: {
        updateTaskList: (_, { taskList }) => {
            taskList.list.forEach( task => validateTask(task) );
            db.storeTaskList(taskList.list);
            return db.getTaskList();
        },
        addTask: (_, { task }) => {
            db.addTask(task); 
            return db.getTaskList();
        },
        updateTask: (_, { task }) => { 
            task.id = parseInt(task.id);
            db.updateTask(task);
            const listToSend = db.getTaskList();
            return listToSend;
        },
        deleteTask: (_, { taskId }) => {
            taskId = parseInt(taskId);
            db.deleteTask(taskId);
            return db.getTaskList();
        }
    }
}

module.exports = { resolvers };