import { Box, Typography } from "@mui/material";
import { useColorDefault } from "../../store/selectors/themeSelector";
import { appBorder, displayCenter, MAX_APPLICATION_WIDTH } from "../../theme/style";
import { Styles } from "../../definitions/pages-definitions";
import { ContainerComponent } from "../../components/container-component";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from 'uuid';
import { DayList } from "./components/day-list";
import { useTaskOrder } from "../../hooks/useOrder";

/**
 * WeekList will have the order function of the hook and each list will have the get day-tasks-list function
 *  [ ] check this todos 
 *  [x] make component for all this 
 *  [ ] make hook for updating the state
 *      1 reorder list 
 *      2 distribute day-tasks
 *  [ ] memorialize the list of the days that dont change, for better performance 
 *  [ ] continue with the next step
 */

export const WeekList = () => {

    const { orderWeek } = useTaskOrder();

    const styles: Styles = {
        main: {
            flexGrow: 1,
            display: "center",
            overflowX: "scroll",
            // ...appBorder(defaultColor),
        }
    }

    return (
        <DragDropContext onDragEnd={console.log}>
            <Box sx={styles.main}>

                {orderWeek().map(day => <DayList day={day} />)}
            
            </Box>
        </DragDropContext>
    )
}

