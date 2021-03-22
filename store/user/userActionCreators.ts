import UserActionTypes from "./userActionTypes";

export const changeName = (name : string) => ({
    type: UserActionTypes.CHANGE_NAME,
    name
})