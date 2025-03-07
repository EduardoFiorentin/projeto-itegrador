import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { DarkTheme, LightTheme } from "../theme";
import { Box, ThemeProvider } from "@mui/material";
import { IUser } from "../Interfaces/IUser";


interface IUserContextData {
    user: IUser|null,
    setUser: React.Dispatch<React.SetStateAction<IUser | null>>
}

const UserContext = createContext({} as IUserContextData)

export const useUserInfoContext = () => {
    return useContext(UserContext)
}

export const UserInfoProvider: React.FC<{children: React.ReactNode}> = ({children}) => {

    const [userInfo, setUserInfo] = useState<IUser|null>(null)

    return (
            <UserContext.Provider value={{user: userInfo, setUser: setUserInfo}}>
                <Box width="100%" height="100%">
                    {children}
                </Box>
            </UserContext.Provider>
    )
}