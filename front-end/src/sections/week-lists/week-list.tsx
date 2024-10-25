import { Box } from "@mui/material";
import { Styles } from "../../definitions/global-definitions";
import { DragDropContext } from "react-beautiful-dnd";
import { DayList } from "./components/day-list";
import { useOrder } from "../../hooks/useOrder";
import { useScroll } from "../../hooks/useScroll";

export const WeekList = () => {
    const { daysWeekOrder, currentWeek, orderTaskInTimeLine } = useOrder();
    const {
        scrollElement, 
        scrollElementLeft, 
        scrollElementRight, 
        onDragActionStart, 
        onDragActionEnd 
    } = useScroll();

    const styles: Styles = {
        main: {
            display: "flex",
            paddingBottom: "10px",
            boxSizing:"border-box",
            overflowX: "scroll"
        },
        scrollGuideLeft: {
            zIndex: 100,
            height: "100%",
            float: "left",
            position: "fixed"
        },
        scrollGuideRight: {
            zIndex: 100,
            height: "100%",
            position: "fixed",
            right: 0
        }
    }

    const onDragEnd = (result: any) => {
        orderTaskInTimeLine(result);
        onDragActionEnd(); 
    }

    if (!scrollElement.current) {
        scrollElement.current = window as any;
    }

    return (
        <Box style={styles.main}>
            
            <Box ref={scrollElementLeft}  style={styles.scrollGuideLeft} />

            <DragDropContext onDragStart={onDragActionStart}  onDragEnd={onDragEnd}>
                {
                    daysWeekOrder.map((day, i:number) => {
                        const listDayIndex = parseInt(day.id);
                        const taskList = currentWeek[listDayIndex].tasks
                        return(
                            <DayList key={`list: ${i}`} day={{ ...day, tasks: taskList }} />
                        )
                    })
                }
            </DragDropContext>

            <Box ref={scrollElementRight}  style={styles.scrollGuideRight} />
        </Box>
    )
}
