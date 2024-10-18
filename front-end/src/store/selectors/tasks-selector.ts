import { useSelector } from "react-redux";
import { RootState } from "../index";

export const useTaskListSelector = () => useSelector((store: RootState) => store.tasks.taskList);
export const useUseAxiosSelector = () => useSelector((store: RootState) => store.tasks.useAxios);
export const useSelectLastOrder =  () => useSelector(
    (store: RootState) => {
        const taskList = [...store.tasks.taskList]
        const lastIndex = taskList.length - 1;
        const lastTask = taskList.sort((a, b) => a.taskOrder! - b.taskOrder!)[lastIndex] // [ ] refactor
        return lastTask?.taskOrder;
    }
);
export const useSelectSelectedTask = () =>  useSelector((store: RootState) => {
    const taskList = store.tasks.taskList; 
    return taskList.find(task => task.id == store.tasks.selectedTask);
});