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
    const [currentProfile, setCurrentProfile]=useState(null)
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
                
            </React.Fragment>}
        </div>
    )
}
const mapStateToProps=state=>({
})
export default connect(mapStateToProps, {  })(Profile)