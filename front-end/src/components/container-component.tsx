import { Box } from "@mui/material"
import { appBorder, displayCenter, shadow } from "../theme/style"
import { useColorBAckground } from "../store/selectors/themeSelector"


export const ContainerComponent = ({ children, responsibility, sx }: any) => {
    const bgColor = useColorBAckground();

    const mainStyle = {
        height: "100%",
        width: "100%",
        padding: "10px",
        boxSizing: "border-box",
        bgcolor: bgColor.main,
        ...displayCenter,
        ...appBorder(responsibility),
        ...shadow,
        ...sx,
    }

    return ( 
        <>
            <Box sx={mainStyle}>{ children }</Box>
        </>
    )
}