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
        height: "515px",
        width: "325px",
        boxSizing: "border-box",
    },
    panelTitle: {
        marginBottom: "15px",
        fontSize: "1em",
        width: "100%",
        letterSpacing: "1px",
        wordSpacing: "3px",
        textTransform:"uppercase",
        color: color.dark,
        ...displayCenter
    },
    panelInputs: {
        height:"100%", 
        overflowY: "scroll"
    },
    btnCreateTask: {
        width:"100%",
        backgroundColor: color.main,
        marginTop: "10px",
        marginBottom: "5px",
        borderRadius: "6px"
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
            startDate: timeLine.startDay,
            finishDate: timeLine.finishDay,
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
            isComplete: false,
            date: new Date(),
        }

        thisIsTask(newTask)
        ? sendTask(newTask as Task)
        : alert("please complete the Task"); // [ ] make handle message component
    }

    return (
        <>
            <ContainerComponent responsibility={actionColor}>
                <Box sx={styles.panelSize}>
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
                </Box>
            </ContainerComponent>
        </>
    )
}