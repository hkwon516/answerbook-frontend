import '../styles/globals.css'
import { SnackbarProvider } from 'notistack'

function MyApp({ Component, pageProps }) {
  return (
    <SnackbarProvider maxSnack="2"
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}>
      <Component {...pageProps} />
    </SnackbarProvider>
  )
}

export default MyApp
