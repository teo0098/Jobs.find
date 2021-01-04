import Head from 'next/head'

import FavouritesLocalPage from '../../Components/FavouritesLocalPage/FavouritesLocalPage'

const Local : React.FC = () => (
    <>
        <Head>
            <title>Favourite jobs locally</title>
        </Head>
        <FavouritesLocalPage />
    </>
)

export default Local