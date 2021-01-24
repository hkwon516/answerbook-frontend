import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import getTheme from "../utils/theme";
import withApp from "../utils/withApp";
import { CssBaseline } from "@material-ui/core";
import { SnackbarProvider } from "notistack";
import Head from "next/head";

const MyApp = ({ Component, pageProps, ...props }) => {
  const ComponentExtended = withApp(Component);

  return (
    <React.Fragment>
      <Head>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <title>Answerbook Admin</title>
      </Head>
      <ThemeProvider theme={getTheme()}>
        <SnackbarProvider
          maxSnack="2"
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
        >
          <CssBaseline />

          <ComponentExtended {...pageProps} {...props} />
        </SnackbarProvider>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default MyApp;
