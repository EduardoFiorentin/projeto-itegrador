import { useEffect } from "react"
import { useMenuContext, useUserInfoContext } from "../../shared/contexts"
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BaseLayout } from "../../shared/layouts";


export const Home = () => {
    const { setIsMenuHidden } = useMenuContext()
    const navigate = useNavigate()
    const theme = useTheme() 
    const smDown = useMediaQuery(theme.breakpoints.down("sm"))
    const mdDown = useMediaQuery(theme.breakpoints.down("md"))
    
    setIsMenuHidden(false)

    const {user} = useUserInfoContext()
    
    useEffect(() => {
        if (user == null) navigate('/entrar')
    }, [user])

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
                                            <Typography variant="h3" sx={{ padding: "8px" }} textAlign={"center"} fontWeight={"bold"} color="#0047CA">10</Typography>


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
                                            <Typography variant="h3" sx={{ padding: "8px" }} textAlign={"center"} fontWeight={"bold"} color="#0047CA">10</Typography>
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
                                            <Typography variant="subtitle1" sx={{ padding: "8px" }} textAlign={"center"}>Não há solicitações</Typography>


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
                                        <Box width="100%" height="auto" display="flex" alignItems="center" justifyContent="center">
                                            <Typography variant="subtitle1" sx={{ padding: "8px" }} textAlign={"center"}>Não há registros</Typography>

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