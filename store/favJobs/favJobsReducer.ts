import favJobsInitialState from './favJobsInitialState'
import FavJobsActionTypes from './favJobsActionTypes'
import { Job } from '../../types/Job'

export type ActionType = {
    type : string;
    newJob ?: Job;
    newJobs ?: Array<Job>;
}

export const favJobsReducer = (state = favJobsInitialState, action : ActionType) => {
    switch (action.type) {
        case FavJobsActionTypes.ADD_JOB:
            return {
                amount: state.amount + 1,
                jobs: [...state.jobs, action.newJob]
            }
        case FavJobsActionTypes.REMOVE_JOB:
            return {
                amount: state.amount - 1,
                jobs: [...(action.newJobs as Array<Job>)]
            }
        case FavJobsActionTypes.CLEAR_JOBS:
            return {
                ...favJobsInitialState
            }
        default:
            return state
    }
}