import { Box, Button, Icon, Typography, useMediaQuery } from "@mui/material"
import { BaseLayout } from "../../shared/layouts"
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Person from '@mui/icons-material/Person';
import { useTheme } from "@mui/material";
import { useState } from "react";

const data = [
    {sched: "08:00 - 08:59", teacher: "João", modality: "Classic Sparring", participants: 6},
    {sched: "09:00 - 09:59", teacher: "João", modality: "Classic Sparring", participants: 6},
    {sched: "09:00 - 09:59", teacher: "João", modality: "Classic Sparring", participants: 6},
    {sched: "09:00 - 09:59", teacher: "João", modality: "Classic Sparring", participants: 6},
]

export const Schedules = () => {
    const theme = useTheme() 
    // const smDown = useMediaQuery(theme.breakpoints.down("sm"))
    // const mdDown = useMediaQuery(theme.breakpoints.down("md"))
    const lgDown = useMediaQuery(theme.breakpoints.down("lg"))

    const [date, setDate] = useState<Date>(new Date())

      // Função para formatar a data (ex.: "18 de novembro de 2024")
    const formatDate = (data: Date) => {
        return data.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        });
    };

    // Navegar para o próximo dia
    const nextDay = () => {
        setDate(() => new Date(date.setDate(date.getDate() + 1)));
    };

    // Navegar para o dia anterior
    const prevDay = () => {
        setDate(() => new Date(date.setDate(date.getDate() - 1)));
    };

    const getWeekDay = (data: Date) => {
        const texto = data.toLocaleDateString('pt-BR', { weekday: 'long' });
        return texto.charAt(0).toUpperCase() + texto.slice(1);
    };

    return (
        <BaseLayout title="Horários" returnPath="/">
            <Box display={"flex"} gap={2} flexDirection={lgDown ? "column" : "row"}>
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
                                    {getWeekDay(date)}
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
                    <Box sx={{backgroundColor: "primary.main"}} width={"90%"} height={"70%"} ml={"5%"} mt={"5%"} display={"flex"} flexDirection={"column"} alignItems={"center"} gap={2} pt={2} overflow={"scroll"}  borderRadius={"16px"}>
                    
                        {data ? (
                            data.map( (sch) => (
                                <Box width={"95%"} height={"60px"} display={"flex"} sx={{backgroundColor: "primary.dark"}}>
                                    <Box height={"100%"} width={"25%"} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}  >
                                        <Typography fontSize={10}>{sch.sched}</Typography>
                                        <Typography variant="h5">{sch.teacher}</Typography>
                                    </Box>
                                    <Box height={"100%"} width={"65%"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                                        <Typography variant="h5" fontWeight={"bold"}>{sch.modality}</Typography>
                                    </Box>
                                    <Box height={"100%"} width={"10%"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                                        <Typography variant="h5" display={"flex"} justifyContent={"center"} alignItems={"center"} fontSize={20}>
                                            <Person/>
                                            {sch.participants}
                                        </Typography>
                                    </Box>
                                </Box>
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