import { useReducer } from 'react';
import axios, { AxiosResponse } from 'axios'

import JobType from '../../types/Job'
import { reducer, initialState, StateType } from '../../useReducers/moreJobsReducer/moreJobsReducer'
import MoreJobsActions from '../../useReducers/moreJobsReducer/actionTypes'

type Function = (jobs : Array<JobType> | null) => { getMoreJobs : () => Promise<void>, state : StateType };

const useMoreJobs : Function = (jobs) => {

    const [state, dispatch] = useReducer(reducer, initialState(jobs))
    
    const getMoreJobs = async () => {
        window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight)
        dispatch({ type: MoreJobsActions.MORE_JOBS, newOffers: [] })
        try {
            const { data: jobs, status } : AxiosResponse<Array<JobType>> = await axios.get(`/api/jobs?page=${state.page}`)
            if (status !== 200) throw new Error()
            dispatch({ type: MoreJobsActions.GOT_JOBS, newOffers: jobs })
        }
        catch {
            window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight)
            dispatch({ type: MoreJobsActions.ERROR, newOffers: [] })
        }
    }

    return { getMoreJobs, state }
}

export default useMoreJobs