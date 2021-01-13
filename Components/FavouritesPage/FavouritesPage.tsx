import Link from 'next/link'
import { useRouter } from 'next/router'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { connect } from 'react-redux'

import FavouritesPageProps from './favouritesPageProps'
import { StyledDiv, StyledLink, StyledLinks, StyledData, StyledJob } from './styledFavouritesPage'
import Job from '../Jobs/Job/Job'
import { StyledButton } from '../SearchEngine/styledSearchEngine'
import Theme from '../../styles/theme'
import mapFavJobsDispatchToProps from '../../store/favJobs/mapFavJobsDispatchToProps'

const FavouritesPage : React.FC<FavouritesPageProps> = ({ jobs, amount, removeJob }) => {

    const { pathname } = useRouter()

    return (
        <StyledDiv>
            <StyledLinks>
                <Link href='/favourites/local' passHref>
                    <StyledLink active={pathname.includes('local') ? true : false}>Favourite jobs on this device</StyledLink>
                </Link>
                <Link href='/favourites/cloud' passHref>
                    <StyledLink active={pathname.includes('cloud') ? true : false}>Favourite jobs in a cloud</StyledLink>
                </Link>
            </StyledLinks>
            <StyledData>
                <p>Amount: {amount} </p>
                {jobs.length === 0 ?
                    <p>Zobacz wiecej</p>
                    :
                    jobs.map((job, index : number) => (
                        <StyledJob key={job.id}>
                            <Job border={true} index={index} title={job.title} id={job.id} company_logo={job.company_logo} company={job.company} location={job.location} created_at={job.created_at} />
                            <StyledButton onClick={() => removeJob(jobs, job)} color={Theme.colors.error} offsetTop='10px' width='100%' fontSize='15px'>
                                <DeleteForeverIcon />
                            </StyledButton>
                        </StyledJob>
                    ))
                }
            </StyledData>
        </StyledDiv>
    )
} 

export default connect(null, mapFavJobsDispatchToProps)(FavouritesPage)