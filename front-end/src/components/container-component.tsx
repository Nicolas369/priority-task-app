import { Box, Typography } from "@mui/material"
import { appBorder, displayCenter, shadow } from "../theme/style"
import { useColorBAckground } from "../store/selectors/themeSelector"
import { ContainerInterface } from "../definitions/component-definitions";

export const ContainerComponent = (props: ContainerInterface) => {
    const { children, responsibility, header, sx } = props

    const bgColor = useColorBAckground();

    const styles = {
        main: {
            height: "100%",
            width: "100%",
            boxSizing: "border-box",
            bgcolor: bgColor.main,
            flexDirection: "column",
            overflow: "hidden",
            ...displayCenter,
            ...appBorder(responsibility),
            ...shadow,
            ...sx,
        },
        childrenContainer: {
            ...displayCenter,
            boxSizing: "border-box",
            overflow: "scroll",
            padding: "10px",
            height: "100%",
            width: "100%",
        },
        header: {
            backgroundColor: responsibility?.dark,
            color: "#ffffff",
            width: "100%",
            ...displayCenter,
            fontSize: "1em",
            letterSpacing: "1px",
        }
    }

    return (
        <Box sx={styles.main}>
            { header && <Typography sx={styles.header}>{header}</Typography> }
            <Box sx={styles.childrenContainer}>
                { children }
            </Box>
        </Box>
    );
}