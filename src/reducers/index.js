import { combineReducers } from 'redux'
import profileReducer from './profileReducer'
import pagePathReducer from './pagePathReducer'

export default combineReducers({
    profile: profileReducer,
    page_path: pagePathReducer
})