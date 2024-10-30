require('dotenv').config();
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const username = process.env.USER_NAME;
const password = process.env.PASSWORD;

const connectToDB = async () => {
    try {

        const uri = `mongodb+srv://${username}:${password}@cluster001.gawxh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster001`;
        await mongoose.connect(uri);
        console.log("Mongo Connected!!!");

    } catch (err) {
        console.error(err);
    }
}

/**
 *   task schema
 *   +--------------+-----------+
 *   |   col_name   | data_type |
 *   +--------------+-----------+
 *   | tile         | string    |
 *   | description  | string    |
 *   | priorityLv   | number    |
 *   | isComplete   | boolean   |
 *   | index        | number    |
 *   | startDate    | Date/null |
 *   | finishDate   | Date/null |
 *   | date         | Date      |
 *   | id (key)     | number    |
 *   +--------------+-----------+
**/

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
    }, 
    description: {
        type: String,
        require: true,
    }, 
    priorityLv: {
        type: Number,
        require: true,
    }, 
    isComplete: {
        type: Boolean,
        require: true,
        default: false
    }, 
    index: {
        type: Number,
        require: true
    }, 
    startDate: {
        type: String,
    }, 
    finishDate: {
        type: String,
    }, 
    date: {
        type: Date,
        require: true,
        default: new Date()
    },
    id: {
        type: String, 
        unique: true,
        require: true,
        default: uuidv4
    }
});


const Task = mongoose.model('Task', taskSchema);

const getTaskList = async () => {
    try {
        const taskList = await Task.find();
        return taskList;
    } catch (err) {
        console.error(err);
    }
};

const updateListTasksIndex = async (taskList) => {
    try {

        for (let i = 0; i < taskList.length; i++) {

            const find = { id: taskList[i].id };

            const update = {
                index: taskList[i].index,
                startDate: taskList[i].startDate,
                finishDate: taskList[i].finishDate,
            }
            
            await Task.findOneAndUpdate( find, update );
        }

        return true;
    } catch (err) {
        console.error(err);
    }
}

const addNewTask = async (task) => {
    try{    
        console.log(task)

        const newTask = new Task({ ...task });
        await newTask.save();
        
    } catch (err) {
        console.error(err);
    }
}

module.exports = {
    connectToDB,
    getTaskList,
    updateListTasksIndex,
    addNewTask
}