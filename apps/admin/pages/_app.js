import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../utils/theme";
import "../styles/globals.css";
import { CssBaseline } from "@material-ui/core";
import { SnackbarProvider } from "notistack";

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
