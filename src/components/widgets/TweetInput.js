import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Formik, Form, Field } from 'formik'
import TextareaAutosize from 'react-textarea-autosize'

import Avatar from './Avatar'

import APICalls from '../../networks/APICalls'

import '../../css/TweetInput.css'

function TweetInput(props)  {
    const apiCalls=new APICalls({  })
    return (
        <div className="TweetInput__bg">
            <Avatar className="TweetInput__avatar" />
            <TextareaAutosize   />






















        </div>
    )
}

const mapStateToProps=state=>   ({
    profile: state.profile.profile
})

export default connect(mapStateToProps, {  })(TweetInput)