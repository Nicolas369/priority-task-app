import { createAsyncThunk } from "@reduxjs/toolkit";
import { apolloClient } from "./index";
import { graphqlMutations } from "./mutations";
import { Task } from "../../definitions/redux-definitions";
import { graphqlQueries } from "./queries";
import { assembleTask } from "../../utils/taskOperations";

export const getTasksList = createAsyncThunk(
    "TaskListSlice/GraphQl/getTaskList",
    async () => {
        const { data } = await apolloClient.query({
            query: graphqlQueries.getTaskList
        });

        return data.getTasksList;
    }
);

export const updateTaskLIstOrder = createAsyncThunk(
    "TaskListSlice/GraphQl/updateTaskLIstOrder",
    async (list: Task[]) => {
        const taskList = { 
            list: list.map((task: Task) => assembleTask(task))
        };
        const { data } = await apolloClient.mutate({
            mutation: graphqlMutations.updateTaskLIstOrder,
            variables: { taskList }
        });
        return data.updateTaskList;
    }
);

export const addTask = createAsyncThunk(
    "TaskListSlice/GraphQl/addTask",
    async (task: Task) => {
        task = assembleTask(task)
        const { data } = await apolloClient.mutate({
            mutation: graphqlMutations.addTask,
            variables: { task }
        });
        return data.addTask;
    }
);

export const updateTask = createAsyncThunk(
    "TaskListSlice/GraphQl/updateTask",
    async (task: Task) => {
        const { data } = await apolloClient.mutate({
            mutation: graphqlMutations.updateTask,
            variables: { task: assembleTask(task) }
        });
        return data.updateTask;
    }
);

export const deleteTask = createAsyncThunk(
    "TaskListSlice/GraphQl/deleteTask",
    async (taskId: number | string) => {
        taskId = typeof  taskId === "string" ? taskId: taskId.toString();
        const { data } = await apolloClient.mutate({
            mutation: graphqlMutations.deleteTask,
            variables: { taskId }
        });
        return data.deleteTask;
    }
);

export const taskGraphQL_Query = { getTasksList };
export const taskGraphQL_Mutation = { addTask, updateTask, deleteTask, updateTaskLIstOrder };