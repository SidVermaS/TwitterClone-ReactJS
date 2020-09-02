import React, { useEffect, useState, useRef } from 'react'
import Hashtags from 'react-highlight-hashtags'

import {ChevronCompactDown} from 'react-bootstrap-icons'

import Avatar from './Avatar'

import {ReactComponent as Comment} from '../../assets/images/tweets/comment.svg'
import {ReactComponent as Like} from '../../assets/images/tweets/like.svg'
import {ReactComponent as Retweet} from '../../assets/images/tweets/retweet.svg'
import {ReactComponent as Share} from '../../assets/images/tweets/share.svg'

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
            <div className="Tweet__profile">
                <div className="d-flex justify-content-between">
                    <div>
                        <span className="Tweet__profile_name">{props.profile.name}</span>
                        <span className="Tweet__profile_others">&nbsp;@{props.profile.username}&nbsp;·&nbsp;</span>
                        <span className="Tweet__profile_others">{getDate(props.tweet.created)}</span>
                    </div>
                    <div>
                        <ChevronCompactDown className="Tweet__arrow_icon" />
                    </div>
                </div>
                <Hashtags>{props.tweet.text}</Hashtags>
                {props.tweet.photo_url_tweet && 
                <div>
                    <img src={`${props.baseUrlTweetPhoto}${props.tweet.photo_url_tweet}`} className="Tweet__photo"  />
                </div>} 
                <div className="Tweet__actions d-flex justify-content-between">
                    <div><Comment className="Tweet__icon"  />{props.tweet.comments?props.tweet.comments!=0?props.tweet.comments:null:null}</div>
                    <div><Retweet className="Tweet__icon"    />{props.tweet.retweets?props.tweet.retweets!=0?props.tweet.retweets:null:null}</div>
                    <div><Like className="Tweet__icon"   />{props.tweet.likes?props.tweet.likes!=0?props.tweet.likes:null:null}</div>
                    <div><Share className="Tweet__icon"  />{props.tweet.shares?props.tweet.shares!=0?props.tweet.shares:null:null}</div>
                </div>
            </div>
        </div>
    )
}

export default Tweet