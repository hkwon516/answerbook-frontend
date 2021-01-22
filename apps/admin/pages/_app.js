import React, { useEffect, useState } from "react";
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
  const [isBrowser, setIsBrowser] = useState(false);
  const [user, setUser] = useState(parse.User.current());

  const isAuthenticatedRoute = props.router.pathname.includes("user");

  useEffect(() => {
    setUser(parse.User.current());
    setIsBrowser(true);
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  useEffect(() => {
    if (user && !isAuthenticatedRoute) {
      props.router.push("/user");
    }
  }, [user]);

  if (isAuthenticatedRoute && !isBrowser) {
    return <></>;
  }

  const Layout = user ? UserLayout : AnonLayout;
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
          <Layout user={user} isBrowser={isBrowser} {...pageProps}>
            <ComponentExtended user={user} isBrowser={isBrowser} {...pageProps} />
          </Layout>
        </SnackbarProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default MyApp;
