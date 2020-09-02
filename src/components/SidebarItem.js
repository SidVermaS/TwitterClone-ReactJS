import React, { useEffect } from 'react'


import "../css/SidebarItem.css";

function SidebarItem(props) {
    useEffect(()=>{
        console.log('~~~ SidebarItem: ',props.index,' si: ',props.selectedIndex)
    }, [props.selectedIndex])
    return (
        <div className="SidebarItem" onClick={e=>props.onItemChanged(props.index)}>
                {props.index===props.selectedIndex?<props.item.active_icon className="SidebarItem__icon SidebarItem__active_icon" />:<props.item.icon className="SidebarItem__icon" />}
                <span className={`SidebarItem__title ${props.index===props.selectedIndex && "SidebarItem__title--active"}`}>{props.item.title}</span>
                


        </div>
    )
}

export default SidebarItem