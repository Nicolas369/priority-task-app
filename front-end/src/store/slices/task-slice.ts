import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Task, InitialState } from '../../definitions/redux-definitions';
import { tasksREST_DELETE, tasksREST_GET, tasksREST_POST, tasksREST_PUT } from '../../http/axios-rest/axiosAsyncThunks';
import { taskGraphQL_Mutation, taskGraphQL_Query } from '../../http/graphql/graphqlAsyncThunks';

const initialState: InitialState = {
  taskList: [],
  useAxios: true,
  selectedTask: 0
}

export const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    storeTasksList: (state, action: PayloadAction<Task[]>) => {
      state.taskList = action.payload;
    },
    setSelectedTask: (state, action: PayloadAction<number | string>) => {
      state.selectedTask = action.payload;
    },
    setUseAxios: (state, action: PayloadAction<boolean>) => {
      state.useAxios = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Axios asyncThunks
      .addCase(tasksREST_GET.fetchTasksList.fulfilled, (state, action) => {
        state.taskList = action.payload;
      })
      .addCase(tasksREST_GET.fetchTasksList.rejected, (state, action) => {
        console.error(action.error.message); // [ ] handle error
      })
      .addCase(tasksREST_POST.updateTasksListOrder.fulfilled, (state, action) => {
        state.taskList = action.payload;
      })
      .addCase(tasksREST_POST.updateTasksListOrder.rejected, (state, action) => {
        console.error(action.error.message); // [ ] handle error
      })
      .addCase(tasksREST_POST.addTask.fulfilled, (state, action) => {
        state.taskList = action.payload;
      })
      .addCase(tasksREST_POST.addTask.rejected, (state, action) => {
        console.error(action.error.message); // [ ] handle error
      })
      .addCase(tasksREST_DELETE.deleteTask.fulfilled, (state, action) => {
        state.taskList = action.payload;
      })
      .addCase(tasksREST_DELETE.deleteTask.rejected, (state, action) => {
        console.error(action.error.message); // [ ] handle error
      })
      .addCase(tasksREST_PUT.updateTask.fulfilled, (state, action) => {
        const sortedTaskList = [...action.payload].sort((a, b) => a.priorityLv - b.priorityLv);
        state.taskList = sortedTaskList.map((task, i) => (
          {...task, taskOrder: (!task.isComplete? (i+1) : (sortedTaskList.length+1))}
        ));
      })
      .addCase(tasksREST_PUT.updateTask.rejected, (state, action) => {
        console.error(action.error.message); // [ ] handle error
      })

      // GraphQl asyncThunks
      .addCase(taskGraphQL_Query.getTasksList.fulfilled, (state, action) => {
        state.taskList = action.payload;
      })
      .addCase(taskGraphQL_Query.getTasksList.rejected, (state, action) => {
        console.error(action.error.message); // [ ] handle error
      })
      .addCase(taskGraphQL_Mutation.updateTaskLIstOrder.fulfilled, (state, action) => {
        state.taskList = action.payload;
      })
      .addCase(taskGraphQL_Mutation.updateTaskLIstOrder.rejected, (state, action) => {
        console.error(action.error.message); // [ ] handle error
      })
      .addCase(taskGraphQL_Mutation.addTask.fulfilled, (state, action) => {
        state.taskList = action.payload;
      })
      .addCase(taskGraphQL_Mutation.addTask.rejected, (state, action) => {
        console.error(action.error.message); // [ ] handle error
      })
      .addCase(taskGraphQL_Mutation.updateTask.fulfilled, (state, action) => {
        const sortedTaskList = [...action.payload].sort((a, b) => a.priorityLv - b.priorityLv);
        state.taskList = sortedTaskList.map((task, i) => (
          {...task, taskOrder: (!task.isComplete? (i+1) : (sortedTaskList.length))}
        ));
      })
      .addCase(taskGraphQL_Mutation.updateTask.rejected, (state, action) => {
        console.error(action.error.message); // [ ] handle error
      })
      .addCase(taskGraphQL_Mutation.deleteTask.fulfilled, (state, action) => {
        state.taskList = action.payload;
      })
      .addCase(taskGraphQL_Mutation.deleteTask.rejected, (state, action) => {
        console.error(action.error.message); // [ ] handle error
      })
  },
});

export const { storeTasksList, setSelectedTask, setUseAxios } = taskSlice.actions;
export default taskSlice.reducer