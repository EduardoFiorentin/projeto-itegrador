import {createTheme} from "@mui/material"
import { cyan, yellow } from "@mui/material/colors"

export const DarkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: yellow[700],      
            dark: yellow[800],
            light: yellow[500],
            contrastText: "#ffffff"  // cor que dá contraste com a main para textos
        }, 
        secondary: {
            main: cyan[700],
            dark: cyan[800],
            light: cyan[500],
            contrastText: "#ffffff"  // cor que dá contraste com a main para textos
        }, 
        background: {
            default: "#303134",      // cor de fundo 
            paper: "#202124"         // cor de dentro de cards
        },
        
    },
    // aplica alterações ao tema padrão do componente Typography
    typography: {
        allVariants: {
            color: "white"
        }
    }
})