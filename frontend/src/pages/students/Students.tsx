import { Button, Select, TextField, Typography, useMediaQuery, useTheme } from "@mui/material"
import MenuItem from '@mui/material/MenuItem';
import { BaseLayout } from "../../shared/layouts"
import { Box } from "@mui/system"
import { useEffect, useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { useSnackbar } from "notistack";
import { api } from "../../shared/services";

type Inputs = {
    name: string,
    cpf: string,
    email: string,
    password: string,
    birth_date: string,
    address: string,
    phone_number: string,
    plan_code: string
}

interface IPlan {
    name: string;       
    plancode: number;   
    wclasses: string;   
    totalvalue: string; 
    months: string;     
    active: boolean;    
    renewable: boolean; 
}

export const Students = () => {

    const theme = useTheme() 
    const lgDown = useMediaQuery(theme.breakpoints.down("lg"))
    const smDown = useMediaQuery(theme.breakpoints.down("sm"))

    const { enqueueSnackbar } = useSnackbar();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>()
    
    
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log(data)
        console.log(errors)
        
        api.post("/user/new-student", data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("na_token")}`
            }
        })
        .then(data => {
            console.log(data)
            enqueueSnackbar("Usuário cadastrado com sucesso!", {variant: "success"})
        })
        .catch(error => {
            console.log(error)
            enqueueSnackbar("Erro ao cadastrar usuário!", {variant: "error"})
        })
        
    }

    const [plans, setPlans] = useState<IPlan[]>()

    const getPlans = () => {
        api.get("/plans/getall", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("na_token")}`
            }
        })
        .then(data => {
            console.log(data)
            setPlans(data.data)
        })
        .catch(error => {
            console.log(error)
        })
    }

    useEffect(() => {
        getPlans()
    }, [])

    const [btnSelect, setBtnSelect] = useState<1|2>(1)

    return (
        <BaseLayout title="Alunos" returnPath="/">
            <Box display={"flex"} gap={2} flexDirection={lgDown ? "column" : "row"} justifyContent={"center"}>
                <Box width={"95%"} maxHeight="80vh" height={"80vh"} maxWidth={"800px"} pt={"20px"} sx={{backgroundColor: "primary.light"}}  borderRadius={"16px"} overflow={"auto"}>
                    {
                        btnSelect == 1 ? (

                            <Box display={"flex"} flexDirection={"column"} alignItems={"center"} gap={4} component={"form"} onSubmit={handleSubmit(onSubmit)}>
                                <Typography variant="h4" textAlign={"center"}>Cadastro de aluno</Typography>
                                <Box width={smDown ? "90%" : "50%"} display={"flex"} flexDirection={"column"} gap={3}>
                                    <TextField label="Nome" color="secondary" {...register("name", {required: true})}/>
                                    <TextField label="CPF" color="secondary" {...register("cpf", {required: true})}/>
                                    <TextField label="Email" color="secondary" type="email" {...register("email", {required: true})}/>
                                    <TextField label="Password" color="secondary" {...register("password", {required: true})}/>
                                    <TextField label="Data de Nascimento" color="secondary" type="date" variant="outlined" {...register("birth_date", {required: true})}/>
                                    <TextField label="Endereço" color="secondary" {...register("address", {required: true})}/>
                                    <TextField label="Telefone" color="secondary" type="tel" {...register("phone_number", {required: true})}/>

                                    <Select color="secondary" label="Plano" {...register("plan_code", {required: true})}>
                                        <MenuItem value={0}>Nenhum</MenuItem>
                                        {
                                            plans?.map(item => (
                                                <MenuItem value={item.plancode}>{item.name}</MenuItem>
                                            ))
                                        }
                                    </Select>

                                    <Button variant={"contained"} color="secondary" type="submit">Cadastrar</Button>
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