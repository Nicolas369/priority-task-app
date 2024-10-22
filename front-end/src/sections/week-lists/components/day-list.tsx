import { Droppable } from "react-beautiful-dnd";
import { Styles } from "../../../definitions/global-definitions";
import { TaskItem } from "./task-item";
import { Task } from "../../../definitions/redux-definitions";
import { ContainerComponent } from "../../../components/container-component";
import { useColorDefault, useColorHighlight } from "../../../store/selectors/themeSelector";
import { DayListInterface } from "../../../definitions/sections-definitions";

const styles: Styles = {
    column: {
        height: "100%",
        minHeight: "250px",
        display: "flex",
        flexDirection: "column",
        overflowY: "scroll",
        maxWidth: "250px",
        minWidth: "250px"
    },
    container: {
        margin: "0px 0.5rem",
        border: "none"
    }
}

export const DayList = ({ day }: DayListInterface) => {
    const colorDefault = useColorDefault();
    const colorHighlight = useColorHighlight();

    const responsibility = day.isToday ? colorHighlight : colorDefault;
    const taskList = day.tasks

    return (
        <ContainerComponent sx={styles.container} responsibility={responsibility} header={day.name}>
            <Droppable droppableId={day.id}>
            {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps} style={styles.column}>
                    {
                        taskList
                        .sort( (a: Task, b: Task) => a.index! - b.index! )
                        .map( (t: any, i: number) => 
                            <TaskItem key={`item: ${i}`} task={t} index={i} responsibility={responsibility}/> 
                        )
                    }
                    {provided.placeholder}
                </div>
            )}
        </Droppable> 
        </ContainerComponent>    
    );
};
