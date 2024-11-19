import { Avatar, Box, Button, Divider, Drawer, Icon, List, ListItemButton, ListItemIcon, ListItemText, Typography, useMediaQuery, useTheme } from "@mui/material"
// import { useAppThemeContext, useDrawerContext } from "../../contexts"
import { useAppThemeContext, useMenuContext, useUserInfoContext } from "../../contexts"
import { useMatch, useNavigate, useResolvedPath } from "react-router-dom"


interface IListItemLinkProps {
    label: string,
    icon: string,
    to: string,
    onClick: (() => void) | undefined
}

const ListItemLink: React.FC<IListItemLinkProps> = ({to, icon, label, onClick}) => {
    const navigate = useNavigate()

    // pegar rota em que estamos 
    const resolvedPath = useResolvedPath(to)
    const match = useMatch({path: resolvedPath.pathname, end: false})



    const handleClick = () => {
        navigate(to)               // navega para a rota nova
        onClick && onClick()       // fecha o menu em telas menores
    }
    
    return (
        <ListItemButton onClick={handleClick} selected={!!match}>
            <ListItemIcon>
                <Icon>
                    {icon}
                </Icon>
            </ListItemIcon>
            <ListItemText primary={label} />
        </ListItemButton>
    )
}


export const SideMenu: React.FC<{children?: React.ReactNode}> = ({children}) => {

    const theme = useTheme()

    // pegar tamanho atual da tela
    // retorna true se o tamanho está abaixo de md (900px)
    const smDown = useMediaQuery(theme.breakpoints.down("sm"))
    const mdDown = useMediaQuery(theme.breakpoints.down("md"))
    const {user} = useUserInfoContext()


    const {isMenuOpen, toggleMenuOpen, menuOptions, isMenuHidden} = useMenuContext() 
    const { themeName, toggleTheme } = useAppThemeContext()

    return (
        <>
            <Drawer variant={mdDown ? "temporary":"permanent"} open={isMenuOpen} onClose={toggleMenuOpen} hidden={isMenuHidden}>
                <Box 
                    width={"200px"} 
                    height="100%" 
                    display="flex" 
                    flexDirection="column">


                    <Box 
                        width="100%" 
                        height={theme.spacing(10)} 
                        display="flex" 
                        flexDirection={"column"}
                        alignItems="center" 
                        justifyContent="center">
                        
                        <Box width={"40%"}> 
                            <Typography height={theme.spacing(2)} fontSize={12}>Olá,</Typography>
                        </Box>
                        <Typography variant="h5">{user && user.name}</Typography>

                    </Box>

                    <Divider/>
    
                    {/* Flex 1 - ocupa todo o resto da extenção do componente pai */}
                    

                    <Box flex={1}>
                        
                        <List component={"nav"}>
                            {
                                menuOptions.map( menuOption => (
                                    <ListItemLink 
                                        key={menuOption.path}
                                        icon={menuOption.icon}
                                        to={menuOption.path}
                                        label={menuOption.label} 
                                        onClick={smDown ? toggleMenuOpen : undefined}
                                    />
                                ))
                            }
                        </List>
                    </Box>

                    <Box>
                        
                        <List component={"nav"}>
                            {
                               <ListItemButton onClick={toggleTheme}>
                               <ListItemIcon>
                                    <Icon>
                                       {themeName === 'light' ? <>dark_mode</>:<>light_mode</>}
                                    </Icon>
                                    </ListItemIcon>
                                    <ListItemText primary={"Alternar tema"} />
                                </ListItemButton>
                            }
                        </List>
                    </Box>

                </Box>
            </Drawer>

            {/* height="100vh" width={"80vw"} */}
            <Box paddingLeft={(mdDown || isMenuHidden) ? 0 : "200px"} sx={{
                backgroundColor: "inherit"
            }}>
                {children}
            </Box>
        </>
    )
}