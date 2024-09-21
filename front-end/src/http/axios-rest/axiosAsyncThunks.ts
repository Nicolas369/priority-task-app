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

const addTask = createAsyncThunk(
  "TaskListSlice/Axios/addTask",
  async (task: Task) => {
    const { data }: AxiosResponse = await axiosClient.post<Task[]>("/add-task", { task });
    return data;
  }
);

const deletTask = createAsyncThunk(
  "TaskListSlice/Axios/deletTask",
  async (taskID: string) => {
    const params: { id: number } = { id: parseInt(taskID) } 
    const { data }: AxiosResponse = await axiosClient.delete<Task[]>("/delete-task", { params });
    return data;
  }
);

const updateTask = createAsyncThunk(
  "TaskListSlice/Axios/updateTask",
  async (task: Task) => {
    task = { ...task, id: typeof task.id === `string` ? parseInt(task.id) : task.id }
    const { data }: AxiosResponse = await axiosClient.post<Task[]>("/update-task", { task });
    return data;
  }
);

export const tasksREST_GET = { fetchTasksList }; 
export const tasksREST_POST = { addTask, updateTask };
export const tasksREST_DELETE = { deletTask };