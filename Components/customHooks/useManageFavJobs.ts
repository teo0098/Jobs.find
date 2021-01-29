import axios from '../../axiosInstance'
import cookies from 'js-cookie'
import { useReducer, useState } from 'react'

import { Job } from "../../types/Job"
import { reducer, initialState } from '../../useReducers/registerReducer/registerReducer'
import RegisterActions from '../../useReducers/registerReducer/actionTypes'

const useManageFavJobs = () => {

    const [state, dispatch] = useReducer(reducer, initialState)
    const [job, setJob] = useState<Job | null>(null)

    const add = async () => {
        dispatch({ type: RegisterActions.LOADING, errorMsg: '' })
        try {
            const d = await axios.post(`/api/users/${cookies.get('_id')}/favjobs`, job)
            console.log(d)
            dispatch({ type: RegisterActions.SUCCESS, errorMsg: '' })
        }
        catch {
            dispatch({ type: RegisterActions.ERROR, errorMsg: RegisterActions.UNABLE_TO_ADD_JOB })
        }
    }

    const addJobToDb = (job : Job) => {
        setJob(job)
        add()
    }

    const removeJobFromDb = () => {

    }

    return { addJobToDb, removeJobFromDb, state, job }
}

export default useManageFavJobs