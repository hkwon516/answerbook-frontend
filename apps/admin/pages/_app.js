import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import getTheme from "../utils/theme";
import withApp from "../utils/withApp";
import { CssBaseline } from "@material-ui/core";
import { SnackbarProvider } from "notistack";
import Parse from "parse";
import { useRouter } from "next/router";
import AnonLayout from "../component/layouts/AnonLayout";
import Head from "next/head";

Parse.initialize("answerbookApi");
Parse.serverURL = "http://localhost:9000/parse";

function MyApp({ Component, pageProps, ...props }) {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  const router = useRouter();
  let Layout = AnonLayout;
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
            horizontal: "left",
          }}
        >
          <CssBaseline />
          <Layout {...props} {...pageProps}>
            <ComponentExtended {...props} {...pageProps} />
          </Layout>
        </SnackbarProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default MyApp;
