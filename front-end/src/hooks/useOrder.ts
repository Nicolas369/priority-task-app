import dayjs from "dayjs";
import { Task } from "../definitions/redux-definitions";
import { useCurrentWeekTaskSelector } from "../store/selectors/tasks-selector";
import { useHttp } from "./useHttp";
import { useEffect, useMemo, useState } from "react";
import { DayColumn, TaskDayColumn, useOrderHook, WEEK, WeekDaysNumbers } from "../definitions/ordering-definition";
import { makeNewWeek } from "../utils/taskOperations";
import { useCheckDependencies } from "./useCheckDependencies";

/**
 * useOrder: task and days order:
 *  - The Order of the Week is handle by id;
 *  - The horizontal order of the Task is giving by time;
 *  - The vertical order of the Task is giving by index;
 */

export const useOrder: useOrderHook = () => {
    const [currentWeek, setCurrentWeek] = useState<TaskDayColumn[]>([...WEEK]);
    const storeWeek = useCurrentWeekTaskSelector();
    const { updateTaskListOrder } = useHttp();

    const allTask = useMemo((): Task[] => {
        let tasks: Task[] = [];
        const dayList = storeWeek.map(day => day.tasks);
        dayList.forEach( list => tasks = [...tasks, ...list] );
        return tasks ? tasks : [];
    }, [storeWeek]);

    const [checkAllTask] = useCheckDependencies([allTask]);

    useEffect(() => {
        setCurrentWeek(() => [...storeWeek]);
    }, [checkAllTask(allTask)]);

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

        const sourceIndex = reorderAction.source.index;
        const destinationIndex = reorderAction.destination.index;

        // get the list 
        const week = [...currentWeek];
        const sourceList = week[parseInt(sourceListId)].tasks;
        const destinationDayList = week[parseInt(destinationListId)].tasks;

        // update task start, finish and index 
        const [taskForReordering] = sourceList.splice(sourceIndex, 1);
        const taskUpdated = setNewTimeline(taskForReordering, destinationListId, sourceListId);
        destinationDayList.splice(destinationIndex, 0, taskUpdated);
        const destinationDayListIndexed = destinationDayList.map((item, i) => ({ ...item, index: (i+1) }));

        // update hook state
        week[parseInt(sourceListId)].tasks = sourceList;
        week[parseInt(destinationListId)].tasks = destinationDayListIndexed;
        setCurrentWeek(() => [...week]);

        // update db
        return updateTaskListOrder(destinationDayListIndexed);
    }

    return {
        orderTaskInTimeLine,
        daysWeekOrder,
        currentWeek
    }
}

