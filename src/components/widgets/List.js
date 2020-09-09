import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { Formik, Form, Field } from 'formik'
import * as yup from 'yup'
import { Button, Modal } from 'react-bootstrap'

import Toast from '../widgets/Toast'

import { ReactComponent as Pinned } from '../../assets/images/pinned.svg'
import { ReactComponent as PinnedActive } from '../../assets/images/pinned_active.svg'

import APICalls from '../../networks/APICalls'

import '../../css/List.css'

function List(props)    {



    return (
        <div className="d-flex justify-content-between align-items-center List__bg">
            <div className="d-flex">
                <div>
                    <img src={`${props.baseUrlListPhoto}${props.list.photo_url_list}`} className="List__thumbnail" />
                </div>
                <div>
                    <div className="List__text">{props.list.name}</div>
                    <div className="d-flex align-items-center">
                        <div><img src={`${props.baseUrlProfilePhoto}${props.profile.photo_url_profile}`} className=" List__profile_photo_url_profile" />
                        </div>
                        <div className="List__text List__profile_name">&nbsp;{props.profile.name}&nbsp;</div><div className="List__profile_username">@{props.profile.username}</div> 
                    </div>
                </div>               
            </div>
            <div className="">
                {props.list.pinned?<Pinned className="App__icon" />:<PinnedActive className="App__icon" />}
            </div>
        </div>
    )
}

export default List