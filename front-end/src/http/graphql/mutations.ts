import { gql } from "@apollo/client";

const updateTaskLIstOrder = gql`
  mutation($taskList: InputUpdateTaskLIstOrder!) {
    updateTaskList(taskList: $taskList) {
      title
      description
      taskOrder
      isComplete
      priorityLv
      date
      id
    }
  }
`;

const addTask = gql`
  mutation($task: InputAddTask!) {
    addTask(task: $task) {
      description
      priorityLv
      isComplete
      taskOrder
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
      taskOrder
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
      taskOrder
      title
      date
      id
    }
  }
`;

export const graphqlMutations = { updateTaskLIstOrder, addTask, updateTask, deleteTask };