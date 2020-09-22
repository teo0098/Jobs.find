import JobsProps from './jobsProps'
import Job from './Job/Job'
import { StyledError, StyledJobs } from './styledJobs'
import Error from '../Error/Error'

const Jobs : React.FC<JobsProps> = ({ jobs }) => {

    return (
        <StyledJobs>
            {jobs ?
                jobs.map(({ title, id, company_logo, company, location, created_at }, index : number) => (
                    <Job index={index} key={id} title={title} id={id} company_logo={company_logo} company={company} location={location} created_at={created_at} />
                ))
                :
                <StyledError>
                    <Error>Unable to present jobs for you... Please reload the page or attempt again soon.</Error>
                </StyledError>
            }
        </StyledJobs>
    )
}

export default Jobs