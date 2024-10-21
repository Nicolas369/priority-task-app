import { useDispatch } from "react-redux";
import {
  tasksREST_DELETE,
  tasksREST_GET,
  tasksREST_POST,
  tasksREST_PUT
} from "../http/axiosAsyncThunks";
import { AppDispatch } from "../store";
import { Task } from "../definitions/redux-definitions";

export const useHttp = () => {
  const dispatch = useDispatch<AppDispatch>();

  const getTaskList = () => {
    dispatch(tasksREST_GET.fetchTasksList());
  };

  const updateTaskListOrder = (list: Task[]) => {
    dispatch( tasksREST_POST.updateTasksListOrder(list) );
  };
  
  const addTask = (task: Task) => {
    dispatch( tasksREST_POST.addTask(task) );
  };
  
  const updateTask = (task: Task) => {
    dispatch( tasksREST_PUT.updateTask(task) );
  };
  
  const deleteTask = (taskId: string | number) => {
    dispatch( tasksREST_DELETE.deleteTask(taskId) );
  };

  return {
    getTaskList,
    updateTaskListOrder,
    addTask,
    updateTask,
    deleteTask,
  };
};
