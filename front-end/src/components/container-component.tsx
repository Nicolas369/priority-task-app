import { Box } from "@mui/material"
import { appBorder, displayCenter, shadow } from "../theme/style"
import { useColorBAckground } from "../store/selectors/themeSelector"


export const ContainerComponent = ({ children, responsibility }: any) => {
    const bgColor = useColorBAckground();

    const mainStyle = {
        width: "fit-content", 
        height: "fit-content",
        padding: "10px 15px",
        // overflowY: "scroll",
        bgcolor: bgColor.main,
        ...displayCenter,
        justifyContent: "start",
        flexDirection: "column",
        ...appBorder(responsibility),
        ...shadow,
    }

    return ( 
        <>
            <Box sx={mainStyle}>{ children }</Box>
        </>
    )
}