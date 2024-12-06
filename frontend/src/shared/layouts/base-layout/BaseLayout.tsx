import { Button, useTheme } from "@mui/material";
import { Box, Divider, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import MenuIcon from '@mui/icons-material/Menu';
import { useMenuContext } from "../../contexts";

export const BaseLayout: React.FC<{children: React.ReactElement, returnPath: string, title: string}> = ({children, returnPath, title}) => {
    
    const theme = useTheme()
    const mdDown = useMediaQuery(theme.breakpoints.down("md"))

    const {toggleMenuOpen} = useMenuContext()
    
    return (
        
        <Box minHeight={"100vh"} width={mdDown ? "100%": "100%"} 
        maxWidth="1200px"
        display={"flex"}
        flexDirection={"column"}
        >
            <Box display={"flex"} alignItems={"center"} gap={1} marginLeft={"20px"}>
                {mdDown && (
                    <Button onClick={() => toggleMenuOpen()}>
                        <MenuIcon color="action" fontSize="large"/>
                    </Button>
                
                )}
                <Typography 
                    variant={mdDown ? "h5":"h4"} 
                    component="h2"
                    height={"80px"}
                    display={"flex"}
                    alignItems={"center"}
                    >
                    {title}
                </Typography>
            </Box>
            <Divider/>
            <Box paddingTop={"20px"} height="auto" width={"100%"} alignSelf={"center"} >
                {children}
            </Box>
        </Box>

    )
}