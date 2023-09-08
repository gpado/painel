import React from "react";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";

import TabView from "../components/TabView";
import NavBar from "../components/NavBar";
import DefaultTable from "../components/DefaultTable";
import organizeData from "../components/OrganizeData";
import FormDialog from "../components/FormDialog";
import ConfirmDialog from "../components/ConfirmDialog";
import AlertPopUp from "../components/AlertPopUp";

import customTheme from "../theme.js";

import ControllerEmployees from "../utils/ControllerEmployees.js";
import ControllerCustomers from "../utils/ControllerCustomers.js";

import ControllerHistory from "../utils/ControllerBrowserHistory.js";

const userInputElements = [    
  { id: "id", type: "text", label: "Id", columns: 7, state: null },
  { id: "firstName", type: "text", label: "Nome", columns: 7, state: null },
  { id: "secondName", type: "text", label: "Sobrenome", columns: 7, state: null },
  { id: "email", type: "email", label: "E-mail", columns: 7, state: null }
];

const employeeInputElements = [
  { id: "id", type: "pk", label: "Id", columns: 3, state: null },
  { id: "firstName", type: "pk", label: "Nome", columns: 7, state: null },
  { id: "secondName", type: "text", label: "Sobrenome", columns: 7, state: null },
  { id: "email", type: "email", label: "E-mail", columns: 7, state: null }
];

const customerInputElements = [
  { id: "id", type: "pk", label: "Id", columns:3, state: null },
  { id: "cnpj", type: "text", label: "CNPJ", columns:10, state: null },
  { 
	id: "state", 
	type: "select", 
	label: "Estado", 
	columns: 4, 
	state: null,
	options: [
		"AC", "AL", "AP", "AM", "BA", "CE",
		"DF", "ES", "GO", "MA", "MT", "MS", 
		"MG", "PA", "PB", "PR", "PE", "PI", 
		"RJ", "RN", "RS", "RO", "RR", "SC",
		"SP", "SE", "TO"],
  },
  { id: "contractId", type: "text", label: "Contrato", columns: 7, state: null },
];
const clientInputElements = {
  id: "UF",
  type: "select",
  label: "Estado",
  columns: 4,
  options: ["AC", "AL", "AP", "AM", "BA", "CE",
            "DF", "ES", "GO", "MA", "MT", "MS", 
            "MG", "PA", "PB", "PR", "PE", "PI", 
            "RJ", "RN", "RS", "RO", "RR", "SC", ""],
  state: null
};
const funcInputElements = {
  id: "dtNasc",
  type: "date",
  label: "Dt. Nascimento",
  columns: 6
};

const getStateValues = (stateObject) => {
	const statesValues = {};
	Object.keys(stateObject).forEach((stateName) => {
		statesValues[stateName] = stateObject[stateName][0];
	});
	
	return statesValues;
}

const connectStateElement = (element, stateValue, stateFunction) => {

    element.onChange = (event) => {
      console.log(`Changing ${event.target.id}`);

      const newValue = event.target.value;
      stateFunction(newValue);
    };

    element.value = stateValue;
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
  const filterInputElements = [
    userInputElements[3],
    clientInputElements,
    funcInputElements
  ];

  return <FormDialog {...props} inputElements={filterInputElements} />;
};

const SubmitDialog = (props) => {
  const employeeStates = {
	  firstName: React.useState(),
	  lastName: React.useState(),
	  emailId: React.useState()
  }
  const customerStates = {
	  cnpj: React.useState(),
	  state: React.useState(""),
	  contractId: React.useState()
  }
  
  const employeeSubmitElements = employeeInputElements.slice(1);
  const customerSubmitElements = customerInputElements.slice(1);
  
  employeeSubmitElements.forEach((element, index) => {
	  const currentState = Object.values(employeeStates)[index];
	  
	  connectStateElement(element, currentState[0], currentState[1]);
  });
  
  customerSubmitElements.forEach((element, index) => {
	  const currentState = Object.values(customerStates)[index];
	  connectStateElement(element, currentState[0], currentState[1]);
  });

  const onSubmit = () => {
	props.onClose();
    props.onLoading();
	
	Object.values(employeeStates).forEach(state => state[1](''));
	Object.values(customerStates).forEach(state => state[1](''));
	
  	  if(props.tabSelected === 0){
		  const employeeValues = getStateValues(employeeStates);
		  
		  console.log(
			ControllerEmployees.create(employeeValues, props.onSubmitSuccess, props.onSubmitError)
		  );
	  }
		
	  else{
		  const customerValues = getStateValues(customerStates);
		  
		  console.log(
			ControllerCustomers.create(customerValues, props.onSubmitSuccess, props.onSubmitError)
		);
	  }
  }

  const submitInputElements = (props.tabSelected === 0 ? employeeSubmitElements : customerSubmitElements);

  return <FormDialog {...props} inputElements={submitInputElements} onSubmit={onSubmit} />;
};

