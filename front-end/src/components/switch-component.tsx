import { styled, Switch, useTheme } from "@mui/material"
import { ResponsibilityColorType } from "../definitions/redux-definitions";

export const useSwitchConstructor = (responsibility: ResponsibilityColorType) => { // [ ] make color responsibility a type
    const appTheme = useTheme();
    
    // [ ] send in the selector the theme color code and remove this object 
    const componentColors = {
        main:   ((appTheme.palette as any)[responsibility.main.split(".")[0]].main),
        dark: ((appTheme.palette as any)[responsibility.dark.split(".")[0]].dark),
        light: ((appTheme.palette as any)[responsibility.border.split(".")[0]].border),
    };

    const themeConfig = (theme: any) => ({
        width: 60,
        height: 32,
        padding: 7,
        '& .MuiSwitch-switchBase': {
            margin: 1,
            padding: 0,
            transform: 'translateX(6px)',
            '&.Mui-checked': {
                color: "#fff",
                transform: 'translateX(22px)',
                '& .MuiSwitch-thumb': {
                    backgroundColor: "#ffffff",
                },
                '& .MuiSwitch-thumb:before': {
                   backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 100" fill="${encodeURIComponent( componentColors.dark /* "#4a148c"*/ ) }" enable-background="new 0 0 100 100" xml:space="preserve"><path d="M92.3,45.6c-1.4-11-7-21-15.7-27.9c-1.1-0.9-2.3-1.7-3.5-2.5l-1.3-0.8l-0.1,0c-6.5-3.9-14-6-21.7-6  C26.6,8.5,7.5,27.6,7.5,51s19.1,42.5,42.5,42.5c7.7,0,15.1-2.1,21.7-6l0.1,0l1.3-0.8C85.3,78.9,92.6,65.5,92.6,51  C92.6,49.2,92.5,47.4,92.3,45.6z M61.2,85.8c-3.6,1.1-7.3,1.7-11.1,1.7c-20.1,0-36.5-16.4-36.5-36.5c0-20.1,16.4-36.5,36.5-36.5  c3.8,0,7.6,0.6,11.1,1.7c1.4,0.5,1.7,2.4,0.5,3.3C51.6,26.6,45.2,38.3,45.2,51c0,12.7,6.3,24.4,16.5,31.5  C62.9,83.4,62.6,85.3,61.2,85.8z M68.9,51.8l-2.4,2.4c-0.2,0.2-0.3,0.5-0.3,0.8l0.6,3.3c0.1,0.7-0.6,1.3-1.3,0.9l-3-1.6  c-0.3-0.1-0.6-0.1-0.8,0l-3,1.6c-0.7,0.3-1.4-0.2-1.3-0.9l0.6-3.3c0-0.3,0-0.6-0.3-0.8l-2.4-2.4c-0.5-0.5-0.2-1.4,0.5-1.5l3.3-0.5  c0.3,0,0.5-0.2,0.7-0.5l1.5-3c0.3-0.7,1.3-0.7,1.6,0l1.5,3c0.1,0.3,0.4,0.4,0.7,0.5l3.3,0.5C69.1,50.4,69.4,51.3,68.9,51.8z   M78.6,67.3L76.9,69c0,0-0.1,0.1-0.1,0.2l0.4,2.4c0,0.2-0.1,0.3-0.3,0.2l-2.2-1.1c-0.1,0-0.1,0-0.2,0l-2.2,1.1  c-0.1,0.1-0.3,0-0.3-0.2l0.4-2.4c0-0.1,0-0.1-0.1-0.2l-1.7-1.7c-0.1-0.1-0.1-0.3,0.1-0.3l2.4-0.3c0.1,0,0.1,0,0.1-0.1l1.1-2.2  c0.1-0.1,0.3-0.1,0.3,0l1.1,2.2c0,0.1,0.1,0.1,0.1,0.1l2.4,0.3C78.7,67,78.7,67.2,78.6,67.3z M79.2,35l-1.7,1.7c0,0-0.1,0.1-0.1,0.2  l0.4,2.4c0,0.2-0.1,0.3-0.3,0.2l-2.2-1.1c-0.1,0-0.1,0-0.2,0l-2.2,1.1c-0.1,0.1-0.3,0-0.3-0.2l0.4-2.4c0-0.1,0-0.1-0.1-0.2L71.4,35  c-0.1-0.1-0.1-0.3,0.1-0.3l2.4-0.4c0.1,0,0.1,0,0.1-0.1l1.1-2.2c0.1-0.1,0.3-0.1,0.3,0l1.1,2.2c0,0.1,0.1,0.1,0.1,0.1l2.4,0.4  C79.3,34.7,79.3,34.9,79.2,35z"/></svg>')`,
                },
                '& + .MuiSwitch-track': {
                    opacity: 1,
                    backgroundColor: componentColors.light,
                },
            },
        },
        '& .MuiSwitch-thumb': {
            backgroundColor: componentColors.dark,
            width: 32,
            height: 32,
            '&::before': {
                content: "''",
                position: 'absolute',
                width: '100%',
                height: '100%',
                left: 0,
                top: 0,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:serif="http://www.serif.com/" viewBox="-4 -4 40 40" fill="${encodeURIComponent( '#fff', )}" version="1.1" xml:space="preserve" style="" x="0px" y="0px" fill-rule="evenodd" clip-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2"><g><path d="M17.04,29L17.04,25.889C17.04,25.337 16.592,24.889 16.04,24.889C15.488,24.889 15.04,25.337 15.04,25.889L15.04,29C15.04,29.552 15.488,30 16.04,30C16.592,30 17.04,29.552 17.04,29ZM22.353,23.689L24.552,25.888C24.943,26.279 25.576,26.279 25.967,25.888C26.357,25.498 26.357,24.864 25.967,24.474L23.767,22.274C23.377,21.884 22.743,21.884 22.353,22.274C21.962,22.665 21.962,23.298 22.353,23.689ZM7.528,25.888L9.728,23.689C10.118,23.298 10.118,22.665 9.728,22.274C9.338,21.884 8.704,21.884 8.314,22.274L6.114,24.474C5.724,24.864 5.724,25.498 6.114,25.888C6.504,26.279 7.138,26.279 7.528,25.888ZM16.014,9C12.12,9 8.958,12.162 8.958,16.057C8.958,19.951 12.12,23.113 16.014,23.113C19.909,23.113 23.071,19.951 23.071,16.057C23.071,12.162 19.909,9 16.014,9ZM25.967,16.962L29.078,16.962C29.63,16.962 30.078,16.514 30.078,15.962C30.078,15.41 29.63,14.962 29.078,14.962L25.967,14.962C25.415,14.962 24.967,15.41 24.967,15.962C24.967,16.514 25.415,16.962 25.967,16.962ZM3.002,16.962L6.113,16.962C6.665,16.962 7.113,16.514 7.113,15.962C7.113,15.41 6.665,14.962 6.113,14.962L3.002,14.962C2.45,14.962 2.002,15.41 2.002,15.962C2.002,16.514 2.45,16.962 3.002,16.962ZM6.114,7.45L8.314,9.65C8.704,10.04 9.338,10.04 9.728,9.65C10.118,9.259 10.118,8.626 9.728,8.235L7.528,6.036C7.138,5.645 6.504,5.645 6.114,6.036C5.724,6.426 5.724,7.06 6.114,7.45ZM23.767,9.65L25.967,7.45C26.357,7.06 26.357,6.426 25.967,6.036C25.576,5.645 24.943,5.645 24.552,6.036L22.353,8.235C21.962,8.626 21.962,9.259 22.353,9.65C22.743,10.04 23.377,10.04 23.767,9.65ZM17.04,6.035L17.04,2.924C17.04,2.372 16.592,1.924 16.04,1.924C15.488,1.924 15.04,2.372 15.04,2.924L15.04,6.035C15.04,6.587 15.488,7.035 16.04,7.035C16.592,7.035 17.04,6.587 17.04,6.035Z"/></g></svg>')`,
            },
        },
        '& .MuiSwitch-track': {
            opacity: 1,
            backgroundColor: componentColors.light,
            borderRadius: 20 / 2,
        },
    });

    const customSwitch = styled(Switch)(({ theme }) => ({...themeConfig(theme)}));
    
    return {
        customSwitch
    }
}