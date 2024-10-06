import { Box, styled, Switch, useColorScheme } from "@mui/material"
import { Styles } from "../../definitions/pages-definitions"
import { bgColor, displayCenter, MAX_APPLICATION_WIDTH } from "../../theme/style"
import { useColorAction, useColorUser } from "../../store/selectors/themeSelector";
import { useSwitchConstructor } from "../../components/switch-component";
import { ChangeColorSelectionComponent } from "../../components/change-color-selection-component";


export const Header = () => {
  const { mode, setMode } = useColorScheme();
  const userColor = useColorUser();

  const { customSwitch: ThemeModeSwitch } = useSwitchConstructor(userColor);

  const styles: Styles = {
    main: {
      width: "100%",
      height: "50px",
      position:"fixed",
      top: 0,
      ...bgColor(userColor),
    },
    containerHeader: {
      ...MAX_APPLICATION_WIDTH,
      width: "100%",
      height: "100%",
      ...displayCenter,
      justifyContent: "end",
    }
  }

  const handleChange = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
  }

  return (
    <>
      <Box sx={{ width: "100%", height: "50px", bgcolor: "red" }}></Box>
      <Box sx={styles.main}>
        <Box sx={styles.containerHeader}>
          <ChangeColorSelectionComponent /> 
          <ThemeModeSwitch checked={mode === "dark"} onChange={handleChange}/>
        </Box>
      </Box>
    </>
  )
}