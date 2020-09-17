import Head from 'next/head'

import SearchEngine from '../Components/SearchEngine/SearchEngine'
import Filters from '../Components/Filters/Filters'

const Home : React.FC = () => (
  <>
    <Head>
      <title>Jobs.find</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <SearchEngine />
    <Filters />
  </>
)

export default Home