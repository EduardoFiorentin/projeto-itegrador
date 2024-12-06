import { Box } from "@mui/material";
import { createContext, Dispatch, SetStateAction, useCallback, useContext, useState } from "react";


interface IMenuContextData {
    isMenuOpen: boolean,
    isMenuHidden: boolean,
    menuOptions: IMenuOptions[],
    toggleMenuOpen: () => void,
    setIsMenuHidden: Dispatch<SetStateAction<boolean>>,
    setMenuOptions: (newMenuOptions: IMenuOptions[]) => void
}

interface IMenuOptions {
    icon: string;
    path: string;
    label: string;
}

const MenuContext = createContext({} as IMenuContextData)

export const useMenuContext = () => {
    return useContext(MenuContext)
}

export const MenuProvider: React.FC<{children: React.ReactNode}> = ({children}) => {

    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
    const [isMenuHidden, setIsMenuHidden] = useState<boolean>(false)
    const [menuOptions, setMenuOptions] = useState<IMenuOptions[]>([])

    // useCallback e useMemo - evita que a função/valor seja recalculada a cada renderização 

    const toggleMenuOpen = useCallback(() => {
        setIsMenuOpen(oldMenuOpen => !oldMenuOpen)
    }, [])

    const handleSetMenuOptions = useCallback((newMenuOptions: IMenuOptions[]) => {
        setMenuOptions(newMenuOptions)
    }, [])

    return (
        <MenuContext.Provider value={
                {
                    isMenuOpen: isMenuOpen, 
                    isMenuHidden: isMenuHidden, 
                    menuOptions: menuOptions, 
                    toggleMenuOpen: toggleMenuOpen, 
                    setMenuOptions: handleSetMenuOptions, 
                    setIsMenuHidden: setIsMenuHidden
                }
            }>
            <Box 
            >
                {children}
            </Box>
        </MenuContext.Provider>
    )
}