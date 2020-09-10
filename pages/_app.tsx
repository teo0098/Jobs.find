import { ThemeProvider } from 'styled-components'

import GlobalStyles from '../styles/global'
import Layout from '../Components/Layout/Layout';
import Theme from '../styles/theme'

const App = ({ Component, pageProps }) => (
  <ThemeProvider theme={Theme}>
    <Layout>
      <GlobalStyles />
      <Component {...pageProps} />
    </Layout>
  </ThemeProvider>
)

export default App