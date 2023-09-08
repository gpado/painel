import React from 'react';

import { useNavigate } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import AlertPopUp from '../components/AlertPopUp';

export default function Home() {
	let navigate = useNavigate();
	const { keycloak } = useKeycloak();
	
	const [popUpInfo, setPopUpInfo] = React.useState({
		isOpen: false,
		title: "",
		type: "info",
		message: ""
	});
	
	const togglePopUp = () => {
		setPopUpInfo(previousInfo => ({
			...previousInfo,
			isOpen: !previousInfo.isOpen
		}));
	}
	
	keycloak.onAuthError = () => {
		setPopUpInfo(previousInfo => ({
			...previousInfo,
			title: "Erro ao Autenticar",
			message: "Não foi possível autenticar suas credenciais no momento. Por favor, tente novamente mais tarde.",
			type: "error"
		}));
		togglePopUp();
	}
	
	keycloak.onAuthSuccess = () => {
		setPopUpInfo(previousInfo => ({
			...previousInfo,
			title: "Sucesso oa Autenticar",
			message: "Redirecionando você para o sistema...",
			type: "success"
		}));
		togglePopUp();
		navigate('/usuarios');
	}
	
	const handleClick = () => {
		keycloak.login({redirectUri: `${window.location.origin}/usuarios`});
	};

  return (
	<Grid>
		<Grid item xs={6}>
		<Container>
			<Box
			  sx={{
				marginTop: 8,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'space-between',
			  }}
			>
				<Box sx={{ m: 3,width: 230, height: 70}}>
					<img src="logo-seguros.png" alt="logotipo: Conesp Seguros" style={{ width: '100%', height: '100%' }} />
				</Box>
				
				<Typography variant="h4" component="h2">Sistema de Gestão</Typography>
				
				<Button mt={5} variant="contained" onClick={handleClick}>Acessar</Button>
				
				<AlertPopUp 
					title={popUpInfo.title}
					type={popUpInfo.type}
					isOpen={popUpInfo.isOpen}
					onClose={togglePopUp}
				>
					{popUpInfo.message}
				</AlertPopUp>
			</Box>
		</Container>
		</Grid>
		<Grid item xs={6}>
			<Box sx={{ bgColor: 'primary.main', height: '100%', width: '100%' }} />
		</Grid>
	</Grid>
    
  );
}
