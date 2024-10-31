import {createTheme} from "@mui/material"
import { cyan, yellow } from "@mui/material/colors"

export const LightTheme = createTheme({
    palette: {
        primary: {
            main: "#1DA1F2",      
            dark: "#006DBF",
            light: "#E8F4FC",
            contrastText: "#ffffff",  // cor que dá contraste com a main para textos,
        }, 
        secondary: {
            main: cyan[700],
            dark: cyan[800],
            light: cyan[500],
            contrastText: "#ffffff"  // cor que dá contraste com a main para textos
        }, 
        background: {
            default: "#ffffff",      // cor de fundo 
            paper: "#f7f6f3"         // cor de dentro de cards
        }
    },
    typography: {
        allVariants: {
            color: "#1F1A24"
        }
    },
    
})