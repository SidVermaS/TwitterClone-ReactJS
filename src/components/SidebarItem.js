import React, { useEffect } from 'react'


import "../css/SidebarItem.css";

function SidebarItem(props) {
    useEffect(()=>{
    }, [props.page_path])
    return (
        <div className="SidebarItem" onClick={e=>props.onItemChanged(props.item.path)}>
            {props.item.path===props.selectedPath?<props.item.active_icon className="SidebarItem__icon SidebarItem__active_icon" />:<props.item.icon className="SidebarItem__icon" />}
            <span className={`SidebarItem__title ${props.item.path===props.selectedPath && "SidebarItem__title--active"}`}>{props.item.title}</span>
                


        </div>
    )
}

export default SidebarItem