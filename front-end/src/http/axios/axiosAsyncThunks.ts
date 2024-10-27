import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { axiosClient } from "./index";
import { InitialTaskState, Task } from "../../definitions/redux-definitions";

const fetchTasksList = createAsyncThunk(
  "TaskListSlice/Axios/getTaskLIst",
  async () => {
    const { data }: AxiosResponse = await axiosClient.get<Task[]>("/get-tasks-list");
    return data;
  }
);

const updateTasksListOrder = createAsyncThunk(
  "TaskListSlice/Axios/updateTasksListOrder",
  async (list: Task[] ) => {
    const { data }: AxiosResponse = await axiosClient.put<Task[]>("/update-tasks-list-order", { list });
    return data;
  }
);

const addTask = createAsyncThunk(
  "TaskListSlice/Axios/addTask",
  async (task: Task) => {
    const { data }: AxiosResponse = await axiosClient.post<Task[]>("/add-task", { task });
    return data;
  }
);

const deleteTask = createAsyncThunk(
  "TaskListSlice/Axios/deleteTask",
  async (taskID: string | number) => {
    const params: { id: number } = { id: typeof taskID === "string" ? parseInt(taskID) : taskID } 
    const { data }: AxiosResponse = await axiosClient.delete<Task[]>("/delete-task", { params });
    return data;
  }
);

const updateTask = createAsyncThunk(
  "TaskListSlice/Axios/updateTask",
  async (task: Task) => {
    task = { ...task, id: typeof task.id === `string` ? parseInt(task.id) : task.id }
    const { data }: AxiosResponse = await axiosClient.put<Task[]>("/update-task", { task });
    return data;
  }
);

export const tasksREST_GET = { fetchTasksList }; 
export const tasksREST_POST = { addTask };
export const tasksREST_PUT = { updateTask, updateTasksListOrder };
export const tasksREST_DELETE = { deleteTask };

const storeTaskList = (state:InitialTaskState, taskList: Task[]) => {
  if (!(JSON.stringify(state.taskList) == JSON.stringify(taskList))) {
    state.taskList = taskList;
  }
}

export const AxiosExtraReducer = (builder: any) => {
  builder
    .addCase(tasksREST_GET.fetchTasksList.fulfilled, (state:InitialTaskState, action:PayloadAction<Task[]>) => {
      state.taskList = action.payload;
    })
    .addCase(tasksREST_GET.fetchTasksList.rejected, (state:InitialTaskState, action: any) => {
      console.error(action.error.message); // [ ] handle error
    })
    .addCase(tasksREST_PUT.updateTasksListOrder.fulfilled, (state:InitialTaskState, action:PayloadAction<Task[]>) => {
      storeTaskList(state, action.payload);
    })
    .addCase(tasksREST_PUT.updateTasksListOrder.rejected, (state:InitialTaskState, action: any) => {
      console.error(action.error.message); // [ ] handle error
    })
    .addCase(tasksREST_POST.addTask.fulfilled, (state:InitialTaskState, action:PayloadAction<Task[]>) => {
      state.taskList = action.payload;
    })
    .addCase(tasksREST_POST.addTask.rejected, (state:InitialTaskState, action: any) => {
      console.error(action.error.message); // [ ] handle error
    })
    .addCase(tasksREST_DELETE.deleteTask.fulfilled, (state:InitialTaskState, action:PayloadAction<Task[]>) => {
      state.taskList = action.payload;
    })
    .addCase(tasksREST_DELETE.deleteTask.rejected, (state:InitialTaskState, action: any) => {
      console.error(action.error.message); // [ ] handle error
    })
    .addCase(tasksREST_PUT.updateTask.fulfilled, (state:InitialTaskState, action:PayloadAction<Task[]>) => {
      storeTaskList(state, action.payload);
    })
    .addCase(tasksREST_PUT.updateTask.rejected, (state:InitialTaskState, action: any) => {
      console.error(action.error.message); // [ ] handle error
    })
}