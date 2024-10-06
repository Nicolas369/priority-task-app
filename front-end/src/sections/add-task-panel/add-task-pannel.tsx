/**
 * NOTE: 
 *  This is a section is a large and important global-part of (what i am doing)
 *  the application. Think it as a section the most big part of the 
 *  component-pack 
 */

import { Box, Typography } from "@mui/material";
import { useHttp } from "../../hooks/useHttp";
import { useColorAction } from "../../store/selectors/themeSelector";
import { InputFieldComponent } from "../../components/input-field-component";
import { ContainerComponent } from "../../components/container-component";
import { PrioritySelector } from "./section-components/priority-selector";
import { Styles } from "../../definitions/pages-definitions";
import { displayCenter } from "../../theme/style";
import { SetTimeLineComponent } from "./section-components/set-time-line-component";

const styles: Styles = {
    // [ ] set a right size for the panel 
    // note: make it responsive with the screen.
    panelSize: {
        height: "515px",
        width: "325px",
        boxSizing: "border-box",
    },
    panelTitle: {
        marginBottom: "15px",
        fontSize: "1.5em",
        width: "100%",
        ...displayCenter
    },
    panelInputs: {
        height:"100%", 
        overflowY: "scroll"
    }
}

export const AddTaskPanel = () => {
    const { addTask } = useHttp();
    const actionColor = useColorAction();

    const handleTaskTitleChange = (value: string) => {
        console.log("taskTitle: ",value);
    }
    
    const handleTaskDescriptionChange = (e:string) => {
        console.log("taskDescription: ", e);
    }
    
    const handelTaskPriorityChange = (priority: string) => {
        console.log("taskPriority: ",parseInt(priority));
    }

    const handleTimeLIneSelection = (timeLine: any) => {
        console.log("timeline: ", timeLine);
    }

    // [ ] make the task object 

    return (
        <>
            <ContainerComponent responsibility={actionColor}>
                <Box sx={styles.panelSize}>
                    <Box sx={styles.panelInputs}>
                        <Typography sx={styles.panelTitle}> Add Task Panel </Typography>
                        <InputFieldComponent label="Task Title" onChange={handleTaskTitleChange} colorResponsibility={actionColor}/>
                        <InputFieldComponent isTextArea label="Task Description" onChange={handleTaskDescriptionChange} colorResponsibility={actionColor}/> 
                        <PrioritySelector onChange={handelTaskPriorityChange} responsibility={actionColor} />
                        <SetTimeLineComponent colorResponsibility={actionColor} emitTimeLine={handleTimeLIneSelection}/>
                    </Box>
                </Box>
            </ContainerComponent>
        </>
    )
}