import DeleteForeverIcon from '@material-ui/icons/DeleteForever'

import FavouritesPage from '../FavouritesPage/FavouritesPage'
import FavouriteCloudPageProps from './favouriteCloudPageProps'
import * as SC from '../FavouritesPage/styledFavouritesPage'
import Job from '../Jobs/Job/Job'
import { StyledButton } from '../SearchEngine/styledSearchEngine'
import Theme from '../../styles/theme'
import useManageFavJobs from '../customHooks/useManageFavJobs';
import Modal from '../Modal/Modal'
import Info from '../Info/Info'
import InfoTypes from '../Info/InfoTypes'
import Loader from '../Loader/Loader'
import { useState } from 'react'
import { Job as JobType } from '../../types/Job'

const FavouritesCloudPage : React.FC<FavouriteCloudPageProps> = ({ jobs }) => {

    const { removeJobFromDb, state: { loading, error, errorMsg, success }, job: selectedJob } = useManageFavJobs()
    const [offers, setOffers] = useState<Array<JobType>>(jobs)

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
            setOffers(prevState => prevState.filter(job => job.id !== selectedJob?.id))
        }
        return null
    }

    return (
        <FavouritesPage amount={offers.length}>
            {offers.map((job, index : number) => (
                <SC.StyledJob key={job.id}>
                    <Job width='100%' border={true} index={index} title={job.title} id={job.id} company_logo={job.company_logo} company={job.company} location={job.location} created_at={job.created_at} />
                    <SC.StyledButtons>
                        <StyledButton onClick={() => removeJobFromDb(job)} color={Theme.colors.error} offsetTop='5px' width='100%' fontSize='15px'>
                            <DeleteForeverIcon />
                        </StyledButton>
                        {selectedJob?.id === job.id ? renderStatus() : null}
                    </SC.StyledButtons>
                </SC.StyledJob>
            ))}
        </FavouritesPage>
    )
} 

export default FavouritesCloudPage