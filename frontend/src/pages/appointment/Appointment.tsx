import { Box, Button, Select, TextField, MenuItem } from "@mui/material"
import { BaseLayout } from "../../shared/layouts"
import { useState } from "react"

export const Appointment = () => {
    
    // 1 - personal
    // 2 - grupo
    const [classType, setClassType] = useState(1)
    
    return (
        <BaseLayout title="Agendamento" returnPath="/">
            <Box display={"flex"} alignItems={"center"} flexDirection={"column"} height={"100%"}>
                <Box display={"flex"} gap={3}>
                    <Button 
                        variant={classType == 1 ? "contained" : "outlined"} 
                        onClick={() => setClassType(1)}
                        color="secondary"
                        >Aula Personal</Button>

                    <Button 
                        variant={classType == 2 ? "contained" : "outlined"} 
                        onClick={() => setClassType(2)}
                        color="secondary"
                        >Aula em Grupo</Button>
                </Box>

                {
                classType == 1 ? (
                    <Box display={"flex"} flexDirection={"column"} mt={10} gap={3}>
                    
                        <TextField type="date"  sx={{width: "350px"}}/>
                    
                        <Select defaultValue={0} sx={{width: "350px"}} label="professor">
                            <MenuItem value={0}>Professor</MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                        
                        <Select defaultValue={0}  sx={{width: "350px"}}>
                            <MenuItem value={0}>Horário</MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>

                        <Box m={"auto"}>
                            <Button variant="contained" color="secondary">Solicitar agendamento</Button>
                        </Box>
                    </Box>
                ) : (
                    <Box display={"flex"} flexDirection={"column"} mt={10} gap={3}>
                    
                        <TextField type="date"  sx={{width: "350px"}}/>
                    
                        {/* <Select defaultValue={0} sx={{width: "350px"}}>
                            <MenuItem value={0}>Horario</MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select> */}
                        
                        <Select defaultValue={0}  sx={{width: "350px"}}>
                            <MenuItem value={0}>Aulas Disponíveis</MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>

                        <Box m={"auto"}>
                            <Button variant="contained" color="secondary">Participar</Button>
                        </Box>
                    </Box>
                )
                }
            </Box>
        </BaseLayout>
    )
}