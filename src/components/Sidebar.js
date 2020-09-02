import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { setPagePath } from '../actions/pagePathActions'

import SidebarItem from './SidebarItem'

import {ReactComponent as TwitterLogoSm } from '../assets/images/twitter_logo_sm.svg'


import items from '../routes/index'
import '../css/Sidebar.css'


function Sidebar(props) {
    
    useState(()=>{

    },[])
    const onItemChanged=selectedPath=> {
        props.setPagePath(selectedPath)
        // props.history.push('/profile')
        console.log('~~~ Sidebar: ',props.history)
    }
    return (
        <div className="Sidebar__bg sticky-top">
            <TwitterLogoSm className="Sidebar__twitter_logo"  />            
            {
                items.map((item, index)=><div key={index}><Link to={item.path} style={{ color: 'inherit', textDecoration: 'inherit'}}><SidebarItem item={item} selectedPath={props.page_path} onItemChanged={onItemChanged}  /></Link></div>)
            }

            <button className="btn btn-block Sidebar__tweet_btn">Tweet</button>
        </div>
    )
}

const mapStateToProps=state=>({
    page_path: state.page_path.page_path
})
export default connect(mapStateToProps, { setPagePath })(Sidebar)