import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'

import parseCookies from '../utils/middlewares/parseCookies'
import authUser from '../utils/middlewares/authUser'
import { User } from '../types/User'
import DashboardComponent from '../Components/Dashboard/Dashboard'

interface DashboardProps { user : User; }

const Dashboard : React.FC<DashboardProps> = ({ user }) => {

    const { back } = useRouter()

    if (user === null) {
        back()
        return null
    }

    return (
        <>
          <Head>
            <title>Dashboard</title>
          </Head>
          <DashboardComponent user={user} />
        </>
      )
} 

export const getServerSideProps : GetServerSideProps = async ({ req }) => {

    let user : User = null

    try {
        let cookies : null | { [key : string] : string } = parseCookies(req.headers.cookie)
        user = await authUser(cookies)
        if (!user) throw new Error()
        user = {
            name: user.name,
            surname: user.surname,
            email: user.email
        }
    }   
    catch {
        user = null
    }

    return {
        props: { user: JSON.parse(JSON.stringify(user)) }
    }
}

export default Dashboard