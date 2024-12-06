import { useEffect, useState } from "react"
import { useMenuContext, useUserInfoContext } from "../../shared/contexts"
import { Box, Button, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BaseLayout } from "../../shared/layouts";
import { api } from "../../shared/services";

import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { formatIsoDate } from "../../shared/utils";
import { useSnackbar } from "notistack";

interface IClassRequest {
    status: string,
    student_name: string,
    teacher_name: string,
    data: string,
    wday: any,
    starth: string,
    endh: string,
    modality: string
}

export const HandleRequestClasses = () => {
    const { setIsMenuHidden } = useMenuContext()
    const theme = useTheme() 
    const { enqueueSnackbar } = useSnackbar();

    
    setIsMenuHidden(false)
    const lgDown = useMediaQuery(theme.breakpoints.down("lg"))
    const smDown = useMediaQuery(theme.breakpoints.down("sm"))

    const navigate = useNavigate()
    const {user} = useUserInfoContext()
    
    const [data, setData] = useState<IClassRequest[]>([])

    useEffect(() => {
        getClassRequests()
    }, [])

    const getClassRequests = () => {
        api.get("/classes/getall-requestClasses", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("na_token")}`
            }
        })
        .then(data => {
            setData(data.data)
        })
        .catch(data => {})
    }

    const handleRequest = (item: IClassRequest, status: "accepted"|"rejected") => {
        
        const requestData = {
            wday: item.wday,
            starth: item.starth,
            endh: item.endh,
            data: formatIsoDate(item.data),
            change: status
        }

        

        api.post("/classes/handle-requestClass", requestData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("na_token")}`
            }
        })
        .then(dt => {
            enqueueSnackbar(dt.data, {variant: "success"})
            const newData = data.filter((itm: IClassRequest) => itm != item)
            setData(newData)
        })
        .catch(data => {
            enqueueSnackbar(data.data, {variant: "error"})
        })
    } 


    return (
        user !== null && user?.role === 1 || user?.role === 2 ? (
            <BaseLayout title="Solicitações de Agendamento" returnPath="/">
                <Box display={"flex"} gap={2} flexDirection={lgDown ? "column" : "row"} alignItems={"center"} justifyContent={"center"}>
                    <Box width={"95%"} height="80vh" maxWidth={"800px"} pt={"20px"} sx={{backgroundColor: "primary.light"}}  borderRadius={"16px"}>
                        <Box 
                            sx={{backgroundColor: "primary.main"}} 
                            width={"90%"} 
                            height={"80%"} 
                            ml={"5%"} 
                            mt={"5%"} 
                            display={"flex"} 
                            flexDirection={"column"} 
                            alignItems={"center"} 
                            gap={2} pt={2} 
                            overflow={"auto"} 
                            borderRadius={"16px"}>

                            {data.length != 0 ? (
                                data.map((sch) => (
                                   
                                    <Box width={"95%"} minHeight={smDown ? "auto" : "90px"} display={"flex"} sx={{backgroundColor: "primary.dark"}} flexDirection={smDown ? "column" : "row"} gap={smDown ? 2 : 0} p={smDown ? 2 : 0}>
                                        <Box height={"100%"} width={smDown ? "auto" :"25%"} display={"flex"} flexDirection={smDown ? "row" : "column"} justifyContent={smDown ? "space-evenly" : "center"} alignItems={"center"} gap={0} >
                                            <Box>
                                                <Typography variant="body1">{sch.wday}</Typography>
                                                <Typography variant="body1">{sch.data.split("T")[0]}</Typography> 

                                            </Box>
                                            <Box>
                                                <Typography variant="body1">{`${sch.starth.split(":")[0]}:${sch.starth.split(":")[1]} - ${sch.endh.split(":")[0]}:${sch.endh.split(":")[1]}`}</Typography> 
                                            </Box>
                                        </Box>
                                        <Box height={"100%"} width={smDown ? "auto" : "50%"} display={"flex"} justifyContent={"center"} alignItems={"center"} flexDirection={"column"} gap={1}>
                                            <Box>
                                                <Typography variant={smDown ? "h6" : "h5"} fontWeight={"bold"}>{sch.modality}</Typography> 
                                            </Box>
                                            <Box display={"flex"} justifyContent={"space-around"} alignContent={"center"} gap={5}>
                                                <Typography variant="body1">Prof. {sch.teacher_name.split(" ")[0]}</Typography> 
                                                <Typography variant="body1">Al. {sch.student_name.split(" ")[0]}</Typography>
                                            </Box>
                                        </Box>
                                        <Box height={"100%"} width={smDown ? "auto" :"25%"} display={"flex"} justifyContent={"center"} alignItems={"center"} gap={2}>
                                            <Box>
                                                <Button sx={{backgroundColor: "#46FF3Ddd", border: "1px solid gray"}} onClick={() => handleRequest(sch, "accepted")}>
                                                    <CheckIcon color="primary"/>
                                                </Button>
                                            </Box>
                                            <Box>
                                                <Button sx={{backgroundColor: "#FF3D40dd", border: "1px solid gray"}} onClick={() => handleRequest(sch, "rejected")}>
                                                    <ClearIcon color="primary"/>
                                                </Button>
                                            </Box>
                                        </Box>
                                    </Box>
                                    ) 
                            )) : (
                                <Typography variant="h6">
                                    Não há solicitações no momento
                                </Typography>
                            )}

                        </Box>
                    </Box>
                </Box>
            </BaseLayout>
        
    ) : (
        <>Sem Dados</>
    )
)}