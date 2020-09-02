import { SET_PAGE_PATH,  } from './types'

export const setPagePath=path=>dispatch=>{
    console.log('~~~ setPagePath: ',path)
    dispatch({
        type: SET_PAGE_PATH,
        payload: path
    })
}
