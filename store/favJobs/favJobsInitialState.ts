import { Job } from '../../types/Job'

type FavJobsInitialStateType = {
    amount : number,
    jobs : Array<Job>
}

const favJobsInitialState : FavJobsInitialStateType = {
    amount: 0,
    jobs: []
}

export default favJobsInitialState