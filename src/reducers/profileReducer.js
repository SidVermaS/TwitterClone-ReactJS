import { FETCH, SAVE, CLEAR } from '../actions/types'

const initialState={
    profile: null
}

export default function(state=initialState, action) {
    switch(action.type) {
        case FETCH:
            return {
                ...state,
                profile: action.payload
            }
        case SAVE:    
            return {
                ...state,
                profile: action.payload
            }
        case CLEAR:
            return {
                ...state,
                profile: action.payload
            }       
        default:    
            return state
    }
}