import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Task, TaskList } from '../../definitions/redux-definitions';
import { tasksREST_DELETE, tasksREST_GET, tasksREST_POST } from '../../http/axios-rest/axiosAsyncThunks';

const initialState: TaskList = {
  list: [],
}

export const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasksList: (state, action: PayloadAction<Task[]>) => {
      state.list = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(tasksREST_GET.fetchTasksList.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(tasksREST_GET.fetchTasksList.rejected, (state, action) => {
        console.error(action.error.message); // [ ] handle error
      })
      .addCase(tasksREST_POST.addTask.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(tasksREST_POST.addTask.rejected, (state, action) => {
        console.error(action.error.message); // [ ] handle error
      })
      .addCase(tasksREST_DELETE.deletTask.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(tasksREST_DELETE.deletTask.rejected, (state, action) => {
        console.error(action.error.message); // [ ] handle error
      })
      .addCase(tasksREST_POST.updateTask.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(tasksREST_POST.updateTask.rejected, (state, action) => {
        console.error(action.error.message); // [ ] handle error
      })
  },
});

export const { setTasksList } = taskSlice.actions;
export default taskSlice.reducer