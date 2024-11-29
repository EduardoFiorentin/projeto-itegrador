import { useEffect, useState } from "react"
import { useMenuContext, useUserInfoContext } from "../../shared/contexts"
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BaseLayout } from "../../shared/layouts";
import { api } from "../../shared/services";
import { enqueueSnackbar } from "notistack";

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
}

export const Home = () => {
    const { setIsMenuHidden } = useMenuContext()
    const navigate = useNavigate()
    const theme = useTheme() 
    // const smDown = useMediaQuery(theme.breakpoints.down("sm"))
    const mdDown = useMediaQuery(theme.breakpoints.down("md"))
    
    setIsMenuHidden(false)

    const {user} = useUserInfoContext()

    const [data, setData] = useState<null|IDashboardData>(null)
    
    useEffect(() => {
        if (user == null) navigate('/entrar')
    }, [user])

    useEffect(() => {
    getData()   
    }, []) 


    const getData = async () => {
        api.get("/user/dashbord",  {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("na_token")}`
            }
        })
        .then(data => {
            console.log("deu certo: ", data)
            setData(data.data)
        })
        .catch(data => {
            console.log("deu Errado: ", data)
            enqueueSnackbar("Não foi possível carregar os dados!", {variant: "error"})
        })
    }

    return (
        user && (
            <BaseLayout title="Inicio" returnPath="/">
                <Typography variant="h4" sx={{
                    backgroundColor: "inherit"
                }}>
                    {
                        user.role === 1 || user.role == 2 ? 
                        (
                            <Box 
                                width={mdDown ? "100vw" : "95%"} 
                                height={mdDown ? "auto" : "75vh"} 
                                maxWidth={"800px"} 
                                pt={"20px"} 
                                // sx={{ backgroundColor: "primary.light" }} 
                                borderRadius={"16px"}
                                p={1}
                                >
                                    <Box 
                                        display={"flex"} 
                                        flexDirection={mdDown ? "column" : "row"} 
                                        width={"100%"} 
                                        height={"48%"}
                                        gap={2} // Adiciona um espaço entre os blocos
                                    >
                                        {/* Bloco da esquerda */}
                                        <Box 
                                        display={"flex"} 
                                        flexDirection={"column"} 
                                        gap={2} 
                                        width={mdDown ? "100%" : "50%"} // Ocupa metade da largura
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
                                        width={mdDown ? "100%" : "50%"} // Ocupa metade da largura
                                        maxWidth={"500px"}
                                        height={"100%"} 
                                        sx={{ backgroundColor: "primary.dark" }}
                                        borderRadius={"8px"}
                                        >
                                            <Typography variant="subtitle1" sx={{ padding: "8px" }}>Solicitações em Aberto</Typography>
                                            <Box width="100%" height={"70%"} display="flex" flexDirection={"column"} alignItems="center" justifyContent="center" gap={2} pb="20px" overflow={"auto"}>
                                                {
                                                    data !== null ? (
                                                        data.open_requests.map(item => (
                                                            <Box width={"90%"} sx={{backgroundColor: "primary.light"}} display={"flex"}>
                                                                <Box>
                                                                    <Typography>
                                                                        Prof. {item.student}
                                                                    </Typography>
                                                                </Box>
                                                                <Box>
                                                                    <Typography fontWeight={"bold"}>
                                                                        {item.modality}
                                                                    </Typography>
                                                                </Box>
                                                            </Box>
                                                        ))
                                                    ) : (
                                                        <Typography variant="subtitle1" sx={{ padding: "8px" }} textAlign={"center"}>Falha ao carregar os registros</Typography>
                                                    )
                                                }
                                            </Box>


                                        </Box>
                                    </Box>
                                    {/* Bloco da direita */}
                                    <Box 
                                    display={"flex"} 
                                    flexDirection={mdDown ? "column" : "row"} 
                                    width={"100%"} // Metade da largura
                                    height={"45%"}
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
                                    >
                                        <Typography variant="subtitle1" sx={{ padding: "8px" }}>Aulas do Dia</Typography>
                                        <Box width="100%" minHeight="80%" display="flex" flexDirection={"column"} alignItems="center" justifyContent="center" overflow={"auto"} gap={2}  pb="20px">
                                            {
                                                data !== null ? (
                                                    <>
                                                        {
                                                            data.today_classes_list.length !== 0 ? (
                                                                <>
                                                                {

                                                                    data.today_classes_list.map(item => (
                                                                        <Box width={"90%"} height={"70px"} sx={{backgroundColor: "primary.light"}} display={"flex"} flexDirection={"row"} justifyContent={"space-evenly"} borderRadius={"8px"} alignItems={"center"}>
                                                                            <Box>
                                                                                <Typography>
                                                                                    Prof. {item.teacher}
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
                                                                        </Box>
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
                                        </Box>
                                    </Box>

                                    {/* Novo bloco 2 */}
                                    <Box 
                                        width={"100%"} 
                                        height={"100%"} 
                                        sx={{ backgroundColor: "primary.dark" }}
                                        borderRadius={"8px"}
                                        maxWidth={"500px"}
                                    >
                                        <Typography variant="subtitle1" sx={{ padding: "8px" }}>Registro de acesso</Typography>
                                        <Box width="100%" height="auto" display="flex" alignItems="center" justifyContent="center">
                                            <Typography variant="subtitle1" sx={{ padding: "8px" }} textAlign={"center"}>Não há registros</Typography>

                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        ) 
                        : 
                        (
                            <>Aluno</>
                        )
                        
                    }
            </Typography>
        </BaseLayout>
        
    ))
}