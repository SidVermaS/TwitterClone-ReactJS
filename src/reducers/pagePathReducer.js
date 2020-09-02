import { SET_PAGE_PATH, } from '../actions/types'

const initialState={
    page_path: '/'
}

export default function(state=initialState, action) {
    switch(action.type) {
        case SET_PAGE_PATH:
            return {
                ...state,
                page_path: action.payload
            }
        default:
            return state    
    }
}