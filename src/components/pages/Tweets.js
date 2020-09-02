import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import Tweet from '../widgets/Tweet'

import APICalls from '../../networks/APICalls'

function Tweets(props)  {
    const apiCalls=new APICalls({ profile: props.profile })
    let [tweets, setTweets]=useState([]), 
    [index, setIndex]=useState(-1)

    useEffect((props1)=>  {
        fetchTweets()

    },[])

    const fetchTweets=async ()=>    {
        setIndex(index++)
        const { status, body }=await apiCalls.getRequest(`${apiCalls.tweet}?index=${index}&_id=${props.profile._id}`)
        if(status===200)    {
            setTweets(body['tweets'])
        }   else    {
            props.showToast(body['message'])
        }
    }


    return (
        <div>
            {
                tweets.map((tweet)=>(
                    <Tweet tweet={tweet} profile={tweet.profile[0]} baseUrlProfilePhoto={apiCalls.baseUrlProfilePhoto} baseUrlTweetPhoto={apiCalls.baseUrlTweetPhoto} />
                ))     
            }
        </div>
    )
}

export default Tweets