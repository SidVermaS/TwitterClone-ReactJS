import React, {useEffect} from 'react'

import { ReactComponent as Keyboard } from '../../assets/images/keyboard.svg'

import '../../css/ProfileHeader.css'

function ProfileHeader(props)   {

    useEffect((props1)=>  {
        
        console.log('~~~ pro h: ',props.currentProfile)
    },[])
    const getDate=(date)=>  {
        date=new Date(date)
        date=`${date.toLocaleString('en-us', { month: 'long' })} ${date.getFullYear()}`

        return date
    }

    return (
        <div className="">
            
                <img src={`${props.baseUrlTweetPhoto}img7.jpg`} className="ProfileHeader__cover_photo" />
                <div className="ProfileHeader__header d-flex justify-content-between"> 
                    <img src={`${props.baseUrlProfilePhoto}${props.currentProfile.photo_url_profile}`} className="rounded-circle ProfileHeader__profile_photo" />
                    {props.currentProfile._id===props.profile._id?<button type="button" className="ProfileHeader__btn ProfileHeader__follow_btn btn btn-outline-primary">Edit profile</button>:props.currentProfile.is_followed===true?<button type="button" className="ProfileHeader__btn ProfileHeader__following_btn btn ">Following</button>:<button type="button" className="ProfileHeader__btn ProfileHeader__follow_btn btn btn-outline-primary">Follow</button>}
                </div>
            <div className="ProfileHeader__content">    
                <div className="ProfileHeader__name">{props.currentProfile.name}</div>
                <div className="ProfileHeader__username">@{props.currentProfile.username}</div>
                <div className="ProfileHeader__bio">{props.currentProfile.bio}</div>
                <div className="d-flex">
                    <Keyboard className="ProfileHeader__keyboard"   />
                    <span className="ProfileHeader__joined">&nbsp;Joined&nbsp;{getDate(props.currentProfile.joint)}</span>
                </div>
                <div className="d-flex">
                    <span className="ProfileHeader__count">{props.currentProfile.following}</span>
                    <span className="ProfileHeader__joined">&nbsp;Following</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span className="ProfileHeader__count">{props.currentProfile.followers}</span>
                    <span className="ProfileHeader__joined">&nbsp;Followers</span>
                </div>
            </div>
            
         




            


        </div>
    )
}

export default ProfileHeader