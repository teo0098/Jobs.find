import { useReducer } from 'react'

import axios from '../../axiosInstance'
import { initialState, reducer } from '../../useReducers/registerReducer/registerReducer'
import actionTypes from '../../useReducers/registerReducer/actionTypes'

const useSignin = () => {

    const [state, dispatch] = useReducer(reducer, initialState)

    const handleOnSubmit = async (values : any) => {
        dispatch({ type: actionTypes.LOADING, errorMsg: '' })
        try {
            const { data, status } = await axios.post('/api/login', values)
            if (!data || status === 500) throw new Error()
            if (status === 403) return dispatch({ type: actionTypes.ERROR, errorMsg: data })
            dispatch({ type: actionTypes.SUCCESS, errorMsg: '' })
        }
        catch {
            dispatch({ type: actionTypes.ERROR, errorMsg: actionTypes.UNABLE_TO_LOGIN })
        }
    }

    return { handleOnSubmit, state }
}

export default useSignin