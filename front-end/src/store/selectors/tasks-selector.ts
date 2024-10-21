import { useSelector } from "react-redux";
import { RootState, useAppSelector } from "../index";
import { orderBacklog, orderWeek } from "../../utils/taskOperations";
import { TaskDayColumn, WeekDaysNumbers } from "../../definitions/ordering-definition";
import { Task } from "../../definitions/redux-definitions";

export const useTaskStateSelector = () => useAppSelector(store => store);

export const useTaskListSelector  = () => useSelector((store: RootState) => store.tasks.taskList);

export const useSelectSelectedTask = () =>  useSelector((store: RootState) => {
    const taskList = store.tasks.taskList; 
    return taskList.find(task => task.id == store.tasks.selectedTask);
});

export const useSelectTaskById = () => {
    const taskList = useTaskListSelector()

    const selectTaskById = (taskId: number) => {
        return taskList.find(task => task.id === taskId);
    }

    return { selectTaskById };
}

export const useSelectDayById = () => {
    const weekTask = useCurrentWeekTaskSelector();

    const selectDayById = (dayNumber: number) => {
        return weekTask[dayNumber].tasks.sort(
            (a: Task, b:Task) => a.index! - b.index!
        );
    }

    return { selectDayById };
}

export const useCurrentWeekTaskSelector = () => {
    const allTasks = useTaskListSelector();
    const taskOfTheWeek: TaskDayColumn[] = orderWeek(allTasks);
    return taskOfTheWeek;
}

export const useSundayTaskSelector = () => {
    const weekTask = useCurrentWeekTaskSelector();
    const sunday = weekTask[WeekDaysNumbers.Sunday].tasks;
    return sunday;
}

export const useMondayTaskSelector = () => {
    const weekTask = useCurrentWeekTaskSelector();
    const monday = weekTask[WeekDaysNumbers.Monday].tasks;
    return monday;
}

export const useTuesdayTaskSelector = () => {
    const weekTask = useCurrentWeekTaskSelector();
    const tuesday = weekTask[WeekDaysNumbers.Tuesday].tasks;
    return tuesday;
}

export const useWednesdayTaskSelector = () => {
    const weekTask = useCurrentWeekTaskSelector();
    const wednesday = weekTask[WeekDaysNumbers.Wednesday].tasks;
    return wednesday;
}

export const useThursdayTaskSelector = () => {
    const weekTask = useCurrentWeekTaskSelector();
    const thursday = weekTask[WeekDaysNumbers.Thursday].tasks;
    return thursday;
}

export const useFridayTaskSelector = () => {
    const weekTask = useCurrentWeekTaskSelector();
    const friday = weekTask[WeekDaysNumbers.Friday].tasks;
    return friday;
}

export const useSaturdayTaskSelector = () => {
    const weekTask = useCurrentWeekTaskSelector();
    const saturday = weekTask[WeekDaysNumbers.Saturday].tasks;
    return saturday;
}

export const useBacklogSelector = () => {
    const allTasks = useTaskListSelector();
    const taskOfTheWeek: Task[] = orderBacklog(allTasks);
    return taskOfTheWeek;
}

export const weekSelectors = [
    useSundayTaskSelector,
    useMondayTaskSelector,
    useTuesdayTaskSelector,
    useWednesdayTaskSelector,
    useThursdayTaskSelector,
    useFridayTaskSelector,
    useSaturdayTaskSelector,
    useBacklogSelector
];