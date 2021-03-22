import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { favJobsReducer } from './favJobs/favJobsReducer'
import { userReducer } from './user/userReducer'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['favJobs', 'user']
}

const rootReducer = combineReducers({
    favJobs: favJobsReducer,
    user: userReducer
})

export default persistReducer(persistConfig, rootReducer)