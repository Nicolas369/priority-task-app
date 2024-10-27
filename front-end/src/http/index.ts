import {
    tasksREST_GET,
    tasksREST_POST,
    tasksREST_PUT,
    tasksREST_DELETE,
    AxiosExtraReducer
} from "./axios/axiosAsyncThunks";

export const httpExtraReducer = AxiosExtraReducer;

export const HTTP = {
    addTask: tasksREST_POST.addTask,
    fetchTasksList: tasksREST_GET.fetchTasksList,
    updateTask: tasksREST_PUT.updateTask,
    updateTasksListOrder: tasksREST_PUT.updateTasksListOrder,
    deleteTask: tasksREST_DELETE.deleteTask
}