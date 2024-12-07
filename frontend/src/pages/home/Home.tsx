import { useEffect, useState } from "react"
import { useMenuContext, useUserInfoContext } from "../../shared/contexts"
import { Box, Button, Icon, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BaseLayout } from "../../shared/layouts";
import { api } from "../../shared/services";
import { enqueueSnackbar } from "notistack";
import { DashbordCardScroll } from "../../shared/components/dashbord-card-scroll/DashbordCard";
import { DashbordCardItem } from "../../shared/components/dashbord-card-scroll/DashbordCardItem";

interface IClassDetails {
    teacher: string;
    starth: string;
    endh: string; 
    modality: string;
}

interface IDashboardData {
    personal_classes_count: string; 
    group_classes_count: string; 
    today_classes_list: IClassDetails[];
    open_requests: Array<{
        student: string;
        modality: string;
    }>;
    today_accesses_list: Array<{
        name: string;
        granted: boolean;
        descr: string,
        dttime: string
    }>
}

export const Home = () => {
    const { setIsMenuHidden } = useMenuContext()
    const navigate = useNavigate()
    const theme = useTheme() 
    const mdDown = useMediaQuery(theme.breakpoints.down("md"))
      
    setIsMenuHidden(false)

    const {user} = useUserInfoContext()

    const [data, setData] = useState<null|IDashboardData>(null)
    
    useEffect(() => {
        if (user == null) navigate('/entrar')
    }, [user])

    useEffect(() => {getData()}, []) 


    const getData = async () => {
        api.get("/user/dashbord",  {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("na_token")}`
            }
        })
        .then(data => {
            setData(data.data)
        })
        .catch(data => {
            if (data.response.status === 401) {
                enqueueSnackbar("Erro de autenticação! Faça login novamente para continuar.", {variant: "error"})
                navigate("/entrar")
            }
            else {
                enqueueSnackbar("Não foi possível carregar os dados!", {variant: "error"})
            }
        })
    }

    return (
        user && (
            <BaseLayout title="Inicio" returnPath="/">
                <Box sx={{
                    backgroundColor: "inherit"
                }}
                display={"flex"}
                justifyContent={"center"}
                alignSelf={"center"}
                >
                    {
                         
                         (user.role === 1 || user.role == 2) && (
                            <Box 
                                width={mdDown ? "100vw" : "95%"} 
                                height={mdDown ? "auto" : "75vh"} 
                                maxWidth={"800px"} 
                                pt={"20px"}  
                                borderRadius={"16px"}
                                textAlign={"center"}
                                p={1}

                                >
                                    <Box 
                                        display={"flex"} 
                                        flexDirection={mdDown ? "column" : "row"} 
                                        alignItems={"center"}
                                        width={"100%"} 
                                        height={mdDown ? "auto" : "48%"}
                                        gap={2} 
                                    >
                                        {/* Bloco da esquerda */}
                                        <Box 
                                        display={"flex"} 
                                        flexDirection={"column"} 
                                        gap={2} 
                                        width={mdDown ? "100%" : "50%"} 
                                        alignItems={"center"}

                                        >
                                        <Box 
                                            width={"100%"} 
                                            height={"100%"} 
                                            maxWidth={"500px"}
                                            flex={1} 
                                            sx={{ backgroundColor: "primary.dark" }}
                                            borderRadius={"8px"}
                                        >
                                            <Typography variant="subtitle1" sx={{ padding: "8px" }}>Aulas Personais</Typography>
                                            
                                            {
                                                data !== null ? (
                                                    <Typography variant="h3" sx={{ padding: "8px" }} textAlign={"center"} fontWeight={"bold"} color="#0047CA">{data.personal_classes_count}</Typography>
                                                ) : (
                                                    <Typography variant="subtitle1" sx={{ padding: "8px" }} textAlign={"center"}>Sem conexão</Typography>
                                                )
                                            }


                                        </Box>
                                        <Box 
                                            width={"100%"} 
                                            height={"100%"} 
                                            maxWidth={"500px"}

                                            flex={1} 
                                            sx={{ backgroundColor: "primary.dark" }}
                                            borderRadius={"8px"}
                                        >
                                            <Typography variant="subtitle1" sx={{ padding: "8px" }}>Aulas em Grupo</Typography>
                                            {
                                                data !== null ? (
                                                    <Typography variant="h3" sx={{ padding: "8px" }} textAlign={"center"} fontWeight={"bold"} color="#0047CA">{data.group_classes_count}</Typography>
                                                ) : (
                                                    <Typography variant="subtitle1" sx={{ padding: "8px" }} textAlign={"center"}>Sem conexão</Typography>
                                                )
                                            }
                                        </Box>
                                        </Box>

                                        {/* Bloco da direita */}
                                        <Box 
                                        width={mdDown ? "100%" : "50%"}
                                        maxWidth={"500px"}
                                        height={"100%"} 
                                        sx={{ backgroundColor: "primary.dark" }}
                                        borderRadius={"8px"}
                                        
                                        >
                                            <Typography variant="subtitle1" sx={{ padding: "8px" }}>Solicitações de aulas em Aberto</Typography>
                                                <DashbordCardScroll>
                                                {
                                                    data !== null ? (
                                                        data.open_requests.length !== 0 ? data.open_requests.map(item => (
                                                               <DashbordCardItem>
                                                                    <Box>
                                                                        <Typography>
                                                                            Al. {item.student.split(" ")[0]}
                                                                        </Typography>
                                                                    </Box>
                                                                    <Box>
                                                                        <Typography fontWeight={"bold"}>
                                                                            {item.modality}
                                                                        </Typography>
                                                                    </Box>
                                                                </DashbordCardItem>
                                                        )) : (
                                                            <Typography variant="subtitle1" sx={{ padding: "8px" }} textAlign={"center"}>Não há solicitações</Typography>
                                                        )
                                                    ) : (
                                                        <Typography variant="subtitle1" sx={{ padding: "8px" }} textAlign={"center"}>Falha ao carregar os registros</Typography>
                                                    )
                                                }
                                                </DashbordCardScroll>


                                        </Box>
                                    </Box>
                                    {/* Bloco da direita */}
                                    <Box 
                                    display={"flex"} 
                                    flexDirection={mdDown ? "column" : "row"} 
                                    width={"100%"}
                                    height={"45%"}
                                    alignItems={"center"}
                                    mt={3}
                                    gap={2}
                                    >

                                    {/* Novo bloco 1 */}
                                    <Box 
                                        width={"100%"} 
                                        height={"100%"} 
                                        sx={{ backgroundColor: "primary.dark" }}
                                        borderRadius={"8px"}
                                        maxWidth={"500px"}
                                        overflow={"auto"}
                                    >
                                        <Typography variant="subtitle1" sx={{ padding: "8px", backgroundColor: "primary.dark" }}>Aulas do Dia</Typography>
                                        
                                        <DashbordCardScroll>
                                            {
                                                data !== null ? (
                                                    <>
                                                        {
                                                            data.today_classes_list.length !== 0 ? (
                                                                <>
                                                                    {

                                                                        data.today_classes_list.map(item => (
                                                                            <DashbordCardItem>
                                                                                <Box>
                                                                                    <Typography>
                                                                                        Prof. {item.teacher.split(" ")[0]}
                                                                                    </Typography>
                                                                                </Box>
                                                                                <Box>
                                                                                    <Typography fontWeight={"bold"}>
                                                                                        {item.modality}
                                                                                    </Typography>
                                                                                </Box>
                                                                                <Box>
                                                                                    <Typography variant="body2">
                                                                                        {`${item.starth.split(":")[0]}:${item.starth.split(":")[1]} - ${item.endh.split(":")[0]}:${item.endh.split(":")[1]}`}
                                                                                    </Typography>
                                                                                </Box>
                                                                            </DashbordCardItem>
                                                                        ))

                                                                    }
                                                                </>
                                                            ) : (
                                                                <Typography variant="subtitle1" sx={{ padding: "8px" }} textAlign={"center"}>Não há aulas cadastradas hoje!</Typography>
                                                            )
                                                        }
                                                    </>
                                                ) : (
                                                    <Typography variant="subtitle1" sx={{ padding: "8px" }} textAlign={"center"}>Falha ao carregar os registros</Typography>
                                                )
                                            }
                                        </DashbordCardScroll>
                                    </Box>

                                    {/* Novo bloco 2 */}
                                    <Box 
                                        width={"100%"} 
                                        height={"100%"} 
                                        sx={{ backgroundColor: "primary.dark" }}
                                        borderRadius={"8px"}
                                        maxWidth={"500px"}
                                        
                                    >
                                        <Typography variant="subtitle1" sx={{ padding: "8px" }}>Acessos do dia</Typography>
                                        <DashbordCardScroll>  
                                            {
                                                data !== null ? (
                                                    data.today_accesses_list.length !== 0 ? data.today_accesses_list.map(item => (
                                                        <DashbordCardItem>
                                                            <Box minWidth={"70%"} maxWidth={"70%"}>
                                                                <Typography variant="body2">
                                                                    {item.name}
                                                                </Typography>
                                                                {!item.granted && (<Typography variant="caption" p={"5px"} fontSize={"10px"}>
                                                                    {item.descr}
                                                                </Typography>)}
                                                            </Box>
                                                            <Box minWidth={"30%"} maxWidth={"30%"}> 
                                                                <Typography fontWeight={"bold"}>
                                                                    {item.granted ? (
                                                                        <>Autorizado</>
                                                                    ) : (
                                                                        <>Negado</>
                                                                    )}
                                                                </Typography>
                                                                <Typography fontWeight={"bold"}>
                                                                    {item.dttime.split(/[.\s]/)[1]}
                                                                </Typography>
                                                            </Box>
                                                        </DashbordCardItem>
                                                    )) : (
                                                        <Typography variant="subtitle1" sx={{ padding: "8px" }} textAlign={"center"}>Não há solicitações</Typography>
                                                    )
                                                ) : (
                                                    <Typography variant="subtitle1" sx={{ padding: "8px" }} textAlign={"center"}>Falha ao carregar os registros</Typography>
                                                )
                                            }
                                        </DashbordCardScroll>
                                    </Box>
                                </Box>
                            </Box>
                        ) 
                        
                        
                    }
            </Box>
        </BaseLayout>
        
    ))
}