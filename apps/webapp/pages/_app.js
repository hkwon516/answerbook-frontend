import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../utils/theme";
import Head from "next/head";
import "../styles/globals.css";
import { SnackbarProvider } from "notistack";
import { CssBaseline } from "@material-ui/core";
import withApp from "../utils/withApp";

function MyApp({ Component, pageProps, ...props }) {
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
          <Component {...props} {...pageProps} />
        </SnackbarProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default withApp(MyApp);
