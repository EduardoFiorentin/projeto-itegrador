import { Button, Select, TextField, Typography, useMediaQuery, useTheme } from "@mui/material"
import MenuItem from '@mui/material/MenuItem';
import { BaseLayout } from "../../shared/layouts"
import { Box } from "@mui/system"
import { useState } from "react"


export const Students = () => {

    const theme = useTheme() 
    const lgDown = useMediaQuery(theme.breakpoints.down("lg"))

    const [btnSelect, setBtnSelect] = useState<1|2>(1)

    return (
        <BaseLayout title="Alunos" returnPath="/">
            <Box display={"flex"} gap={2} flexDirection={lgDown ? "column" : "row"} justifyContent={"center"}>
                <Box width={"95%"} maxHeight="80vh" height={"80vh"} maxWidth={"800px"} pt={"20px"} sx={{backgroundColor: "primary.light"}}  borderRadius={"16px"} overflow={"auto"}>
                    {
                        btnSelect == 1 ? (

                            <Box display={"flex"} flexDirection={"column"} alignItems={"center"} gap={4}>
                                <Typography variant="h4" textAlign={"center"}>Cadastro de aluno</Typography>
                                <Box width={"50%"} display={"flex"} flexDirection={"column"} gap={3}>
                                    <TextField label="Nome" color="secondary"/>
                                    <TextField label="CPF" color="secondary"/>
                                    <TextField label="Email" color="secondary" type="email"/>
                                    <TextField label="Password" color="secondary"/>
                                    <TextField label="Data de Nascimento" color="secondary" type="date" variant="outlined"/>
                                    <TextField label="Endereço" color="secondary"/>
                                    <TextField label="Telefone" color="secondary" type="tel"/>

                                    <Select color="secondary" label="Plano">
                                        <MenuItem value={1}>Golt 1 mes ruim</MenuItem>
                                        <MenuItem value={2}>Silver 3 meses pior ainda</MenuItem>
                                        <MenuItem value={3}>lata de lixo 24 meses ruim pkr</MenuItem>
                                    </Select>

                                    <Button variant={"contained"} color="secondary">Cadastrar</Button>
                                </Box>
                            </Box>

                        ) : (

                            <Box display={"flex"} flexDirection={"column"} alignItems={"center"} gap={4}>
                                <Typography variant="h4" textAlign={"center"}>Pesquisar aluno</Typography>
                                <Box width={"50%"} display={"flex"} flexDirection={"column"} gap={3}>
                                    <TextField label="Nome" color="secondary"/>
                                    <Button variant={"contained"} color="secondary">Pesquisar</Button>
                                </Box>
                                <Box>
                                    <Typography variant="h6" textAlign={"center"}>Nome - cpf - telefone - plano</Typography>
                                </Box>
                            </Box>

                        )
                    }
                </Box>
                <Box width={"250px"} height={"100px"} display={"flex"} flexDirection={"column"} gap={2}>
                    <Button variant={btnSelect == 1 ? "contained": "outlined"} onClick={() => setBtnSelect(1)} color="secondary">Cadastrar</Button>
                    <Button variant={btnSelect == 1 ? "outlined": "contained"} onClick={() => setBtnSelect(2)} color="secondary">Pesquisar</Button>
                </Box>
            </Box>
        </BaseLayout>
    )
}