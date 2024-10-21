import { Task } from "../definitions/redux-definitions";
import { useSelectDayById, useSelectTaskById } from "../store/selectors/tasks-selector";
import dayjs from "dayjs";
import { useLocalState } from "./useLocalState";
import { useHttp } from "./useHttp";
import { useMemo } from "react";
import { DayColumn, UseTaskOrderHook, WeekDaysNumbers } from "../definitions/ordering-definition";
import { makeNewWeek } from "../utils/taskOperations";

/**
 * useOrder: task and days order:
 *  - The Order of the Week is handle by id;
 *  - The horizontal order of the Task is giving by time;
 *  - The vertical order of the Task is giving by index;
 */

export const useTaskOrder: UseTaskOrderHook = () => {
    const { selectTaskById } = useSelectTaskById();
    const { selectDayById } = useSelectDayById();
    const { updateTaskListIndex } = useLocalState();
    const { updateTask, updateTaskListOrder } = useHttp();

    const daysWeekOrder = useMemo(() => {
        const orderWeek:DayColumn[] = [];
        const week = makeNewWeek();
        const today = dayjs().day();
        
        let d = today;
        for (let i = 0; i < WeekDaysNumbers.BACKLOG; i++) {
            // order the week by today and the next 6 days
            const isToday = today === d
            orderWeek.push({...week[d], isToday });
            d === 6 ? d = 0 : d++;
        }

        orderWeek.push({
            ...week[WeekDaysNumbers.BACKLOG],
            isToday: false
        });

        return orderWeek;
    }, []);

    const setNewTimeline = (task: Task, destinationDay: string, sourceDay: string) => {
        let timeMovement, newTimeStart, newTimeFinish;

        let timelineLength =  dayjs(task.finishDate).diff(dayjs(task.startDate), "days", true);
        const weekDay = parseInt(destinationDay);
        const passDay = parseInt(sourceDay);

        if (weekDay === WeekDaysNumbers.BACKLOG && passDay === WeekDaysNumbers.BACKLOG) {
            newTimeStart  = task.startDate;
            newTimeFinish = task.finishDate;
        
        } else if (weekDay === WeekDaysNumbers.BACKLOG) {
            newTimeStart  = null;
            newTimeFinish = null;

        } else {
            timeMovement  = daysWeekOrder.indexOf(daysWeekOrder.find((d:any) => parseInt(d.id) === weekDay)!);
            newTimeStart  = dayjs().add(timeMovement,`day`);
            newTimeFinish = timelineLength ? newTimeStart.add(timelineLength ,`day`) : newTimeStart;
            newTimeStart  = newTimeStart.format('YYYY-MM-DD');
            newTimeFinish = newTimeFinish.format('YYYY-MM-DD');
        }

        const startDate  = newTimeStart;
        const finishDate = newTimeFinish;

        return {
            ...task,
            startDate,
            finishDate
        }
    }

    const orderTaskInTimeLine = (reorderAction: any) => {
        if (
            !reorderAction.destination &&
            !reorderAction.draggableId &&
            !reorderAction.source
        ) return;

        const sourceListId = reorderAction.source.droppableId;
        const destinationListId = reorderAction.destination.droppableId;
        const taskForUpdateId = parseInt(reorderAction.draggableId);

        const sourceIndex = reorderAction.source.index;
        const destinationIndex = reorderAction.destination.index;

        // task 
        const taskForUpdate = selectTaskById(taskForUpdateId);
        const itemUpdated = setNewTimeline(taskForUpdate!, destinationListId, sourceListId);
        
        // day list 
        const destinationDayList = [...selectDayById(parseInt(destinationListId))];

        if (destinationListId === sourceListId) {
            destinationDayList.splice(sourceIndex, 1);
        }

        destinationDayList.splice(destinationIndex, 0, itemUpdated);
        const indexedTaskLIst = destinationDayList.map((item, i) => ({ ...item, index: (i+1) }));

        // redux
        updateTaskListIndex(indexedTaskLIst);

        // http
        updateTask(itemUpdated);
        updateTaskListOrder([...indexedTaskLIst]);
    }

    return {
        orderTaskInTimeLine,
        daysWeekOrder
    }
}

