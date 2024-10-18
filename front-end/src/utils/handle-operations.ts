import { WEEK } from "../constants/constant-variables";
import { DayColumnTask } from "../definitions/task-order-definition";

export const uniqInArray = (array: any[]) => {
    var seen: any = {};
    return array.filter((item) => {
        return seen.hasOwnProperty(
            item) ? false : (seen[item as keyof any] = true
        );
    });
}

export const uniqInArrayById = (array: any[]) => {
    var seen: any = {};
    return array.filter((item) => {
        return seen.hasOwnProperty(
            item.id) ? false : (seen[item.id as keyof any] = true
        );
    });
}

export const makeNewWeek = () => {
    return WEEK.map(
        (day:DayColumnTask) =>( {name: day.name, id:day.id, tasks: [...day.tasks.map(t => ({...t}))]})
    )
}
