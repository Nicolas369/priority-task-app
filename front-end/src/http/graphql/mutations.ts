import { gql } from "@apollo/client";

const addTask = gql`
  mutation($task: InputAddTask!) {
    addTask(task: $task) {
      description
      priorityLv
      isComplete
      title
      date
      id
    }
  }
`;

const updateTask = gql`
  mutation($task: InputUpdateTask!) {
    updateTask(task: $task) {
      description
      isComplete
      priorityLv
      title
      date
      id
    }
  }
`;

const deleteTask = gql`
  mutation($taskId: ID) {
    deleteTask(taskId: $taskId) {
      description
      isComplete
      priorityLv
      title
      date
      id
    }
  }
`;

export const graphqlMutations = { addTask, updateTask, deleteTask };