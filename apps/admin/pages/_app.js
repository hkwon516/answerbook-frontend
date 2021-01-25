import React from "react";
import withApp from "../utils/withApp";
import Head from "next/head";

const MyApp = ({ Component, pageProps, ...props }) => {
  const ComponentExtended = withApp(Component);

  return (
    <React.Fragment>
      <ComponentExtended {...pageProps} {...props} />
    </React.Fragment>
  );
};

export default MyApp;
