import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { DarkTheme, LightTheme } from "../theme";
import { Box, ThemeProvider } from "@mui/material";


interface IThemeContextData {
    themeName: 'light' | 'dark',
    toggleTheme: () => void
}

const ThemeContext = createContext({} as IThemeContextData)

export const useAppThemeContext = () => {
    return useContext(ThemeContext)
}

export const AppThemeProvider: React.FC<{children: React.ReactNode}> = ({children}) => {

    const [themeName, setThemeName] = useState<'light'|'dark'>('light')

    // useCallback e useMemo - evita que a função/valor seja recalculada a cada renderização 

    const toggleTheme = useCallback(() => {
        setThemeName(oldTheme => oldTheme === 'light' ? 'dark' : 'light')
    }, [])

    const theme = useMemo(() => {

        if (themeName === 'light') return LightTheme
        return DarkTheme

    }, [themeName])

    return (
        <ThemeProvider theme={theme}>
            <ThemeContext.Provider value={{themeName, toggleTheme}}>
                <Box bgcolor={theme.palette.background.default}>
                    {children}
                </Box>
            </ThemeContext.Provider>
        </ThemeProvider>
    )
}