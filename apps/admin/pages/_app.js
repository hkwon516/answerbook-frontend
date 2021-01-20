import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../utils/theme";
import withApp from "../utils/withApp";
import "../styles/globals.css";
import { CssBaseline } from "@material-ui/core";
import { SnackbarProvider } from "notistack";
import Parse from "parse";

Parse.initialize("answerbookApi");
Parse.serverURL = "http://localhost:1337/parse";

function MyApp({ Component, pageProps, ...props }) {
  const ComponentExtended = withApp(Component);
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
          <ComponentExtended {...props} {...pageProps} />
        </SnackbarProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default MyApp;
