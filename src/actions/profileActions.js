import { FETCH, SAVE, CLEAR } from './types'

export const fetch=()=>dispatch=>{
    console.log('~~~ fetch: ')
    dispatch({
        type: FETCH,
        payload: JSON.parse(localStorage.getItem('profile'))
    })
}

export const save=profile=>dispatch=>{
    console.log('~~~ save: ',profile)
    localStorage.setItem('profile',JSON.stringify(profile))
    dispatch({
        type: SAVE,
        payload: JSON.parse(localStorage.getItem('profile'))
    })
}

export const clear=()=>dispatch=>{
    localStorage.clear()
    dispatch({
        type: CLEAR,
        payload: null
    })
}
