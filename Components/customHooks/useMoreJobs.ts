import { useReducer } from 'react';
import axios, { AxiosResponse } from 'axios'

import JobType from '../../types/Job'

const initialState = (jobs : Array<JobType> | null) => ({
    page: 0,
    offers: jobs ? [...jobs] : [],
    error: '',
    loading: true
})

type State = {
    page: number,
    offers: Array<JobType>,
    error: string,
    loading: boolean
}

type Action = {
    type: string,
    newOffers: Array<JobType>
}

const reducer = (state : State, action : Action) => {
    switch (action.type) {
        case 'MORE_JOBS':
            return {
                ...state,
                error: '',
                page: state.page + 1,
                loading: true      
            }
        case 'GOT_JOBS':
            return {
                ...state,
                loading: false,
                error: '',
                offers: [...state.offers, ...action.newOffers]
            }
        case 'ERROR':
            return {
                ...state,
                loading: false,
                error: 'Unable to retrieve more plants... Please attempt again soon.'
            }
        default:
            return state
    }
}

type Function = (jobs : Array<JobType> | null) => { getMoreJobs : () => Promise<void>, state : State };

const useMoreJobs : Function = (jobs) => {

    const [state, dispatch] = useReducer(reducer, initialState(jobs))
    
    const getMoreJobs = async () => {
        dispatch({ type: 'MORE_JOBS', newOffers: [] })
        try {
            const { data } : AxiosResponse<Array<JobType>> = await axios.get(`${process.env.GET_JOBS_API}?page=${state.page}`)
            dispatch({ type: 'GOT_JOBS', newOffers: data })
        }
        catch {
            dispatch({ type: 'ERROR', newOffers: [] })
        }
    }

    return { getMoreJobs, state }
}

export default useMoreJobs