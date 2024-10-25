import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Task, InitialTaskState } from '../../definitions/redux-definitions';
import { tasksREST_DELETE, tasksREST_GET, tasksREST_POST, tasksREST_PUT } from '../../http/axiosAsyncThunks';
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
      // Axios asyncThunks
      .addCase(tasksREST_GET.fetchTasksList.fulfilled, (state, action) => {
        state.taskList = action.payload;
      })
      .addCase(tasksREST_GET.fetchTasksList.rejected, (state, action) => {
        console.error(action.error.message); // [ ] handle error
      })
      .addCase(tasksREST_PUT.updateTasksListOrder.fulfilled, (state, action) => {
        storeTaskList(state, action.payload);
      })
      .addCase(tasksREST_PUT.updateTasksListOrder.rejected, (state, action) => {
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
        storeTaskList(state, action.payload);
      })
      .addCase(tasksREST_PUT.updateTask.rejected, (state, action) => {
        console.error(action.error.message); // [ ] handle error
      })
  }
});

export const { setSelectedTask, updateTasksListIndex } = taskSlice.actions;
export default taskSlice.reducer