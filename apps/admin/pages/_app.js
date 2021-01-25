import React from "react";
import withApp from "../utils/withApp";
import { SnackbarProvider } from "notistack";

const MyApp = ({ Component, pageProps, ...props }) => {
  const ComponentExtended = withApp(Component);

  return (
    <React.Fragment>
      <SnackbarProvider
        maxSnack="2"
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <ComponentExtended {...pageProps} {...props} />
      </SnackbarProvider>
    </React.Fragment>
  );
};

export default MyApp;
