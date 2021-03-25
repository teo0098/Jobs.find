import { useReducer, useState } from "react"
import cookies from 'js-cookie'
import { useRouter } from "next/router"

import axios from '../../axiosInstance'
import RegisterActions from "../../useReducers/registerReducer/actionTypes"
import { initialState, reducer } from "../../useReducers/registerReducer/registerReducer"

const useManageAccount = (changeName : (name: string) => void) => {

    const [state, dispatch] = useReducer(reducer, initialState)
    const [edited, setEdited] = useState<number>(0)
    const { push } = useRouter()

    const handleEditPersonalData = async (values : any) => {
        setEdited(0)
        dispatch({ type: RegisterActions.LOADING, errorMsg: '' })
        try {
            const { status } = await axios.put(`/api/users/${cookies.get('_id')}/account`, values, { headers: { Authorization: `Bearer ${sessionStorage.getItem('accessToken')}` } })
            if (status === 500) throw new Error()
            if (status === 403) {
                const { data: tokenData, status: tokenStatus } = await axios.get(`/api/users/${cookies.get('_id')}/token`)
                if (tokenStatus === 403) return dispatch({ type: RegisterActions.ERROR, errorMsg: tokenData })
                sessionStorage.setItem('accessToken', tokenData)
                const { data: newData, status: newStatus } = await axios.put(`/api/users/${cookies.get('_id')}/account`, values, { headers: { Authorization: `Bearer ${sessionStorage.getItem('accessToken')}` } })
                if (newStatus === 500) throw new Error()
                if (newStatus === 403) return dispatch({ type: RegisterActions.ERROR, errorMsg: newData })
                if (newStatus === 409) return dispatch({ type: RegisterActions.ERROR, errorMsg: RegisterActions.EMAIL_IN_USE })   
            }
            if (status === 409) return dispatch({ type: RegisterActions.ERROR, errorMsg: RegisterActions.EMAIL_IN_USE })   
            dispatch({ type: RegisterActions.SUCCESS, errorMsg: '' })
            changeName(values.name as string)
        }
        catch {
            dispatch({ type: RegisterActions.ERROR, errorMsg: RegisterActions.UNABLE_TO_EDIT })
        }
    }

    const handleEditPassword = async (values : {}) => {
        setEdited(1)
        dispatch({ type: RegisterActions.LOADING, errorMsg: '' })
        try {
            const { status } = await axios.patch(`/api/users/${cookies.get('_id')}/account`, values, { headers: { Authorization: `Bearer ${sessionStorage.getItem('accessToken')}` } })
            if (status === 500) throw new Error()
            if (status === 403) {
                const { data: tokenData, status: tokenStatus } = await axios.get(`/api/users/${cookies.get('_id')}/token`)
                if (tokenStatus === 403) return dispatch({ type: RegisterActions.ERROR, errorMsg: tokenData })
                sessionStorage.setItem('accessToken', tokenData)
                const { data: newData, status: newStatus } = await axios.patch(`/api/users/${cookies.get('_id')}/account`, values, { headers: { Authorization: `Bearer ${sessionStorage.getItem('accessToken')}` } })
                if (newStatus === 500) throw new Error()
                if (newStatus === 403) return dispatch({ type: RegisterActions.ERROR, errorMsg: newData })
            }
            dispatch({ type: RegisterActions.SUCCESS, errorMsg: '' })
        }
        catch {
            dispatch({ type: RegisterActions.ERROR, errorMsg: RegisterActions.UNABLE_TO_EDIT_PASSWORD })
        }
    }

    const handleDeleteAccount = async () => {
        setEdited(2)
        dispatch({ type: RegisterActions.LOADING, errorMsg: '' })
        try {
            const { status } = await axios.delete(`/api/users/${cookies.get('_id')}/account`, { headers: { Authorization: `Bearer ${sessionStorage.getItem('accessToken')}` } })
            if (status === 500) throw new Error()
            if (status === 403) {
                const { data: tokenData, status: tokenStatus } = await axios.get(`/api/users/${cookies.get('_id')}/token`)
                if (tokenStatus === 403) return dispatch({ type: RegisterActions.ERROR, errorMsg: tokenData })
                sessionStorage.setItem('accessToken', tokenData)
                const { data: newData, status: newStatus } = await axios.delete(`/api/users/${cookies.get('_id')}/account`, { headers: { Authorization: `Bearer ${sessionStorage.getItem('accessToken')}` } })
                if (newStatus === 500) throw new Error()
                if (newStatus === 403) return dispatch({ type: RegisterActions.ERROR, errorMsg: newData })
            }
            dispatch({ type: RegisterActions.SUCCESS, errorMsg: '' })
            push('/signin')
        }
        catch {
            dispatch({ type: RegisterActions.ERROR, errorMsg: RegisterActions.UNABLE_TO_DELETE_ACCOUNT })
        }
    }

    const capitalizeText = (text : string) => text.split(' ').map(str => str.charAt(0).toUpperCase() + str.slice(1)).join(' ')

    return { handleEditPersonalData, handleEditPassword, state, edited, capitalizeText, handleDeleteAccount }
}

export default useManageAccount