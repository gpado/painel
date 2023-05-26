import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import NavBar from "../../components/NavBar";
import DefaultTable from "../../components/DefaultTable";
import organizeData from "../../components/OrganizeData";
import FormDialog from "../../components/FormDialog";
import ConfirmDialog from "../../components/ConfirmDialog";

const userInputElements = [
  { id: "nome", type: "text", label: "Nome", columns: 14 },
  { id: "email", type: "email", label: "E-mail", columns: 7 },
  { id: "telefone", type: "text", label: "Telefone", columns: 7 },
  { id: "tipo", type: "select", label: "Tipo", columns: 4 }
];
const clientInputElements = {
  id: "estado",
  type: "select",
  label: "Estado",
  columns: 4
};
const funcInputElements = {
  id: "dtNascimento",
  type: "date",
  label: "Dt. Nascimento",
  columns: 6
};

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
  const [userType, setUserType] = React.useState("Funcionário");

  userInputElements[3].onChange = () => {
    setUserType(userType === "Funcionário" ? "Cliente" : "Funcionário");
  };

  const submitInputElements = userInputElements.concat([
    clientInputElements,
    userType === "Cliente" ? clientInputElements : funcInputElements
  ]);

  return <FormDialog {...props} inputElements={submitInputElements} />;
};

const EditDialog = (props) => {
  const [userType, setUserType] = React.useState("Funcionário");

  userInputElements[3].onChange = () => {
    setUserType(userType === "Funcionário" ? "Cliente" : "Funcionário");
  };

  const editInputElements = userInputElements.concat([
    clientInputElements,
    userType === "Cliente" ? clientInputElements : funcInputElements
  ]);

  return <FormDialog {...props} inputElements={editInputElements} />;
};

const DeleteDialog = (props) => (
  <ConfirmDialog {...props}>
    Tem certeza que deseja excluir o registro de {props.nomeUsuario}? Essa ação
    não pode ser desfeita.
  </ConfirmDialog>
);

// TODO  shouldremove, this demon't need to reset the theme.
const defaultTheme = createTheme();

const headers = [
  { id: "id", label: "Id" },
  { id: "nome", label: "Nome" },
  { id: "email", label: "E-mail" },
  { id: "telefone", label: "Telefone" },
  { id: "tipo", label: "Tipo" }
];

const data = [
  [1, "João", "joaoa@email.com", "(12)8651-2354", "Gestor"],
  [2, "Antônia", "oaoa@email.com", "(11)98651-2354", "Funcionário"],
  [3, "Paulo", "orda@email.com", "(11)94451-2354", "Funcionário"],
  [4, "João", "joaoa@email.com", "(12)8651-2354", "Gestor"],
  [5, "Antônia", "oaoa@email.com", "(11)98651-2354", "Funcionário"],
  [6, "Paulo", "orda@email.com", "(11)94451-2354", "Funcionário"],
  [7, "João", "joaoa@email.com", "(12)8651-2354", "Gestor"],
  [8, "Antônia", "oaoa@email.com", "(11)98651-2354", "Funcionário"],
  [9, "Paulo", "orda@email.com", "(11)94451-2354", "Funcionário"]
];

const organizedData = organizeData(data, headers);

export default function Dashboard() {
  const [isFilterDialogOpen, setIsFilterDialogOpen] = React.useState(false);
  const toggleFilterDialog = () => {
    setIsFilterDialogOpen(!isFilterDialogOpen);
  };

  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = React.useState(false);
  const toggleSubmitDialog = () => {
    setIsSubmitDialogOpen(!isSubmitDialogOpen);
  };

  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);
  const toggleEditDialog = () => {
    setIsEditDialogOpen(!isEditDialogOpen);
  };

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const toggleDeleteDialog = () => {
    setIsDeleteDialogOpen(!isDeleteDialogOpen);
  };

  const rowOptions = [
    { id: 0, label: "Editar", action: toggleEditDialog },
    { id: 1, label: "Excluir", action: toggleDeleteDialog }
  ];

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
                <DefaultTable
                  numberOfRows={10}
                  organizedData={organizedData}
                  headers={headers}
                  onToggleFilterDialog={toggleFilterDialog}
                  onToggleSubmitDialog={toggleSubmitDialog}
                  toggleDeleteDialog={toggleDeleteDialog}
                  rowOptions={rowOptions}
                />
              </Grid>
            </Grid>
            <FilterDialog
              isOpen={isFilterDialogOpen}
              onClose={toggleFilterDialog}
              onSubmit={null}
              title="Filtar - Usuários"
              btnSubmitName="Filtrar"
            >
              Filtre os registros dos usuários
            </FilterDialog>
            <SubmitDialog
              isOpen={isSubmitDialogOpen}
              onClose={toggleSubmitDialog}
              onSubmit={null}
              title="Cadastrar - Usuários"
              btnSubmitName="Cadastrar"
            >
              Insira as informações de seu novo usuário
            </SubmitDialog>
            <EditDialog
              isOpen={isEditDialogOpen}
              onClose={toggleEditDialog}
              onSubmit={null}
              title="Editar - Usuários"
              btnSubmitName="Editar"
              inputValues={null}
            >
              Edite as informações do usuário (Atenção: apenas um usuário pode
              alterar a própria senha)
            </EditDialog>
            <DeleteDialog
              isOpen={isDeleteDialogOpen}
              onClose={toggleDeleteDialog}
              onConfirm={null}
              title="Excluir - Usuário"
              btnConfirmName="Excluir"
              nomeUsuario="João"
            />
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
