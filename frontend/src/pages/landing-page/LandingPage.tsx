import { useEffect } from "react"
import { useMenuContext } from "../../shared/contexts"
import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Paper,
  Avatar,
  useMediaQuery,
} from "@mui/material";
import { ThemeProvider, createTheme, useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: "#4A148C", // Roxo escuro
    },
    secondary: {
      main: "#FFC107", // Amarelo
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
});

import bgHeaderImage from "../../assets/images/land_page_header_bg.jpg"



export const LandingPage = () => {
    const { setIsMenuHidden } = useMenuContext()
    const mainTheme = useTheme() 
    const lgDown = useMediaQuery(mainTheme.breakpoints.down("lg"))
    const mdDown = useMediaQuery(mainTheme.breakpoints.down("md"))
    const smDown = useMediaQuery(mainTheme.breakpoints.down("sm"))
    // setIsMenuHidden(true)

    const navigate = useNavigate()
    useEffect(() => setIsMenuHidden(true), [])
    
    return (
        <Box maxWidth={"100vw"} overflow={"hidden"} m={0}>
            <ThemeProvider theme={theme}>
            {/* Navbar */}
            <AppBar position="static">
              <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                  Nobre Arte
                </Typography>
                {!smDown && <Button color="inherit">Sobre</Button>}
                {!smDown && <Button color="inherit">Treinamentos</Button>}
                {!smDown && <Button color="inherit">Contato</Button>}
                <Button color="inherit" onClick={() => navigate("/entrar")}>Login</Button>
              </Toolbar>
            </AppBar>
            {/* Hero Section */}
            <Box
              sx={{
                height: "80vh",
                backgroundImage: `url(${bgHeaderImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                m: 0,
                textAlign: "center",
              }}
            >
              <Box>
                <Typography variant="h2" fontWeight={'bold'}>
                  Nobre Arte
                </Typography>
                <Typography variant="h5" >
                  A verdadeira arte do boxe.
                </Typography>
            
                <Box mt={"30px"}>
                    <Button variant="contained" color="secondary" size="large">
                      Inscreva-se Agora
                    </Button>
                </Box>
              </Box>
            </Box>
            {/* Serviços */}
            <Container sx={{ py: 6 }}>
              <Typography variant="h4" textAlign="center" gutterBottom>
                Nossos Serviços
              </Typography>
              <Grid container spacing={4}>
                {["Aulas de Boxe", "Treinamento Personalizado", "Eventos"].map(
                  (service, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <Card sx={{ height: "100%" }}>
                        <CardContent>
                          <Typography variant="h5" gutterBottom>
                            {service}
                          </Typography>
                          <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Pellentesque efficitur ex eu erat vehicula, quis vehicula
                            elit fermentum.
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  )
                )}
              </Grid>
            </Container>
            {/* Galeria */}
            <Box sx={{ py: 6, bgcolor: "grey.100" }}>
              <Container>
                <Typography variant="h4" textAlign="center" gutterBottom>
                  Galeria
                </Typography>
                <Grid container spacing={4}>
                  {[1, 2, 3, 4, 5, 6].map((item) => (
                    <Grid item xs={12} sm={6} md={4} key={item}>
                      <Card>
                        <CardMedia
                          component="img"
                          height="200"
                          image={`/gallery-${item}.jpg`} // Substituir por imagens reais
                          alt={`Galeria ${item}`}
                        />
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Container>
            </Box>
            {/* Depoimentos */}
            <Container sx={{ py: 6 }}>
              <Typography variant="h4" textAlign="center" gutterBottom>
                O que dizem sobre nós
              </Typography>
              <Grid container spacing={4}>
                {[1, 2, 3].map((testimonial) => (
                  <Grid item xs={12} md={4} key={testimonial}>
                    <Paper elevation={3} sx={{ p: 3 }}>
                      <Typography>
                        “A melhor academia de boxe que já frequentei. Os treinadores
                        são incríveis e o ambiente é acolhedor.”
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                        <Avatar src={`/avatar-${testimonial}.jpg`} />
                        <Typography sx={{ ml: 2 }}>Cliente Satisfeito</Typography>
                      </Box>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Container>
            {/* Footer */}
            <Box
              sx={{
                py: 3,
                bgcolor: "primary.main",
                color: "white",
                textAlign: "center",
              }}
            >
              <Typography variant="body2">
                &copy; {new Date().getFullYear()} Nobre Arte. Todos os direitos
                reservados.
              </Typography>
            </Box>
                  </ThemeProvider>
        </Box>
    )
}