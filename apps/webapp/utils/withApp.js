import React, { useState, useEffect, useContext } from "react";
import getTranslation from "../utils/locales";
import { useSnackbar } from "notistack";
import getParse from "../utils/parse";
import getTheme from "./theme";
import UserLayout from "../component/layouts/UserLayout";
import AnonLayout from "../component/layouts/AnonLayout";
import { LinearProgress, withWidth } from "@material-ui/core";
import AppContext from "../utils/AppContext";
import { ThemeProvider } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import { SnackbarProvider } from "notistack";
import Head from "next/head";
import Cookies from "universal-cookie";

const withUser = (WrappedComponent) => {
  class ExtendedWithUser extends React.Component {
    constructor(props) {
      super(props);

      this.parse = getParse();

      this.state = {
        user: this.parse.User.current(),
        loading: true,
      };
      this.onLogin = this.onLogin.bind(this);
      this.resolveUser = this.resolveUser.bind(this);
      this.onLogout = this.onLogout.bind(this);
    }

    resolveUser = async () => {
      try {
        this.setState({ loading: true });

        let user = await this.parse.User.currentAsync();
        if (user && !user.get("emailVerified")) {
          user = await user.fetch();
        }

        if (user) {
          if (user.get("position") != "student") {
            this.onLogout("app.notAuthorized");
            return;
          }

          await user.get("student").fetch();
          await user.get("preferences").fetch();
        }
        this.setState({ user }, () => {
          setTimeout(() => {
            this.setState({ loading: false });
          }, 1000);
        });
      } catch (error) {
        this.onLogout();
      }
    };

    onLogout = async (messageKey = undefined) => {
      try {
        this.setState({ loading: true });
        await this.parse.User.logOut();
        this.setState({ user: undefined });
      } catch (error) {
        console.error("Logout Error", error);
      }

      this.setState({ loading: false });
      this.props.router.push("/" + (messageKey ? `?message=${messageKey}` : ""));
    };

    onLogin = async (username, password) => {
      try {
        const user = await this.parse.User.logIn(username, password, { usePost: true });

        await this.resolveUser();
      } catch (error) {
        this.setState({ loading: false });
        throw error;
      }
    };

    componentDidMount = () => {
      this.resolveUser();
    };

    render = () => {
      return (
        <AppContext.Provider value={{ user: this.state.user, loading: this.state.loading }}>
          <WrappedComponent
            {...this.props}
            parse={this.parse}
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
    const translate = getTranslation(props.router.locale);

    const contexts = useContext(AppContext);
    const [isBrowser, setIsBrowser] = useState(false);
    const snackbar = useSnackbar();
    const [titlePageKey, setTitlePageKey] = useState(undefined);

    const isAuthenticatedRoute = props.router.pathname.includes("user");

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

      if (props.router.query.message) {
        showError(translate(props.router.query.message));
      }
    }, []);

    useEffect(() => {
      if (contexts.user && !isAuthenticatedRoute) {
        changeLanguage(contexts.user.get("locale"), "/user");
      }

      if (!contexts.user && isAuthenticatedRoute) {
        props.router.push("/");
      }
    }, [contexts.user]);

    const isMobile = props.width === "xs" || props.width === "sm";

    const cookies = new Cookies();

    const setCookie = (key, value) => {
      cookies.set(key, value);
    };

    const changeLanguage = async (locale, pathname = undefined) => {
      pathname = pathname || props.router.pathname;
      setCookie("NEXT_LOCALE", locale);
      if (contexts.user) {
        contexts.user.set("locale", locale);
        props.router.push(pathname, pathname, { locale: locale });

        const updatedUser = await contexts.user.save();
        props.setUser(updatedUser);
      } else {
        props.router.push(pathname, pathname, { locale: locale });
      }
    };

    const changePage = (pathname) => {
      props.router.push(pathname, pathname, { locale: props.router.locale });
    };

    const getTitle = (prefix = true, verticalBar = true) => {
      let pageTitle = titlePageKey && translate(titlePageKey) ? `${verticalBar ? " | " : ""}${translate(titlePageKey)}` : "";
      const title = (prefix ? `${translate("app.title")}` : "") + pageTitle;
      return title;
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
      getTitle,
      setTitlePageKey: (pageKey) => {
        setTitlePageKey(pageKey);
      },
      user: contexts.user,
      isBrowser,
      theme: getTheme(props.router.locale),
      translate,
      showSuccess,
      showError,
      isMobile,
      changePage,
    };

    const Layout = commonProps.user && isAuthenticatedRoute ? UserLayout : AnonLayout;
    return (
      <>
        <Head>
          <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
          <title>{getTitle()}</title>
        </Head>
        <ThemeProvider theme={commonProps.theme}>
          <CssBaseline />
          {contexts.loading || (isAuthenticatedRoute && !contexts.user) ? (
            <LinearProgress color="secondary" variant="indeterminate" />
          ) : (
            <Layout {...commonProps}>
              <WrappedComponent {...commonProps} />
            </Layout>
          )}
        </ThemeProvider>
      </>
    );
  };
  return withWidth()(withUser(ExtendedWithApp));
};

export default withApp;
