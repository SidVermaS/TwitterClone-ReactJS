import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { Formik, Form, Field } from 'formik'
import * as yup from 'yup'
import { Button, Modal } from 'react-bootstrap'

import Toast from '../widgets/Toast'

import { ReactComponent as Pinned } from '../../assets/images/pinned.svg'
import { ReactComponent as PinnedActive } from '../../assets/images/pinned_active.svg'

import APICalls from '../../networks/APICalls'

import '../../css/Lists.css'

function List(props)    {



    return (
        <div className="d-flex justify-content-between">
            <div></div>


            <div>
                
            </div>
        </div>
    )
}

export default List