import React from "react";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";

import dayjs, { DayJS } from 'dayjs';

import TabView from "../components/TabView";
import NavBar from "../components/NavBar";
import DefaultTable from "../components/DefaultTable";
import organizeData from "../components/OrganizeData";
import FormDialog from "../components/FormDialog";
import ConfirmDialog from "../components/ConfirmDialog";
import AlertPopUp from "../components/AlertPopUp";

import customTheme from "../theme.js";

import ControllerContracts from "../utils/ControllerContracts.js";

import ControllerHistory from "../utils/ControllerBrowserHistory.js";

const employeeInputElements = [
  { id: "id", type: "pk", label: "Id", columns: 3, state: null },
  { id: "expiration", type: "date", label: "Dt. Expiração", columns: 7, state: null },
  { id: "cnpj", type: "text", label: "CNPJ Cliente", columns: 7, state: null },
  { id: "insurancePolicyId", type: "number", label: "Nº da Apólice", columns: 7, state: null },
  { id: "customerId", type: "number", label: "Id Cliente", columns: 7, state: null }
];

const getStateValues = (stateObject) => {
	const statesValues = {};
	Object.keys(stateObject).forEach((stateName) => {
		statesValues[stateName] = stateObject[stateName][0];
	});
	
	return statesValues;
}

const connectStateElement = (element, stateValue, stateFunction) => {

	if(element.type === "date"){
		
		element.onChange = (newState) => {
			stateFunction(newState);
			
			console.log(`oldValue: ${stateValue}`);
			console.log(`oldState: ${newState}`);
		}
		
		element.value = dayjs(stateValue);
	}else{
		element.onChange = (event) => {
		console.log(`Changing ${event.target.id}`);

		const newValue = event.target.value;
		stateFunction(newValue);
		}
		
		element.value = stateValue;
	}
    
  }

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

const FilterDialog = (props) => {
  const filterInputElements = [];

  return <FormDialog {...props} inputElements={filterInputElements} />;
};

const SubmitDialog = (props) => {
  const contractStates = {
	  expiration: React.useState(new Date()),
	  cnpj: React.useState(),
	  insurancePolicyId: React.useState(),
	  customerId: React.useState()
  }
  
  const contractSubmitElements = employeeInputElements.slice(1);
  
  contractSubmitElements.forEach((element, index) => {
	  const currentState = Object.values(contractStates)[index];
	  
	  connectStateElement(element, currentState[0], currentState[1]);
  });

  const onSubmit = () => {
	props.onClose();
    props.onLoading();
	
	Object.values(contractStates).forEach(state => state[1](''));
	
	const employeeValues = getStateValues(contractStates);
		  
	console.log(
		ControllerContracts.create(employeeValues, props.onSubmitSuccess, props.onSubmitError)
	);
  }

  return <FormDialog {...props} inputElements={contractSubmitElements} onSubmit={onSubmit} />;
};

const EditDialog = (props) => {
	const contractStates = {
		id: React.useState(),
		expiration: React.useState(''),
		cnpj: React.useState(),
		insurancePolicyId: React.useState(),
		customerId: React.useState()
	}
	
	employeeInputElements.forEach((element, index) => {
		const currentState = Object.values(contractStates)[index];

		connectStateElement(element, currentState[0], currentState[1]);
	});
	
	const [isDataLoading, setIsDataLoading] = React.useState(true);
	const [didRequest, setDidRequest] = React.useState(false);

	if(!didRequest && props.isOpen){
		setIsDataLoading(true);
		
		const registryId = parseInt(ControllerHistory.getQueryParam('id'));
	
		console.log(`Id: ${registryId}`);
		
		const onGetSuccess = (respBody) => {
			
			console.log("Data gotten");
			console.log(respBody);
			
			Object.keys(contractStates).forEach((key) =>{
				contractStates[key][1](respBody[key]);
			});
			
			setIsDataLoading(false);
		}
		
		const onGetError = (status, message) => {
			console.log(`Erro ${status} - ${message}`);
		}

		console.log(
			ControllerContracts.getOne(registryId, onGetSuccess, onGetError)
		);

		setDidRequest(true);
	}
	
	const onClose = () => {
		props.onClose();
		setDidRequest(false);
	}
	
  const onSubmit = () => {
	onClose();
	props.onLoading();
	
    const stateValues = getStateValues(contractStates);
	
	console.log(
		ControllerContracts.update(stateValues, props.onEditSuccess, props.onEditError)
	);
  }

  return(
	<FormDialog 
		{...props} 
		inputElements={(isDataLoading) ? [] : employeeInputElements}
		onClose={onClose}
		onSubmit={onSubmit}
	>
		{isDataLoading ? "Carregando Informações..." : props.children}
	</FormDialog>
  );
};

