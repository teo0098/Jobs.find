import htmlParser from 'html-react-parser'
import FavouriteIcon from '@material-ui/icons/FavoriteBorderOutlined'
import { connect } from 'react-redux'

import JobPageProps from './jobPageProps'
import * as SC from './styledJobPage'
import Error from '../Error/Error'
import Loader from '../Loader/Loader'
import Jobs from '../Jobs/Jobs'
import mapFavJobsDispatchToProps from '../../store/favJobs/mapFavJobsDispatchToProps'
import useJob from '../customHooks/useJob'
import Theme from '../../styles/theme'

const JobPage : React.FC<JobPageProps> = ({ job, isFallback, addJob, jobs, removeJob }) => {

    const { isJobInFavourite } = useJob()

    if (isFallback) return (
        <div style={{ margin: '20px' }}>
            <Loader />
        </div>
    )

    if (!job) return (
        <SC.StyledError>
            <Error> Unable to present job for you (it may indicate that this job no longer exists)... Please attempt again soon. </Error>
        </SC.StyledError>
    )

    return (
        <>
            <SC.StyledDiv grid id='jobPage'>
                <div>
                    <SC.StyledInfo resp>
                        <SC.StyledImg src={`${job.jobData.company_logo ? job.jobData.company_logo : ''}`} alt='Company logo' />
                        <section>
                            <h2 id='jobTitle'> {job.jobData.title} </h2>
                            <SC.StyledP> Company: <SC.StyledA rel="noopener nofollow" target="_blank" href={`${job.jobData.company_url}`}> {job.jobData.company} </SC.StyledA></SC.StyledP>
                            <SC.StyledP> Type: <SC.StyledSpan>{job.jobData.type}</SC.StyledSpan></SC.StyledP>
                            <SC.StyledP> Location: <SC.StyledSpan>{job.jobData.location}</SC.StyledSpan></SC.StyledP>
                            <SC.StyledP> Posted: <SC.StyledSpan>{job.jobData.created_at}</SC.StyledSpan></SC.StyledP>
                        </section>
                    </SC.StyledInfo>
                    <SC.StyledInfo borderLeft>
                        <SC.StyledP desc>Description</SC.StyledP>
                        <SC.StyledDesc> {htmlParser(job.jobData.description)} </SC.StyledDesc>
                    </SC.StyledInfo>
                </div>
                <SC.StyledStickyApply>
                    <SC.StyledInfo>
                        <SC.StyledP desc>How to apply?</SC.StyledP>
                        <SC.StyledApplyContainer>
                            {htmlParser(job.jobData.how_to_apply)}
                        </SC.StyledApplyContainer>
                    </SC.StyledInfo>
                    <SC.StyledInfo>
                        <SC.StyledP desc>Has that job suited you?</SC.StyledP>
                        {isJobInFavourite(jobs, job.jobData) ?
                            <SC.StyledFavBtn color={Theme.colors.error} onClick={() =>  removeJob(jobs, job.jobData)} width="100%" fontSize="16px">Remove from <FavouriteIcon style={{ marginLeft: '5px' }} /></SC.StyledFavBtn>
                            :
                            <SC.StyledFavBtn onClick={() => addJob(job.jobData)} width="100%" fontSize="16px">Add to <FavouriteIcon style={{ marginLeft: '5px' }} /></SC.StyledFavBtn>
                        }
                    </SC.StyledInfo>
                </SC.StyledStickyApply>
            </SC.StyledDiv>
            {job.similarJobs.length > 0 ?
                <SC.StyledDiv>
                    <SC.StyledP desc margin='20px 5px 10px 5px'>Similar jobs' offers</SC.StyledP>
                    <Jobs jobs={job.similarJobs} /> 
                </SC.StyledDiv> 
            : null}
        </>
    )
}

const mapFavJobsStateToProps = (state : any) => ({
    jobs : state.favJobs.jobs
})

export default connect(mapFavJobsStateToProps, mapFavJobsDispatchToProps)(JobPage)