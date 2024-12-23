import { Autocomplete, Button, Select, TextField, Typography, useMediaQuery, useTheme } from "@mui/material"
import MenuItem from '@mui/material/MenuItem';
import { BaseLayout } from "../../shared/layouts"
import { Box } from "@mui/system"
import { useEffect, useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { useSnackbar } from "notistack";
import { api } from "../../shared/services";
import { useNavigate } from "react-router-dom";
import { useUserInfoContext } from "../../shared/contexts";

type Inputs = {
    name: string,
    cpf: string,
    email: string,
    password: string,
    birth_date: string,
    address: string,
    phone_number: string,
    plan_code: string,
    accesscode: string
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

interface IUser {
    name: string,
    cpf: string,
    email: string,
    address: string,
    pnumber: string
}

export const Students = () => {

    const theme = useTheme() 
    const lgDown = useMediaQuery(theme.breakpoints.down("lg"))
    const smDown = useMediaQuery(theme.breakpoints.down("sm"))

    const {user} = useUserInfoContext()

    const [users, setUsers] = useState<IUser[]>([])
    const [search, setSearch] = useState<string>('')
    const [confirm, setConfirm] = useState(false)

    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>()
    
    
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        api.post("/user/new-student", data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("na_token")}`
            }
        })
        .then(data => {
            enqueueSnackbar("Usuário cadastrado com sucesso!", {variant: "success"})
        })
        .catch(err => {
            enqueueSnackbar(err.response.data, {variant: "error"})
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
            setPlans(data.data)
        })
        .catch(err => {
            if (err.code === "ERR_NETWORK") {
                enqueueSnackbar("Erro ao conectar-se com o servidor!", {variant: "error"})
            }
            else if (err.response.status === 401) {
                enqueueSnackbar("Erro de autenticação! Faça login novamente para continuar.", {variant: "error"})
                navigate("/entrar")
            }
            else enqueueSnackbar("Não foi possível carregar os planos!", {variant: "error"})
        })
    }


    const searchUser = () => {
        if (search && search.length >= 3) {

            api.post("/user/search", {search},{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("na_token")}`
                }
            })
            .then(data => {
                setUsers(data.data)
            })
            .catch(err => {
                if (err.code === "ERR_NETWORK") {
                    enqueueSnackbar("Erro ao conectar-se com o servidor!", {variant: "error"})
                }
                else if (err.response.status === 401) {
                    enqueueSnackbar("Erro de autenticação! Faça login novamente para continuar.", {variant: "error"})
                    navigate("/entrar")
                }
                else enqueueSnackbar(err.response.data, {variant: "error"})
            })

        } else {
            setUsers([])
        }
    }

    useEffect(() => {
        getPlans()
    }, [])

    useEffect(() => searchUser(), [search, confirm])
    useEffect(() => {
        if (user == null) navigate('/entrar')
    }, [user])

    const [btnSelect, setBtnSelect] = useState<1|2>(1)

    return (
        <BaseLayout title="Alunos" returnPath="/">
            <Box display={"flex"} gap={2} flexDirection={lgDown ? "column-reverse" : "row"} justifyContent={"center"} alignItems={lgDown ? "center" : "flex-start"}>
                <Box width={"95%"} maxHeight="75vh" height={"80vh"} maxWidth={"800px"} pt={"20px"} sx={{backgroundColor: "primary.light"}}  borderRadius={"16px"} overflow={"auto"}>
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
                                    <TextField label="Codigo de Acesso" color="secondary" type="text" {...register("accesscode", {required: true})}/>

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
                                <Box width={smDown ? "90%" : "50%"} display={"flex"} flexDirection={"column"} gap={3}>
                                <Autocomplete
                                    sx={{width: "100%"}}
                                    options={users.map(user => user.name)}
                                    renderInput={(params) => <TextField {...params} label="Alunos" onChange={event => {
                                        setSearch(event.target.value)
                                        setConfirm(false)
                                    }}
                                    />}
                                    onChange={(event, newValue) => {
                                        if (newValue === null) setSearch("")
                                        else setSearch(newValue)
                                    }}
                                    />
                                    <Button variant={"contained"} color="secondary" onClick={() => setConfirm(true)}>Confirmar</Button>
                                </Box>
                                {
                                    (confirm && users.length !== 0) && (
                                        <>
                                            <Box width={smDown ? "100%" : "50%"} sx={{backgroundColor: "primary.dark"}} p={"20px"} display={"flex"} flexDirection={"column"} alignItems={"center"} borderRadius={"18px"}>
                                            <Typography variant="h6" textAlign={"left"}>Dados do aluno</Typography>
                                            {confirm && users.map(data => {if (data.name === search) return (
                                                <Box>
                                                    <Typography variant="body2" fontSize={"18px"} component={"p"}>Nome: {data.name}</Typography>
                                                    <Typography variant="body2" fontSize={"18px"} component={"p"}>CPF: {data.cpf}</Typography>
                                                    <Typography variant="body2" fontSize={"18px"} component={"p"}>Email: {data.email}</Typography>
                                                    <Typography variant="body2" fontSize={"18px"} component={"p"}>Endereço: {data.address}</Typography>
                                                    <Typography variant="body2" fontSize={"18px"} component={"p"}>Telefone: {data.pnumber}</Typography>
                                                </Box>
                                            )})}
                                            
                                        </Box>
                                        <Box display={"flex"} gap={3} maxWidth={"100%"}>
                                            <Button disabled>Enviar Email</Button>
                                        </Box>
                                    </>
                                    )
                                }
                            </Box>

                        )
                    }
                </Box>
                <Box width={lgDown ? "100%" : "250px"} height={lgDown ? "auto" : "100px"} display={"flex"} flexDirection={lgDown ? "row" : "column"} gap={2} justifyContent={"center"}>
                    <Button variant={btnSelect == 1 ? "contained": "outlined"} onClick={() => setBtnSelect(1)} color="secondary">Cadastrar</Button>
                    <Button variant={btnSelect == 1 ? "outlined": "contained"} onClick={() => setBtnSelect(2)} color="secondary">Pesquisar</Button>
                </Box>
            </Box>
        </BaseLayout>
    )
}