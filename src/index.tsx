import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Routes from "./routes";
import CssBaseline from "@material-ui/core/CssBaseline";
import {
  createMuiTheme,
  unstable_createMuiStrictModeTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";

const createTheme =
  process.env.NODE_ENV === "development"
    ? unstable_createMuiStrictModeTheme
    : createMuiTheme;

const theme = createTheme({
  palette: {
    primary: {
      main: blue[600],
    },
  },
  overrides: {
    MuiButton: {
      containedPrimary: {
        textTransform: "none",
        borderRadius: "10px",
      },
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <CssBaseline />
        <Routes />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
