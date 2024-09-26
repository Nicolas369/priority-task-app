import { useLocalState } from "../hooks/useLocalState";
import { ActionButtonComponent } from "./action-button";
import { Styles, TaskItemInterface } from "../definitions/pages-definitions";

const styles: Styles = {
    container: {
        width: "450px",
        height: "50px",
        padding:"5px"
    },
    item: {
        width: "100%",
        height: "100%",
        border: "solid 1px #ffffff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0px 20px",
        boxSizing: "border-box",
        backgroundColor: "blueviolet",
        color:"#ffffff"
    },
    itemComplete: {
        width: "100%",
        height: "100%",
        border: "solid 1px #ffffff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0px 20px",
        boxSizing: "border-box",
        backgroundColor: "#ffffff",
        opacity: 0.5,
        color: "blueviolet"
    },
    title: {
        width: "50%",
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
    }
}

export const LongCardTaskItemComponent = ({ task }: TaskItemInterface) => {
    const { selectTask } = useLocalState();

    return (
        <div style={styles.container}>
            <div style={task.isComplete ? styles.itemComplete : styles.item}>
                <span>priority: {task.priorityLv}</span>
                <span style={styles.title}>{task.title}</span>
                <ActionButtonComponent action={() => selectTask(task.id!)} description="select"/> 
            </div>
        </div>
    )
}
