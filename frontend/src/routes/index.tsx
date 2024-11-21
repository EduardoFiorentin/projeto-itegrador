import { useEffect } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { useMenuContext } from "../shared/contexts/MenuContext"
import { ChangePassword, LandingPage, Login, RecoverCode, Schedules, Appointment, Students } from "../pages"
import { Home } from "../pages/home/Home"


export const Router = () => {



    return (
        <Routes>
            <Route path="/" element={<LandingPage/>}/>
            <Route path="/entrar" element={<Login/>}/>
            <Route path="/recuperacao" element={<RecoverCode/>}/>
            <Route path="/trocar-senha" element={<ChangePassword/>}/>

            {/* Geral */}
            <Route path="/inicio" element={<Home/>}/>
            <Route path="/horarios" element={<Schedules/>}/>
            {/* <Route path="/aulas" element={<Home/>}/> Já substituido pelo /horarios (mostra as aulas) */}
            <Route path="/agendamento" element={<Appointment/>}/>

            {/* Secretária */}
            <Route path="/alunos" element={<Students/>}/>
            {/* <Route path="/agendamento" element={<Home/>}/> */}


            {/* Rota de direcionamento */}
            {/* <Route path="*" element={<Navigate to="/"/>} /> */}
        </Routes>
    )
}