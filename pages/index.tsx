import Head from 'next/head'
import axios from 'axios'

import SearchEngine from '../Components/SearchEngine/SearchEngine'
import Filters from '../Components/Filters/Filters'
import Jobs from '../Components/Jobs/Jobs'
import Job from '../types/Job'

interface HomeProps { jobs : Array<Job> | null }

const Home : React.FC<HomeProps> = ({ jobs }) => (
  <>
    <Head>
      <title>Jobs.find</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <SearchEngine />
    <Filters />
    <Jobs jobs={jobs} />
  </>
)

export async function getServerSideProps() {
  
  let jobs : Array<Job> | null
  try {
    const { data } = await axios.get(process.env.GET_JOBS_API)
    if (data.length === 0 || !data) throw new Error();
    jobs = data
  }
  catch {
    jobs = null;
  }

  return { props: { jobs } }
}

export default Home