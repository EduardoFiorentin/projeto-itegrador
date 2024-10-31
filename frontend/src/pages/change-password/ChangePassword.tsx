import { useEffect, useState } from "react"
import { useMenuContext } from "../../shared/contexts"
import { Box, Button, CircularProgress, TextField, Typography, useMediaQuery, useTheme } from "@mui/material"
import { useNavigate } from "react-router-dom"

export const ChangePassword = () => {

    const { setIsMenuHidden } = useMenuContext()
    const navigate = useNavigate()

    const theme = useTheme()
    const smDown = useMediaQuery(theme.breakpoints.down('sm'))
    const mdDown = useMediaQuery(theme.breakpoints.down('md'))

    const [btn_1_Loading, setBtn_1_Loading] = useState<boolean>(false)
    const [buttonsDisable, setButtonsDisable] = useState<boolean>(false)

    const handleChangePassword = () => {
        setBtn_1_Loading(true)
        setButtonsDisable(true)

        setTimeout(() => {
            navigate("/login")

        }, 1000)
    }

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
                <Box>
                    <Typography  variant={smDown ? "h5" : "h4"} component="h2" textAlign={"center"}>
                        Mudar senha
                    </Typography>
                    <Typography  variant={"subtitle1"} component="h3" textAlign={"center"}>
                        Insira uma nova senha
                    </Typography>
                </Box>

                <Box display={"flex"} flexDirection={"column"} gap={2} width={"80%"}>
                    <TextField label="Nova senha" type="text"/>
                    <TextField label="Digite a nova senha novamente" type="password"/>
                </Box>

                <Box display={"flex"} flexDirection={"column"} gap={2} width={"80%"} alignItems={"center"}>
                    <Box display={"flex"} justifyContent={"center"} flexDirection={"column"} width={smDown ? "90%": "50%"}>

                        <Button variant="contained" disabled={buttonsDisable} onClick={handleChangePassword}> 
                            {
                                !btn_1_Loading ? <>Alterar senha</> : (<CircularProgress size="25px"/>)
                            }
                        </Button>

                    </Box>
                    <Box display={"flex"} justifyContent={"center"} flexDirection={"column"} width={smDown ? "90%": "50%"} >
                        <Button variant="outlined" onClick={() => navigate("/login") } color="inherit" disabled={buttonsDisable}> 
                            <Typography variant="button" color="inherit">
                            Cancelar
                            </Typography>
                        </Button>
                    </Box>
                </Box>
            </Box>

        </Box>
    )
}