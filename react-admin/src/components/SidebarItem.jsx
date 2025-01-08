import React from 'react';
import { NavLink } from 'react-router-dom';


const SidebarItem = ({to, icon, title}) => {
    return (
        <div className="sidebarListItem">
        
          <NavLink to={to} className='link' activeclassname="active">
            {icon}
            {title}
          </NavLink>
        </div>
    );
}

export default SidebarItem;
