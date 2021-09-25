// pages/_app.tsx
/* eslint-disable react/jsx-props-no-spreading */
import initAuth from '../services/firebase/initAuth'
import { FC, useEffect, ReactElement, ReactNode } from 'react';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import type { NextPage } from 'next'
import { AppProps } from 'next/app';
import Head from 'next/head';
import theme from '@styles/theme';
import DateFnsAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import 'stream-chat-react/dist/css/index.css';
import '../styles/chatStyles.css'


type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}


// Initialise FireBase Auth
initAuth()

const MyApp: FC<AppPropsWithLayout> = ({ Component, pageProps }: AppPropsWithLayout) => {

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles?.parentElement?.removeChild(jssStyles);
    }
  }, []);

  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page)
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={DateFnsAdapter}>
        <Head>
          <title>TITLEBLOC</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <CssBaseline />
        { getLayout(<Component {...pageProps} />)}
     </LocalizationProvider>
    </ThemeProvider>
    )
};

export default MyApp;