import { Box, Button, Select, TextField, MenuItem } from "@mui/material"
import { BaseLayout } from "../../shared/layouts"
import { useEffect, useState } from "react"
import { api } from "../../shared/services"
import { getDayFromDate } from "../../shared/utils"
import { useSnackbar } from "notistack"
import { useUserInfoContext } from "../../shared/contexts"
import { useNavigate } from "react-router-dom"

export const Appointment = () => {
    
    // 1 - personal
    // 2 - grupo
    const [classType, setClassType] = useState(1)

    const [date, setDate] = useState<string>("0")
    
    const [teachers, setTeachers] = useState<{name: string}[]>([])
    const [teacher, setTeacher] = useState("0")

    const [schedules, setSchedules] = useState<{starth: string, endh: string}[]>([])
    // const [wday, setWday] = useState("0")
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

    // useEffect(() => {
    // }, [date])

    const getTeachers = async () => {
        api.get("/user/getTeachers", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("na_token")}`
            }
        })
        .then(data => {
            console.log("Lista de professores:", teachers)
            setTeachers(data.data)
        })
        .catch(err => {
            console.log("Erro ao pegar professores", err)
        })
    }

    const getSchedules = async () => {

        console.log("Data enviada: ", {date, day: getDayFromDate(date)})

        api.post("schedules/getFreeSchedulesByDate", {date, day: getDayFromDate(date)}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("na_token")}`
            }
        })
        .then(data => {
            console.log("Lista de horarios:", data.data)
            setSchedules(data.data)
        })
        .catch(err => {
            console.log("Erro ao pegar horarios", err)
        })
    }


    const getModality = async () => {
        api.get("modality/getall", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("na_token")}`
            }
        })
        .then(data => {
            console.log("Lista de modalidades:", schedules)
            setModality(data.data)
        })
        .catch(err => {
            console.log("Erro ao pegar modalidades", err)
        })
    }

    const getGroupClasses = async () => {
        // if (date != "0") {
            console.log("Dia pesquisado: ", (new Date(date).getDay())+1)
            api.get(`classes/getbyday-groupclass/${(new Date(date).getDay())+1}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("na_token")}`
                }
            })
            .then(data => {
                console.log("Lista de aulas em grupo:", data)
                setGroupClasses(data.data)
            })
            .catch(err => {
                console.log("Erro ao pegar modalidades", err)
            })
        // } else console.log("Erro ----------------------------------")
    }

    const submitClassRequest = async () => {

        if (user === null) {
            navigate("/entrar")
        }

        console.log("Operador: ", classType)

        if (classType == 1) {

            const mod = modality.filter(mod => mod.name == chModality)
            // console.log(mod)

            const data = {
                modality: mod[0].code,
                teacher_name: teacher,
                starth: schedules[schedule].starth,
                endh: schedules[schedule].endh,
                wday: new Date(date).getDay() + 1,
                date: date,
                student_name: user ? user.name : null
            }

            console.log(data)
            api.post("/classes/create-requestclass", data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("na_token")}`
                }
            })
            .then(data => {
                enqueueSnackbar("Solicitação de aula enviada!", {variant: "success"})
            })
            .catch(err => {
                console.log(err)
                enqueueSnackbar("Ocorreu um erro na solicitação!", {variant: "error"})
                
            }) 
        } 
        else if (classType == 2) {
            console.log("Aula em grupo escolhida: ", groupClasses.filter(cls => cls.code === gcSelected))
            
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

                console.log("Inscrição na aula em grupo", data)

                api.post("classes/subscribe-group", data, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("na_token")}`
                    }
                })
                .then(data => {
                    enqueueSnackbar("Solicitação de aula enviada!", {variant: "success"})
                })
                .catch(err => {
                    console.log(err)
                    enqueueSnackbar(err.response.data, {variant: "error"})
                })
            }
        } 
    }

    return (
        <BaseLayout title="Agendamento" returnPath="/">
            <Box display={"flex"} alignItems={"center"} flexDirection={"column"} height={"100%"}>
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