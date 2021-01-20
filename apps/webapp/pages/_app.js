import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../utils/theme";
import Head from "next/head";
import "../styles/globals.css";
import { SnackbarProvider } from "notistack";
import { CssBaseline } from "@material-ui/core";

function MyApp({ Component, pageProps }) {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <SnackbarProvider
          maxSnack="2"
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <CssBaseline />
          <Component {...pageProps} />
        </SnackbarProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default MyApp;
