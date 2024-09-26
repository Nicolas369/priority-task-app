import { TaskEntryInterface } from "../../definitions/pages-definitions";
import { InputTaskComponent } from "../../components/input-task-component"
import { DisplayTaskComponent } from "../../components/display-task-component";

export const TaskEntryComponent = ({taskSelected, lastTaskOrder, isUpdate, isAdd, onSubmit}: TaskEntryInterface) => {

    if (isAdd) {
        // add task
        const taskForAddition = {
            title: "", description: "", priorityLv: NaN,
            isComplete: false, taskOrder: lastTaskOrder +1, date: new Date()
        }; 
        return <InputTaskComponent task={taskForAddition} taskSubmit={onSubmit} />
    }

    if (isUpdate && taskSelected) {
        // update task 
        return <InputTaskComponent task={taskSelected!} taskSubmit={onSubmit} />
    }

    if (taskSelected) {
        // display task 
        return <DisplayTaskComponent taskSelected={taskSelected!} />;
    }

    return <></>;
}
