import {Button} from "@mui/material"
import { Router } from "./routes"
import { BrowserRouter, RouterProvider } from "react-router-dom"
import { MenuProvider, useMenuContext } from "./shared/contexts/MenuContext"
import { AppThemeProvider } from "./shared/contexts/ThemeContext"
import { SideMenu } from "./shared/components/side-menu/SideMenu"
import { UserInfoProvider } from "./shared/contexts"
import { SnackbarProvider } from "notistack"
import { useEffect } from "react"

function App() {


  return (
  
    <SnackbarProvider maxSnack={3} style={{fontFamily: "sans-serif"}} autoHideDuration={3000}>
    <MenuProvider>
    <AppThemeProvider>
    <BrowserRouter>
    <UserInfoProvider>


        <SideMenu>
          <Router/>
        </SideMenu>

    </UserInfoProvider>
    </BrowserRouter>
    </AppThemeProvider>
    </MenuProvider>
    </SnackbarProvider>

  )
}

export default App
