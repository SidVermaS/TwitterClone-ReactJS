import React, { useEffect, useState, useRef, } from 'react'
import { connect } from 'react-redux'
import { Formik, Form, Field } from 'formik'
import TextareaAutosize from 'react-textarea-autosize'
import Avatar from './Avatar'

import APICalls from '../../networks/APICalls'

import {ReactComponent as TweetPhoto} from '../../assets/images/tweet_inputs/tweet_photo.svg'
import {ReactComponent as TweetGif} from '../../assets/images/tweet_inputs/tweet_gif.svg'
import {ReactComponent as TweetPoll} from '../../assets/images/tweet_inputs/tweet_poll.svg'
import {ReactComponent as TweetEmoji} from '../../assets/images/tweet_inputs/tweet_emoji.svg'
import {ReactComponent as TweetSchedule} from '../../assets/images/tweet_inputs/tweet_schedule.svg'
import '../../css/TweetInput.css'

function TweetInput(props)  {

    useState(()=>   {
    },[])
    const apiCalls=new APICalls({ profile: props.profile })

    const fileRef=useRef(null)

    const [photoFile, setPhotoFile]=useState(null),
    [photoUrl, setPhotoUrl]=useState(null),
    [text, setText]=useState('')

    const selectImage=()=>  {
        fileRef.current.click()
    }
    const fileSelectedHandler=e=>{
        setPhotoFile(e.target.files[0])
        console.log('photoFile: ',e.target.files[0], photoFile, ' url: ',URL.createObjectURL(e.target.files[0]))
        if(e.target.files[0])   {
            setPhotoUrl(URL.createObjectURL(e.target.files[0]))
        }   else    {
            setPhotoUrl(null)
        }
    }
    const uploadPhoto=async ()=>    {
        const formData=new FormData()
        formData.append('file', photoFile)
        const { status, body }=await apiCalls.postFormDataRequest(`${apiCalls.upload}?file_type=tweets`,formData)
        if(status===201)    {

        }   else    {  
            if(body['message']) {
                props.showToast(body['message'])
            }
        }
        return body['photo_url']
    }
    const submitTweet=async ()=>  {
        const formData={
            profile_id: props.profile._id,
            text: text,            
        }
        if(photoFile)   {
            formData.photo_url_tweet=await uploadPhoto()            
        }
        if((photoFile && formData.photo_url_tweet) || !photoFile)   {
            const { status, body }=await apiCalls.postRequest(apiCalls.tweet, formData)

            if(status===201)  {
                body['tweet'].profile=[{ _id: props.profile._id, name: props.profile.name, photo_url_profile: props.profile.photo_url_profile }]
                props.addNewTweet(body['tweet'])
                setText('')
            }
            if(body['message']) {
                props.showToast(body['message'])
            }
        }
    }
    return (
        <div className="TweetInput__bg">
            <div className="TweetInput__main">
                <Avatar className="TweetInput__avatar" photo_url_profile={`${apiCalls.baseUrlProfilePhoto}${props.profile.photo_url_profile}`} />
                <TextareaAutosize placeholder="What's happening?" onChange={(e)=>setText(e.target.value)}  />
            </div> 
            {photoFile && 
            <div className="TweetInput__photo">
                <img src={photoUrl}   />
            </div>}    
            <input type="file" hidden ref={fileRef} onChange={fileSelectedHandler}  />
            <div className="TweetInput__actions d-flex justify-content-between">
                <div className="TweetInput__extras" onClick={selectImage}>
                    <TweetPhoto className="TweetInput__icon" />
                    <TweetGif className="TweetInput__icon" />
                    <TweetPoll className="TweetInput__icon" />
                    <TweetEmoji className="TweetInput__icon" />
                    <TweetSchedule className="TweetInput__icon" />
                </div>                
                <button onClick={submitTweet}>Tweet</button>
            </div>
        </div>
    )

}

export default TweetInput