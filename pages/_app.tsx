import { useEffect } from 'react'
import { ThemeProvider } from 'styled-components'
import Head from 'next/head'
import { createStore, Store } from 'redux'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import cookies from 'js-cookie'

import axios from '../axiosInstance'
import GlobalStyles from '../styles/global'
import Layout from '../Components/Layout/Layout'
import Theme from '../styles/theme'
import rootReducer from '../store/reducer'
import { ActionType } from '../store/favJobs/favJobsReducer'

const store : Store<ActionType> = createStore(rootReducer)
const persistor = persistStore(store)

type AppType = ({ Component, pageProps }: { Component: any, pageProps: any}) => JSX.Element

const App : AppType = ({ Component, pageProps }) => {

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) jssStyles.parentElement?.removeChild(jssStyles);
    if (cookies.get('_id')) {
      axios.get(`/api/users/${cookies.get('_id')}/account`)
    }
    setInterval(() => {
      if (cookies.get('_id')) {
        axios.get(`/api/users/${cookies.get('_id')}/account`)
      }
    }, 300000)
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider theme={Theme}>
              <GlobalStyles />
              <Layout>
                <Component {...pageProps} />
              </Layout>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </>
  )
} 

export default App