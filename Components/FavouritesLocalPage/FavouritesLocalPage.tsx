import cookies from 'js-cookie'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import { connect } from 'react-redux'

import { Job as JobType } from '../../types/Job'
import FavouritesPage from '../FavouritesPage/FavouritesPage'
import Loader from '../Loader/Loader'
import Modal from '../Modal/Modal'
import Info from '../Info/Info'
import InfoTypes from '../Info/InfoTypes'
import Job from '../Jobs/Job/Job'
import { StyledButton } from '../SearchEngine/styledSearchEngine'
import Theme from '../../styles/theme'
import useManageFavJobs from '../customHooks/useManageFavJobs';
import mapFavJobsDispatchToProps from '../../store/favJobs/mapFavJobsDispatchToProps'
import * as SC from '../FavouritesPage/styledFavouritesPage'

interface FavouritesLocalPageProps {
    amount : number;
    jobs : Array<JobType>;
    removeJob : (jobs: Array<JobType>, job: JobType) => void;
}

const FavouritesLocalPage : React.FC<FavouritesLocalPageProps> = ({ amount, jobs, removeJob }) => {

    const { addJobToDb, state: { loading, success, error, errorMsg }, job: selectedJob } = useManageFavJobs()

    const renderStatus = () => {
        if (loading) return (
            <SC.StyledWrapper>
                <Loader />
            </SC.StyledWrapper>
        )
        else if (error) return (
            <SC.StyledWrapper>
                <Modal>
                    <Info state={InfoTypes.ERROR}>
                        {errorMsg}
                    </Info>
                </Modal>
            </SC.StyledWrapper>
        )
        else if (success) return (
            <SC.StyledWrapper>
                <Modal>
                    <Info state={InfoTypes.SUCCESS}>
                        This job has been synchronized with cloud successfully
                    </Info>
                </Modal>
            </SC.StyledWrapper>
        )
        return null
    }

    return (
        <FavouritesPage amount={amount}>
            {jobs.map((job, index : number) => (
                <SC.StyledJob key={job.id}>
                    <Job width='100%' border={true} index={index} title={job.title} id={job.id} company_logo={job.company_logo} company={job.company} location={job.location} created_at={job.created_at} />
                    <SC.StyledButtons>
                        <StyledButton onClick={() => removeJob(jobs, job)} color={Theme.colors.error} offsetTop='5px' width='100%' fontSize='15px'>
                            <DeleteForeverIcon />
                        </StyledButton>
                        {cookies.get('_id') ?
                            <>
                                <StyledButton disabled={loading} onClick={() => addJobToDb(job)} offsetTop='5px' width='100%' fontSize='15px'>
                                    Add to cloud
                                </StyledButton>
                                {selectedJob?.id === job.id ? renderStatus() : null}
                            </>
                            :
                            <StyledButton style={{ cursor: 'not-allowed' }} color={Theme.colors.lightGray} disabled expand='300px' offsetTop='5px' width='100%' fontSize='15px'>
                                Log in to synchronize with cloud
                            </StyledButton>
                        }
                    </SC.StyledButtons>
                </SC.StyledJob>
            ))}
        </FavouritesPage>
    )
} 

const mapStateToProps = (state : any) => ({
    amount: state.favJobs.amount,
    jobs: state.favJobs.jobs
})

export default connect(mapStateToProps, mapFavJobsDispatchToProps)(FavouritesLocalPage)