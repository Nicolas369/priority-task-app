import { Task } from "../definitions/redux-definitions";
import { useTaskListSelector } from "../store/selectors/tasks-selector";
import dayjs, { Dayjs } from "dayjs";

export type taskDay = { // move to definition file 
    id: string;
    name: string;
    tasks: Task[];
    // make more complex this type 
    // [ ] add color responsibility 
}

const BACKLOG = 7; // move to constant file 

// [x] task order and reorder 
// [x] time flow display today day
// [ ] reorder task in time-line
// [ ] memorized all task list 
// [ ] task display 

// [ ] eight list with a backlog include


/**
 * Now => today()
 * weekArray: taskDay[]
 * base on Now order the WeekArray
 * base on the day number order the array following the day order starting from today.
 */

export const useTaskOrder = () => {
    const allTasks = useTaskListSelector();

    const week: taskDay[] = [ // move to constant file 
        {name: "Sunday", id: "1", tasks: []},
        {name: "Monday", id: "2", tasks: []},
        {name: "Tuesday", id: "3", tasks: []},
        {name: "Wednesday", id: "4", tasks: []},
        {name: "Thursday", id: "5", tasks: []},
        {name: "Friday", id: "6", tasks: []},
        {name: "Saturday", id: "7", tasks: []},
        {name: "backlog", id: "8", tasks: []}
    ];

    const checkWeek = (day: Dayjs) => {
        const today = dayjs();

        if ( 
            day.get("month") === today.get("month") &&
            day.get("date") <= (today.get("date") + 6)
        ) {
            return true;
        }

        if ( 
            day.get("month") === (today.get("month") +1) &&
            (30 - today.get("date") + day.get("date")) <= 7
        ) {
            return true;
        }

        if ( day.get("month") > (today.get("month") +1) ) {
            return false;
        }

        return 0;
    }

    allTasks.forEach(task => {
        const taskStart = dayjs(task.startDate);
        
        // [ ] get week 
        if (checkWeek(taskStart)) {
            week[taskStart.day()].tasks.push(task);
        } else {
            week[BACKLOG].tasks.push(task);
        }
        console.log(week);
    });

    const orderWeek = () => {


        const orderWeek = [];
        let d = dayjs().day();

        for (let i = 0; i < 7; i++) {
            orderWeek.push({...week[d], today: d === i});
            d === 6 ? d = 0 : d++;
        }

        orderWeek.push(week[BACKLOG]);
        return orderWeek;
    }
    
    return {
        orderWeek
    }
}
