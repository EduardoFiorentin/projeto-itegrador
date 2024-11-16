import { useEffect } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { useMenuContext } from "../shared/contexts/MenuContext"
import { ChangePassword, LandingPage, Login, RecoverCode } from "../pages"
import { Home } from "../pages/home/Home"


export const Router = () => {

    const {setMenuOptions, isMenuOpen, toggleMenuOpen} = useMenuContext()

    useEffect(() => {

        const menu_options = [
            {label: "Pagina Incial", icon: "home", path: "pagina-inicial"},
            {label: "Cidades", icon: "star", path: "star"},
        ]

        setMenuOptions (menu_options)
    }, [])

    return (
        <Routes>
            <Route path="/" element={<LandingPage/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/recover" element={<RecoverCode/>}/>
            <Route path="/change-pass" element={<ChangePassword/>}/>
            <Route path="/home" element={<Home/>}/>

            {/* Rota de direcionamento */}
            <Route path="*" element={<Navigate to="/"/>} />
        </Routes>
    )
}