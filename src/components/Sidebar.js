import React, { useState } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { setPageIndex, getPageIndex } from '../actions/pageIndexActions'

import SidebarItem from './SidebarItem'

import {ReactComponent as TwitterLogoSm } from '../assets/images/twitter_logo_sm.svg'


import items from '../routes/index'
import '../css/Sidebar.css'


function Sidebar(props) {
    
    useState(()=>{

    },[])
    const onItemChanged=selectedIndex=> {
        props.setPageIndex(selectedIndex)
    }
    return (
        <div className="Sidebar__bg sticky-top">
            <TwitterLogoSm className="Sidebar__twitter_logo"  />            
            {
                items.map((item, index)=><div key={index}><SidebarItem item={item} index={index} selectedIndex={props.page_index} onItemChanged={onItemChanged}  /></div>)
            }

            <button className="btn btn-block Sidebar__tweet_btn">Tweet</button>
        </div>
    )
}

const mapStateToProps=state=>({
    page_index: state.page_index.page_index
})
export default connect(mapStateToProps, { setPageIndex, getPageIndex })(Sidebar)