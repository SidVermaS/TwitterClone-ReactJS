import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react'





import APICalls from '../../networks/APICalls'

import '../../css/PinnedLists.css'

const PinnedLists=forwardRef((props, ref)=>   {
    const apiCalls=new APICalls({ profile: props.profile })
    const [pinnedLists, setPinnedLists]=useState([])
    
    useImperativeHandle(ref, ()=>   ({
        updatePinnedList(list) {
            const foundIndex=pinnedLists.findIndex((pinnedList)=>pinnedList._id===list._id)
            if(list.pinned)   {
                pinnedLists.push(list)
            }   else    {
                pinnedLists.splice(foundIndex, 1)
            }
            setPinnedLists([...pinnedLists])
        }
    }))


    

     
    
    const fetchPinnedLists=async ()=> {
        const {status, body}=await apiCalls.getRequest(`${apiCalls.list}${apiCalls.pinned}${props.profile._id}`)
        if(status===200)    {
            pinnedLists.push(...body['lists'])
            setPinnedLists([...pinnedLists])
            console.log('~~ 2 len: ',pinnedLists.length)
        }   else if(body['message'])    {
            props.showToast(body['message'])
        }
    }

    useEffect(()=>  {
        fetchPinnedLists()

    }, [])
    
    const PinnedList=(props1)=>{
        return (
            <div className="text-center PinnedLists__child">
                {console.log('pl : ',props1.pinnedList.name)}
                <div><img src={`${props.baseUrlListPhoto}${props1.pinnedList.photo_url_list}`} className="PinnedLists__thumbnail" /></div>
                <div>{props1.pinnedList.name.length>6?props1.pinnedList.name.substring(0,6)+'...':props1.pinnedList.name}</div>
            </div>
        )
    }
    
    return (
        <div className="d-flex align-items-center PinnedLists__bg">
            {console.log('~~ len: ',pinnedLists.length)}
            {
                pinnedLists.length===0?<div className="d-flex align-items-center PinnedLists__no_pinned_list">Nothing to see here yet — pin up to five of your favorite Lists to access them quickly.</div>:<div className="d-flex">{pinnedLists.map((pinnedList,index)=><PinnedList key={pinnedList._id} pinnedList={pinnedList} className=""  />)}</div>
            }

        </div>
    )
})

export default PinnedLists