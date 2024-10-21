import { Box } from "@mui/material";
import { Styles } from "../../definitions/global-definitions";
import { DragDropContext } from "react-beautiful-dnd";
import { DayList } from "./components/day-list";
import { useTaskOrder } from "../../hooks/useOrder";
import { useScroll } from "../../hooks/useScroll";

export const WeekList = () => {
    const { daysWeekOrder, orderTaskInTimeLine } = useTaskOrder();
    const { scrollElement, onDragActionStart, onDragActionEnd } = useScroll();

    const styles: Styles = {
        main: {
            display: "flex",
            paddingBottom: "10px",
            boxSizing:"border-box",
        }
    }

    const onDragEnd = (result: any) => {
        orderTaskInTimeLine(result);
        onDragActionEnd();
    }

    return (
        <Box ref={scrollElement} style={styles.main}>
            <DragDropContext onDragStart={onDragActionStart} onDragEnd={onDragEnd}>
                {daysWeekOrder.map((day, i:number) => <DayList key={`list: ${i}`} day={day} />)}
            </DragDropContext>
        </Box>
    )
}
