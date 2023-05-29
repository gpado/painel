import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#0D5A78",
      light: "#B3D7E7",
      dark: "#a7c7d4"
    },
    secondary: {
      main: "#724637",
      light: "#BF7C63"
    }
  },
  typography: {
    h1: {
      fontSize: "3.8rem"
    },
    h2: {
      fontSize: "3.4rem"
    }
  }
});

export default theme;
