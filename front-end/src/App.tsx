import { Box } from "@mui/material";
import { TaskAppMainSection } from "./sections/main-section"
import { useColorBAckground } from "./store/selectors/themeSelector";

const App = () => {
    const appBackground = useColorBAckground()
    
    return (
        <Box sx={{bgcolor: appBackground.default, color: `text.default`, width: "fit-content"}}>
            <TaskAppMainSection />
        </Box>
    )
};

export default App;