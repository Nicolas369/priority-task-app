import { createSlice } from '@reduxjs/toolkit'
import { InitialThemeState } from '../../definitions/redux-definitions';

const initialState: InitialThemeState = {
  colors: {
    USER: {
      main: "tertiary.main",
      dark: "tertiary.dark",
      border: "tertiary.border",
      background: "tertiary.background",
    },
    ACTION: {
      main: "primary.main",
      dark: "primary.dark",
      border: "primary.border",
      background: "primary.background",
    },
    HIGHLIGHT: {
      main: "secondary.main",
      dark: "secondary.dark",
      border: "secondary.border",
      background: "secondary.background",
    },
    DEFAULT: {
      main: "primary.main",
      dark: "primary.dark",
      border: "primary.border",
      background: "primary.background",
    },
    BACKGROUND: {
      main: "background.main",
      secondary: "background.secondary",
      light: "background.light",
      default: "background.default",
    },
  }
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setColorCombination: (state) => {
      state.colors = {...initialState.colors};
    },
    setPrimaryColor: (state) => {
      const palette: any = {...state.colors};
      Object.keys(palette).forEach( responsibility => {
        if (responsibility !== "BACKGROUND") {
          palette[responsibility] =  {
            main: "primary.main",
            dark: "primary.dark",
            border: "primary.border",
            background: "primary.background",
          }
        }
      });
      
      state.colors = {...palette};
    },
    setSecondaryColor: (state) => {
      const palette: any = {...state.colors};

      Object.keys(palette).forEach( responsibility => {
          if (responsibility !== "BACKGROUND") {
              palette[responsibility] = {
                  main: "secondary.main",
                  dark: "secondary.dark",
                  border: "secondary.border",
                  background: "secondary.background",
              }
          }
      });

      state.colors = {...palette};
    },
    setTertiaryColor: (state) => {
      const palette: any = {...state.colors};

      Object.keys(palette).forEach( responsibility => {
          if (responsibility !== "BACKGROUND") {
              palette[responsibility] = {
                  main: "tertiary.main",
                  dark: "tertiary.dark",
                  border: "tertiary.border",
                  background: "tertiary.background",
              }
          }
      });

      state.colors = {...palette};
    }
  }
});

export const { 
    setColorCombination,
    setPrimaryColor,
    setSecondaryColor,
    setTertiaryColor
} = themeSlice.actions;
export default themeSlice.reducer


// [ ] setear un theme-color initil state
// [ ] setaer las 4 convinaciones posibles 
// [ ] setear crear los selectors
// [ ] modificar el file the variables con los selectors