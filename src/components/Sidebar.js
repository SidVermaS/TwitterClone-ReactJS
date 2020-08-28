import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

import SidebarItem from './SidebarItem'
import {ReactComponent as TwitterLogoSm } from '../assets/images/twitter_logo_sm.svg'

import {ReactComponent as Bookmarks } from '../assets/images/sidebar_items/bookmarks.svg'
import {ReactComponent as Explore } from '../assets/images/sidebar_items/explore.svg'
import {ReactComponent as Home } from '../assets/images/sidebar_items/home.svg'
import {ReactComponent as Lists } from '../assets/images/sidebar_items/lists.svg'
import {ReactComponent as Messages } from '../assets/images/sidebar_items/messages.svg'
import {ReactComponent as More } from '../assets/images/sidebar_items/more.svg'
import {ReactComponent as Notifications } from '../assets/images/sidebar_items/notifications.svg'
import {ReactComponent as Profile } from '../assets/images/sidebar_items/profile.svg'
import {ReactComponent as Search } from '../assets/images/sidebar_items/search.svg'

import {ReactComponent as BookmarksActive } from '../assets/images/sidebar_items/bookmarks_active.svg'
import {ReactComponent as ExploreActive } from '../assets/images/sidebar_items/explore_active.svg'
import {ReactComponent as HomeActive } from '../assets/images/sidebar_items/home_active.svg'
import {ReactComponent as ListsActive } from '../assets/images/sidebar_items/lists_active.svg'
import {ReactComponent as MessagesActive } from '../assets/images/sidebar_items/messages_active.svg'
import {ReactComponent as NotificationsActive } from '../assets/images/sidebar_items/notifications_active.svg'
import {ReactComponent as ProfileActive } from '../assets/images/sidebar_items/profile_active.svg'
import {ReactComponent as SearchActive } from '../assets/images/sidebar_items/search_active.svg'


import '../css/Sidebar.css'
import { Bookmark } from 'react-bootstrap-icons'

function Sidebar(props) {
    const items=[
        {
            title: 'Home',
            icon: Home,
            active_icon: HomeActive,
            path: '/',
        },
        {
            title: 'Explore',
            icon: Explore,
            active_icon: ExploreActive,
            path: '/explore',
        },
        {
            title: 'Search',
            icon: Search,
            active_icon: SearchActive,
            path: '/search',
        },
         {
            title: 'Notifications',
            icon: Notifications,
            active_icon: NotificationsActive,
            path: '/notifications',
        }, 
        {
            title: 'Messages',
            icon: Messages,
            active_icon: MessagesActive,
            path: '/messages',
        }, 
        {
            title: 'Bookmarks',
            icon: Bookmarks,
            active_icon: BookmarksActive,
            path: '/bookmarks',
        }, 
        {
            title: 'Lists',
            icon: Lists,
            active_icon: ListsActive,
            path: '/lists',
        },
        {
            title: 'Profile',
            icon: Profile,
            active_icon: ProfileActive,
            path: '/profile',
        }, 
        {
            title: 'More',
            icon: More,
            active_icon: More,
            path: '/more',
        },
    ]
    const [selectedIndex, setSelectedIndex]=useState(0)

    return (
        <div className="Sidebar__bg">
            <TwitterLogoSm className="Sidebar__twitter_logo"  />
            
            {
                items.map((item, index)=><div key={index}><SidebarItem item={item} index={index} selectedIndex={selectedIndex} /></div>)
            }

            <button className="btn btn-block Sidebar__tweet_btn">Tweet</button>














        </div>
    )
}

export default Sidebar