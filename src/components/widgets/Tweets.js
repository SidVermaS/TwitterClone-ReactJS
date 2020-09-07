import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import Tweet from './Tweet'

import APICalls from '../../networks/APICalls'

function Tweets(props)  {
    const apiCalls=new APICalls({ profile: props.profile })
    let [url, setUrl]=useState(''), [tweets, setTweets]=useState([]),
    [index, setIndex]=useState(-1)

    useEffect((props1)=>  {  
        setUrl(props.urlType==='home'?`${apiCalls.tweet}`:props.urlType==='tweets'?`${apiCalls.tweet}${apiCalls.profile}`:'') 
        if(url) {  
            fetchTweets()
        }    
    },[url])

    const fetchTweets=async ()=>    {
        setIndex(index++)
        const { status, body }=await apiCalls.getRequest(`${url}?index=${index}&_id=${props.profile._id}`)
        if(status===200)    {
            setTweets(body['tweets'])
        }   else if(status)   {
            props.showToast(body['message'])
        }
    }
    const changeLike=async (likedTweetIndex)=>{
        tweets[likedTweetIndex].is_liked=!tweets[likedTweetIndex].is_liked
        console.log('~~~ chlike',tweets[likedTweetIndex].is_liked)
        setTweets(tweets)
        // const { status, body }=await apiCalls.getRequest(`${url}?index=${index}&_id=${props.profile._id}`)
        // if(status===200)    {
          
        // }   else if(status)   {
        //     props.showToast(body['message'])
        // }

    }

    return (
        <div>
            {
                tweets.map((tweet, index)=>(
                    <Tweet key={tweet._id} index={index} tweet={tweet} profile={tweet.profile[0]} baseUrlProfilePhoto={apiCalls.baseUrlProfilePhoto} baseUrlTweetPhoto={apiCalls.baseUrlTweetPhoto} changeLike={changeLike} />
                ))     
            }
        </div>
    )
}

export default Tweets