import { useEffect } from "react"
import { useMenuContext, useUserInfoContext } from "../../shared/contexts"
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BaseLayout } from "../../shared/layouts";


export const Home = () => {
    const { setIsMenuHidden } = useMenuContext()
    const navigate = useNavigate()
    
    setIsMenuHidden(false)

    const {user} = useUserInfoContext()
    
    useEffect(() => {
        if (user == null) navigate('/entrar')
    }, [user])

    return (
        user && (
            <BaseLayout title="Home" returnPath="/">
                <Typography variant="h4" sx={{
                    backgroundColor: "inherit"
                }}>
                    {
                        user.role === 1 || user.role == 2 ? 
                        (
                            <>Secretária / Professor</>
                        ) 
                        : 
                        (
                            <>Aluno</>
                        )
                        
                    }
            </Typography>
        </BaseLayout>
        
    ))
}