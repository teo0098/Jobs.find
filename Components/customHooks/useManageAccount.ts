import { useReducer, useState } from "react"
import axios from '../../axiosInstance'
import cookies from 'js-cookie'

import RegisterActions from "../../useReducers/registerReducer/actionTypes"
import { initialState, reducer } from "../../useReducers/registerReducer/registerReducer"

const useManageAccount = () => {

    const [state, dispatch] = useReducer(reducer, initialState)
    const [edited, setEdited] = useState(0)

    const handleEditPersonalData = async (values : any) => {
        setEdited(0)
        dispatch({ type: RegisterActions.LOADING, errorMsg: '' })
        try {
            const { status, data } = await axios.put(`/api/users/${cookies.get('_id')}/account`, values)
            if (status === 500) throw new Error()
            if (status === 403) return dispatch({ type: RegisterActions.ERROR, errorMsg: data })
            if (status === 409) return dispatch({ type: RegisterActions.ERROR, errorMsg: RegisterActions.EMAIL_IN_USE })
            dispatch({ type: RegisterActions.SUCCESS, errorMsg: '' })
            cookies.set('name', values.name)
        }
        catch {
            dispatch({ type: RegisterActions.ERROR, errorMsg: RegisterActions.UNABLE_TO_EDIT })
        }
    }

    const handleEditPassword = async (values : {}) => {
        setEdited(1)
        dispatch({ type: RegisterActions.LOADING, errorMsg: '' })
        try {
            const { status, data } = await axios.patch(`/api/users/${cookies.get('_id')}/account`, values)
            if (status === 500) throw new Error()
            if (status === 403) return dispatch({ type: RegisterActions.ERROR, errorMsg: data })
            dispatch({ type: RegisterActions.SUCCESS, errorMsg: '' })
        }
        catch {
            dispatch({ type: RegisterActions.ERROR, errorMsg: RegisterActions.UNABLE_TO_EDIT_PASSWORD })
        }
    }

    return { handleEditPersonalData, handleEditPassword, state, edited }
}

export default useManageAccount