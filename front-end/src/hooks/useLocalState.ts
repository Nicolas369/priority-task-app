import { Task } from "../definitions/redux-definitions";
import { useDispatch } from "react-redux";
import { useUseAxiosSelector } from "../store/selectors/tasks-selector";
import { setSelectedTask, storeTasksList, setUseAxios } from "../store/slices/task-slice";

export const useLocalState = () => {
    const dispatch = useDispatch();

    const isAxios = useUseAxiosSelector();

    const selectTask = (taskId: number | string) => { dispatch(setSelectedTask(taskId)); }
    const setTasksList = (taskList: Task[]) => { dispatch(storeTasksList(taskList)); };
    const toggleHttpLibrary = () => { dispatch(isAxios ? setUseAxios(false) : setUseAxios(true)); };

    return {
        setTasksList,
        selectTask,
        toggleHttpLibrary,
        isAxios
    };
}