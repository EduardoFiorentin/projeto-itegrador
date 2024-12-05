import { Box } from "@mui/material"
import React from "react"

export const DashbordCardScroll: React.FC<{children?: React.ReactNode}> = ({children}) => {
    return (
        <Box  width="100%" height={"70%"} maxHeight={"30vh"} gap={2} pb="20px" overflow={"auto"} display="flex" flexDirection={"column"} alignItems="center">
            {children}
        </Box>
    )
}