import { Droppable } from "react-beautiful-dnd";
import { Box, Typography } from "@mui/material";
import { displayCenter } from "../../../theme/style";
import { Styles } from "../../../definitions/pages-definitions";
import { TaskItem } from "./task-item";
import { useColorDefault } from "../../../store/selectors/themeSelector";
import { useTaskOrder } from "../../../hooks/useOrder";

export const DayList = ({
    day
}: {
  day: any // {name: string, id: string},
}) => {
    const taskList = day.tasks; // [ ] change this 
    const defaultColor = useColorDefault(); // [ ] this came from the hook with the now highlight
    // const { taskList } = useTaskOrder();


    const styles: Styles = {
        column: {
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            maxWidth: "250px",
            minWidth: "250px",
            marginRight: "10px",
        },
        columnTitle: { ...displayCenter, marginBottom: "15px" },
        columnContent: { height: "100%", width: "100%" }
    }

    const DroppableArea =  ({children}: any) => (
        <Droppable droppableId={day.id}>
            {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                    {children}
                    {provided.placeholder} {/* Placeholder for spacing */}
                </div>
                )}
        </Droppable> 
    )


  return (
    <DroppableArea>
        <Box sx={styles.column} >
            <Typography sx={styles.columnTitle}>
                {day.name}
            </Typography>
            <Box sx={styles.columnContent}>
                {taskList.map( (t: any, i: number) => <TaskItem task={t} index={i} responsibility={defaultColor}/> )}
            </Box>
        </Box>
    </DroppableArea>
  );
};


