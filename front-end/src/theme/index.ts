import { createTheme, Typography } from "@mui/material";
import {
  amber,
  blue,
  purple,
  grey,
  green,
  yellow,
  red,
  common,
} from "@mui/material/colors";

const colorSelection: any = {
  primary: {
    main: blue[500],
    dark: blue[700],
    border: blue[300],
    background: blue[900],
  },
  secondary: {
    main: amber[500],
    dark: amber[700],
    border: amber[300],
    background: amber[900],
  },
  tertiary: {
    main: purple[500],
    dark: purple[700],
    border: purple[300],
    background: purple[900],
  },
};

const colorMessageSelection: any = {
  message: {
    success: green[600],
    successBorder: green[300],
    warning: yellow[500],
    warningBorder: yellow[300],
    error: red[600],
    errorBorder: red[300],
  },
};

export const priorityTaskAppTheme = createTheme({
  colorSchemes: {
    light: {
      palette: {
        ...colorSelection,
        ...colorMessageSelection,
        background: {
          main: common.white,
          secondary: grey[400],
          light: grey[50],
          default: grey[100],
        },
        text: {
          default: "#00000"
        },
      },
    },
    dark: {
      palette: {
        ...colorSelection,
        ...colorMessageSelection,
        background: {
          main: grey[900],
          secondary: grey[700],
          light: grey[500],
        },
        text: {
          default: "#ffffff"
        }
      },
    },
  },
} as any);