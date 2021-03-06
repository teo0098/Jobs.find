import { useEffect, useReducer } from 'react';
import { useRouter, NextRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'

import axios from '../../axiosInstance'
import { Job } from '../../types/Job'
import { reducer, initialState, StateType } from '../../useReducers/jobsReducer/jobsReducer'
import JobsActions from '../../useReducers/jobsReducer/actionTypes'

type Function = (jobs : Array<Job> | null) => { getMoreJobs : () => Promise<void>, state : StateType, query : ParsedUrlQuery};

const useJobs : Function = (jobs) => {

    const [state, dispatch] = useReducer(reducer, initialState(jobs))
    const { query } : NextRouter = useRouter()

    useEffect(() => {
        if (query.search) {
            const getSearchData = async () => {
                dispatch({ type: JobsActions.REPLACE_JOBS, newOffers: [], errorMSG: '' })
                try {
                    const { data: seekJobs, status } = await axios.get(`/api/jobs?page=${state.page}&search=${query.search ? query.search : ''}`)
                    if (!seekJobs || status !== 200 || seekJobs === JobsActions.ERROR) throw new Error()
                    dispatch({ type: JobsActions.GOT_JOBS, newOffers: seekJobs, errorMSG: '' })
                }
                catch {
                    dispatch({ type: JobsActions.ERROR, newOffers: [], errorMSG: 'Unable to retrieve seek jobs... Please attempt again soon.' })
                }
            }
            getSearchData()
        }
    }, [query])
    
    const getMoreJobs = async () => {
        window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight)
        dispatch({ type: JobsActions.MORE_JOBS, newOffers: [], errorMSG: '' })
        try {
            const { data: jobs, status } = await axios.get(`/api/jobs?page=${state.page + 2}&search=${query.search ? query.search : ''}`)
            if (status !== 200 || !jobs || jobs === JobsActions.ERROR) throw new Error()
            dispatch({ type: JobsActions.GOT_JOBS, newOffers: jobs, errorMSG: '' })
        }
        catch {
            window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight)
            dispatch({ type: JobsActions.ERROR, newOffers: [], errorMSG: 'Unable to retrieve more jobs... Please attempt again soon.' })
        }
    }

    return { getMoreJobs, state, query }
}

export default useJobs