import cookies from 'js-cookie'
import { useReducer, useState } from 'react'

import axios from '../../axiosInstance'
import { Job } from "../../types/Job"
import { reducer, initialState } from '../../useReducers/registerReducer/registerReducer'
import RegisterActions from '../../useReducers/registerReducer/actionTypes'

const useManageFavJobs = () => {

    const [state, dispatch] = useReducer(reducer, initialState)
    const [job, setJob] = useState<Job | null>(null)

    const add = async (offer : Job) => {
        dispatch({ type: RegisterActions.LOADING, errorMsg: '' })
        try {
            const { status } = await axios.post(`/api/users/${cookies.get('_id')}/favjobs`, offer, { headers: { Authorization: `Bearer ${sessionStorage.getItem('accessToken')}` } })
            if (status === 500) throw new Error()
            if (status === 403) {
                const { data: tokenData, status: tokenStatus } = await axios.get(`/api/users/${cookies.get('_id')}/token`)
                if (tokenStatus === 403) return dispatch({ type: RegisterActions.ERROR, errorMsg: tokenData })
                sessionStorage.setItem('accessToken', tokenData)
                const { data: newData, status: newStatus } = await axios.post(`/api/users/${cookies.get('_id')}/favjobs`, offer, { headers: { Authorization: `Bearer ${sessionStorage.getItem('accessToken')}` } })
                if (newStatus === 500) throw new Error()
                if (newStatus === 403) return dispatch({ type: RegisterActions.ERROR, errorMsg: newData })
                if (newStatus === 409) return dispatch({ type: RegisterActions.ERROR, errorMsg: RegisterActions.JOB_EXISTS })
            }
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
            const { status } = await axios.delete(`/api/users/${cookies.get('_id')}/favjobs?job=${encodeURIComponent(offer.id)}`, { headers: { Authorization: `Bearer ${sessionStorage.getItem('accessToken')}` } })
            if (status === 500) throw new Error()
            if (status === 403) {
                const { data: tokenData, status: tokenStatus } = await axios.get(`/api/users/${cookies.get('_id')}/token`)
                if (tokenStatus === 403) return dispatch({ type: RegisterActions.ERROR, errorMsg: tokenData })
                sessionStorage.setItem('accessToken', tokenData)
                const { data: newData, status: newStatus } = await axios.delete(`/api/users/${cookies.get('_id')}/favjobs?job=${encodeURIComponent(offer.id)}`, { headers: { Authorization: `Bearer ${sessionStorage.getItem('accessToken')}` } })
                if (newStatus === 500) throw new Error()
                if (newStatus === 403) return dispatch({ type: RegisterActions.ERROR, errorMsg: newData })
            }
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