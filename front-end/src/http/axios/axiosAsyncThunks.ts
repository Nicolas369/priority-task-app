import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { axiosClient } from "./index";
import { Task } from "../../definitions/redux-definitions";

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