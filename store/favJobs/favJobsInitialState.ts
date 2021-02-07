import { Job } from '../../types/Job'

export type FavJobsInitialStateType = {
    amount : number,
    jobs : Array<Job>
}

export const favJobsInitialState : FavJobsInitialStateType = {
    amount: 0,
    jobs: []
}