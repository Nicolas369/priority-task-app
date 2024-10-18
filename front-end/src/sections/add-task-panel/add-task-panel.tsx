import { Box, Button, Typography } from "@mui/material";
import { useHttp } from "../../hooks/useHttp";
import { useColorAction } from "../../store/selectors/themeSelector";
import { ContainerComponent } from "../../components/container-component";
import { PrioritySelector } from "./section-components/priority-selector";
import { displayCenter } from "../../theme/style";
import { SetTimeLineComponent } from "./section-components/set-time-line-component";
import { EntryTaskDescriptionTitle } from "./section-components/entry-task-description-title";
import { useState } from "react";
import { Task } from "../../definitions/redux-definitions";
import { thisIsTask } from "../../utils/taskOperations";
import { TaskObservable } from "../../utils/observable";

const makeStyles = (color: any) => ({
    // [ ] set a right size for the panel 
    // note: make it responsive with the screen.
    panelSize: {
        height: "100%",
        width: "345px",
        marginRight: "10px",
        boxSizing: "border-box",
    },
    panelTitle: {
        width: "100%",
        fontSize: "1em",
        color: color.dark,
        wordSpacing: "3px",
        letterSpacing: "1px",
        marginBottom: "15px",
        boxSizing: "border-box",
        textTransform:"uppercase",
        ...displayCenter
    },
    panelInputs: {
        height:"100%",
        overflowY: "scroll",
    },
    btnCreateTask: {
        width:"100%",
        boxSizing: "border-box",
        backgroundColor: color.main,
        marginTop: "10px",
        marginBottom: "5px",
        borderRadius: "6px",
    }
});

export const AddTaskPanel = () => {
    const { addTask } = useHttp();
    const actionColor = useColorAction();
    const styles = makeStyles(actionColor);
    const [taskObject, setTaskObject] = useState<Partial<Task>>({});
    const clearInputObservable = new TaskObservable();
    clearInputObservable.subscribe(() => setTaskObject({}))

    const handleTaskTitleChange = (value: string) => {
        setTaskObject({
            ...taskObject,
            title: value
        });
    }
    
    const handleTaskDescriptionChange = (description:string) => {
        setTaskObject({
            ...taskObject,
            description: description
        });
    }
    
    const handelTaskPriorityChange = (priority: string) => {
        setTaskObject({
            ...taskObject,
            priorityLv: parseInt(priority)
        });
    }

    const handleTimeLIneSelection = (timeLine: any) => {
        setTaskObject({
            ...taskObject,
            startDate: timeLine.startDay?.format('YYYY-MM-DD'),
            finishDate: timeLine.finishDay?.format('YYYY-MM-DD'),
        });
    }
    
    const sendTask = (newTask: Task) => {
        addTask(newTask);
        clearInputObservable.next();
    } 

    const createTask = () => {
        const newTask = {
            ...taskObject,
            priorityLv: taskObject.priorityLv ? taskObject.priorityLv : 3,
            index: Number.MAX_SAFE_INTEGER,
            isComplete: false,
            date: new Date(),
        }

        thisIsTask(newTask)
        ? sendTask(newTask as Task)
        : alert("please complete the Task"); // [ ] make handle message component
    }

    return (
        <>
            <Box sx={styles.panelSize}>
                <ContainerComponent responsibility={actionColor}>
                    <Box sx={styles.panelInputs}>
                        <Typography sx={styles.panelTitle}> Add Task Panel </Typography>
                        <EntryTaskDescriptionTitle clearInputObservable={clearInputObservable} onChangeTitle={handleTaskTitleChange} onChangeDescription={handleTaskDescriptionChange} responsibility={actionColor} />
                        <PrioritySelector clearInputObservable={clearInputObservable} onChange={handelTaskPriorityChange} responsibility={actionColor} />
                        <SetTimeLineComponent clearInputObservable={clearInputObservable} colorResponsibility={actionColor} emitTimeLine={handleTimeLIneSelection}/>
                        <Button
                            sx={styles.btnCreateTask}
                            variant="contained" 
                            onClick={createTask}
                        > Create Task </Button>
                    </Box>
                </ContainerComponent>
            </Box>
        </>
    )
}