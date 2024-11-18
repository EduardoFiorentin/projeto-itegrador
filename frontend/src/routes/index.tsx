import { useEffect } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { useMenuContext } from "../shared/contexts/MenuContext"
import { ChangePassword, LandingPage, Login, RecoverCode, Schedules } from "../pages"
import { Home } from "../pages/home/Home"


export const Router = () => {

    const {setMenuOptions, isMenuOpen, toggleMenuOpen} = useMenuContext()

    useEffect(() => {

        const menu_options_1 = [
            {label: "Inicio", icon: "home", path: "/inicio"},
            {label: "Horários", icon: "star", path: "/horarios"},
            {label: "Alunos", icon: "star", path: "/alunos"},
            {label: "Aulas", icon: "star", path: "/aulas"},
            {label: "Solicitações", icon: "star", path: "/solicitacoes"},
            {label: "Planos", icon: "star", path: "/planos"},
        ] // SECRETÁRIA

        const menu_options_2 = [
            {label: "Inicio", icon: "home", path: "/inicio"},
            {label: "Horários", icon: "star", path: "/horarios"},
            {label: "Aulas", icon: "star", path: "/aulas"},
            {label: "Solicitações", icon: "star", path: "/agendamentos"},
        ] // PROFESSOR 
        
        const menu_options_3 = [
            {label: "Inicio", icon: "home", path: "/inicio"},
            {label: "Horários", icon: "star", path: "/horarios"},
            {label: "Minhas Solicitações", icon: "star", path: "star"},
            {label: "Meu Plano", icon: "star", path: "star"},
            {label: "Aulas", icon: "star", path: "star"},
        ] // ALUNOS

        setMenuOptions (menu_options_2)
    }, [])

    return (
        <Routes>
            <Route path="/" element={<LandingPage/>}/>
            <Route path="/entrar" element={<Login/>}/>
            <Route path="/recuperacao" element={<RecoverCode/>}/>
            <Route path="/trocar-senha" element={<ChangePassword/>}/>

            {/* Geral */}
            <Route path="/inicio" element={<Home/>}/>
            <Route path="/horarios" element={<Schedules/>}/>
            <Route path="/aulas" element={<Home/>}/>
            <Route path="/agendamentos" element={<Home/>}/>

            {/* Secretária */}
            <Route path="/alunos" element={<Home/>}/>
            <Route path="/agendamentos" element={<Home/>}/>


            {/* Rota de direcionamento */}
            {/* <Route path="*" element={<Navigate to="/"/>} /> */}
        </Routes>
    )
}