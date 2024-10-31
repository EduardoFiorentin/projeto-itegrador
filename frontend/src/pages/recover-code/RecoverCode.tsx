import { useEffect, useState } from "react"
import { useMenuContext } from "../../shared/contexts"
import { Box, Button, CircularProgress, TextField, Typography, useMediaQuery, useTheme } from "@mui/material"
import { useNavigate } from "react-router-dom"

export const RecoverCode = () => {

    const { setIsMenuHidden } = useMenuContext()

    const theme = useTheme()
    const smDown = useMediaQuery(theme.breakpoints.down('sm'))
    const mdDown = useMediaQuery(theme.breakpoints.down('md'))

    const [btn_1_Loading, setBtn_1_Loading] = useState<boolean>(false)
    const [buttonsDisable, setButtonsDisable] = useState<boolean>(false)

    const navigate = useNavigate()
    // const handleNavigate = (to: string) => {
    //     navigate(to)
    // }

    const handleVerifyCode = () => {
        setButtonsDisable(true)
        setBtn_1_Loading(true)

        setTimeout(() => {
            console.log("Requisição de troca de senha")
            navigate("/change-pass")
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
                gap={3}
            > 
                <Typography  variant={"subtitle1"} component="h2" textAlign={"center"}>
                    Um código de verificação foi enviado para <br/>o email ed****336@gmail.com.
                </Typography>

                <Box display={"flex"} flexDirection={"column"} width={smDown ? "90%": "50%"}>
                    <TextField label="Codigo de verificação" type="number" variant="filled"/>
                </Box>

                <Box display={"flex"} flexDirection={"column"} gap={2} width={"80%"} alignItems={"center"}>
                    <Box display={"flex"} justifyContent={"center"} flexDirection={"column"} width={smDown ? "90%": "50%"}>
                        <Button variant="contained" disabled={buttonsDisable} onClick={handleVerifyCode}>
                            {!btn_1_Loading ? (<>Verificar</>) : (<CircularProgress size="25px"/>)}
                        </Button>
                    </Box>
                    <Box display={"flex"} justifyContent={"center"} flexDirection={"column"} width={smDown ? "90%": "50%"}>
                        <Button variant="outlined" onClick={() => navigate("/login")} disabled={buttonsDisable} onClickCapture={() => navigate("/login")}>
                            <Typography variant="button" color="inherit">
                               Voltar
                            </Typography>
                        </Button>
                    </Box>
                </Box>
            </Box>

        </Box>
    )
}