import { connect } from 'react-redux'

import { Job as JobType } from '../../types/Job'
import FavouritesPage from '../FavouritesPage/FavouritesPage'

interface FavouritesLocalPageProps {
    amount : number;
    jobs : Array<JobType>;
}

const FavouritesLocalPage : React.FC<FavouritesLocalPageProps> = ({ amount, jobs }) => (
    <FavouritesPage jobs={jobs} amount={amount} />
)

const mapStateToProps = (state : any) => ({
    amount: state.favJobs.amount,
    jobs: state.favJobs.jobs
})

export default connect(mapStateToProps)(FavouritesLocalPage)