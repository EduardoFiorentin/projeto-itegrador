import { Box, Button, Select, TextField, MenuItem } from "@mui/material"
import { BaseLayout } from "../../shared/layouts"
import { useEffect, useState } from "react"
import { api } from "../../shared/services"
import { getDayFromDate } from "../../shared/utils"

export const Appointment = () => {
    
    // 1 - personal
    // 2 - grupo
    const [classType, setClassType] = useState(1)

    const [date, setDate] = useState<string>("")
    const [teachers, setTeachers] = useState<{name: string}[]>([])
    const [schedules, setSchedules] = useState<{starth: string, endh: string}[]>([])
    const [modality, setModality] = useState<{name: string}[]>([])

    useEffect(() => {
        getTeachers()
        getModality()
    }, [])
    useEffect(() => {
        getSchedules()
    }, [date])


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

        api.post("schedules/getFreeSchedulesByDate", {date, day: "Segunda-feira"}, {
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
                    
                        <Select defaultValue={0} sx={{width: "350px"}} label="professor">
                            <MenuItem value={0}>Professor</MenuItem>
                            {
                                teachers && teachers.map((item, idx) => (
                                    <MenuItem value={idx}>{item.name}</MenuItem>
                                ))
                            }
                        </Select>
                        
                        <Select defaultValue={0}  sx={{width: "350px"}}>
                            <MenuItem value={0}>Horário</MenuItem>
                            {
                                schedules && schedules.map((item, idx) => (
                                    <MenuItem value={idx}>{item.starth.split(":")[0]}:{item.starth.split(":")[1]} - {item.endh.split(":")[0]}:{item.endh.split(":")[1]}</MenuItem>
                                ))
                            }
                        </Select>


                        <Select defaultValue={0}  sx={{width: "350px"}}>
                            <MenuItem value={0}>Modalidade</MenuItem>
                            {
                                modality && modality.map((data, idx) => (
                                    <MenuItem value={idx}>{data.name}</MenuItem>
                                ))
                            }
                        </Select>

                        <Box m={"auto"}>
                            <Button variant="contained" color="secondary">Solicitar agendamento</Button>
                        </Box>
                    </Box>
                ) : (
                    <Box display={"flex"} flexDirection={"column"} mt={10} gap={3}>
                    
                        <TextField type="date"  sx={{width: "350px"}}/>
                        
                        <Select defaultValue={0}  sx={{width: "350px"}}>
                            <MenuItem value={0}>Aulas Disponíveis</MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>

                        <Box m={"auto"}>
                            <Button variant="contained" color="secondary">Participar</Button>
                        </Box>
                    </Box>
                )
                }
            </Box>
        </BaseLayout>
    )
}