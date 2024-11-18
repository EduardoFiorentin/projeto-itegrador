import {createTheme} from "@mui/material"
import { cyan, yellow } from "@mui/material/colors"

// export const DarkTheme = createTheme({
//     palette: {
//         mode: "dark",
//         primary: {
//             main: yellow[700],      
//             dark: yellow[800],
//             light: "#303134",
//             contrastText: "#ffffff"  // cor que dá contraste com a main para textos
//         }, 
//         secondary: {
//             main: cyan[700],
//             dark: cyan[800],
//             light: cyan[500],
//             contrastText: "#ffffff"  // cor que dá contraste com a main para textos
//         }, 
//         background: {
//             default: "#303134",      // cor de fundo 
//             paper: "#202124"         // cor de dentro de cards
//         },
        
//     },
//     // aplica alterações ao tema padrão do componente Typography
//     typography: {
//         allVariants: {
//             color: "white"
//         }
//     }
// })

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
        }
    },
});