import { useEffect } from "react";
import { useHttp } from "../hooks/useHttp";
import { Header } from "./header/Header";
import { Box } from "@mui/material";
import { displayCenter, MAX_APPLICATION_WIDTH } from "../theme/style";
import { useColorBAckground } from "../store/selectors/themeSelector";
import { WeekList } from "./week-lists/week-list";
import { AddTaskPanel } from "./add-task-panel/add-task-panel";

const makeStyles = (color: any) => ({
  main: {
    width: "100%",
    height: "100vh",
    margin: "0px",
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
  },
  contentApp: {
    width: "100%",
    height: "100%",
    display: "flex",
    padding: "9vh 10px 0px 0px",
    color: `text.default`,
    boxSizing: "border-box",
  },
  containerApp: {
    ...MAX_APPLICATION_WIDTH,
    ...displayCenter,
  },
  taskList: {
    ...displayCenter,
    flexDirection: "column",
  },
  addTaskPanelPosition: {
    position: "fixed",
    height: "91vh",
    display:"flex",
    paddingBottom: "1vh",
    zIndex: 100,
    boxSizing:"border-box",
    backgroundColor: color.default
  },
  addTaskPanelSize: { width: "400px", height: "100%",  zIndex: -101, },
});

export const TaskAppMainSection = () => {
  const colorBackground = useColorBAckground();

  const { getTaskList } = useHttp();

  useEffect(() => {
    getTaskList();
  }, []);

  const styles = makeStyles(colorBackground);

  return (
    <>
      <Box sx={styles.main}>
        <Header />
        <Box sx={styles.contentApp}>
          <Box sx={styles.addTaskPanelPosition}>
            <AddTaskPanel />
          </Box>
          <Box sx={styles.addTaskPanelSize} />
          <WeekList />
        </Box>
      </Box>
    </>
  );
};
