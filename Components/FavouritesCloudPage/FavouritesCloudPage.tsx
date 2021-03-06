import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import cookies from 'js-cookie'

import FavouritesPage from '../FavouritesPage/FavouritesPage'
import * as SC from '../FavouritesPage/styledFavouritesPage'
import Job from '../Jobs/Job/Job'
import { StyledButton } from '../SearchEngine/styledSearchEngine'
import Theme from '../../styles/theme'
import useManageFavJobs from '../customHooks/useManageFavJobs';
import Modal from '../Modal/Modal'
import Info from '../Info/Info'
import InfoTypes from '../Info/InfoTypes'
import Loader from '../Loader/Loader'
import { Job as JobType } from '../../types/Job'
import useGetData from '../customHooks/useGetData'

const FavouritesCloudPage : React.FC = () => {

    const { removeJobFromDb, state: { loading, error, errorMsg, success }, job: selectedJob } = useManageFavJobs()
    const { dataLoading, userData, setUserData } = useGetData(`/api/users/${cookies.get('_id')}/favjobs`)

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
        else if (success) {
            setUserData(prevState => prevState ? (prevState as JobType[]).filter(job => job.id !== selectedJob?.id) : null)
        }
        return null
    }

    const renderFabJobs = () => {
        if (userData) return (userData as JobType[]).map((job, index : number) => (
            <SC.StyledJob key={job.id}>
                <Job width='100%' border={true} index={index} title={job.title} id={job.id} company_logo={job.company_logo} company={job.company} location={job.location} created_at={job.created_at} />
                <SC.StyledButtons buttons={1}>
                    <StyledButton onClick={() => removeJobFromDb(job)} color={Theme.colors.error} offsetTop='5px' width='100%' fontSize='15px'>
                        <DeleteForeverIcon />
                    </StyledButton>
                    {selectedJob?.id === job.id ? renderStatus() : null}
                </SC.StyledButtons>
            </SC.StyledJob>
        ))
        return null
    }

    return (
        <FavouritesPage amount={userData ? (userData as JobType[]).length : 0}>
            {dataLoading && cookies.get('name') && cookies.get('_id') ? <Loader /> : renderFabJobs()}
        </FavouritesPage>
    )
} 

export default FavouritesCloudPage