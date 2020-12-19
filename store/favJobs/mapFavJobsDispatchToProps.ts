import { addJob, removeJob, clearJobs } from './favJobsActionCreators'
import { Job } from '../../types/Job'
import { ActionType } from './favJobsReducer'
import { Dispatch } from 'react'

const mapFavJobsDispatchToProps = (dispatch : Dispatch<ActionType>) => ({
    addJob: (job : Job) => dispatch(addJob(job)),
    removeJob: (jobs : Array<Job>, job : Job) => dispatch(removeJob(jobs, job)),
    clearJobs: () => dispatch(clearJobs())
})

export default mapFavJobsDispatchToProps