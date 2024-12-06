import { Box, Button, Icon, Typography, useMediaQuery } from "@mui/material"
import { BaseLayout } from "../../shared/layouts"
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Person from '@mui/icons-material/Person';
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { api } from "../../shared/services";
import { ISchedules } from "../../shared/Interfaces/ISchedules";
import { useMenuContext, useUserInfoContext } from "../../shared/contexts";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";


export const Schedules = () => {
    const theme = useTheme() 
    const lgDown = useMediaQuery(theme.breakpoints.down("lg"))
    const mdDown = useMediaQuery(theme.breakpoints.down("md"))
    const smDown = useMediaQuery(theme.breakpoints.down("sm"))

    const {user} = useUserInfoContext()
    const navigate = useNavigate()

    const { setIsMenuHidden } = useMenuContext()
    setIsMenuHidden(false)

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
        setDate(() => new Date(date.setDate(date.getDate() - 1)));
    };

    
    // requisições - pegar horarios pelo dia 
    const updateSchedules = () => {
        api.post("/schedules/getbyday", { day, date: reqDate }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("na_token")}`
            }
        })
        .then(data => {
            setData(data.data)
        })
        .catch(err => {
            if (err.code === "ERR_NETWORK") {
                enqueueSnackbar("Erro ao conectar-se com o servidor!", {variant: "error"})
            }
            else if (err.response.status === 401) {
                enqueueSnackbar("Erro de autenticação! Faça login novamente para continuar.", {variant: "error"})
                navigate("/entrar")
            }
            else enqueueSnackbar("Não foi possível carregar os horarios!", {variant: "error"})
        })

    }


    useEffect(() => {
        updateSchedules()
    }, [day])

    useEffect(() => {
        if (user == null) navigate('/entrar')
    }, [user])




    return (
        <BaseLayout title="Horários" returnPath="/">
            <Box display={"flex"} gap={2} flexDirection={lgDown ? "column" : "row"} alignItems={"center"} justifyContent={"center"}>
                <Box width={"95%"} height="80vh" maxWidth={"800px"} pt={"20px"} sx={{backgroundColor: "primary.light"}} borderRadius={"16px"}>
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
                    <Box sx={{backgroundColor: "primary.main"}} width={"90%"} height={"70%"} ml={"5%"} mt={"5%"} display={"flex"} flexDirection={"column"} alignItems={"center"} gap={2} pt={2} borderRadius={"16px"} overflow={"auto"} >
                    
                        {(data && day !== "Domingo") ? (
                            data.map( (sch) => (
                                sch.teacher_name ? (
                                <Box width={"95%"} minHeight={smDown ? "170px" : "70px"} display={"flex"} sx={{backgroundColor: "primary.dark"}} flexDirection={smDown ? "column" : "row"} alignItems={"center"} justifyContent={"center"} gap={smDown ? 2 : 0}>
                                    <Box height={smDown ? "auto" : "100%"} width={smDown ? "auto" : "25%"} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}  >
                                        <Typography fontSize={mdDown ? 15 : 15}>{sch.starth + " : " + sch.endh}</Typography>
                                        <Typography variant="h6">Prof. {sch.teacher_name.split(" ")[0]}</Typography>
                                    </Box>
                                    <Box height={smDown ? "auto" : "100%"} width={smDown ? "auto" :  "50%"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                                        <Typography variant="h6" fontWeight={"bold"}>{sch.modality_name}</Typography>
                                    </Box>
                                    <Box height={smDown ? "auto" : "100%"} width={smDown ? "auto" : "25%"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                                        <Typography variant="h5" display={"flex"} justifyContent={"center"} alignItems={"center"} fontSize={20}>
                                            {
                                                sch.student_name == null ? (
                                                    <>
                                                        <Person/>
                                                        <>{sch.num_participants}</>
                                                    </>
                                                ) : (
                                                    <>Al: {sch.student_name.split(" ")[0]}</>
                                                )

                                            }
                                        </Typography>
                                    </Box>
                                </Box>
                                
                                ) : (
                                    <Box width={"95%"} minHeight={smDown ? "170px" : "70px"} display={"flex"} sx={{backgroundColor: "primary.dark"}} flexDirection={smDown ? "column" : "row"}  justifyContent={"center"}>
                                        <Box height={"100%"} width={smDown ? "auto" : "25%"} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}  >
                                            <Typography fontSize={mdDown ? 15 : 10}>{sch.starth + " : " + sch.endh}</Typography>
                                            <Typography variant="h5">{sch.teacher_name}</Typography>
                                        </Box>
                                        <Box height={"100%"} width={smDown ? "auto" : "65%"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                                            <Typography variant="h5" fontWeight={"bold"}>Horário disponível</Typography>
                                        </Box>
                                    </Box>
                                )
                            )
                        )) : (
                            <Typography>
                                {day === "Domingo" ? "Sem horarios para o Domingo" : "Sem dados"}
                            </Typography>
                        )}

                    </Box>
                </Box>
            </Box>
        </BaseLayout>
    )
}