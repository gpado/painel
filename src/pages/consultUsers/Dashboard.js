import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import NavBar from "../../components/NavBar";
import DefaultTable from "../../components/DefaultTable";
import TesteTable from "../../components/TesteTable";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO  shouldremove, this demon't need to reset the theme.
const defaultTheme = createTheme();

const headers = ["Id", "Nome", "E-mail", "Telefone", "Tipo"];

const data = [
  [1, "João", "joaoa@email.com", "(11)98651-2354", "Gestor"],
  [2, "Antônia", "joaoa@email.com", "(11)98651-2354", "Funcionário"],
  [3, "Paulo", "joaoa@email.com", "(11)98651-2354", "Funcionário"]
];

export default function Dashboard() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />

        <NavBar />

        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto"
          }}
        >
          <Container maxWidth="lg" sx={{ mt: 14, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TesteTable numberOfRows={10} data={data} headers={headers} />
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
