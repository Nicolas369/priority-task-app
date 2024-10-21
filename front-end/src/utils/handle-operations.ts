import { TaskDayColumn, WEEK } from "../definitions/ordering-definition";

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
