import React, { useState } from 'react'
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
        },
        {
            title: 'Explore',
            icon: Explore,
            active_icon: ExploreActive,
        },
        {
            title: 'Search',
            icon: Search,
            active_icon: SearchActive,
        },
         {
            title: 'Notifications',
            icon: Notifications,
            active_icon: NotificationsActive,
        }, 
        {
            title: 'Messages',
            icon: Messages,
            active_icon: MessagesActive,
        }, 
        {
            title: 'Bookmarks',
            icon: Bookmarks,
            active_icon: BookmarksActive,
        }, 
        {
            title: 'Lists',
            icon: Lists,
            active_icon: ListsActive,
        },
        {
            title: 'Profile',
            icon: Profile,
            active_icon: ProfileActive,
        }, 
        {
            title: 'More',
            icon: More,
            active_icon: More,
        },
    ]
    const [selectedIndex, setSelectedIndex]=useState(0)

    return (
        <div className="Sidebar__bg">
            <TwitterLogoSm className="Sidebar__twitter_logo"  />
            
            {
                items.map((item, index)=><SidebarItem item={item} index={index} selectedIndex={selectedIndex} />)
            }
















        </div>
    )
}

export default Sidebar