import React from 'react'

import '../../css/ProfileHeader.css'

function ProfileHeader(props)   {



    return (
        <div className="">
            
                <img src={`${props.baseUrlTweetPhoto}img7.jpg`} className="ProfileHeader__cover_photo" />
                <img src={`${props.baseUrlProfilePhoto}${props.currentProfile.photo_url_profile}`} className="rounded-circle ProfileHeader__profile_photo" />
            <div className="ProfileHeader__content">    
                <div className="ProfileHeader_name">{props.currentProfile.name}</div>
            </div>



        </div>
    )
}

export default ProfileHeader