import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Task, InitialTaskState } from '../../definitions/redux-definitions';
import { taskGraphQL_Mutation, taskGraphQL_Query } from '../../http/graphql/graphqlAsyncThunks';
import { uniqInArrayById } from '../../utils/handle-operations';

const storeTaskList = (state:InitialTaskState, taskList: Task[]) => {
  if (!(JSON.stringify(state.taskList) == JSON.stringify(taskList))) {
    state.taskList = taskList;
  }
}

const initialState: InitialTaskState = {
  taskList: [],
  selectedTask: 0
}

export const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    storeTasksList: (state, action: PayloadAction<Task[]>) => {
      state.taskList = [...action.payload];
    },
    updateTasksListIndex: (state, action: PayloadAction<Task[]>) => {
      const allTasks = uniqInArrayById([...action.payload, ...state.taskList]);
      state.taskList = allTasks;
    },
    setSelectedTask: (state, action: PayloadAction<number | string>) => {
      state.selectedTask = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
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
        storeTaskList(state, action.payload);
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

export const { storeTasksList, setSelectedTask, updateTasksListIndex } = taskSlice.actions;
export default taskSlice.reducer