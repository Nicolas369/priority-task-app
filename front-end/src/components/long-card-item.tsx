import { useLocalState } from "../hooks/useLocalState";
import { ActionButtonComponent } from "./action-button";
import { Styles, TaskItemInterface } from "../definitions/pages-definitions";
import { Box, Typography, useColorScheme } from "@mui/material";
import { appBorder, COLORS, displayCenter } from "../theme/style";

const styles: Styles = {
    container: {
        width: "450px",
        height: "75px",
        padding:"5px",
    },
    item: {
        width: "100%",
        height: "100%",
        padding: "0px 20px",
        boxSizing: "border-box",
        ...displayCenter,
        justifyContent: "space-between",
        ...appBorder(COLORS.DEFAULT),
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
    const { mode }= useColorScheme();

    const item = {
        incomplete: {
            backgroundColor: COLORS.BACKGROUND.main,
        },
        complete: {
            backgroundColor: mode === "dark" ? COLORS.BACKGROUND.light : COLORS.BACKGROUND.secondary,
        },
    }

    return (
        <Box sx={styles.container}>
            <Box sx={{...styles.item, ...(task.isComplete ? item.complete : item.incomplete)}}>
                <Typography variant="body2">{task.isComplete ? "Complete" : `priority: ${task.priorityLv}`}</Typography>
                <Typography sx={styles.title} variant="body2">{task.title}</Typography>
                <ActionButtonComponent action={() => selectTask(task.id!)} description="select"/> 
            </Box>
        </Box>
    )
}
