import Head from 'next/head'

import SearchEngine from '../Components/SearchEngine/SearchEngine'

const Home : React.FC = () => (
  <>
    <Head>
      <title>Jobs.find</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <SearchEngine />
  </>
)

export default Home