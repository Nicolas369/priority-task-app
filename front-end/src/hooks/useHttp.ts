import { useDispatch } from "react-redux";
import { taskGraphQL_Mutation, taskGraphQL_Query } from "../http/graphql/graphqlAsyncThunks";
import { AppDispatch } from "../store";
import { Task } from "../definitions/redux-definitions";

export const useHttp = () => {
  const dispatch = useDispatch<AppDispatch>();

  const getTaskList = () => {
    dispatch( taskGraphQL_Query.getTasksList() );
  };
  const updateTaskListOrder = (list: Task[]) => {
    dispatch( taskGraphQL_Mutation.updateTaskLIstOrder(list) );
  };
  const addTask = (task: Task) => {
    dispatch( taskGraphQL_Mutation.addTask(task) );
  };
  const updateTask = (task: Task) => {
    dispatch( taskGraphQL_Mutation.updateTask(task) );
  };
  const deleteTask = (taskId: string | number) => {
    dispatch( taskGraphQL_Mutation.deleteTask(taskId) );
  };

  return {
    getTaskList,
    updateTaskListOrder,
    addTask,
    updateTask,
    deleteTask,
  };
};
