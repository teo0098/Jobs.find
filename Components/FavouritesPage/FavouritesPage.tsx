import Link from 'next/link'
import { useRouter } from 'next/router'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import { connect } from 'react-redux'
import cookies from 'js-cookie'

import FavouritesPageProps from './favouritesPageProps'
import * as SC from './styledFavouritesPage'
import Job from '../Jobs/Job/Job'
import { StyledButton } from '../SearchEngine/styledSearchEngine'
import Theme from '../../styles/theme'
import mapFavJobsDispatchToProps from '../../store/favJobs/mapFavJobsDispatchToProps'
import useManageFavJobs from '../customHooks/useManageFavJobs';
import Loader from '../Loader/Loader'
import Modal from '../Modal/Modal'
import Info from '../Info/Info'
import InfoTypes from '../Info/InfoTypes'

const FavouritesPage : React.FC<FavouritesPageProps> = ({ jobs, amount, removeJob }) => {

    const { pathname } = useRouter()
    const { addJobToDb, state: { loading, success, error, errorMsg }, job: selectedJob } = useManageFavJobs()

    const renderStatus = () => {
        if (loading) return <Loader />
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
        <SC.StyledDiv>
            <SC.StyledLinks>
                <Link href='/favourites/local' passHref>
                    <SC.StyledLink active={pathname.includes('local') ? true : false}>Favourite jobs on this device</SC.StyledLink>
                </Link>
                <Link href='/favourites/cloud' passHref>
                    <SC.StyledLink active={pathname.includes('cloud') ? true : false}>Favourite jobs in a cloud</SC.StyledLink>
                </Link>
            </SC.StyledLinks>
            <SC.StyledData>
                <p>Amount: {amount} </p>
                {jobs.length === 0 ?
                    null
                    :
                    jobs.map((job, index : number) => (
                        <SC.StyledJob key={job.id}>
                            <Job width='100%' border={true} index={index} title={job.title} id={job.id} company_logo={job.company_logo} company={job.company} location={job.location} created_at={job.created_at} />
                            <SC.StyledButtons>
                                <StyledButton onClick={() => removeJob(jobs, job)} color={Theme.colors.error} offsetTop='5px' width='100%' fontSize='15px'>
                                    <DeleteForeverIcon />
                                </StyledButton>
                                {cookies.get('name') || cookies.get('refreshToken') ?
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
                    ))
                }
            </SC.StyledData>
        </SC.StyledDiv>
    )
} 

export default connect(null, mapFavJobsDispatchToProps)(FavouritesPage)