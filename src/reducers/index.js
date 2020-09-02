import { combineReducers } from 'redux'
import profileReducer from './profileReducer'
import pageIndexReducer from './pageIndexReducer'

export default combineReducers({
    profile: profileReducer,
    page_index: pageIndexReducer
})