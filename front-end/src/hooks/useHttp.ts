import { useDispatch } from "react-redux";
import { HTTP } from "../http";
import { AppDispatch } from "../store";
import { Task } from "../definitions/redux-definitions";

export const useHttp = () => {
  const dispatch = useDispatch<AppDispatch>();

  const getTaskList = () => {
    dispatch(HTTP.fetchTasksList());
  };

  const updateTaskListOrder = (list: Task[]) => {
    dispatch(HTTP.updateTasksListOrder(list));
  };
  
  const addTask = (task: Task) => {
    dispatch(HTTP.addTask(task));
  };
  
  const updateTask = (task: Task) => {
    dispatch(HTTP.updateTask(task));
  };
  
  const deleteTask = (taskId: string | number) => {
    dispatch(HTTP.deleteTask(taskId));
  };

  return {
    getTaskList,
    updateTaskListOrder,
    addTask,
    updateTask,
    deleteTask,
  };
};
