import { useEffect, useState } from "react"
import { useMenuContext, useUserInfoContext } from "../../shared/contexts"
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BaseLayout } from "../../shared/layouts";
import { Person } from "@mui/icons-material";
import { api } from "../../shared/services";


export const HandleRequestClasses = () => {
    const { setIsMenuHidden } = useMenuContext()
    const theme = useTheme() 

    setIsMenuHidden(false)
    const lgDown = useMediaQuery(theme.breakpoints.down("lg"))

    
    const navigate = useNavigate()
    const {user} = useUserInfoContext()
    
    const [data, setData] = useState<{
        status: string,
        student_name: string,
        teacher_name: string,
        data: string,
        wday: number,
        starth: string,
        endh: string,
        modality: string
    }[]>([])

    // useEffect(() => {
    //     if (user == null) navigate('/entrar')
    // }, [user])

    useEffect(() => {
        getClassRequests()
    }, [])

    const getClassRequests = () => {
        // console.log("Data da req: ", reqDate, day)
        api.get("/classes/getall-requestClasses", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("na_token")}`
            }
        })
        .then(data => {
            console.log("deu certo: ", data)
            setData(data.data)
        })
        .catch(data => console.log("deu Errado: ", data))
    }

    return (
        user !== null && user?.role === 1 || user?.role === 2 ? (
            <BaseLayout title="Solicitações de Agendamento" returnPath="/">
                <Box display={"flex"} gap={2} flexDirection={lgDown ? "column" : "row"} alignItems={"center"} justifyContent={"center"}>
                    <Box width={"95%"} height="80vh" maxWidth={"800px"} pt={"20px"} sx={{backgroundColor: "primary.light"}}  borderRadius={"16px"}>
                        <Box sx={{backgroundColor: "primary.main"}} width={"90%"} height={"70%"} ml={"5%"} mt={"5%"} display={"flex"} flexDirection={"column"} alignItems={"center"} gap={2} pt={2} overflow={"auto"}  borderRadius={"16px"}>
                        
                            {/* {data ? (
                                data.map( (sch) => (
                                    sch.teacher_name ? (
                                    <Box width={"95%"} minHeight={"70px"} display={"flex"} sx={{backgroundColor: "primary.dark"}}>
                                        <Box height={"100%"} width={"25%"} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}  >
                                            <Typography fontSize={10}>{sch.starth + " : " + sch.endh}</Typography>
                                            <Typography variant="h5">{sch.teacher_name}</Typography>
                                        </Box>
                                        <Box height={"100%"} width={ "50%"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                                            <Typography variant="h5" fontWeight={"bold"}>{sch.teacher_name}</Typography>
                                        </Box>
                                        <Box height={"100%"} width={"25%"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                                            <Typography variant="h5" display={"flex"} justifyContent={"center"} alignItems={"center"} fontSize={20}>
                                                {
                                                    sch.student_name == null ? (
                                                        <>
                                                            <Person/>
                                                            <>{sch.student_name}</>
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
                            )} */}

                        </Box>
                    </Box>
                </Box>
            </BaseLayout>
        
    ) : (
        <>Sem Dados</>
    )
)}