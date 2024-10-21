const { gql } = require('apollo-server-express');

const typeDefs = gql`
    scalar Date
    scalar Number
    
    type Task {
        title: String!
        description: String!
        priorityLv: Int!
        isComplete: Boolean!
        index: Number
        startDate: Date
        finishDate: Date
        date: Date!
        id: ID!
    }

    input InputAddTask {
        title: String!
        description: String!
        priorityLv: Int!
        isComplete: Boolean
        index: Number
        startDate: Date
        finishDate: Date
    }

    input InputUpdateTask {
        title: String!
        description: String!
        priorityLv: Int!
        isComplete: Boolean!
        index: Number
        startDate: Date
        finishDate: Date
        date: Date!
        id: ID!
    }

    input InputUpdateTaskLIstOrder {
        list: [InputUpdateTask]!
    }

    type Query {
        getTasksList: [Task]!
    }

    type Mutation {
        updateTaskList(taskList: InputUpdateTaskLIstOrder!): [Task]!
        addTask(task: InputAddTask!): [Task]!
        updateTask(task: InputUpdateTask!): [Task]!
        deleteTask(taskId:ID!): [Task]!
    }
`;

module.exports = typeDefs;