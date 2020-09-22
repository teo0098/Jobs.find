import { useEffect } from 'react'
import { ThemeProvider } from 'styled-components'
import Head from 'next/head'

import GlobalStyles from '../styles/global'
import Layout from '../Components/Layout/Layout';
import Theme from '../styles/theme'

const App = ({ Component, pageProps }) => {

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) jssStyles.parentElement.removeChild(jssStyles);
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider theme={Theme}>
          <GlobalStyles />
          <Layout>
            <Component {...pageProps} />
          </Layout>
      </ThemeProvider>
    </>
  )
} 

export default App