const DeleteDialog = (props) => {
	const [isDataLoading, setIsDataLoading] = React.useState(true);
	const [didRequest, setDidRequest] = React.useState(false);
	const [registryData, setRegistryData] = React.useState({});
	
	if(!didRequest && props.isOpen){
		setIsDataLoading(true);
		
		const registryId = parseInt(ControllerHistory.getQueryParam('id'));
	
		console.log(`Id: ${registryId}`);
		
		const onGetSuccess = (respBody) => {
			console.log("Data gotten");
			console.log(respBody);
			
			setRegistryData(respBody);
			setIsDataLoading(false);
		}
		
		const onGetError = (status, message) => {
			console.log(`Erro ${status} - ${message}`);
		}
		console.log(
			ControllerContracts.getOne(registryId, onGetSuccess, onGetError)
		);
		
		setDidRequest(true);
	}
	
	const onClose = () => {
		props.onClose();
		setDidRequest(false);
	}
	
	const onConfirm = () => {
		onClose();
		props.onLoading();

		console.log(
			ControllerContracts.remove(registryData.id, props.onRemoveSuccess, props.onRemoveError)
	    );
	}
	
	return(
		 <ConfirmDialog {...props} onClose={onClose} onConfirm={onConfirm}>
			{isDataLoading 
				? "Confirmando dados..."
				: `Tem certeza que deseja excluir este contrato? Esta ação não pode ser desfeita.`
			}
		 </ConfirmDialog>
	);
}

// TODO  shouldremove, this demon't need to reset the theme.
const defaultTheme = createTheme();

export default class Contracts extends React.Component {
	constructor(){
		super();
		this.state = {
			isFilterDialogOpen: false,
			isSubmitDialogOpen: false,
			isEditDialogOpen: false,
			isDeleteDialogOpen: false,
			currentTableIndex: 0,
			isLoadingData: true,
			visibleData:[],
			alertPopUpInfo: {
				isOpen: false,
				title: "",
				message: "",
				type: "",
			}
		}
	}
	
	componentDidMount(){
		this.getAllRegistries();
	}
	
	showAlertPopUp = (title, message, type) => {
		this.setState(previousState => ({
			alertPopUpInfo: {
				...previousState,
				title: title, 
				message: message,
				type: type
			}
		}));
		
		this.toggleAlertPopUp();
	}
	
	getAllRegistries = () => {
		const onSuccess = (respBody) => {
			this.setState({visibleData: respBody});
			this.setState({isLoadingData: false});
		}
		const onError = (status, message) => {
			console.log(`Error ${status} - ${message}`);
		}
		
		ControllerContracts.getAll('id', 'asc', onSuccess, onError);
			
	}
	
	toggleFilterDialog = () => {
		this.setState({isFilterDialogOpen: !this.state.isFilterDialogOpen});
	}

	toggleSubmitDialog = () => {
		this.setState({isSubmitDialogOpen: !this.state.isSubmitDialogOpen});
	}

	toggleEditDialog = () => {
		this.setState({isEditDialogOpen: !this.state.isEditDialogOpen});
	}

	toggleDeleteDialog = () => {
		this.setState({isDeleteDialogOpen: !this.state.isDeleteDialogOpen});
	}
	
	toggleAlertPopUp = () => {
		this.setState(previousState => ({
			alertPopUpInfo: {
				...previousState.alertPopUpInfo,
				isOpen: !previousState.alertPopUpInfo.isOpen
			}
		}));
	}
	
	handleTabViewChange = (event, newTableIndex) => {
		this.setState({currentTableIndex: newTableIndex});
		this.setState({isLoadingData: true});
		
		const onSuccess = (respBody) => {
			this.setState({visibleData: respBody});
			this.setState({isLoadingData: false});
		}
		const onError = (status, message) => {
			console.log(`Error ${status} - ${message}`);
		}
		
		ControllerContracts.getAll('id', 'asc', onSuccess, onError);		
	}
	
	handleSubmitSuccess = (respBody) => {
		const message = `Contrato nº ${respBody.id} cadastrado com sucesso!`
		console.log(message);
		
		this.showAlertPopUp("Cadastro concluído!", message, "success");
		
		this.setState({isLoadingData: true});
		this.getAllRegistries();
	}
	
	handleSubmitError = (status, message) => {
		console.log(`Error ${status} - ${message}`);
		this.showAlertPopUp("Erro ao cadastrar", "Tente novamente mais tarde.", "error");
	}
	
	handleEditSuccess = (respBody) => {
		const message = `Contrato nº ${respBody.id} editado com sucesso!`
		console.log(message);
		
		this.showAlertPopUp("Registro alterado!", message, "success");
		
		this.setState({isLoadingData: true});
		this.getAllRegistries();
	}
	
	handleEditError = (status, message) => {
		console.log(`Error ${status} - ${message}`);
		this.showAlertPopUp("Erro ao editar", "Tente novamente mais tarde.", "error");
	}
	
	handleRemoveSuccess = (respBody) => {
		console.log("Registro excluído com sucesso!");
		this.showAlertPopUp("Contrato excluído", "Agora o registro não consta mais no banco de dados.", "success");
		
		this.setState({isLoadingData: true});
		this.getAllRegistries();
	}
	
