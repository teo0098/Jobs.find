import { useReducer, useState } from 'react'
import { useRouter } from 'next/router'

import axios from '../../axiosInstance'
import { initialState, reducer } from '../../useReducers/registerReducer/registerReducer'
import RegisterActions from '../../useReducers/registerReducer/actionTypes'

const useLogout = () => {

    const [state, dispatch] = useReducer(reducer, initialState)
    const [submenu, setSubmenu] = useState<boolean>(false)
    const { push } = useRouter()

    const logout = async () => {
        dispatch({ type: RegisterActions.LOADING, errorMsg: '' })
        try {
            const { status } = await axios.get('/api/logout')
            if (status === 500) throw new Error()
            dispatch({ type: RegisterActions.SUCCESS, errorMsg: '' })
            setSubmenu(false)
            push('/signin')
        }
        catch {
            dispatch({ type: RegisterActions.ERROR, errorMsg: '' })
        }
    }

    return { logout, state, submenu, setSubmenu }
}

export default useLogout