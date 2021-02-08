import Head from 'next/head'

import SearchEngine from '../Components/SearchEngine/SearchEngine'
import Filters from '../Components/Filters/Filters'
import Jobs from '../Components/Jobs/Jobs'
import withAuth from '../Components/HOC/withAuth'

const JobsPage : React.FC = () => (
    <>
        <Head>
            <title>Jobs.find</title>
        </Head>
        <SearchEngine />
        <Filters />
        <Jobs jobs={[]} />
    </>
)

export default withAuth(JobsPage)