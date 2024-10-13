import { gql } from "@apollo/client";

const updateTaskLIstOrder = gql`
  mutation($taskList: InputUpdateTaskLIstOrder!) {
    updateTaskList(taskList: $taskList) {
      title
      description
      priorityLv
      isComplete
      startDate
      finishDate
      index
      date
      id
    }
  }
`;

const addTask = gql`
  mutation($task: InputAddTask!) {
    addTask(task: $task) {
      title
      description
      priorityLv
      isComplete
      startDate
      finishDate
      index
      date
      id
    }
  }
`;

const updateTask = gql`
  mutation($task: InputUpdateTask!) {
    updateTask(task: $task) {
      title
      description
      priorityLv
      isComplete
      startDate
      finishDate
      index
      date
      id
    }
  }
`;

const deleteTask = gql`
  mutation($taskId: ID) {
    deleteTask(taskId: $taskId) {
      title
      description
      priorityLv
      isComplete
      startDate
      finishDate
      index
      date
      id
    }
  }
`;

export const graphqlMutations = { updateTaskLIstOrder, addTask, updateTask, deleteTask };