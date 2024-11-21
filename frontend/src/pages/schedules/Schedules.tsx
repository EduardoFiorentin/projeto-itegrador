import { Box, Button, Icon, Typography, useMediaQuery } from "@mui/material"
import { BaseLayout } from "../../shared/layouts"
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Person from '@mui/icons-material/Person';
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { api } from "../../shared/services";
import { ISchedules } from "../../shared/Interfaces/ISchedules";

// const data = [
//     {sched: "08:00 - 08:59", teacher: "João", modality: "Classic Sparring", participants: 6},
//     {sched: "09:00 - 09:59", teacher: "João", modality: "Classic Sparring", participants: 6},
//     {sched: "09:00 - 09:59", teacher: "João", modality: "Classic Sparring", participants: 6},
//     {sched: "09:00 - 09:59", teacher: "João", modality: "Classic Sparring", participants: 6},
// ]

export const Schedules = () => {
    const theme = useTheme() 
    const lgDown = useMediaQuery(theme.breakpoints.down("lg"))
    // const smDown = useMediaQuery(theme.breakpoints.down("sm"))
    // const mdDown = useMediaQuery(theme.breakpoints.down("md"))

    // Navegar para o próximo dia


    const getWeekDay = (data: Date) => {
        const texto = data.toLocaleDateString('pt-BR', { weekday: 'long' });
        return texto.charAt(0).toUpperCase() + texto.slice(1);
    };
    const getDate = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Meses começam do 0
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    
    const [date, setDate] = useState<Date>(new Date())
    const [day, setDay] = useState(getWeekDay(new Date()))
    const [data, setData] = useState<ISchedules[]>([])
    const [reqDate, setReqDate] = useState(getDate(new Date()))

    useEffect(() => {
        setDay(getWeekDay(date))
        setReqDate(getDate(date))
        console.log(date)
    }, [date])


      // Função para formatar a data (ex.: "18 de novembro de 2024")
    const formatDate = (data: Date) => {
        return data.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        });
    };

    const nextDay = () => {
        setDate(() => new Date(date.setDate(date.getDate() + 1)));
    };

    // Navegar para o dia anterior
    const prevDay = () => {
        console.log(date)
        setDate(() => new Date(date.setDate(date.getDate() - 1)));
    };




    // requisições - pegar horarios pelo dia 
    const updateSchedules = () => {
        console.log("Data da req: ", reqDate)
        api.post("/schedules/getbyday", {day, date: reqDate})
        .then(data => {
            console.log("deu certo: ", data)
            setData(data.data)
        })
        .catch(data => console.log("deu Errado: ", data))

    }
    useEffect(() => {
        updateSchedules()
    }, [day])





    return (
        <BaseLayout title="Horários" returnPath="/">
            <Box display={"flex"} gap={2} flexDirection={lgDown ? "column" : "row"} alignItems={"center"} justifyContent={"center"}>
                <Box width={"95%"} height="80vh" maxWidth={"800px"} pt={"20px"} sx={{backgroundColor: "primary.light"}}  borderRadius={"16px"}>
                    <Box width={"100%"} height={"80px"} display={"flex"} sx={{backgroundColor: "primary.dark"}}>
                        <Box height={"100%"} width={"15%"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                            <Button onClick={prevDay}>
                                <ChevronLeftIcon fontSize="large" color="action"/>
                            </Button>
                        </Box>
                        <Box  height={"100%"} width={"70%"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                            <Box textAlign={"center"}>
                                <Typography variant="h5" component={"p"}>
                                    {day}
                                </Typography>
                                <Typography>
                                    {formatDate(date)}
                                </Typography>
                            </Box>
                        </Box>
                        <Box height={"100%"} width={"15%"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                            <Button onClick={nextDay}>
                                <ChevronRightIcon fontSize="large" color="action"/>
                            </Button>
                        </Box>
                    </Box>
                    <Box sx={{backgroundColor: "primary.main"}} width={"90%"} height={"70%"} ml={"5%"} mt={"5%"} display={"flex"} flexDirection={"column"} alignItems={"center"} gap={2} pt={2} overflow={"auto"}  borderRadius={"16px"}>
                    
                        {data ? (
                            data.map( (sch) => (
                                sch.teacher_name ? (
                                <Box width={"95%"} minHeight={"70px"} display={"flex"} sx={{backgroundColor: "primary.dark"}}>
                                    <Box height={"100%"} width={"25%"} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}  >
                                        <Typography fontSize={10}>{sch.starth + " : " + sch.endh}</Typography>
                                        <Typography variant="h5">{sch.teacher_name}</Typography>
                                    </Box>
                                    <Box height={"100%"} width={ "50%"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                                        <Typography variant="h5" fontWeight={"bold"}>{sch.modality_name}</Typography>
                                    </Box>
                                    <Box height={"100%"} width={"25%"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                                        <Typography variant="h5" display={"flex"} justifyContent={"center"} alignItems={"center"} fontSize={20}>
                                            {
                                                sch.student_name == null ? (
                                                    <>
                                                        <Person/>
                                                        <>{sch.num_participants}</>
                                                    </>
                                                ) : (
                                                    <>Al: {sch.student_name}</>
                                                )

                                            }
                                        </Typography>
                                    </Box>
                                </Box>
                                
                                ) : (
                                    <Box width={"95%"} minHeight={"70px"} display={"flex"} sx={{backgroundColor: "primary.dark"}}>
                                    <Box height={"100%"} width={"25%"} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}  >
                                        <Typography fontSize={10}>{sch.starth + " : " + sch.endh}</Typography>
                                        <Typography variant="h5">{sch.teacher_name}</Typography>
                                    </Box>
                                    <Box height={"100%"} width={"65%"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                                        <Typography variant="h5" fontWeight={"bold"}>Horário disponível</Typography>
                                    </Box>
                                </Box>
                                )
                            )
                        )) : (
                            <Typography>
                                Sem dados
                            </Typography>
                        )}

                    </Box>
                </Box>

                {/* Botões */}
                {/* <Box width={"250px"} height={"100px"} sx={{backgroundColor: "yellow"}}>

                </Box> */}
            </Box>
        </BaseLayout>
    )
}