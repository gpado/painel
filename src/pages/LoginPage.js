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
import { useKeycloak } from '@react-keycloak/web';

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
  const { keycloak, initialized } = useKeycloak();

  const handleLogin = (event) => {
    event.preventDefault();
    if (keycloak) {
      keycloak.login();
    }
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
          <Box component="form" noValidate sx={{ mt: 1 }}>
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
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleLogin}
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
