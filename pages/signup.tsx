import Head from 'next/head'

import Credentials from '../Components/Credentials/Credentials'
import SignupComponent from '../Components/Signup/Signup'

const Signup : React.FC = () => (
    <>
        <Head>
            <title>Sign up</title>
        </Head>
        <Credentials>
            <SignupComponent />
        </Credentials>
    </>
)

export default Signup