import { Task } from "../definitions/redux-definitions";
import { useTaskListSelector } from "../store/selectors/tasks-selector";
import dayjs, { Dayjs } from "dayjs";
import { useLocalState } from "./useLocalState";
import { useHttp } from "./useHttp";
import { makeNewWeek, uniqInArrayById } from "../utils/handle-operations";
import { useMemo } from "react";
import { DayColumn, DayColumnTask, UseTaskOrder, WeekDaysNumbers } from "../definitions/task-order-definition";

export const useTaskOrder: UseTaskOrder = () => {
    const allTasks = useTaskListSelector();
    const { setTasksList } = useLocalState();
    const { updateTask, updateTaskListOrder } = useHttp();

    const checkWeek = (day: Dayjs | null) => {
        if (!day) return false;
        
        const today = dayjs();

        if (
            day.get("date") >= today.get("date") &&
            day.get("date") <= (today.get("date") + 6) &&
            day.get("month") === today.get("month")
        ) {
            return true;
        }

        if (
            day.get("month") === (today.get("month") +1) &&
            (30 - today.get("date") + day.get("date")) <= 7
        ) {
            return true;
        }

        return false;
    }

    const orderWeek = () => {        
        const week = makeNewWeek();

        allTasks.forEach((task: Task) => {
            // order the task by next 7 days
            const taskStart = task.startDate ? dayjs(task.startDate) : null;
                        
            if (checkWeek(taskStart)) {
                week[taskStart!.day()].tasks.push(task);
            } else {
                week[WeekDaysNumbers.BACKLOG].tasks.push(task);
            }
    
        });
        
        return week;
    }

    const currentWeek = orderWeek();

    const daysWeekOrder = useMemo(() => {
        const orderWeek:DayColumn[] = [];
        const week = makeNewWeek();
        
        let d = dayjs().day();
        for (let i = 0; i < WeekDaysNumbers.BACKLOG; i++) {
            // order the week by today and the next 6 days
            orderWeek.push({...week[d], today: d === i});
            d === 6 ? d = 0 : d++;
        }

        orderWeek.push(week[WeekDaysNumbers.BACKLOG]);
        return orderWeek;
    }, []);

    const storeWeek = (week: DayColumnTask[], sourceList: Task[], destinationLIst: Task[]) => {
        let allTask = [
            ...sourceList,
            ...destinationLIst,
            ...[...week[0].tasks].map(t => ({...t})),
            ...[...week[1].tasks].map(t => ({...t})),
            ...[...week[2].tasks].map(t => ({...t})),
            ...[...week[3].tasks].map(t => ({...t})),
            ...[...week[4].tasks].map(t => ({...t})),
            ...[...week[5].tasks].map(t => ({...t})),
            ...[...week[6].tasks].map(t => ({...t})),
            ...[...week[7].tasks].map(t => ({...t}))
        ];

        allTask = uniqInArrayById(allTask);
        setTasksList(allTask);
    };

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
        if (!reorderAction.destination) return;

        const sourceListId = reorderAction.source.droppableId;
        const destinationListId = reorderAction.destination.droppableId;

        const sourceIndex = reorderAction.source.index;
        const destinationIndex = reorderAction.destination.index;

        let sourceList = currentWeek.find( d => d.id === sourceListId )!.tasks;
        let destinationList = currentWeek.find( d => d.id === destinationListId )!.tasks;

        // sort list by index
        sourceList = sourceList.sort( (a: Task, b: Task) => a.index! - b.index! )
        destinationList = destinationList.sort( (a: Task, b: Task) => a.index! - b.index! )
        
        // update task week day
        const [reorderedItem] = sourceList.splice(sourceIndex, 1);
        const itemUpdated = setNewTimeline(reorderedItem, destinationListId, sourceListId);        
        destinationList.splice(destinationIndex, 0, itemUpdated);
        updateTask(destinationList.find((t:any) => t.id === itemUpdated.id)!);
        
        // update Index
        if (sourceListId === destinationListId) {
            sourceList = sourceList.map((item, i) => ({ ...item, index: (i+1) }));
            updateTaskListOrder(sourceList);
        } else {
            sourceList = sourceList.map((item, i) => ({ ...item, index: (i+1) }));
            destinationList = destinationList.map((item, i) => ({ ...item, index: (i+1) }));
            updateTaskListOrder([...destinationList, ...sourceList]);
        }
        
        storeWeek(currentWeek, sourceList, destinationList);
    }

    return {
        orderTaskInTimeLine,
        daysWeekOrder,
        currentWeekDay: [
            currentWeek[WeekDaysNumbers.Sunday],
            currentWeek[WeekDaysNumbers.Monday],  
            currentWeek[WeekDaysNumbers.Tuesday],
            currentWeek[WeekDaysNumbers.Wednesday],
            currentWeek[WeekDaysNumbers.Thursday],
            currentWeek[WeekDaysNumbers.Friday], 
            currentWeek[WeekDaysNumbers.Saturday],
            currentWeek[WeekDaysNumbers.BACKLOG]
        ]
    }
}

