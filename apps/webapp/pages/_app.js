import "../styles/globals.css";
import withApp from "../utils/withApp";

function MyApp({ Component, t, pageProps }) {
  return <Component t={t} {...pageProps} />;
}

export default withApp(MyApp);
