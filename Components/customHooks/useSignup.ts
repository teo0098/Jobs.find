import { useReducer } from 'react'

import axios from '../../axiosInstance'
import { reducer, initialState, StateType } from '../../useReducers/registerReducer/registerReducer'
import RegisterActions from '../../useReducers/registerReducer/actionTypes'

type Function = () => { handleOnSubmit : (values: any) => Promise<void>, state : StateType }

const useSignup : Function = () => {

    const [state, dispatch] = useReducer(reducer, initialState)

    const handleOnSubmit = async (values : any) => {
        dispatch({ type: RegisterActions.LOADING, errorMsg: '' })
        try {
            const { data, status } = await axios.post('/api/account', values)
            if (!data || status === 500) throw new Error()
            if (data === RegisterActions.EMAIL_EXISTS || status === 409) return dispatch({ type: RegisterActions.ERROR, errorMsg: RegisterActions.EMAIL_IN_USE })
            dispatch({ type: RegisterActions.SUCCESS, errorMsg: '' })
        }
        catch {
            dispatch({ type: RegisterActions.ERROR, errorMsg: RegisterActions.UNABLE_TO_REGISTER })
        }
    }

    return { handleOnSubmit, state }
}

export default useSignup