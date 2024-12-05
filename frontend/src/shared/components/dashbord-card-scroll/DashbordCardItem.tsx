import { Box, useMediaQuery, useTheme } from "@mui/material"
import React from "react"

export const DashbordCardItem: React.FC<{children?: React.ReactNode}> = ({children}) => {
    const theme = useTheme() 
    const smDown = useMediaQuery(theme.breakpoints.down("sm"))
    const mdDown = useMediaQuery(theme.breakpoints.down("md"))
    
    return (
        <Box 
            width={"90%"} 
            minHeight={smDown ? "auto" : "70px"} 
            sx={{backgroundColor: "primary.light"}} 
            display={"flex"} flexDirection={mdDown ? "column" : "row"} 
            justifyContent={"space-evenly"} 
            borderRadius={"8px"} 
            alignItems={"center"} 
            gap={smDown ? 1 : 0}
            p={smDown ? 1 : 0}
            >
            {children}
        </Box>

        // primeiro
        // <Box width={"90%"} minHeight={"70px"} sx={{backgroundColor: "primary.light"}} display={"flex"} flexDirection={"row"} justifyContent={"space-around"} alignItems={"center"}>
        //     {children}
        // </Box>
    )
}