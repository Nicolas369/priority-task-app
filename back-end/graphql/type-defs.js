const { gql } = require('apollo-server-express');

const typeDefs = gql`
    scalar Date
    
    type Task {
        title: String!
        description: String!
        priorityLv: Int!
        isComplete: Boolean!
        taskOrder: Int!
        date: Date!
        id: ID!
    }

    input InputAddTask {
        title: String!
        description: String!
        priorityLv: Int!
        isComplete: Boolean!
        taskOrder: Int!
        date: Date!
    }

    input InputUpdateTask {
        title: String!
        description: String!
        priorityLv: Int!
        isComplete: Boolean!
        taskOrder: Int!
        date: Date!
        id: ID!
    }

    input InputUpdateTaskLIstOrder {
        list: [InputUpdateTask]!
    }

    type Query {
        getTasksList: [Task]!
        getTask(taskId:ID!): Task!
    }

    type Mutation {
        updateTaskList(taskList: InputUpdateTaskLIstOrder!): [Task]!
        addTask(task: InputAddTask!): [Task]!
        updateTask(task: InputUpdateTask!): [Task]!
        deleteTask(taskId:ID!): [Task]!
    }
`;

module.exports = typeDefs;