import { useEffect } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { useMenuContext } from "../shared/contexts/MenuContext"
import { ChangePassword, LandingPage, Login, RecoverCode } from "../pages"
import { Home } from "../pages/home/Home"


export const Router = () => {

    const {setMenuOptions, isMenuOpen, toggleMenuOpen} = useMenuContext()

    useEffect(() => {

        const menu_options_1 = [
            {label: "Inicio", icon: "home", path: "pagina-inicial"},
            {label: "Horários", icon: "star", path: "star"},
            {label: "Alunos", icon: "star", path: "star"},
            {label: "Aulas", icon: "star", path: "star"},
            {label: "Solicitações", icon: "star", path: "star"},
        ] // SECRETÁRIA

        const menu_options_2 = [
            {label: "Inicio", icon: "home", path: "pagina-inicial"},
            {label: "Horários", icon: "star", path: "star"},
            {label: "Aulas", icon: "star", path: "star"},
            {label: "Solicitações", icon: "star", path: "star"},
        ] // PROFESSOR 

        const menu_options_3 = [
            {label: "Inicio", icon: "home", path: "pagina-inicial"},
            {label: "Agendamentos", icon: "star", path: "star"},
            {label: "Solicitações", icon: "star", path: "star"},
            {label: "Meu Plano", icon: "star", path: "star"},
            {label: "Aulas", icon: "star", path: "star"},
        ] // ALUNOS

        setMenuOptions (menu_options_2)
    }, [])

    return (
        <Routes>
            <Route path="/" element={<LandingPage/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/recover" element={<RecoverCode/>}/>
            <Route path="/change-pass" element={<ChangePassword/>}/>

            {/* Geral */}
            <Route path="/home" element={<Home/>}/>
            <Route path="/time" element={<Home/>}/>
            <Route path="/students" element={<Home/>}/>
            <Route path="/classes" element={<Home/>}/>
            <Route path="/requests" element={<Home/>}/>




            {/* Rota de direcionamento */}
            <Route path="*" element={<Navigate to="/"/>} />
        </Routes>
    )
}