import "../styles/globals.css";
import { SnackbarProvider } from "notistack";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../utils/theme";
import withApp from "../utils/withApp";

function MyApp({ Component, pageProps, ...props }) {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        maxSnack="2"
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Component {...props} {...pageProps} />;
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default withApp(MyApp);
