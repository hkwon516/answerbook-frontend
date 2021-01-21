import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import getTheme from "../utils/theme";
import withApp from "../utils/withApp";
import { CssBaseline } from "@material-ui/core";
import { SnackbarProvider } from "notistack";
import AnonLayout from "../component/layouts/AnonLayout";
import Head from "next/head";
import parse from "../utils/parse";
import UserLayout from "../component/layouts/UserLayout";

function MyApp({ Component, pageProps, ...props }) {
  const ComponentExtended = withApp(Component);
  const user = parse.User.current();

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }

    if (user) {
      props.router.push("/user");
    }
  }, []);

  let Layout = user ? UserLayout : AnonLayout;

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
          <Layout user={user} {...pageProps}>
            <ComponentExtended user={user} {...pageProps} />
          </Layout>
        </SnackbarProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default MyApp;
