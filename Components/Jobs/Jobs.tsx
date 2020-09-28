import JobsProps from './jobsProps'
import Job from './Job/Job'
import { StyledError, StyledJobs, StyledMoreButton, StyledLoader, StyledMoreError } from './styledJobs'
import Error from '../Error/Error'
import useMoreJobs from '../customHooks/useMoreJobs'
import Loader from '../Loader/Loader'
import Modal from '../Modal/Modal'

const Jobs : React.FC<JobsProps> = ({ jobs }) => {

    const { getMoreJobs, state: { error, loading, offers, offersQuantity } } = useMoreJobs(jobs)

    return (
        <StyledJobs id='jobs'>
            {jobs ?
                <>
                    {offers.map(({ title, id, company_logo, company, location, created_at }, index : number) => (
                        <Job index={index} key={id} title={title} id={id} company_logo={company_logo} company={company} location={location} created_at={created_at} />
                    ))}
                    {error ?
                        <Modal>
                            <StyledMoreError>
                                <Error>{error}</Error>
                            </StyledMoreError>
                        </Modal> : null}
                    {loading ? <StyledLoader><Loader /></StyledLoader> : null}
                    {offersQuantity >= 50 ?
                        <StyledMoreButton disabled={loading ? true : false} onClick={getMoreJobs} width='90%' fontSize='14px'>More jobs</StyledMoreButton>
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