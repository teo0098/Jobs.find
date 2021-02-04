import { useReducer } from 'react'
import { useRouter } from 'next/router'

import axios from '../../axiosInstance'
import { initialState, reducer } from '../../useReducers/registerReducer/registerReducer'
import RegisterActions from '../../useReducers/registerReducer/actionTypes'

const useSignin = () => {

    const [state, dispatch] = useReducer(reducer, initialState)
    const { push } = useRouter()

    const handleOnSubmit = async (values : {}) => {
        dispatch({ type: RegisterActions.LOADING, errorMsg: '' })
        try {
            const { data, status } = await axios.post('/api/login', values)
            if (status === 500) throw new Error()
            if (status === 403) return dispatch({ type: RegisterActions.ERROR, errorMsg: data })
            dispatch({ type: RegisterActions.SUCCESS, errorMsg: '' })
            push('/favourites/cloud')
        }
        catch {
            dispatch({ type: RegisterActions.ERROR, errorMsg: RegisterActions.UNABLE_TO_LOGIN })
        }
    }

    return { handleOnSubmit, state }
}

export default useSignin