import { Job } from '../../types/Job'
import FavJobsActionTypes from './favJobsActionTypes'

export const addJob = (job : Job) => ({
    type: FavJobsActionTypes.ADD_JOB,
    newJob: job
})

export const removeJob = (jobs : Array<Job>, job : Job) => {

    const newJobs = jobs.filter((j : Job) => j.id !== job.id)

    return {
        type: FavJobsActionTypes.REMOVE_JOB,
        newJobs
    }
}

export const clearJobs = () => ({
    type: FavJobsActionTypes.CLEAR_JOBS
})