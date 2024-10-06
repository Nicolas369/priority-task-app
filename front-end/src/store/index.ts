import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from "./slices/task-slice";
import themeReducer from "./slices/theme-slice";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;