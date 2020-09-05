import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'

import Toast from '../widgets/Toast'


import APICalls from '../../networks/APICalls'

import '../../css/Home.css'

function Lists(props)   {




    return (
        <div>
            Lists
            {JSON.stringify(props.profile)}








        </div>
    )
}

export default Lists