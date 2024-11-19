import { useTheme } from "@emotion/react";
import { Box, Divider, Typography } from "@mui/material";
import React from "react";

export const BaseLayout: React.FC<{children: React.ReactElement, returnPath: string, title: string}> = ({children, returnPath, title}) => {
    
    const theme = useTheme()
    
    
    return (
        
        <Box minHeight={"100vh"} width="100vw" sx={{
            // backgroundColor: "primary.light"
        }}>
            <Typography 
                variant="h4" 
                component="h2"
                height={"80px"}
                display={"flex"}
                alignItems={"center"}
                // paddingBottom={2}
                // paddingTop={2}
                
                >
                {title}
            </Typography>
            <Divider/>
            <Box paddingTop={"20px"} height="auto" width={"80vw"}>
                {children}
            </Box>
        </Box>

    )
}