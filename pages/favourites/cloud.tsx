import Head from 'next/head'
import { GetServerSideProps } from 'next'

import FavouritesCloudPage from '../../Components/FavouritesCloudPage/FavouritesCloudPage'
import { Job } from '../../types/Job'
import parseCookies from '../../utils/middlewares/parseCookies'
import authUser from '../../utils/middlewares/authUser'

interface LocalProps { favJobs : Array<Job>; }

const Local : React.FC<LocalProps> = ({ favJobs }) => (
    <>
        <Head>
            <title>Favourite jobs in cloud</title>
        </Head>
        <FavouritesCloudPage jobs={favJobs} />
    </>
)

export const getServerSideProps : GetServerSideProps = async ({ req }) => {

    let favJobs : Array<Job> = []

    try {
        let cookies : null | { [key : string] : string } = parseCookies(req.headers.cookie)
        const user = await authUser(cookies)
        if (!user) throw new Error()
        favJobs = user.favJobs
    }   
    catch {
        favJobs = []
    }

    return {
        props: { favJobs }
    }
}

export default Local