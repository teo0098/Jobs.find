import axios from '../../axiosInstance'
import cookies from 'js-cookie'
import { useReducer, useState } from 'react'

import { Job } from "../../types/Job"
import { reducer, initialState } from '../../useReducers/registerReducer/registerReducer'
import RegisterActions from '../../useReducers/registerReducer/actionTypes'

const useManageFavJobs = () => {

    const [state, dispatch] = useReducer(reducer, initialState)
    const [job, setJob] = useState<Job | null>(null)

    const add = async (offer : Job) => {
        dispatch({ type: RegisterActions.LOADING, errorMsg: '' })
        try {
            const { status, data } = await axios.post(`/api/users/${cookies.get('_id')}/favjobs`, offer)
            if (status === 500) throw new Error()
            if (status === 403) return dispatch({ type: RegisterActions.ERROR, errorMsg: data })
            if (status === 409) return dispatch({ type: RegisterActions.ERROR, errorMsg: RegisterActions.JOB_EXISTS })
            dispatch({ type: RegisterActions.SUCCESS, errorMsg: '' })
        }
        catch {
            dispatch({ type: RegisterActions.ERROR, errorMsg: RegisterActions.UNABLE_TO_ADD_JOB })
        }
    }

    const addJobToDb = (offer : Job) => {
        setJob(offer)
        add(offer)
    }

    const remove = async (offer : Job) => {
        dispatch({ type: RegisterActions.LOADING, errorMsg: '' })
        try {
            const { status, data } = await axios.delete(`/api/users/${cookies.get('_id')}/favjobs?job=${encodeURIComponent(offer.id)}`)
            if (status === 500) throw new Error()
            if (status === 403) return dispatch({ type: RegisterActions.ERROR, errorMsg: data })
            dispatch({ type: RegisterActions.SUCCESS, errorMsg: '' })
        }
        catch {
            dispatch({ type: RegisterActions.ERROR, errorMsg: RegisterActions.UNABLE_TO_REMOVE_JOB })
        }
    }

    const removeJobFromDb = (offer : Job) => {
        setJob(offer)
        remove(offer)
    }

    return { addJobToDb, removeJobFromDb, state, job }
}

export default useManageFavJobs