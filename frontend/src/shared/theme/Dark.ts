import {createTheme} from "@mui/material"
import { cyan } from "@mui/material/colors"

export const DarkTheme = createTheme({
    palette: {
        primary: {
            main: "#2e2e2e",       
            dark: "#242424",         
            light: "#3b3b3b",        
            contrastText: "#ffffff", 
        }, 
        secondary: {
            main: cyan[400],         
            dark: cyan[500],         
            light: cyan[300],        
            contrastText: "#2e2e2e"  
        }, 
        background: {
            default: "#3c3c3c",      
            paper: "#4a4a4a"         
        }
    },
    typography: {
        allVariants: {
            color: "#f0f0f0"       
        }, 
    },
});