import { SET_PAGE_INDEX, GET_PAGE_INDEX } from '../actions/types'

const initialState={
    page_index: 0
}

export default function(state=initialState, action) {
    switch(action.type) {
        case SET_PAGE_INDEX:
            return {
                ...state,
                page_index: action.payload
            }
        case GET_PAGE_INDEX:
            return {
                ...state,
                page_index: action.payload
            }
        default:
            return state    
    }
}