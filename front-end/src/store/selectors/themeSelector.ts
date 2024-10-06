import { useSelector } from "react-redux";
import { RootState } from "../index";

export const useColorUser = () => useSelector((store: RootState) => store.theme.colors.USER);
export const useColorAction = () => useSelector((store: RootState) => store.theme.colors.ACTION);
export const useColorDefault = () => useSelector((store: RootState) => store.theme.colors.DEFAULT);
export const useColorHighlight = () => useSelector((store: RootState) => store.theme.colors.HIGHLIGHT);
export const useColorBAckground = () => useSelector((store: RootState) => store.theme.colors.BACKGROUND);
export const useColorByResponsibility = (responsibility: string) => useSelector(
    (store: RootState) => (store.theme.colors as any)[responsibility]
);

// [ ] return the theme[variety].color in each selector 
// note: import the useTheme hook and then use it in the selectors 
// for getting the color value