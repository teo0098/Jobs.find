import CircularProgress from '@material-ui/core/CircularProgress';

import JobsProps from './jobsProps'
import Job from './Job/Job'
import { StyledError, StyledJobs, StyledMoreButton, StyledLoader } from './styledJobs'
import Error from '../Error/Error'
import useMoreJobs from '../customHooks/useMoreJobs'

const Jobs : React.FC<JobsProps> = ({ jobs }) => {

    const { getMoreJobs, state } = useMoreJobs(jobs)

    return (
        <StyledJobs id='jobs'>
            {jobs ?
                <>
                    {state.offers.map(({ title, id, company_logo, company, location, created_at }, index : number) => (
                        <Job index={index} key={id} title={title} id={id} company_logo={company_logo} company={company} location={location} created_at={created_at} />
                    ))}
                    {state.error ? state.error : null}
                    {state.loading ? <StyledLoader><CircularProgress /></StyledLoader> : null}
                    <StyledMoreButton onClick={getMoreJobs} width='90%' fontSize='14px'>More jobs</StyledMoreButton>
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