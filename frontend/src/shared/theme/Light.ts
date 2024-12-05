import {createTheme} from "@mui/material"
import { cyan, yellow, blue } from "@mui/material/colors"

export const LightTheme = createTheme({
    palette: {
        primary: {
            main: "#f2f2f2",      
            dark: "#eaeaea",
            light: "#f5f5f5",
            contrastText: "#ffffff",  // cor que dá contraste com a main para textos,
        }, 
        secondary: {
            main: blue[700],
            dark: blue[800],
            light: blue[500],
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

