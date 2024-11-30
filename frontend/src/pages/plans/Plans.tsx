import { Button, Select, TextField, Typography, useMediaQuery, useTheme } from "@mui/material"
import MenuItem from '@mui/material/MenuItem';
import { BaseLayout } from "../../shared/layouts"
import { Box } from "@mui/system"
import { useEffect, useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { useSnackbar } from "notistack";
import { api } from "../../shared/services";

type Inputs = {
    user_cpf: string,
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

export const Plans = () => {

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
        
        api.post("/plans/contract", data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("na_token")}`
            }
        })
        .then(data => {
            console.log(data)
            enqueueSnackbar("Plano contratado com sucesso!", {variant: "success"})
        })
        .catch(error => {
            console.log(error)
            enqueueSnackbar("Erro!", {variant: "error"})
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


    return (
        <BaseLayout title="Contratar Plano" returnPath="/">
            <Box display={"flex"} gap={2} flexDirection={lgDown ? "column" : "row"} justifyContent={"center"} component={"form"} onSubmit={handleSubmit(onSubmit)}>
                <Box width={"95%"} maxHeight="80vh" height={"80vh"} maxWidth={"800px"} pt={"20px"} sx={{backgroundColor: "primary.light"}}  borderRadius={"16px"} overflow={"auto"}>
                    <Box display={"flex"} flexDirection={"column"} alignItems={"center"} gap={4}>
                        <Typography variant="h4" textAlign={"center"}>Planos</Typography>
                        <Box width={smDown ? "90%" : "50%"} display={"flex"} flexDirection={"column"} gap={3}>
                            <TextField label="CPF do Aluno" color="secondary" {...register("user_cpf", {required: true})}/>
                            <Select color="secondary" label="Plano" {...register("plan_code", {required: true})} defaultValue={0}>
                                        <MenuItem value={0}>Nenhum</MenuItem>
                                        {
                                            plans?.map(item => (
                                                <MenuItem value={item.plancode}>{item.name}</MenuItem>
                                            ))
                                        }
                            </Select>
                            <Button variant={"contained"} color="secondary" type="submit">Contratar</Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </BaseLayout>
    )
}