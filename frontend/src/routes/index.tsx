import { useEffect } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { useMenuContext } from "../shared/contexts/MenuContext"
import { ChangePassword, Login, RecoverCode } from "../pages"


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
            <Route path="/login" element={<Login/>}/>
            <Route path="/recover" element={<RecoverCode/>}/>
            <Route path="/change-pass" element={<ChangePassword/>}/>

            {/* Rota de direcionamento */}
            <Route path="*" element={<Navigate to="/home"/>} />
        </Routes>
    )
}