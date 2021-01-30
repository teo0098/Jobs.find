import FavouritesPage from '../FavouritesPage/FavouritesPage'
import FavouriteCloudPageProps from './favouriteCloudPageProps'

const FavouritesCloudPage : React.FC<FavouriteCloudPageProps> = ({ jobs }) => (
    <FavouritesPage jobs={jobs} amount={jobs.length} />
)

export default FavouritesCloudPage