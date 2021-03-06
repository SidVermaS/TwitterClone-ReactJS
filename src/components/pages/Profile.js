import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { HashLink as Link } from 'react-router-hash-link'

import ProfileHeader from '../widgets/ProfileHeader'
import Tweets from '../widgets/Tweets'

import Toast from '../widgets/Toast'
import APICalls from '../../networks/APICalls'

import { ReactComponent as ArrowLeft } from '../../assets/images/arrow_left.svg'

import '../../css/Profile.css'

function Profile(props) {
    const messageRef=useRef()
    const apiCalls=new APICalls({ profile: props.profile })
    const [currentProfile, setCurrentProfile]=useState(null), [tabIndex,setTabIndex]=useState(0), [isFollowed,setIsFollowed]=useState(false)
    const showToast=(message)=>   {
        messageRef.current.displayToast(message)
    }
    const changeFriendship=async (action)=>   {
        currentProfile.is_followed=!currentProfile.is_followed
        setIsFollowed(!isFollowed)
        const formData={
            _id: props.profile._id,
            current_profile_id: currentProfile._id,
            action: action
        }
        const { status, body }=await apiCalls.patchRequest(`${apiCalls.profileUrl}${apiCalls.friendship}`, formData)
        if(status===200)    {

        }   else if(body['message'])    {
            showToast(body['message'])
        }
    }
    const fetchProfile=async ()=>{
        
        const { status, body }=await apiCalls.getRequest(`${apiCalls.profileUrl}?username=${props.match.params.username}&_id=${props.profile._id}`)
        if(status===200)    {
            setCurrentProfile(body['profile'][0])
            setIsFollowed(body['profile'][0]['is_followed'])
        } else if(status)   {
            showToast(body['message'])
        }
    }
    const changeTab=(receivedTabIndex)=>{
        setTabIndex(receivedTabIndex)
    }
    useEffect((props1)=>  {
        
        fetchProfile()
    },[tabIndex,isFollowed])
    
    return (
        <div className="Profile__bg">
            {currentProfile && <React.Fragment>
                <Toast ref={messageRef}  />
                <div className="Profile__header sticky-top">
                    <ArrowLeft className="App__back_icon"  />
                    <span>{currentProfile.name}</span>
                </div>    
                <ProfileHeader changeFriendship={changeFriendship} profile={props.profile} currentProfile={currentProfile} isFollowed={isFollowed} baseUrlProfilePhoto={apiCalls.baseUrlProfilePhoto} baseUrlTweetPhoto={apiCalls.baseUrlTweetPhoto} className="Profile__ProfileHeader"  />
    
            <div className="Profile__nav container">
                <div className="row text-center">
                    {console.log('~~~ tabIndex: ',tabIndex)}
                    <div onClick={e=>changeTab(0)} className={"col py-2 "+(tabIndex===0?'Profile__nav_active':'')}><Link to="#tweets" className={tabIndex===0?'Profile__nav_a':''}>Tweets</Link></div>
                    <div onClick={e=>changeTab(1)} className={"col py-2 "+(tabIndex===1?'Profile__nav_active':'')}><Link to="#with_replies" className={tabIndex===1?'Profile__nav_a':''}>Tweets &amp; replies</Link></div>
                    <div onClick={e=>changeTab(2)} className={"col py-2 "+(tabIndex===2?'Profile__nav_active':'')}><Link to="#media" className={tabIndex===2?'Profile__nav_a':''}>Media</Link></div>
                    <div onClick={e=>changeTab(3)} className={"col py-2 "+(tabIndex===3?'Profile__nav_active':'')}><Link to="#likes" className={tabIndex===3?'Profile__nav_a':''}>Likes</Link></div>
                </div>                   
            </div>
            <hr/>
            <Tweets currentProfile={currentProfile} profile={props.profile} showToast={showToast} urlType="profile" />





        
            


            </React.Fragment>}
        </div>
    )
}
const mapStateToProps=state=>({
})
export default connect(mapStateToProps, {  })(Profile)