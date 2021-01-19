import "../styles/globals.css";
import withApp from "../utils/withApp";

function MyApp({ Component, pageProps, ...props }) {
  return <Component {...props} {...pageProps} />;
}

export default withApp(MyApp);
