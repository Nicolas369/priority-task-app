import { createAsyncThunk } from "@reduxjs/toolkit";
import { apolloClient } from "./index";
import { graphqlMutations } from "./mutations";
import { Task } from "../../definitions/redux-definitions";
import { graphqlQueries } from "./queries";

export const getTasksList = createAsyncThunk(
    "TaskListSlice/GraphQl/getTaskList",
    async () => {
        const { data } = await apolloClient.query({
            query: graphqlQueries.getTaskList
        });

        return data.getTasksList;
    }
);

export const addTask = createAsyncThunk(
    "TaskListSlice/GraphQl/addTask",
    async (task: Task) => {
        const { data } = await apolloClient.mutate({
            variables: { task },
            mutation: graphqlMutations.addTask
        });
        return data.addTask;
    }
);

export const updateTask = createAsyncThunk(
    "TaskListSlice/GraphQl/updateTask",
    async (task: Task) => {
        const { data } = await apolloClient.mutate({
            variables: { task },
            mutation: graphqlMutations.updateTask
        });
        return data.updateTask;
    }
);

export const deleteTask = createAsyncThunk(
    "TaskListSlice/GraphQl/deleteTask",
    async (taskId: number) => {
        const { data } = await apolloClient.mutate({
            variables: { taskId },
            mutation: graphqlMutations.deleteTask
        });
        return data.deleteTask;
    }
);

export const taskGraphQL_Query = { getTasksList };
export const taskGraphQL_Mutation = { addTask, updateTask, deleteTask };