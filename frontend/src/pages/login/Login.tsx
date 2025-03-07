import { useEffect, useState } from "react"
import { useMenuContext, useUserInfoContext } from "../../shared/contexts"
import { Box, Button, CircularProgress, Icon, TextField, Typography, useMediaQuery, useTheme } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { api } from "../../shared/services"
import { useSnackbar } from "notistack"



export const Login = () => {

    const { setIsMenuHidden } = useMenuContext()
    const navigate = useNavigate()
    const { setUser } = useUserInfoContext()

    const theme = useTheme()
    const smDown = useMediaQuery(theme.breakpoints.down('sm'))
    const mdDown = useMediaQuery(theme.breakpoints.down('md'))

    const [btn_1_Loading, setBtn_1_Loading] = useState<boolean>(false)
    const [btn_2_Loading, setBtn_2_Loading] = useState<boolean>(false)
    const [buttonsDisable, setButtonsDisable] = useState<boolean>(false)
    
    // Controle de login
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const { enqueueSnackbar } = useSnackbar();

    const handleRequestChangePassword = async () => {
        setButtonsDisable(true)
        setBtn_2_Loading(true)

        setTimeout(() => {
            navigate("/recuperacao")
        }, 1000)
    }

    const handleLogin = () => {
        if (email && password) {
            api.post("/auth/login", {email: email, password: password})
            .then((data) => {
                localStorage.setItem("na_token", data.data.token)
                setUser(data.data)

                if (data.data.role === 1 || data.data.role === 2 ) navigate("/inicio")
                else navigate("/horarios")
                
            })
            .catch((err) => {
                if (err.code === "ERR_BAD_REQUEST") {
                    enqueueSnackbar("Email ou Senha inválidos!", {variant: "error"})
                }
                else if (err.code === "ERR_NETWORK") {
                    enqueueSnackbar("Erro ao conectar-se com o servidor!", {variant: "error"})
                }
                else {
                    enqueueSnackbar("Um erro inesperado ocorreu!", {variant: "error"})
                }
            })
        }
    }

    // Desabilitar menu
    useEffect(() => {
        setIsMenuHidden(true)
    }, [])

    return (
        <Box 
            
            display={"flex"}
            justifyContent={"center"}
            height={"100vh"}
            width={"100%"}
            flex={1}
            overflow={"auto"}

            flexDirection={"column"}
            alignItems={"center"}
            > 

            <Box 
                border={1}
                borderColor={"secondary.light"}
                boxShadow={2}
                width={smDown ? "auto" : mdDown ? "70%" : "40%"}
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

                <Box display={"flex"} flexDirection={"column"} gap={2} width={smDown ? "100%" : "80%"}>
                    <TextField label="Email" type="text" value={email} onChange={event => setEmail(event.target.value)} color="secondary"/>
                    <TextField label="Senha" type="password" value={password} onChange={event => setPassword(event.target.value)}  color="secondary"/>
                </Box>

                <Box display={"flex"} flexDirection={"column"} gap={2} width={"80%"} alignItems={"center"}>
                    <Box display={"flex"} justifyContent={"center"} flexDirection={"column"} width={smDown ? "90%": "50%"}>
                        <Button variant="contained"  color="secondary" disabled={buttonsDisable} onClick={handleLogin}>Entrar</Button>
                    </Box>
                </Box>
                <Box display={"flex"} flexDirection={"row"} gap={4} mt={2}>
            </Box>
            </Box>
            <Box>
                <Button color="secondary" variant="outlined" onClick={() => {
                    setEmail("emanuela@gmail.com")
                    setPassword("emanuela")
                }}>emanuela-s</Button>
                <Button color="secondary" variant="outlined" onClick={() => {
                    setEmail("joao@gmail.com")
                    setPassword("joao")
                }}>joao-p</Button>
                <Button color="secondary" variant="outlined" onClick={() => {
                    setEmail("juliano@gmail.com")
                    setPassword("juliano")
                }}>juliano-p</Button>
                <Button color="secondary" variant="outlined" onClick={() => {
                    setEmail("fabricio@gmail.com")
                    setPassword("fabricio")
                }}>Fabricio-a</Button>
                <Button color="secondary" variant="outlined" onClick={() => {
                    setEmail("eduardofiorentin336@gmail.com")
                    setPassword("eduardo")
                }}>Eduardo-a</Button>

            </Box>
        </Box>
    )
}
