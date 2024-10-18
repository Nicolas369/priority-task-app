import { Droppable } from "react-beautiful-dnd";
import { Typography } from "@mui/material";
import { displayCenter } from "../../../theme/style";
import { Styles } from "../../../definitions/pages-definitions";
import { TaskItem } from "./task-item";
import { useColorDefault } from "../../../store/selectors/themeSelector";
import { Task } from "../../../definitions/redux-definitions";
import { DayColumn } from "../../../definitions/task-order-definition";
import { useTaskOrder } from "../../../hooks/useOrder";

const styles: Styles = {
    column: {
        height: "100%",
        minHeight: "250px",
        display: "flex",
        flexDirection: "column",
        overflowY: "scroll",
        maxWidth: "250px",
        minWidth: "250px",
        marginRight: "10px",
    },
    columnTitle: { ...displayCenter, marginBottom: "15px" },
}

export const DayList = ({ day }: { day: DayColumn }) => {
    const defaultColor = useColorDefault(); // [ ] this came from the hook with the now highlight
    const { currentWeekDay } = useTaskOrder();

    const taskList:Task[] = currentWeekDay[parseInt(day.id)].tasks!;

    const DroppableArea =  ({children}: any) => (
        <Droppable droppableId={day.id}>
            {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps} style={styles.column}>
                    {children}
                    {
                        taskList
                        .sort( (a: Task, b: Task) => a.index! - b.index! )
                        .map( (t: any, i: number) => 
                            <TaskItem key={`item: ${i}`} task={t} index={i} responsibility={defaultColor}/> 
                        )
                    }
                    {provided.placeholder}
                </div>
            )}
        </Droppable> 
    );

    return (
        <>
            <DroppableArea>
                <Typography sx={styles.columnTitle}>{day.name}</Typography>
                
            </DroppableArea>
        </>
    );
};


