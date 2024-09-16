const { gql } = require('apollo-server-express');

const typeDefs = gql`
    scalar Date
    
    type Task {
        title: String!
        description: String!
        priorityLv: Int!
        isComplete: Boolean!
        date: Date!
        id: ID!
    }

    input InputAddTask {
        title: String!
        description: String!
        priorityLv: Int!
        isComplete: Boolean!
        date: Date!
    }

    input InputUpdateTask {
        title: String!
        description: String!
        priorityLv: Int!
        isComplete: Boolean!
        date: Date!
        id: ID!
    }

    type Query {
        getTasksList: [Task]!
        getTask(taskId:ID): Task
    }

    type Mutation {
        addTask(task: InputAddTask!): [Task]
        updateTask(task: InputUpdateTask!): [Task]
        deleteTask(taskId:ID): [Task]
    }
`;

module.exports = typeDefs;