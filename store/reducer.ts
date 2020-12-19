import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { favJobsReducer } from './favJobs/favJobsReducer'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['favJobs']
}

const rootReducer = combineReducers({
    favJobs: favJobsReducer
})

export default persistReducer(persistConfig, rootReducer)