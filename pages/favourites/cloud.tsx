import Head from 'next/head'

import FavouritesCloudPage from '../../Components/FavouritesCloudPage/FavouritesCloudPage'

const Local : React.FC = () => (
    <>
        <Head>
            <title>Favourite jobs in cloud</title>
        </Head>
        <FavouritesCloudPage />
    </>
)

export default Local