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

const classes = [
  {
    name: "Aulas de Boxe",
    descr: "Aulas em várias modalidades para todas as idades."
  },
  {
    name: "Treinamento Personalizado",
    descr: "Agende aulas personalizadas com nossos professores em horário flexível."
  },
  {
    name: "Eventos",
    descr: "Contamos com eventos exclusivos para alunos."
  }
]

const testimonial = [
  {
    name: "Henrique D. Santos",
    profile: "data:image/jpeg;base64,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",
    comment: "Ótimo lugar. Treinadores dedicados e ambiente agradavel."
  },
  {
    name: "Renata Almeida",
    profile: "https://pm1.aminoapps.com/6847/253a82cd97983a411c2f047d044eb2c4c9024514v2_hq.jpg",
    comment: "Adoro esta academia. Nunca imaginei que o boxe pudesse ser tão legal."
  },
  {
    name: "Paulo Costa",
    profile: "https://www.petz.com.br/blog/wp-content/uploads/2023/02/perfil-de-gato3.jpg",
    comment: "Ótimo lugar para iniciantes! Me senti muito bem acolhido."
  }
]

const gallery = [
  {
    link: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRUf2yuyuTGua-ahKZJqFC4S7c6ipkiOXSLw&s"
  },
  {
    link: "data:image/jpeg;base64,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"
  },
  {
    link: ""
  }
]

export const LandingPage = () => {
    const { setIsMenuHidden } = useMenuContext()
    const mainTheme = useTheme() 
    const smDown = useMediaQuery(mainTheme.breakpoints.down("sm"))

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
                {classes.map(
                  (service, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <Card sx={{ height: "100%" }}>
                        <CardContent>
                          <Typography variant="h5" gutterBottom>
                            {service.name}
                          </Typography>
                          <Typography>
                            {service.descr}
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
                  {gallery.map((item, idx) => (
                    <Grid item xs={12} sm={6} md={4} key={idx}>
                      <Card>
                        <CardMedia
                          component="img"
                          height="200"
                          image={item.link} // Substituir por imagens reais
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
                {testimonial.map((test, idx) => (
                  <Grid item xs={12} md={4} key={idx}>
                    <Paper elevation={3} sx={{ p: 3 }}>
                      <Typography>
                        "{test.comment}"
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                        <Avatar src={test.profile} />
                        <Typography sx={{ ml: 2 }}>{test.name}</Typography>
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