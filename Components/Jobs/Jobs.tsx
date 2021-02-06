import SearchIcon from '@material-ui/icons/Search';

import JobsProps from './jobsProps'
import Job from './Job/Job'
import { StyledError, StyledJobs, StyledMoreButton, StyledLoader, StyledMoreError, StyledNoResults, StyledP } from './styledJobs'
import Error from '../Error/Error'
import useJobs from '../customHooks/useJobs'
import Loader from '../Loader/Loader'
import Modal from '../Modal/Modal'

const Jobs : React.FC<JobsProps> = ({ jobs, jobWidth, paddingTop }) => {

    const { getMoreJobs, state: { error, loading, offers, offersQuantity }, query } = useJobs(jobs)

    if (query.search && !loading && !error && offersQuantity < 1) return (
        <StyledNoResults>
            <SearchIcon style={{ fontSize: '30px' }} />
            <StyledP>No matched results were found...</StyledP>
        </StyledNoResults>
    )

    return (
        <StyledJobs paddingTop={paddingTop} id='jobs'>
            {jobs ?
                <>
                    {offers.map(({ title, id, company_logo, company, location, created_at }, index : number) => (
                        <Job width={jobWidth} index={index} key={id} title={title} id={id} company_logo={company_logo} company={company} location={location} created_at={created_at} />
                    ))}
                    {error ?
                        <Modal>
                            <StyledMoreError>
                                <Error>{error}</Error>
                            </StyledMoreError>
                        </Modal> : null}
                    {loading ? <StyledLoader><Loader /></StyledLoader> : null}
                    {offersQuantity >= 50 && !loading && !error ?
                        <StyledMoreButton id='moreJobsBtn' disabled={loading ? true : false} onClick={getMoreJobs} width='90%' fontSize='14px'>More jobs</StyledMoreButton>
                        : null
                    }
                </>
                :
                <StyledError>
                    <Error>Unable to present jobs for you... Please reload the page or attempt again soon.</Error>
                </StyledError>
            }
        </StyledJobs>
    )
}

export default Jobs