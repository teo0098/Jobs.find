import Head from 'next/head'

import Credentials from '../Components/Credentials/Credentials'
import SigninComponent from '../Components/Signin/Signin'
import withRedirect from '../Components/HOC/withRedirect'

const Signin : React.FC = () => (
    <>
        <Head>
            <title>Sign in</title>
        </Head>
        <Credentials>
            <SigninComponent />
        </Credentials>
    </>
)

export default withRedirect(Signin)