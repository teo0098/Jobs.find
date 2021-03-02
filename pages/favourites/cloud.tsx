import Head from 'next/head'

import FavouritesCloudPage from '../../Components/FavouritesCloudPage/FavouritesCloudPage'

const Cloud : React.FC = () => (
    <>
        <Head>
            <title>Favourite jobs in cloud</title>
        </Head>
        <FavouritesCloudPage />
    </>
)

export default Cloud