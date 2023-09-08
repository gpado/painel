import React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";

import Authentication from "../utils/Authentication";

function DireitosAutorais(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Direitos autorais © '}
      <Link color="inherit" href="http://conespseguros.com.br/">
        Conesp Seguros
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const temaPadrao = createTheme();

export default function Entrar() {
	let navigate = useNavigate();
	const { keycloak } = useKeycloak();
	
	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		
		const onSubmitSuccess = (responseBody) => {
		  console.log(responseBody);
		  
		  keycloak.login({redirectUri: `${window.location.origin}/usuarios`, prompt: 'none'});
		}

		const onSubmitError = (status, message, fullError) => {
		  console.log("Error when trying to login the user.\n");
		  console.log(`${status}: ${message}`);
		  console.log(fullError);
		}

		console.log({
		  email: data.get('email'),
		  password: data.get('senha'),
		});
		
		Authentication.accessSystem(
		  data.get('email'), 
		  data.get('senha'),
		  onSubmitSuccess,
		  onSubmitError
		);
	};

  return (
    <ThemeProvider theme={temaPadrao}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box sx={{ m: 3,width: 230, height: 70}}>
            <img src="logo-seguros.png" alt="Logo" style={{ width: '100%', height: '100%' }} />
          </Box>
          <Typography component="h1" variant="h5">
            Entrar
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Endereço de Email"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="senha"
              label="Senha"
              type="password"
              id="senha"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Lembrar"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Entrar
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Esqueceu a senha?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Não tem uma conta? Cadastre-se"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <DireitosAutorais sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
