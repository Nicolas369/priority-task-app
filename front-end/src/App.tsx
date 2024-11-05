import { Box } from "@mui/material";
import { TaskAppMainSection } from "./sections/main-section"
import { useColorBAckground } from "./store/selectors/themeSelector";
import { displayCenter } from "./theme/style";

const App = () => {
    const appBackground = useColorBAckground();

    const globalStyles = {
        width: "fit-content",
        color: `text.default`,
        bgcolor: appBackground.default,
        ...displayCenter
    }
    
    return (
        <Box sx={globalStyles}>
            <TaskAppMainSection />
        </Box>
    )
};

export default App;