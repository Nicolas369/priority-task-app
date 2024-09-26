import { useDispatch } from "react-redux";
import {
  tasksREST_DELETE,
  tasksREST_GET,
  tasksREST_POST,
  tasksREST_PUT
} from "../http/axios-rest/axiosAsyncThunks";
import {
  taskGraphQL_Mutation,
  taskGraphQL_Query,
} from "../http/graphql/graphqlAsyncThunks";
import { AppDispatch } from "../store";
import { Task } from "../definitions/redux-definitions";
import { useLocalState } from "./useLocalState";

export const useHttp = () => {
  const {isAxios: useAxios, setTasksList} = useLocalState();

  const dispatch = useDispatch<AppDispatch>();

  const getTaskList = () => {
    dispatch(
      useAxios
        ? tasksREST_GET.fetchTasksList()
        : taskGraphQL_Query.getTasksList()
    );
  };
  const updateTaskListOrder = (list: Task[]) => {
    setTasksList(list);
    dispatch(
      useAxios
        ? tasksREST_POST.updateTasksListOrder(list)
        : taskGraphQL_Mutation.updateTaskLIstOrder(list)
    );
  };
  const addTask = (task: Task) => {
    dispatch(
      useAxios
        ? tasksREST_POST.addTask(task)
        : taskGraphQL_Mutation.addTask(task)
    );
  };
  const updateTask = (task: Task) => {
    dispatch(
      useAxios
        ? tasksREST_PUT.updateTask(task)
        : taskGraphQL_Mutation.updateTask(task)
    );
  };
  const deleteTask = (taskId: string | number) => {
    dispatch(
      useAxios
        ? tasksREST_DELETE.deleteTask(taskId)
        : taskGraphQL_Mutation.deleteTask(taskId)
    );
  };

  return {
    getTaskList,
    updateTaskListOrder,
    addTask,
    updateTask,
    deleteTask,
  };
};
