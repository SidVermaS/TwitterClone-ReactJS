import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'

import TweetInput from '../widgets/TweetInput'
import Tweets from '../widgets/Tweets'
import Toast from '../widgets/Toast'

import {ReactComponent as LatestTweets } from '../../assets/images/latest_tweets.svg'

import APICalls from '../../networks/APICalls'

import '../../css/Home.css'


function Home(props)   {
    const messageRef=useRef()
   
    const showToast=(message)=>   {
        messageRef.current.displayToast(message)
    }
    
    useEffect((props1)=>  {
    },[])

    return (
        <div className="Home__bg">
            <Toast ref={messageRef} />
            <div className="Home__header navbar sticky-top">
                <span className="Home__title">Home</span>
                <LatestTweets className="Home__latest_tweets_icon" />
            </div>
            <div className="Home__content">
                <TweetInput profile={props.profile} showToast={showToast} />
                <Tweets profile={props.profile} showToast={showToast} urlType="home" />
            </div>
        </div>
    )
}
export default Home