const EditDialog = (props) => { /*ADD ControllerBrowser.getQueryParam('id')*/
	const employeeStates = {
		id: React.useState(),
		firstName: React.useState(),
		lastName: React.useState(),
		emailId: React.useState()
	}
	const customerStates = {
		id: React.useState(),
		cnpj: React.useState(),
		state: React.useState(""),
		contractId: React.useState()
	}
	
	employeeInputElements.forEach((element, index) => {
		const currentState = Object.values(employeeStates)[index];

		connectStateElement(element, currentState[0], currentState[1]);
	});

	customerInputElements.forEach((element, index) => {
		const currentState = Object.values(customerStates)[index];
		connectStateElement(element, currentState[0], currentState[1]);
	});
	
	const statesToChange = (props.tabSelected === 0) ? employeeStates : customerStates;
	
	const [isDataLoading, setIsDataLoading] = React.useState(true);
	const [didRequest, setDidRequest] = React.useState(false);

	if(!didRequest && props.isOpen){
		setIsDataLoading(true);
		
		const registryId = parseInt(ControllerHistory.getQueryParam('id'));
	
		console.log(`Id: ${registryId}`);
		
		const onGetSuccess = (respBody) => {
			
			console.log("Data gotten");
			console.log(respBody);
			
			
			
			Object.keys(statesToChange).forEach((key) =>{
				statesToChange[key][1](respBody[key]);
			});
			
			setIsDataLoading(false);
		}
		
		const onGetError = (status, message) => {
			console.log(`Erro ${status} - ${message}`);
		}
		if(props.tabSelected === 0){
			console.log(
				ControllerEmployees.getOne(registryId, onGetSuccess, onGetError)
			);
		}else{
			console.log(
				ControllerCustomers.getOne(registryId, onGetSuccess, onGetError)
			);
		}
		
		
		setDidRequest(true);
	}
	
	const onClose = () => {
		props.onClose();
		setDidRequest(false);
	}
	
  const onSubmit = () => {
	onClose();
	props.onLoading();
	
    const stateValues = getStateValues(statesToChange);
	
	if(props.tabSelected === 0){
	  console.log(
		ControllerEmployees.update(stateValues, props.onEditSuccess, props.onEditError)
	  );
	}

	else{
	  console.log(
		ControllerCustomers.update(stateValues, props.onEditSuccess, props.onEditError)
		);
	}
  }

  const editInputElements = (props.tabSelected === 0 ? employeeInputElements : customerInputElements);

  return(
	<FormDialog 
		{...props} 
		inputElements={(isDataLoading) ? [] : editInputElements}
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
		if(props.tabSelected === 0){
			console.log(
				ControllerEmployees.getOne(registryId, onGetSuccess, onGetError)
			);
		}else{
			console.log(
				ControllerCustomers.getOne(registryId, onGetSuccess, onGetError)
			);
		}
		
		setDidRequest(true);
	}
	
	const onClose = () => {
		props.onClose();
		setDidRequest(false);
	}
	
	const onConfirm = () => {
		onClose();
		props.onLoading();
		
		if(props.tabSelected === 0){
		  console.log(
			ControllerEmployees.remove(registryData.id, props.onRemoveSuccess, props.onRemoveError)
		  );
		}

		else{
		  console.log(
			ControllerCustomers.remove(registryData.id, props.onRemoveSuccess, props.onRemoveError)
			);
		}
	}
	
	return(
		 <ConfirmDialog {...props} onClose={onClose} onConfirm={onConfirm}>
			{isDataLoading 
				? "Confirmando dados..."
				: `Tem certeza que deseja excluir o registro de '${(props.tabSelected === 0) ? registryData.firstName : registryData.cnpj}' (id ${registryData.id})? Essa ação não pode ser desfeita.`
			}
		 </ConfirmDialog>
	);
}

