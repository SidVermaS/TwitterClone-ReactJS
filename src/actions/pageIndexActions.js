import { SET_PAGE_INDEX, GET_PAGE_INDEX } from './types'

export const setPageIndex=index=>dispatch=>{
    console.log('~~~ setPageIndex: ',index)
    dispatch({
        type: SET_PAGE_INDEX,
        payload: index
    })
}

export const getPageIndex=()=>dispatch=>{
    console.log('~~~ getPageIndex: ')
    dispatch({
        type: GET_PAGE_INDEX,
        payload: null
    })
}