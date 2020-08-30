import React, { useEffect, useState, useRef } from 'react'
import { connect } from 'react-redux'
import { Formik, Form, Field } from 'formik'
import TextareaAutosize from 'react-textarea-autosize'
import Avatar from './Avatar'
import Toast from '../widgets/Toast'

import APICalls from '../../networks/APICalls'

import {ReactComponent as TweetPhoto} from '../../assets/images/tweet_inputs/tweet_photo.svg'
import {ReactComponent as TweetGif} from '../../assets/images/tweet_inputs/tweet_gif.svg'
import {ReactComponent as TweetPoll} from '../../assets/images/tweet_inputs/tweet_poll.svg'
import {ReactComponent as TweetEmoji} from '../../assets/images/tweet_inputs/tweet_emoji.svg'
import {ReactComponent as TweetSchedule} from '../../assets/images/tweet_inputs/tweet_schedule.svg'
import '../../css/TweetInput.css'

function TweetInput(props)  {
    const apiCalls=new APICalls({ profile: props.profile })
    const fileRef=useRef(null)
    const messageRef=useRef()
    const [photoFile, setPhotoFile]=useState(null)
    const [photoUrl, setPhotoUrl]=useState(null)

    const selectImage=()=>  {
        fileRef.current.click()
    }
    const fileSelectedHandler=e=>{
        setPhotoFile(e.target.files[0])
        console.log('photoFile: ',e.target.files[0], photoFile)
        if(e.target.files[0])   {
            setPhotoUrl(URL.createObjectURL(e.target.files[0]))
            console.log('url: ',photoUrl, ' photoFile: ',photoFile)
        }    
    }
    const uploadPhoto=async ()=>    {
        const formData=FormData()
        formData.append('file', photoFile)
        const { status, body }=await apiCalls.postFormDataRequest(formData)
        if(status===201)    {

        }   else    {
            messageRef.current.displayToast(body['message'])
        }
        return body['photo_url']
    }
    const submitTweet=async ()=>  {
        
    }
    return (
        <div className="TweetInput__bg">
            <Toast ref={messageRef} />
            <div className="TweetInput__main">
                <Avatar className="TweetInput__avatar" />
                <TextareaAutosize placeholder="What's happening?"  />
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

const mapStateToProps=state=>   ({
    profile: state.profile.profile
})

export default connect(mapStateToProps, null)(TweetInput)