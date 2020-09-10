import React, { useState, useEffect, useRef } from 'react'





import APICalls from '../../networks/APICalls'

import '../../css/PinnedLists.css'

function PinnedLists(props)   {
    const apiCalls=new APICalls({ profile: props.profile })
    const [pinnedLists, setPinnedLists]=useState([])
    
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
    const updatePinnedList=async ()=>   {
        const formData={
            _id: props.profile._id,

        }
        const {status, body}=await apiCalls.patchRequest(`${apiCalls.list}`, formData)
        if(status===200)    {
            // pinnedLists[index]
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
}

export default PinnedLists