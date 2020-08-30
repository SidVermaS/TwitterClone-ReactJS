import React from 'react'

import {ReactComponent as Search } from '../assets/images/sidebar_items/search.svg'

import '../css/Options.css'

function Options(props) {
    return (
        <div className="Options__bg sticky-top">
            <div className="Options__search sticky-top">
                <Search className="Options__search_icon" />
                <input type="text" placeholder="Search Twitter"  />
            </div>
            <div>options</div>
        </div>
    )
}

export default Options