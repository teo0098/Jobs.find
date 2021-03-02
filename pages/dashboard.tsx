import Head from 'next/head'

import { User } from '../types/User'
import DashboardComponent from '../Components/Dashboard/Dashboard'

interface DashboardProps { user : User; }

const Dashboard : React.FC<DashboardProps> = () => (
    <>
        <Head>
        <title>Dashboard</title>
        </Head>
        <DashboardComponent />
    </>
)

export default Dashboard