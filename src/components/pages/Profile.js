import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'

import ProfileHeader from '../widgets/ProfileHeader'
import Toast from '../widgets/Toast'
import APICalls from '../../networks/APICalls'

import { ReactComponent as ArrowLeft } from '../../assets/images/arrow_left.svg'

import '../../css/Profile.css'

function Profile(props) {
    const messageRef=useRef()
    const apiCalls=new APICalls({ profile: props.profile })
    const [currentProfile, setCurrentProfile]=useState(null), [tabIndex,setTabIndex]=useState(0)
    const showToast=(message)=>   {
        // messageRef.current.displayToast(message)
    }
    const fetchProfile=async ()=>{
        
        const { status, body }=await apiCalls.getRequest(`${apiCalls.profile}?username=${props.match.params.username}&_id=${props.profile._id}`)
        if(status===200)    {
            setCurrentProfile(body['profile'][0])
        } else if(status)   {
            showToast(body['message'])
        }
    }
    const changeTab=(receivedTabIndex)=>{
        setTabIndex(receivedTabIndex)
    }
    useEffect((props1)=>  {
        
        fetchProfile()
    },[])
    
    return (
        <div className="Profile__bg">
            {currentProfile && <React.Fragment>
                <Toast ref={messageRef}  />
                <div className="Profile__header sticky-top">
                    <ArrowLeft className="Profile__back_icon"  />
                    <span>{currentProfile.name}</span>
                </div>    
                <ProfileHeader profile={props.profile} currentProfile={currentProfile} baseUrlProfilePhoto={apiCalls.baseUrlProfilePhoto} baseUrlTweetPhoto={apiCalls.baseUrlTweetPhoto} className="Profile__ProfileHeader"  />
         

<div className="">
  <ul className="nav nav-tabs d-flex justify-content-around">
        <li><a href="#pane1" data-toggle="tab" onClick={changeTab}>Tweets</a></li>
        <li className="active"><a href="#pane2" data-toggle="tab" onClick={changeTab}>Tweets &amp; replies</a></li>
        <li><a href="#pane3" data-toggle="tab" onClick={changeTab}>Media</a></li>
        <li><a href="#pane4" data-toggle="tab" onClick={changeTab}>Likes</a></li>
    </ul>
 
</div>







        
            


            </React.Fragment>}
        </div>
    )
}
const mapStateToProps=state=>({
})
export default connect(mapStateToProps, {  })(Profile)