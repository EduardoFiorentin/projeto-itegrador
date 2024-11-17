import {Button} from "@mui/material"
import { Router } from "./routes"
import { BrowserRouter, RouterProvider } from "react-router-dom"
import { MenuProvider } from "./shared/contexts/MenuContext"
import { AppThemeProvider } from "./shared/contexts/ThemeContext"
import { SideMenu } from "./shared/components/side-menu/SideMenu"
import { UserInfoProvider } from "./shared/contexts"

function App() {

  return (
  
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

  )
}

export default App
