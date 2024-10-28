import { Box } from "@mui/material";
import { Styles } from "../../definitions/global-definitions";
import { DragDropContext } from "react-beautiful-dnd";
import { DayList } from "./components/day-list";
import { useOrder } from "../../hooks/useOrder";

export const WeekList = () => {
    const { daysWeekOrder, currentWeek, orderTaskInTimeLine } = useOrder();

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
    }

    return (
        <Box style={styles.main}>
            <DragDropContext onDragEnd={onDragEnd}>
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
        </Box>
    )
}
