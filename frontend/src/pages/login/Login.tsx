import { useEffect, useState } from "react"
import { useMenuContext, useUserInfoContext } from "../../shared/contexts"
import { Box, Button, CircularProgress, Icon, TextField, Typography, useMediaQuery, useTheme } from "@mui/material"
import { useNavigate } from "react-router-dom"

export const Login = () => {

    const { setIsMenuHidden } = useMenuContext()
    const navigate = useNavigate()

    const theme = useTheme()
    const smDown = useMediaQuery(theme.breakpoints.down('sm'))
    const mdDown = useMediaQuery(theme.breakpoints.down('md'))

    const [btn_1_Loading, setBtn_1_Loading] = useState<boolean>(false)
    const [btn_2_Loading, setBtn_2_Loading] = useState<boolean>(false)
    const [buttonsDisable, setButtonsDisable] = useState<boolean>(false)
    

    const handleRequestChangePassword = async () => {
        setButtonsDisable(true)
        setBtn_2_Loading(true)

        setTimeout(() => {
            console.log("Requisição de troca de senha")
            navigate("/recover")
        }, 1000)
    }

    const {user, setUser} = useUserInfoContext()

    console.log(user)

    // Desabilitar menu
    useEffect(() => {
        setIsMenuHidden(true)
    }, [])

    return (
        <Box 
            
            display={"flex"}
            justifyContent={"center"}
            height={"100%"}
            width={"100%"}
            flex={1}
            overflow={"auto"}
            > 

           

            <Box 
                border={1}
                borderColor={"primary.light"}
                boxShadow={2}
                height={"50%"}
                width={smDown ? "100%" : mdDown ? "70%" : "40%"}
                maxWidth={"500px"}
                borderRadius={"40px"}
                alignSelf={"center"}
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"center"}
                alignItems={"center"}
                p={"30px"}
                gap={4}
            > 
                <Typography  variant={smDown ? "h5" : "h4"} component="h2" textAlign={"center"}>
                    Entrar no sistema
                </Typography>

                <Box display={"flex"} flexDirection={"column"} gap={2} width={"80%"}>
                    <TextField label="Usuário" type="text"/>
                    <TextField label="Senha" type="password"/>
                </Box>

                <Box display={"flex"} flexDirection={"column"} gap={2} width={"80%"} alignItems={"center"}>
                    <Box display={"flex"} justifyContent={"center"} flexDirection={"column"} width={smDown ? "90%": "50%"}>
                        <Button variant="contained" disabled={buttonsDisable}>Entrar</Button>
                    </Box>
                    <Box display={"flex"} justifyContent={"center"} flexDirection={"column"} width={smDown ? "90%": "50%"}>
                        <Button variant="outlined" onClick={handleRequestChangePassword} disabled={buttonsDisable}>
                            
                                <Typography variant="button" color="inherit">
                                    {!btn_2_Loading ? (<>Recuperar Senha </>): (<CircularProgress size="25px"/>)}
                                </Typography>
                        
                        </Button>
                    </Box>
                </Box>
            </Box>

        </Box>
    )
}
