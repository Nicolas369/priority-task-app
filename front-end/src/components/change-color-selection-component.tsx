import * as React from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import {
  Button,
  Menu,
  useTheme,
} from "@mui/material";
import {
  setColorCombination,
  setPrimaryColor,
  setSecondaryColor,
  setTertiaryColor,
} from "../store/slices/theme-slice";
import { useDispatch } from "react-redux";

export const ChangeColorSelectionComponent = () => {
  const appTheme = useTheme();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClick = (value?: number) => {
    const setColorActions = [
      setColorCombination,
      setPrimaryColor,
      setSecondaryColor,
      setTertiaryColor,
    ];

    Number.isInteger(value) && dispatch(setColorActions[value!]());
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleOpen}
        sx={{   color: "#ffffff" }}
      >
        Select Color
      </Button>
      <Menu
        onClick={() => handleClick()}
        disableScrollLock
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        MenuListProps={{
            "aria-labelledby": "basic-button",
        }}
        
      >
        <MenuItem onClick={() => handleClick(0)}>
          <Box
            sx={{
              bgcolor: appTheme.palette.primary.main,
              width: "22px",
              height: 25,
            }}
          ></Box>
          <Box
            sx={{
              bgcolor: appTheme.palette.secondary.main,
              width: "22px",
              height: 25,
            }}
          ></Box>
          <Box
            sx={{
              bgcolor: (appTheme.palette as any).tertiary.main,
              width: "22px",
              height: 25,
            }}
          ></Box>
        </MenuItem>
        <MenuItem onClick={() => handleClick(1)}>
          <Box
            sx={{
              bgcolor: appTheme.palette.primary.main,
              width: 66,
              height: 25,
            }}
          ></Box>
        </MenuItem>
        <MenuItem onClick={() => handleClick(2)}>
          <Box
            sx={{
              bgcolor: appTheme.palette.secondary.main,
              width: 66,
              height: 25,
            }}
          ></Box>
        </MenuItem>
        <MenuItem onClick={() => handleClick(3)}>
          <Box
            sx={{
              bgcolor: (appTheme.palette as any).tertiary.main,
              width: 66,
              height: 25,
            }}
          ></Box>
        </MenuItem>
      </Menu>
    </>
  );
};
