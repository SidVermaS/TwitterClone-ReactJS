import React, { useEffect, useState } from 'react'
import DefaultProfile from '../../assets/images/default_profile.png'

import '../../css/Avatar.css'

function Avatar(props)  {
    useState(()=>   {
    })
    return (
        <div>
            {<img className="Avatar__bg" src={(props.photo_url_profile===undefined || props.photo_url_profile===null)?DefaultProfile:props.photo_url_profile}  />}

        </div>
    )
}

export default Avatar