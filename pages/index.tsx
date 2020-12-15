import Head from 'next/head'
import { GetStaticProps } from 'next'
import axios, { AxiosResponse } from 'axios'

import SearchEngine from '../Components/SearchEngine/SearchEngine'
import Filters from '../Components/Filters/Filters'
import Jobs from '../Components/Jobs/Jobs'
import Job from '../types/Job'

interface HomeProps { jobs : Array<Job> | null }

const Home : React.FC<HomeProps> = ({ jobs }) => (
  <>
    <Head>
      <title>Jobs.find</title>
    </Head>
    <SearchEngine />
    <Filters />
    <Jobs jobs={jobs} />
  </>
)

export const getStaticProps : GetStaticProps = async () => {
  
  let jobs : Array<Job> | null
  try {
    const { data } : AxiosResponse<Array<Job>> = await axios.get(`${process.env.GET_JOBS_API}`)
    if (data.length === 0 || !data) throw new Error();
    jobs = data
  }
  catch {
    jobs = null;
  }

  return { props: { jobs }, revalidate: 3600 }
}

export default Home