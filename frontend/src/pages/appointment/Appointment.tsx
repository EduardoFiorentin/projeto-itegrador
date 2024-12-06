import { Box, Button, Select, TextField, MenuItem } from "@mui/material"
import { BaseLayout } from "../../shared/layouts"
import { useEffect, useState } from "react"
import { api } from "../../shared/services"
import { getDayFromDate } from "../../shared/utils"
import { useSnackbar } from "notistack"
import { useUserInfoContext } from "../../shared/contexts"
import { useNavigate } from "react-router-dom"
import { isValidFutureDate } from "../../shared/utils/isValidFutureDate"

export const Appointment = () => {
    
    // 1 - personal
    // 2 - grupo
    const [classType, setClassType] = useState(1)

    const [date, setDate] = useState<string>("0")
    
    const [teachers, setTeachers] = useState<{name: string}[]>([])
    const [teacher, setTeacher] = useState("0")

    const [schedules, setSchedules] = useState<{starth: string, endh: string}[]>([])
    const [schedule, setSchedule] = useState<number>(0)

    const [modality, setModality] = useState<{name: string, code: string}[]>([])
    const [chModality, setChModality] = useState("0")
    
    const [groupClasses, setGroupClasses] = useState<{
        code: number,
        modality: string,
        teacher: string,
        day: string,
        starth: string,
        endh: string
    }[]>([])
    const [gcSelected, setGcSelected] = useState<number>(0)

    const {user} = useUserInfoContext()
    const navigate = useNavigate()

    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        getTeachers()
        getModality()
    }, [])
    useEffect(() => {
        getGroupClasses()
        getSchedules()
    }, [date])

    useEffect(() => {
        if (user == null) navigate('/entrar')
    }, [user])

    const getTeachers = async () => {
        api.get("/user/getTeachers", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("na_token")}`
            }
        })
        .then(data => {
            setTeachers(data.data)
        })
        .catch(err => {
            if (err.response.status === 401) {
                enqueueSnackbar("Erro de autenticação! Faça login novamente para continuar.", {variant: "error"})
                navigate("/entrar")
            }
            else {
                enqueueSnackbar("Não foi possível carregar os professores!", {variant: "error"})
            }
        })
    }

    const getSchedules = async () => {

        if (!isValidFutureDate(date) || getDayFromDate(date) === "Domingo") {
            setSchedules([])
            setGroupClasses([])
            return
        }

        api.post("schedules/getFreeSchedulesByDate", {date, day: getDayFromDate(date)}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("na_token")}`
            }
        })
        .then(data => {
            setSchedules(data.data)
        })
        .catch(err => {
            if (err.response.status === 401) {
                enqueueSnackbar("Erro de autenticação! Faça login novamente para continuar.", {variant: "error"})
                navigate("/entrar")
            }
            else {
                enqueueSnackbar("Não foi possível carregar os horarios!", {variant: "error"})
            }
        })
    }


    const getModality = async () => {
        api.get("modality/getall", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("na_token")}`
            }
        })
        .then(data => {
            setModality(data.data)
        })
        .catch(err => {
            if (err.response.status === 401) {
                enqueueSnackbar("Erro de autenticação! Faça login novamente para continuar.", {variant: "error"})
                navigate("/entrar")
            }
            else {
                enqueueSnackbar("Não foi possível carregar as modalidades!", {variant: "error"})
            }
        })
    }

    const getGroupClasses = async () => {
            api.get(`classes/getbyday-groupclass/${(new Date(date).getDay())+1}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("na_token")}`
                }
            })
            .then(data => {
                setGroupClasses(data.data)
            })
            .catch(err => {
                if (err.response.status === 401) {
                    enqueueSnackbar("Erro de autenticação! Faça login novamente para continuar.", {variant: "error"})
                    navigate("/entrar")
                }
                else {
                    enqueueSnackbar("Não foi possível carregar as aulas em grupo!", {variant: "error"})
                }
            })
    }

    const submitClassRequest = async () => {

        if (user === null) {
            navigate("/entrar")
        }

        if (classType == 1) {

            if (new Date(date).getDay() + 1 === 7) {
                enqueueSnackbar("Não é possível agendar aulas nos Domingos!", {variant: "warning"})
                return
            }

            const mod = modality.filter(mod => mod.name == chModality)

            const data = {
                modality: mod[0].name,
                teacher_name: teacher,
                starth: schedules[schedule].starth,
                endh: schedules[schedule].endh,
                wday: new Date(date).getDay() + 1,
                date: date,
                student_name: user ? user.name : null
            }

            api.post("/classes/create-requestclass", data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("na_token")}`
                }
            })
            .then(data => {
                enqueueSnackbar("Solicitação de aula enviada!", {variant: "success"})
            })
            .catch(err => {
                if (err.response.status === 401) {
                    enqueueSnackbar("Erro de autenticação! Faça login novamente para continuar.", {variant: "error"})
                    navigate("/entrar")
                }
                else {
                    enqueueSnackbar(err.response.data, {variant: "warning"})
                }
            }) 
        } 
        else if (classType == 2) {
            const chooseClass = groupClasses.filter(cls => cls.code === gcSelected)[0]
            if (chooseClass) {

                const data = {
                    wday: new Date(date).getDay() + 1,
                    starth: chooseClass.starth,
                    endh: chooseClass.endh,
                    student_email: user?.email,
                    date,
                    present: false
                }

                api.post("classes/subscribe-group", data, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("na_token")}`
                    }
                })
                .then(data => {
                    enqueueSnackbar("Solicitação de aula enviada!", {variant: "success"})
                })
                .catch(err => {
                    if (err.response.status === 401) {
                        enqueueSnackbar("Erro de autenticação! Faça login novamente para continuar.", {variant: "error"})
                        navigate("/entrar")
                    }
                    else {enqueueSnackbar(err.response.data, {variant: "error"})}
                })
            }
        } 
    }

    return (
        <BaseLayout title="Agendamento" returnPath="/">
            <Box display={"flex"} justifyContent={"flex-start"} alignItems={"center"} flexDirection={"column"} sx={{backgroundColor: "primary.light"}} borderRadius={"16px"} width={"95%"} maxHeight="75vh" height={"80vh"} maxWidth={"800px"} pt={"20px"} m="auto">
                <Box display={"flex"} gap={3}>
                    <Button 
                        variant={classType == 1 ? "contained" : "outlined"} 
                        onClick={() => setClassType(1)}
                        color="secondary"
                        >Aula Personal</Button>

                    <Button 
                        variant={classType == 2 ? "contained" : "outlined"} 
                        onClick={() => setClassType(2)}
                        color="secondary"
                        >Aula em Grupo</Button>
                </Box>

                {
                classType == 1 ? (  
                    <Box display={"flex"} flexDirection={"column"} mt={10} gap={3}>
                    
                        <TextField type="date"  sx={{width: "350px"}} value={date} onChange={event => setDate(event.target.value)}/>
                    
                        <Select defaultValue={"0"} sx={{width: "350px"}} label="professor" value={teacher} onChange={event => setTeacher(event.target.value)}>
                            <MenuItem value={"0"}>Professor</MenuItem>
                            {
                                teachers && teachers.map((item, idx) => (
                                    <MenuItem value={item.name}>{item.name}</MenuItem>
                                ))
                            }
                        </Select>
                        
                        <Select sx={{width: "350px"}} value={schedule} onChange={event => setSchedule(event.target.value)}>
                            <MenuItem value={0}>Horário</MenuItem>
                            {
                                schedules && schedules.map((item, idx) => (
                                    <MenuItem value={idx}>
                                        {item.starth.split(":")[0]}:{item.starth.split(":")[1]} - {item.endh.split(":")[0]}:{item.endh.split(":")[1]}</MenuItem>
                                ))
                            }
                        </Select>


                        <Select defaultValue={"0"}  sx={{width: "350px"}} value={chModality} onChange={event => setChModality(event.target.value)}>
                            <MenuItem value={"0"}>Modalidade</MenuItem>
                            {
                                modality && modality.map((data) => (
                                    <MenuItem value={data.name}>{data.name}</MenuItem>
                                ))
                            }
                        </Select>

                        <Box m={"auto"}>
                            <Button variant="contained" color="secondary" onClick={submitClassRequest}>Solicitar agendamento</Button>
                        </Box>
                    </Box>
                ) : (
                    <Box display={"flex"} flexDirection={"column"} mt={10} gap={3}>
                    
                        <TextField type="date"  sx={{width: "350px"}} value={date} onChange={event => setDate(event.target.value)}/>
                        
                        <Select defaultValue={0}  sx={{width: "350px"}} value={gcSelected} onChange={event => setGcSelected(event.target.value)}>
                            <MenuItem value={0}>Aulas Disponiveis</MenuItem>
                            {
                                groupClasses && groupClasses.map(data => (
                                    <MenuItem value={data.code}>
                                        {data.starth + " - " + data.endh + " : " + data.modality}
                                    </MenuItem>
                                ))
                            }
                        </Select>


                        <Box m={"auto"}>
                            <Button variant="contained" color="secondary" onClick={submitClassRequest}>Participar</Button>
                        </Box>
                    </Box>
                )
                }
            </Box>
        </BaseLayout>
    )
}