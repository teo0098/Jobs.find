import { Dispatch } from "react"

import { changeName } from "./userActionCreators"
import { ActionType } from './userReducer'

const mapUserDispatchToProps = (dispatch : Dispatch<ActionType>) => ({
    changeName: (name : string) => dispatch(changeName(name))
})

export default mapUserDispatchToProps