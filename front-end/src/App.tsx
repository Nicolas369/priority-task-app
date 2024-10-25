import { Box } from "@mui/material";
import { TaskAppMainSection } from "./sections/main-section"
import { useColorBAckground } from "./store/selectors/themeSelector";

const App = () => {
    const appBackground = useColorBAckground();

    const globalStyles = {
        width: "fit-content",
        color: `text.default`,
        bgcolor: appBackground.default
    }
    
    return (
        <Box sx={globalStyles}>
            <TaskAppMainSection />
        </Box>
    )
};

export default App;