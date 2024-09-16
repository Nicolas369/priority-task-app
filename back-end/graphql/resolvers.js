const db = require("../db/db-interface");

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
        addTask: (_, { task }) => {
            db.addTask(task); 
            return db.getTaskList();
        },
        updateTask: (_, { task }) => { 
            task.id = parseInt(task.id);
            db.updateTask(task);
            return db.getTaskList();
        },
        deleteTask: (_, { taskId }) => {
            taskId = parseInt(taskId);
            db.deleteTask(taskId);
            return db.getTaskList();
        }
    }
}

module.exports = { resolvers };