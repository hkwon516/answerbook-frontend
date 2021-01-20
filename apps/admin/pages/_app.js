import "../styles/globals.css";
import { SnackbarProvider } from "notistack";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../utils/theme";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        maxSnack="2"
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Component {...pageProps} />
      </SnackbarProvider>
    </ThemeProvider>
  );
}
export default MyApp;
