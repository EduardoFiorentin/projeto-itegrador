import { useEffect } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { useMenuContext } from "../shared/contexts/MenuContext"
import { ChangePassword, LandingPage, Login, RecoverCode, Schedules, Appointment, Students } from "../pages"
import { Home } from "../pages/home/Home"
import { HandleRequestClasses } from "../pages/handleRequestClasses/HandleRequestClasses"
import { useUserInfoContext } from "../shared/contexts"
import { Plans } from "../pages/plans/Plans"


export const Router = () => {

    const {setMenuOptions } = useMenuContext()

    const {user} = useUserInfoContext()


    useEffect(() => {
        const menu_options_1 = [
            {label: "Inicio", icon: "home", path: "/inicio"},
            {label: "Horários", icon: "access_time", path: "/horarios"},
            {label: "Alunos", icon: "book", path: "/alunos"},
            {label: "Solicitações", icon: "event", path: "/solicitacoes"},
            {label: "Planos", icon: "view_list", path: "/planos"},                // novo plano / contratação de planos
        ] // SECRETÁRIA
      
        const menu_options_2 = [
            {label: "Inicio", icon: "home", path: "/inicio"},
            {label: "Horários", icon: "access_time", path: "/horarios"},
            {label: "Solicitações", icon: "event", path: "/solicitacoes"},
        ] // PROFESSOR 
        
        const menu_options_3 = [
            // {label: "Inicio", icon: "home", path: "/inicio"},
            {label: "Horários", icon: "star", path: "/horarios"},
            {label: "Agendamento", icon: "event", path: "/agendamento"},
            {label: "Minhas solicitações", icon: "event", path: "/solicitacoes"},
        ] // ALUNOS
      
        if (user?.role === 1) {
            setMenuOptions(menu_options_1)
        }
        else if (user?.role === 2) {
            setMenuOptions(menu_options_2)
        }
        else if (user?.role === 3) {
            setMenuOptions(menu_options_3)
        }

    }, [user])

    return (
        <Routes>
            <Route path="/" element={<LandingPage/>}/>
            <Route path="/entrar" element={<Login/>}/>
            <Route path="/recuperacao" element={<RecoverCode/>}/>
            <Route path="/trocar-senha" element={<ChangePassword/>}/>

            {/* Geral */}
            <Route path="/inicio" element={<Home/>}/>
            <Route path="/horarios" element={<Schedules/>}/>
            <Route path="/agendamento" element={<Appointment/>}/>

            {/* Secretária */}
            <Route path="/alunos" element={<Students/>}/>
            <Route path="/solicitacoes" element={<HandleRequestClasses/>}/>
            <Route path="/planos" element={<Plans/>}/>


            {/* Rota de direcionamento */}
            <Route path="*" element={<Navigate to="/horario"/>} />
        </Routes>
    )
}