	handleRemoveError = (status, message) => {
		console.log(`Error ${status} - ${message}`);
		this.showAlertPopUp("Erro ao remover", "Tente novamente mais tarde.", "error");
	}
	
	render(){
		const changeCurrentURL = (newParam) => {
			const currentURL = new URL(window.location);
			currentURL.searchParams.append(newParam.name, newParam.value);
			window.history.pushState({}, '', currentURL);
		}
		const rowOptions = [
			{ 
				id: 0, 
				label: "Editar", 
				onClick: (registryId) => {
					ControllerHistory.addQueryParam('id', registryId);
					
					this.toggleEditDialog();
				}
			},
			{
				id: 1, 
				label: "Excluir", 
				onClick: (registryId) => {
					ControllerHistory.addQueryParam('id', registryId);
					
					this.toggleDeleteDialog();
				}
			}
			];
			
		const contractHeaders = [
		  { id: "id", label: "Id" },
		  { id: "expiration", label: "Dt. Expiração" },
		  { id: "cnpj", label: "CNPJ Cliente" },
		  { id: "insurancePolicyId", label: "Nº Apólice" },
		  { id: "customerId", label: "Id Cliente" },
		];

		const TabViewProps = {
		  labels: ["Contratos"],
		  employeesTable: (
			<DefaultTable
				isLoadingData={this.state.isLoadingData}
				numberOfRows={this.state.visibleData.length}
				organizedData={this.state.visibleData}
				headers={contractHeaders}
				onToggleFilterDialog={this.toggleFilterDialog}
				onToggleSubmitDialog={this.toggleSubmitDialog}
				toggleDeleteDialog={this.toggleDeleteDialog}
				rowOptions={rowOptions}
			/>
		  ),
		  handleChange: this.handleTabViewChange,
		  tabSelected: this.state.currentTableIndex
		}
		
		  return (
			<ThemeProvider theme={customTheme}>
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
						<TabView 
							labels={TabViewProps.labels} 
							painelContents={[TabViewProps.employeesTable, TabViewProps.customersTable]}
							handleChange={TabViewProps.handleChange}
							tabSelected={TabViewProps.tabSelected}
						/>
					  </Grid>
					</Grid>
					<FilterDialog
					  isOpen={this.state.sFilterDialogOpen}
					  onClose={this.toggleFilterDialog}
					  onLoading={() => this.showAlertPopUp("Carregando", "Processando solicitação...", "info")}
					  onSubmit={null}
					  title="Filtar - Contratos"
					  btnSubmitName="Filtrar"
					>
					  Filtre os registros dos contratos
					</FilterDialog>
					<SubmitDialog
					  isOpen={this.state.isSubmitDialogOpen}
					  onClose={this.toggleSubmitDialog}
					  onLoading={() => this.showAlertPopUp("Carregando", "Processando solicitação...", "info")}
					  onSubmitSuccess={this.handleSubmitSuccess}
					  onSubmitError={this.handleSubmitError}
					  title="Cadastrar - Contratos"
					  btnSubmitName="Cadastrar"
					  tabSelected={this.state.currentTableIndex}
					>
					  Insira as informações de um novo contrato assinado
					</SubmitDialog>
					<EditDialog
					  isOpen={this.state.isEditDialogOpen}
					  onClose={
						() => {
							this.toggleEditDialog();
							ControllerHistory.removeQueryParam('id');
						}
					  }
					  onLoading={() => this.showAlertPopUp("Carregando", "Processando solicitação...", "info")}
					  onEditSuccess={this.handleEditSuccess}
					  onEditError={this.handleEditError}
					  title="Editar - Contratos"
					  btnSubmitName="Editar"
					  inputValues={null}
					  tabSelected={this.state.currentTableIndex}
					>
					  Edite as informações cadastrais do contrato
					</EditDialog>
					<DeleteDialog
					  isOpen={this.state.isDeleteDialogOpen}
					  onClose={
						() => {
							this.toggleDeleteDialog();
							ControllerHistory.removeQueryParam('id');
						}
					  }
					  onLoading={() => this.showAlertPopUp("Carregando", "Processando solicitação...", "info")}
					  onRemoveSuccess={this.handleRemoveSuccess}
					  onRemoveError={this.handleRemoveError}
					  tabSelected={this.state.currentTableIndex}
					  title="Excluir - Contratos"
					  btnConfirmName="Excluir"
					  nomeUsuario="João"
					/>
					<AlertPopUp 
						isOpen={this.state.alertPopUpInfo.isOpen}
						type={this.state.alertPopUpInfo.type}
						title={this.state.alertPopUpInfo.title}
						onClose={this.toggleAlertPopUp}
					>
						{this.state.alertPopUpInfo.message}
					</AlertPopUp>
					<Copyright sx={{ pt: 4 }} />
				  </Container>
				</Box>
			  </Box>
			</ThemeProvider>
		  );
	}
}
