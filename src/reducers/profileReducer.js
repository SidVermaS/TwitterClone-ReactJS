import { FETCH, SAVE, CLEAR } from '../actions/types'

const initialState={
    profile: null
}

export default function(state=initialState, action) {
    switch(action.type) {
        case FETCH:
            return {
                profile: action.payload
            }
        case SAVE:    
            return {
                profile: action.payload
            }
        case CLEAR:
            return {
                profile: action.payload
            }    
        default:    
            return state
    }
}