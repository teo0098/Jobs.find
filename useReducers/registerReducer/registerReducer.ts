import RegisterActions from './actionTypes'

export const initialState = {
    error: false,
    errorMsg: '',
    loading: false,
    success: false
}

export type StateType = {
    error : boolean,
    errorMsg : string,
    loading : boolean,
    success : boolean
}

type ActionType = {
    type : string,
    errorMsg : string
}

export const reducer = (state : StateType, { type, errorMsg } : ActionType) => {
    switch (type) {
        case RegisterActions.ERROR:
            return {
                ...initialState,
                error: true,
                errorMsg
            }
        case RegisterActions.LOADING:
            return {
                ...initialState,
                loading: true
            }
        case RegisterActions.SUCCESS:
            return {
                ...initialState,
                success: true
            }
        default:
            return state
    }
}