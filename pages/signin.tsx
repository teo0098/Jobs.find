import Head from 'next/head'

import Credentials from '../Components/Credentials/Credentials'
import SigninComponent from '../Components/Signin/Signin'

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

export default Signin