import React, { useState, useEffect, useContext } from "react";
import getTranslation from "../utils/locales";
import { useSnackbar } from "notistack";
import parse from "../utils/parse";
import getTheme from "./theme";
import UserLayout from "../component/layouts/UserLayout";
import AnonLayout from "../component/layouts/AnonLayout";
import { LinearProgress, withWidth } from "@material-ui/core";
import AppContext from "../utils/AppContext";
import { ThemeProvider } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import { SnackbarProvider } from "notistack";
import Head from "next/head";

const withUser = (WrappedComponent) => {
  class ExtendedWithUser extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        user: parse.User.current(),
        loading: true,
      };
      this.onLogin = this.onLogin.bind(this);
      this.resolveUser = this.resolveUser.bind(this);
      this.onLogout = this.onLogout.bind(this);
    }

    resolveUser = async () => {
      const user = await parse.User.currentAsync();
      this.setState({ user });
    };

    onLogout = async () => {
      this.setState({ loading: true });

      await parse.User.logOut();
      this.setState({ user: undefined });
    };

    onLogin = async (username, password) => {
      try {
        this.setState({ loading: true });
        const user = await parse.User.logIn(username, password, { usePost: true });

        this.setState({ user });
      } catch (error) {
        throw error;
      }

      this.setState({ loading: false });
    };

    componentDidMount = () => {
      this.resolveUser();
    };

    render = () => {
      return (
        <AppContext.Provider value={{ user: this.state.user, loading: this.state.loading }}>
          <WrappedComponent
            {...this.props}
            onLogin={this.onLogin}
            onLogout={this.onLogout}
            setUser={(user) => {
              this.setState({ user });
            }}
          />
        </AppContext.Provider>
      );
    };
  }

  return ExtendedWithUser;
};

const withApp = (WrappedComponent) => {
  const ExtendedWithApp = (props) => {
    const contexts = useContext(AppContext);
    const [isBrowser, setIsBrowser] = useState(false);
    const snackbar = useSnackbar();

    const isAuthenticatedRoute = props.router.pathname.includes("user");
    const translate = getTranslation(props.router.locale);

    const showSuccess = (message, options = {}) => {
      snackbar.enqueueSnackbar(message || translate("layout.toast.success"), { variant: "success", ...options });
    };

    const showError = (message, options = {}) => {
      snackbar.enqueueSnackbar(message || translate("layout.toast.error"), { variant: "error", ...options });
    };

    useEffect(() => {
      setIsBrowser(true);
      const jssStyles = document.querySelector("#jss-server-side");
      if (jssStyles) {
        jssStyles.parentElement.removeChild(jssStyles);
      }
    }, []);

    useEffect(() => {
      if (contexts.user && !isAuthenticatedRoute) {
        props.router.push("/user");
      }

      if (!contexts.user && isAuthenticatedRoute) {
        props.router.push("/");
      }
    }, [contexts.user]);

    const isMobile = props.width === "xs" || props.width === "sm";

    const changeLanguage = (locale) => {
      props.router.push(props.router.pathname, props.router.pathname, { locale: locale });
    };

    const commonProps = {
      ...props,
      onLogout: async () => {
        try {
          await props.onLogout();
        } catch (error) {
          showError(error.message);
        }
      },
      changeLanguage,
      user: contexts.user,
      isBrowser,
      theme: getTheme(props.router.locale),
      parse,
      translate,
      showSuccess,
      showError,
      isMobile,
    };

    const Layout = commonProps.user && isAuthenticatedRoute ? UserLayout : AnonLayout;

    return commonProps.loading || (isAuthenticatedRoute && !commonProps.user) ? (
      <LinearProgress color="secondary" variant="indeterminate" />
    ) : (
      <>
        <Head>
          <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
          <title>Answerbook Admin</title>
        </Head>
        <ThemeProvider theme={commonProps.theme}>
          <CssBaseline />

          <Layout {...commonProps}>
            <WrappedComponent {...commonProps} />
          </Layout>
        </ThemeProvider>
      </>
    );
  };
  return withWidth()(withUser(ExtendedWithApp));
};

export default withApp;
