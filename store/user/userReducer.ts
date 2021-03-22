import UserActionTypes from './userActionTypes'
import userInitialState from './userInitialState'

export type ActionType = {
    type : string;
    name : string;
}

export const userReducer = (state = userInitialState, { type, name } : ActionType) => {
    switch (type) {
        case UserActionTypes.CHANGE_NAME:
            return {
                name
            }
        default:
            return state
    }
}