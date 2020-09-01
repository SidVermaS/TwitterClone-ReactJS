import React, { useEffect, useState, useRef } from 'react'

import {ChevronCompactDown} from 'react-bootstrap-icons'

import Avatar from './Avatar'

import '../../css/Tweet.css'

function Tweet(props)    {
    const getDate=(date)=>  {
        date=new Date(date)
        date=`${date.toLocaleString('en-us', { month: 'short' })} ${date.getDay()}`

        return date
    }

    return (
        <div className="Tweet__bg">
            <div className="Tweet__avatar" >
                <Avatar photo_url_profile={`${props.baseUrlProfilePhoto}${props.profile.photo_url_profile}`} />
            </div>
            <div className="Tweet__profile d-flex justify-content-between">
                <div>
                    <span className="Tweet__profile_name">{props.profile.name}</span>
                    <span className="Tweet__profile_username">&nbsp;@{props.profile.username}&nbsp;·&nbsp;</span>
                    <span className="Tweet__profile_date">{getDate(props.tweet.created)}</span>
                </div>
                <div>
                    <ChevronCompactDown />
                </div>
            </div>









        </div>
    )
}

export default Tweet