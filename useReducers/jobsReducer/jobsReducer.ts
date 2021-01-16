import { Job as JobType } from '../../types/Job'
import JobsActions from './actionTypes'

export const initialState = (jobs : Array<JobType> | null) => ({
    page: 0,
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
    newOffers: Array<JobType>,
    errorMSG: string
}

export const reducer = (state : StateType, action : ActionType) => {
    switch (action.type) {
        case JobsActions.MORE_JOBS:
            return {
                ...state,
                error: '',
                page: state.page + 1,
                loading: true      
            }
        case JobsActions.GOT_JOBS:
            return {
                ...state,
                loading: false,
                error: '',
                offers: [...state.offers, ...action.newOffers],
                offersQuantity: action.newOffers.length
            }
        case JobsActions.REPLACE_JOBS:
            return {
                ...state,
                loading: true,
                error: '',
                page: 0,
                offers: [],
                offersQuantity: 0
            }
        case JobsActions.ERROR:
            return {
                ...state,
                loading: false,
                error: action.errorMSG
            }
        default:
            return state
    }
}