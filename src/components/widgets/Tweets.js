import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react'
import { connect } from 'react-redux'

import Tweet from './Tweet'

import APICalls from '../../networks/APICalls'

const Tweets=forwardRef((props,ref)=>  {
    const apiCalls=new APICalls({ profile: props.profile })
    let [url, setUrl]=useState(''), [tweets, setTweets]=useState([]),
    [index, setIndex]=useState(-1)

    useImperativeHandle(ref, ()=>   ({
        addNewTweet(tweet)  {
            console.log('~~~~ addNewTweet: ',tweet)
            tweets.unshift(tweet)
            setTweets([...tweets])
            setIndex(index++)
        }
    }))  
  

    useEffect((props1)=>  {  
        console.log('~~~ url: ',props.urlType)
        setUrl(props.urlType==='home'?`${apiCalls.tweet}?`:`${apiCalls.tweet}${apiCalls.profileUrl}?profile_id=${props.currentProfile._id}&`) 
       
        if(url) {  
            fetchTweets()
        }    
    },[url,])

    const fetchTweets=async ()=>    {
        setIndex(index++)
        const { status, body }=await apiCalls.getRequest(`${url}index=${index}&_id=${props.profile._id}`)
        if(status===200)    {
            tweets.push(...body['tweets'])
            setTweets([...tweets])
        }   else if(status)   {
            props.showToast(body['message'])
        }
    }
    const changeLike=async (likedTweetIndex)=>{
        tweets[likedTweetIndex].is_liked=!tweets[likedTweetIndex].is_liked
        if(tweets[likedTweetIndex].is_liked)    {
            tweets[likedTweetIndex].likes++
        }   else    {
            tweets[likedTweetIndex].likes--
        }
        console.log('~~~ chlike',tweets[likedTweetIndex].is_liked)
        setTweets([...tweets])

        const formData={
            is_liked: tweets[likedTweetIndex].is_liked,
            tweet_id: tweets[likedTweetIndex]._id,
            profile_id: props.profile._id
        }

        const { status, body }=await apiCalls.patchRequest(`${apiCalls.tweet}${apiCalls.favorite}`, formData)
        if(status===200)    {
          

        }   else if(status)   {
            props.showToast(body['message'])
        }

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
})

export default Tweets