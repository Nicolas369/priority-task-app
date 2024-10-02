import { Box } from "@mui/material";
import { TaskAppMainSection } from "./sections/main-section"
import { COLORS } from "./theme/style";

const App = () => (
    <Box sx={{bgcolor: COLORS.BACKGROUND.default, color: `text.default`}}>
        <TaskAppMainSection />
    </Box>
);

export default App;