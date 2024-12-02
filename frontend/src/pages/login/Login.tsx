import { useEffect, useState } from "react"
import { useMenuContext, useUserInfoContext } from "../../shared/contexts"
import { Box, Button, CircularProgress, Icon, TextField, Typography, useMediaQuery, useTheme } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { api } from "../../shared/services"



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
            navigate("/recuperacao")
        }, 1000)
    }

    const {user, setUser} = useUserInfoContext()

    // console.log(user)

    // Controle de login
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    
    const handleLogin = () => {
        if (email && password) {
            api.post("/auth/login", {email: email, password: password})
            .then((data) => {
                localStorage.setItem("na_token", data.data.token)
                console.log(data.data)
                setUser(data.data)

                if (data.data.role === 1 || data.data.role === 2 ) navigate("/inicio")
                else navigate("/horarios")
                
                console.log("Sucesso", data)
            })
            .catch((err) => {
                console.log("Falha", err)
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
                // height={"50%"}
                width={smDown ? "auto" : mdDown ? "70%" : "40%"}
                maxWidth={"500px"}
                borderRadius={"40px"}
                alignSelf={"center"}
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"center"}
                alignItems={"center"}
                p={"30px"}
                // m={"40px"}
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
                    {/* <Box display={"flex"} justifyContent={"center"} flexDirection={"column"} width={smDown ? "90%": "50%"}>
                        <Button variant="outlined" color="secondary" onClick={handleRequestChangePassword} disabled={buttonsDisable}>
                            
                                <Typography variant="button" color="inherit">
                                    {!btn_2_Loading ? (<>Recuperar Senha </>): (<CircularProgress size="25px"/>)}
                                </Typography>
                        
                        </Button>
                    </Box> */}
                </Box>
            </Box>
            <Box display={"flex"} flexDirection={"row"} gap={4} mt={2}>
                <Button color="secondary" variant="outlined" onClick={() => {
                    setEmail("emanuela@gmail.com")
                    setPassword("emanuela")
                }}>Secretaria</Button>
                <Button color="secondary" variant="outlined" onClick={() => {
                    setEmail("joao@gmail.com")
                    setPassword("joao")
                }}>Professor</Button>
                <Button color="secondary" variant="outlined" onClick={() => {
                    setEmail("fabricio@gmail.com")
                    setPassword("fabricio")
                }}>Aluno</Button>
            </Box>
        </Box>
    )
}
