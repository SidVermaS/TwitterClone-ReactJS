import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import Tweet from '../widgets/Tweet'

import APICalls from '../../networks/APICalls'

function Tweets(props)  {
    const apiCalls=new APICalls({ profile: props.profile })
    let [url, setUrl]=useState(''), [tweets, setTweets]=useState([]),
    [index, setIndex]=useState(-1)

    useEffect((props1)=>  {  
        setUrl(props.urlType==='home'?`${apiCalls.tweet}`:`${apiCalls.tweet}${apiCalls.profile}`) 
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


    return (
        <div>
            {
                tweets.map((tweet, index)=>(
                    <Tweet key={index} tweet={tweet} profile={tweet.profile[0]} baseUrlProfilePhoto={apiCalls.baseUrlProfilePhoto} baseUrlTweetPhoto={apiCalls.baseUrlTweetPhoto} />
                ))     
            }
        </div>
    )
}

export default Tweets