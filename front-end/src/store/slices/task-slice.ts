import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Task, InitialTaskState } from '../../definitions/redux-definitions';
import { uniqInArrayById } from '../../utils/handle-operations';
import { httpExtraReducer } from '../../http';

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
  extraReducers: httpExtraReducer,
});

export const { storeTasksList, setSelectedTask, updateTasksListIndex } = taskSlice.actions;
export default taskSlice.reducer
