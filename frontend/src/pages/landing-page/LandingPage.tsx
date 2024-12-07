import { useEffect } from "react"
import { useMenuContext } from "../../shared/contexts"
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
    profile: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlQFrQk6LRhTe4S4I77LnGpo8a1gVSV_RwrQ&s",
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
    link: "https://static.ndmais.com.br/2022/03/boxe-kamila-esporte-com-k-1.jpeg"
  },
  {
    link: "https://i.ytimg.com/vi/Dz7JQInh-yk/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCa7c9aq7KZVHFlcVUDvg-F4mAdZg"
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
                {!smDown && <Button color="inherit">Serviços</Button>}
                {!smDown && <Button color="inherit">Fotos</Button>}
                {!smDown && <Button color="inherit">Avaliações</Button>}
                <Button color="inherit" onClick={() => navigate("/entrar")}>Entrar</Button>
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