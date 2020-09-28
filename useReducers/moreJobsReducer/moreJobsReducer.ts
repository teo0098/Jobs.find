import JobType from '../../types/Job'
import MoreJobsActions from './actionTypes'

export const initialState = (jobs : Array<JobType> | null) => ({
    page: 2,
    offers: jobs ? [...jobs] : [],
    error: '',
    loading: false,
    offersQuantity: jobs ? jobs.length : 0
})

export type StateType = {
    page: number,
    offers: Array<JobType>,
    error: string,
    loading: boolean,
    offersQuantity: number
}

type ActionType = {
    type: string,
    newOffers: Array<JobType>
}

export const reducer = (state : StateType, action : ActionType) => {
    switch (action.type) {
        case MoreJobsActions.MORE_JOBS:
            return {
                ...state,
                error: '',
                page: state.page + 1,
                loading: true      
            }
        case MoreJobsActions.GOT_JOBS:
            return {
                ...state,
                loading: false,
                error: '',
                offers: [...state.offers, ...action.newOffers],
                offersQuantity: action.newOffers.length
            }
        case MoreJobsActions.ERROR:
            return {
                ...state,
                loading: false,
                error: 'Unable to retrieve more jobs... Please attempt again soon.'
            }
        default:
            return state
    }
}