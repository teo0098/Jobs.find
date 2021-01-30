import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { ObjectID } from 'mongodb'
import { verify } from 'jsonwebtoken'

import FavouritesCloudPage from '../../Components/FavouritesCloudPage/FavouritesCloudPage'
import { Job } from '../../types/Job'
import { connectToDatabase } from '../../utils/mongodb'
import parseCookies from '../../utils/middlewares/parseCookies'
import VerifyToken from '../../utils/interfaces/token'

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
        if (cookies === null) throw new Error()
        const decodedToken = verify(cookies.accessToken, `${process.env.ACCESS_TOKEN_SECRET}`)
        const _id : ObjectID = new ObjectID((decodedToken as VerifyToken).user)
        const { db } = await connectToDatabase()
        const collection = db.collection('users')
        const userNumbers : number = await collection.countDocuments({ _id })
        if (userNumbers === 0) throw new Error()
        const user = await collection.findOne({ _id })
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