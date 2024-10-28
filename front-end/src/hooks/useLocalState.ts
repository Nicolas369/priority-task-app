import { Task } from "../definitions/redux-definitions";
import { useDispatch } from "react-redux";
import { setSelectedTask, storeTasksList, updateTasksListIndex } from "../store/slices/task-slice";

export const useLocalState = () => {
    const dispatch = useDispatch();

    const selectTask = (taskId: number | string) => { dispatch(setSelectedTask(taskId)); }
    const setNewTasksList = (taskList: Task[]) => { dispatch(storeTasksList(taskList)); }
    const updateTaskListIndex = (taskList: Task[]) => { dispatch(updateTasksListIndex(taskList)); }

    return {
        selectTask,
        setNewTasksList,
        updateTaskListIndex
    };
};