import { useReducer } from 'react'

import axios from '../../axiosInstance'
import { initialState, reducer } from '../../useReducers/registerReducer/registerReducer'
import RegisterActions from '../../useReducers/registerReducer/actionTypes'

const useLogout = () => {

    const [state, dispatch] = useReducer(reducer, initialState)

    const logout = async () => {
        dispatch({ type: RegisterActions.LOADING, errorMsg: '' })
        try {
            const { status } = await axios.get('/api/logout')
            if (status === 500) throw new Error()
            dispatch({ type: RegisterActions.SUCCESS, errorMsg: '' })
        }
        catch {
            dispatch({ type: RegisterActions.ERROR, errorMsg: RegisterActions.UNABLE_TO_LOGIN })
        }
    }

    return { logout, state }
}

export default useLogout