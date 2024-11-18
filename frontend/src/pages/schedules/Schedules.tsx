import { Box, Icon, Typography } from "@mui/material"
import { BaseLayout } from "../../shared/layouts"
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const data = [
    {sched: "08:00 - 08:59", teacher: "João", modality: "Classic Sparring", participants: 6},
    {sched: "09:00 - 09:59", teacher: "João", modality: "Classic Sparring", participants: 6},
]

export const Schedules = () => {


    return (
        <BaseLayout title="Horários" returnPath="/">
            <Box width={"95%"} height="80vh" maxWidth={"800px"} pt={"20px"} sx={{backgroundColor: "red"}}>
                <Box width={"100%"} height={"80px"} sx={{backgroundColor: "green"}} display={"flex"}>
                    <Box sx={{backgroundColor: "purple"}} height={"100%"} width={"15%"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                        <ChevronLeftIcon fontSize="large"/>
                    </Box>
                    <Box  sx={{backgroundColor: "orange"}}  height={"100%"} width={"70%"} display={"flex"} justifyContent={"center"} alignItems={"center"}>

                        <Box textAlign={"center"}>
                            <Typography variant="h5" component={"p"}>
                                Segunda
                            </Typography>
                            <Typography>
                                10/10/1010
                            </Typography>

                        </Box>

                    </Box>
                    <Box  sx={{backgroundColor: "yellow"}} height={"100%"} width={"15%"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                        <ChevronRightIcon fontSize="large"/>
                    </Box>
                </Box>
                <Box>

                </Box>
            </Box>
        </BaseLayout>
    )
}