// TODO  shouldremove, this demon't need to reset the theme.
const defaultTheme = createTheme();

const headers = [
  { id: "id", label: "Id" },
  { id: "nome", label: "Nome" },
  { id: "email", label: "E-mail" },
  { id: "telefone", label: "Telefone" },
  { id: "tipo", label: "Tipo" }
];

export default class Dashboard extends React.Component {
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
		
		if(this.state.currentTableIndex === 0)
			ControllerEmployees.getAll('firstName', 'desc', onSuccess, onError);
		else
			ControllerCustomers.getAll('cnpj', 'desc', onSuccess, onError);
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
		
		if(newTableIndex === 0)
			ControllerEmployees.getAll('firstName', 'desc', onSuccess, onError);
		else
			ControllerCustomers.getAll('cnpj', 'desc', onSuccess, onError);
	}
	
	handleSubmitSuccess = (respBody) => {
		const message = `${this.state.currentTableIndex === 0 ? `Funcionário ${respBody.firstName}` : `Cliente ${respBody.cnpj}`} cadastrado com sucesso!`
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
		const message = `${this.state.currentTableIndex === 0 ? `Funcionário '${respBody.firstName}'` : `Cliente '${respBody.cnpj}'`} editado com sucesso!`
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
		this.showAlertPopUp("Registro excluído", "Agora o registro não consta mais no banco de dados.", "success");
		
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
			
		const employeesHeaders = [
		  { id: "id", label: "Id" },
		  { id: "firstName", label: "Nome" },
		  { id: "lastName", label: "Sobrenome" },
		  { id: "e-mail", label: "E-mail" },
		];
		
		const customersHeaders = [
		  { id: "id", label: "Id" },
		  { id: "cnpj", label: "CNPJ" },
		  { id: "state", label: "Estado" },
		  { id: "contractId", label: "Contrato" },
		];

		const TabViewProps = {
		  labels: ["Funcionários", "Clientes"],
		  employeesTable: (
			<DefaultTable
				isLoadingData={this.state.isLoadingData}
				numberOfRows={this.state.visibleData.length}
				organizedData={this.state.visibleData}
				headers={employeesHeaders}
				onToggleFilterDialog={this.toggleFilterDialog}
				onToggleSubmitDialog={this.toggleSubmitDialog}
				toggleDeleteDialog={this.toggleDeleteDialog}
				rowOptions={rowOptions}
			/>
		  ),
		  customersTable: (
			<DefaultTable
				isLoadingData={this.state.isLoadingData}
				numberOfRows={this.state.visibleData.length}
				organizedData={this.state.visibleData}
				headers={customersHeaders}
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
					  title="Filtar - Usuários"
					  btnSubmitName="Filtrar"
					>
					  Filtre os registros dos usuários
					</FilterDialog>
					<SubmitDialog
					  isOpen={this.state.isSubmitDialogOpen}
					  onClose={this.toggleSubmitDialog}
					  onLoading={() => this.showAlertPopUp("Carregando", "Processando solicitação...", "info")}
					  onSubmitSuccess={this.handleSubmitSuccess}
					  onSubmitError={this.handleSubmitError}
					  title="Cadastrar - Usuários"
					  btnSubmitName="Cadastrar"
					  tabSelected={this.state.currentTableIndex}
					>
					  Insira as informações de seu novo usuário
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
					  title="Editar - Usuários"
					  btnSubmitName="Editar"
					  inputValues={null}
					  tabSelected={this.state.currentTableIndex}
					>
					  Edite as informações do usuário (Atenção: apenas um usuário pode
					  alterar a própria senha)
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
					  title="Excluir - Usuário"
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
